// Endpoint del chatbot de BrAIn — Claude Sonnet 4.6 con captura de lead.
// Compatible con Vercel (export default handler) y con el middleware de Vite en dev.
// La API key vive SOLO en el entorno (ANTHROPIC_API_KEY): nunca llega al navegador.

import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt, CAPTURE_LEAD_TOOL } from './_prompt.js'

const MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 1024
const MAX_TURNS = 6 // tope de mensajes de usuario por petición (anti-abuso básico)

// Lee y parsea el body JSON tanto en Vercel (req.body ya parseado) como en Vite (stream).
async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}')
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
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
  const from = process.env.LEAD_FROM_EMAIL // p.ej. "BrAIn <leads@tudominio.com>"

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
        subject: `🟢 Nuevo lead BrAIn — ${lead.name || lead.company || lead.email || 'sin nombre'}`,
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

  if (!process.env.ANTHROPIC_API_KEY) {
    return sendJson(res, 500, { error: 'missing_api_key', reply: null })
  }

  let payload
  try {
    payload = await readJson(req)
  } catch {
    return sendJson(res, 400, { error: 'bad_json' })
  }

  const { messages = [], context = null, lang = 'es', knownLead = {} } = payload

  // Normaliza el historial a {role, content} y limita el tamaño.
  const history = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-2 * MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))

  if (!history.length || history[history.length - 1].role !== 'user') {
    return sendJson(res, 400, { error: 'expected_user_message' })
  }

  const client = new Anthropic() // lee ANTHROPIC_API_KEY del entorno
  const system = buildSystemPrompt({ context, lang, knownLead })

  const convo = [...history]
  let lead = { ...knownLead }
  let captured = false

  try {
    // Bucle de tool use: hasta 3 pasadas para resolver llamadas a capture_lead.
    for (let i = 0; i < 3; i++) {
      const resp = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system,
        tools: [CAPTURE_LEAD_TOOL],
        messages: convo,
      })

      const toolUses = resp.content.filter((b) => b.type === 'tool_use')

      if (resp.stop_reason === 'tool_use' && toolUses.length) {
        convo.push({ role: 'assistant', content: resp.content })
        const results = []
        for (const tu of toolUses) {
          if (tu.name === 'capture_lead') {
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
          }
          results.push({ type: 'tool_result', tool_use_id: tu.id, content: 'ok' })
        }
        convo.push({ role: 'user', content: results })
        continue // pide a Claude el mensaje final tras la herramienta
      }

      // Respuesta final de texto.
      const reply = resp.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim()
      return sendJson(res, 200, { reply, lead, captured })
    }
    return sendJson(res, 200, { reply: '', lead, captured })
  } catch (err) {
    console.error('[chat] error', err?.status, err?.message)
    return sendJson(res, 502, { error: 'upstream', reply: null })
  }
}
