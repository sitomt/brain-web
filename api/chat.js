// Endpoint del chatbot de Sito Labs — Claude Sonnet 4.6 con captura de lead.
// Compatible con Vercel (export default handler) y con el middleware de Vite en dev.
// La API key vive SOLO en el entorno (ANTHROPIC_API_KEY): nunca llega al navegador.

import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt, CAPTURE_LEAD_TOOL, OPEN_BOOKING_TOOL, SEND_INFO_EMAIL_TOOL } from './_prompt.js'
import { buildInfoEmail } from './_infoEmail.js'

const MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 1024
const HISTORY_TURNS = 6 // cuántos intercambios recientes ve el modelo (ventana de contexto)
const MAX_USER_TURNS = 8 // tope duro de mensajes del visitante por conversación: después, cierre fijo sin tokens
const BOOKING_URL = process.env.BOOKING_URL || 'https://cal.com/sitolabs/30min'

// Mensaje de cierre servido por el servidor cuando se agota el presupuesto. No pasa por el modelo.
const CLOSING_REPLY = 'Hasta aquí llega esta conversación, pero no tiene por qué acabar aquí: puedes agendar la llamada gratuita con Ginés, o empezar una nueva si quieres dejarnos tu correo.'
// Estos dos textos los interpreta el widget como acciones (agendar / reiniciar), no como mensajes.
const CLOSING_SUGGESTIONS = ['Agendar la llamada', 'Empezar de nuevo']
const DEFAULT_SUGGESTIONS = ['Agendar la llamada', 'Mándamelo por correo']
const MAX_BODY_BYTES = 64 * 1024 // 64 KB: una conversación de chat nunca pesa más

// Rate limit en memoria por IP: ventana deslizante. En serverless es por instancia
// (no global), pero frena ráfagas desde una misma IP en una instancia caliente.
const RATE_LIMIT_MAX = 20 // peticiones…
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // …por minuto y por IP
const rateHits = new Map() // ip -> number[] (timestamps)

function clientIp(req) {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff) return xff.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

// Devuelve true si la IP ha superado el límite (y registra el hit si no).
function isRateLimited(ip) {
  const now = Date.now()
  const hits = (rateHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (hits.length >= RATE_LIMIT_MAX) {
    rateHits.set(ip, hits)
    return true
  }
  hits.push(now)
  rateHits.set(ip, hits)
  // Poda perezosa para que el Map no crezca sin fin en una instancia de larga vida.
  if (rateHits.size > 5000) {
    for (const [k, v] of rateHits) {
      if (!v.some((t) => now - t < RATE_LIMIT_WINDOW_MS)) rateHits.delete(k)
    }
  }
  return false
}

// Solo aceptamos peticiones del propio sitio. Una petición same-origin del navegador
// manda Origin con el mismo host que la cabecera Host; comparamos eso (sin fijar el
// dominio, así sirve en prod, previews y dominio propio). Sin Origin (curl/SSR) se deja
// pasar: el rate limit y la API key cubren ese flanco.
function isAllowedOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return true
  try {
    return new URL(origin).host === req.headers.host
  } catch {
    return false
  }
}

// Lee y parsea el body JSON tanto en Vercel (req.body ya parseado) como en Vite (stream).
async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    if (Buffer.byteLength(req.body) > MAX_BODY_BYTES) throw new Error('payload_too_large')
    return JSON.parse(req.body || '{}')
  }
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) throw new Error('payload_too_large')
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

// Separa la línea final ">>> a | b | c" del texto visible. Devuelve { text, suggestions }.
function splitSuggestions(text) {
  const m = text.match(/\n?\s*>>>\s*([^\n]+)\s*$/)
  if (!m) return { text: text.trim(), suggestions: [] }
  const suggestions = m[1]
    .split('|')
    .map((x) => x.trim().replace(/^["'«»]+|["'«»]+$/g, ''))
    .filter((x) => x && x.length <= 40)
    .slice(0, 3)
  return { text: text.slice(0, m.index).trim(), suggestions }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL)
}

// Envía al visitante el correo informativo desde la dirección de empresa, con copia al equipo.
// Si Resend no está configurado, lo deja en el log para que el equipo lo mande a mano.
async function sendInfoEmail(input, { context }) {
  const email = String(input.email || '').trim()
  if (!EMAIL_RE.test(email)) return { status: 'invalid_email' }
  const mail = buildInfoEmail({ name: input.name, topics: input.topics, note: input.note, bookingUrl: BOOKING_URL })
  if (!mail) return { status: 'no_topics' }

  const team = process.env.LEAD_NOTIFY_EMAIL || 'ginesmunuera@gmail.com'
  if (!emailConfigured()) {
    console.log(`[info-email] (email no configurado) para ${email} · temas: ${input.topics.join(', ')} · contexto: ${context}\n${mail.text}`)
    return { status: 'queued_manual' }
  }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL,
        to: [email],
        bcc: [team],
        reply_to: team,
        subject: mail.subject,
        text: mail.text,
      }),
    })
    if (!r.ok) { console.error('[info-email] Resend error', r.status, await r.text()); return { status: 'failed' } }
    return { status: 'sent' }
  } catch (err) {
    console.error('[info-email] Resend exception', err)
    return { status: 'failed' }
  }
}

// Qué le decimos al modelo tras la herramienta, para que sea honesto con el visitante.
const INFO_EMAIL_RESULTS = {
  sent: 'Enviado. Confírmale que ya lo tiene en su bandeja.',
  queued_manual: 'Registrado: el equipo se lo envía en menos de 24 h laborables. No digas que ya está enviado.',
  invalid_email: 'El email no es válido. Pídeselo de nuevo con cuidado.',
  no_topics: 'Ningún tema válido. Elige temas del catálogo.',
  failed: 'Fallo al enviar. Dile que el equipo se lo manda en menos de 24 h laborables y ofrécele la llamada.',
}

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

// Avisa a Sito del nuevo lead. Usa Resend si está configurado; si no, lo registra en el log.
// Degradación elegante: el chat funciona aunque el email aún no esté conectado.
async function notifyLead(lead, { context, transcript }) {
  const to = process.env.LEAD_NOTIFY_EMAIL || 'ginesmunuera@gmail.com'
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.LEAD_FROM_EMAIL // p.ej. "Sito Labs <leads@tudominio.com>"

  const lines = [
    `Nombre: ${lead.name || '—'}`,
    `Empresa: ${lead.company || '—'}`,
    `Sector: ${lead.sector || '—'}`,
    `Email: ${lead.email || '—'}`,
    `Teléfono: ${lead.phone || '—'}`,
    `Necesidad: ${lead.need || '—'}`,
    `Interés: ${lead.product_interest || '—'}`,
    `Urgencia: ${lead.urgency || '—'}`,
    `Quiere humano: ${lead.wants_human ? 'sí' : 'no'}`,
    `Info enviada por correo: ${Array.isArray(lead.info_sent) ? lead.info_sent.join(', ') : '—'}`,
    `Sección de entrada: ${context || '—'}`,
  ]
  const body = `Nuevo lead desde el chat de la web:\n\n${lines.join('\n')}\n\n— Conversación —\n${transcript || ''}`

  if (!apiKey || !from) {
    console.log('[lead] (email no configurado — set RESEND_API_KEY + LEAD_FROM_EMAIL)\n' + body)
    return { emailed: false }
  }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `🟢 Nuevo lead Sito Labs — ${lead.name || lead.company || lead.email || 'sin nombre'}`,
        text: body,
      }),
    })
    if (!r.ok) { console.error('[lead] Resend error', r.status, await r.text()); return { emailed: false } }
    return { emailed: true }
  } catch (err) {
    console.error('[lead] Resend exception', err)
    return { emailed: false }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'method_not_allowed' })

  if (!isAllowedOrigin(req)) return sendJson(res, 403, { error: 'forbidden_origin' })

  if (isRateLimited(clientIp(req))) return sendJson(res, 429, { error: 'rate_limited', reply: null })

  if (!process.env.ANTHROPIC_API_KEY) {
    return sendJson(res, 500, { error: 'missing_api_key', reply: null })
  }

  let payload
  try {
    payload = await readJson(req)
  } catch (err) {
    if (err?.message === 'payload_too_large') return sendJson(res, 413, { error: 'payload_too_large' })
    return sendJson(res, 400, { error: 'bad_json' })
  }

  const { messages = [], context = null, lang = 'es', knownLead = {} } = payload

  // Normaliza el historial completo a {role, content}.
  const clean = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))

  if (!clean.length || clean[clean.length - 1].role !== 'user') {
    return sendJson(res, 400, { error: 'expected_user_message' })
  }

  // Presupuesto de conversación: se cuenta sobre TODO el historial, no sobre la ventana.
  const userTurns = clean.filter((m) => m.role === 'user').length
  const turnsLeft = Math.max(0, MAX_USER_TURNS - userTurns)
  if (userTurns > MAX_USER_TURNS) {
    return sendJson(res, 200, {
      reply: CLOSING_REPLY,
      lead: knownLead,
      captured: false,
      openBooking: false,
      emailed: null,
      suggestions: CLOSING_SUGGESTIONS,
      closed: true,
      turnsLeft: 0,
    })
  }

  // El modelo solo ve la ventana reciente (coste + foco).
  const history = clean.slice(-2 * HISTORY_TURNS)

  const client = new Anthropic() // lee ANTHROPIC_API_KEY del entorno
  const system = buildSystemPrompt({ context, lang, knownLead, turnsLeft, emailEnabled: emailConfigured(), firstTurn: userTurns === 1 })

  const convo = [...history]
  let lead = { ...knownLead }
  let captured = false
  let openBooking = false
  let emailed = null // null | 'sent' | 'queued_manual' | 'failed'
  const closed = turnsLeft === 0 // este es el último mensaje del modelo

  const finish = () => {
    const { text, suggestions } = splitSuggestions(replyParts.join('\n\n'))
    return sendJson(res, 200, {
      reply: text,
      lead,
      captured,
      openBooking,
      emailed,
      suggestions: closed ? CLOSING_SUGGESTIONS : suggestions.length ? suggestions : DEFAULT_SUGGESTIONS,
      closed,
      turnsLeft,
    })
  }

  // Acumula el texto de TODOS los turnos: el modelo suele escribir su mensaje
  // (p. ej. pedir el siguiente dato) en el MISMO turno en que llama a una
  // herramienta, así que no podemos quedarnos solo con el texto del turno final.
  const replyParts = []

  try {
    // Bucle de tool use: hasta 3 pasadas para resolver llamadas a herramientas.
    for (let i = 0; i < 3; i++) {
      const resp = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        tools: [CAPTURE_LEAD_TOOL, OPEN_BOOKING_TOOL, SEND_INFO_EMAIL_TOOL],
        messages: convo,
      })

      const turnText = resp.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim()
      if (turnText) replyParts.push(turnText)

      const toolUses = resp.content.filter((b) => b.type === 'tool_use')

      if (resp.stop_reason === 'tool_use' && toolUses.length) {
        convo.push({ role: 'assistant', content: resp.content })
        const results = []
        for (const tu of toolUses) {
          let result = 'ok'
          if (tu.name === 'send_info_email') {
            const input = tu.input || {}
            const r = await sendInfoEmail(input, { context })
            result = INFO_EMAIL_RESULTS[r.status] || 'ok'
            if (r.status === 'sent' || r.status === 'queued_manual') {
              emailed = r.status
              // Un correo enviado es un lead: fusiona datos y avisa al equipo igual que capture_lead.
              for (const k of ['email', 'name', 'company', 'sector']) {
                if (input[k]) lead[k] = input[k]
              }
              lead.need = lead.need || input.note || ''
              lead.info_sent = input.topics
              if (!captured) {
                captured = true
                const transcript = convo
                  .filter((m) => typeof m.content === 'string')
                  .map((m) => `${m.role === 'user' ? 'Cliente' : 'Bot'}: ${m.content}`)
                  .join('\n')
                await notifyLead(lead, { context, transcript })
              }
            }
          } else if (tu.name === 'capture_lead') {
            // Fusiona campos no vacíos sobre el lead conocido.
            for (const [k, v] of Object.entries(tu.input || {})) {
              if (v !== '' && v != null) lead[k] = v
            }
            captured = true
            const transcript = convo
              .filter((m) => typeof m.content === 'string')
              .map((m) => `${m.role === 'user' ? 'Cliente' : 'Bot'}: ${m.content}`)
              .join('\n')
            await notifyLead(lead, { context, transcript })
          } else if (tu.name === 'open_booking') {
            openBooking = true
          }
          results.push({ type: 'tool_result', tool_use_id: tu.id, content: result })
        }
        convo.push({ role: 'user', content: results })
        continue // pide a Claude el mensaje final tras la herramienta
      }

      // Respuesta final: une el texto de todos los turnos y separa las sugerencias.
      return finish()
    }
    return finish()
  } catch (err) {
    console.error('[chat] error', err?.status, err?.message)
    return sendJson(res, 502, { error: 'upstream', reply: null })
  }
}
