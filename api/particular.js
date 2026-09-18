// Formulario de particulares (proyectos personales de IA). Ruta asíncrona y
// sin llamada: el visitante deja su idea y Sito responde por email. Reutiliza
// la misma configuración de Resend que el chat; si no está, solo lo registra
// en el log (igual que api/chat.js).

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  const chunks = []
  for await (const c of req) chunks.push(c)
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') } catch { return {} }
}

const clean = (v, max = 400) => String(v ?? '').trim().slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'method_not_allowed' })
  const b = await readBody(req)

  // Honeypot: campo oculto que solo rellenan los bots.
  if (b.website) return sendJson(res, 200, { ok: true })

  const lead = {
    name: clean(b.name, 120),
    email: clean(b.email, 160),
    idea: clean(b.idea, 2000),
    budget: clean(b.budget, 60),
  }
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || lead.idea.length < 10) {
    return sendJson(res, 400, { error: 'invalid' })
  }

  const to = process.env.LEAD_NOTIFY_EMAIL || 'ginesmunuera@gmail.com'
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.LEAD_FROM_EMAIL
  const text = `Nuevo particular desde la web:\n\nNombre: ${lead.name}\nEmail: ${lead.email}\nPresupuesto: ${lead.budget || '—'}\n\nIdea:\n${lead.idea}`

  if (!apiKey || !from) {
    console.log('[particular] (email no configurado)\n' + text)
    return sendJson(res, 200, { ok: true, emailed: false })
  }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject: `🟣 Particular Sito Labs — ${lead.name}`, text }),
    })
    return sendJson(res, 200, { ok: true, emailed: r.ok })
  } catch (err) {
    console.error('[particular] Resend exception', err)
    return sendJson(res, 200, { ok: true, emailed: false })
  }
}
