import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import CtaButton from './CtaButton'
import { EMAIL } from '../lib/site'
import { EASE_PREMIUM } from '../lib/motion'
import { gradientText } from '../lib/tokens'

// Formulario para particulares (ruta secundaria, sin llamada). Se abre con
// openParticulares() (lib/booking.js) → evento 'particulares:open'. Envía a /api/particular.

const BUDGETS = ['Aún no lo sé', 'Menos de 500 €', '500 – 1.500 €', 'Más de 1.500 €']

const field = {
  width: '100%', boxSizing: 'border-box', padding: '0.85rem 1rem', borderRadius: 12,
  border: '1px solid rgba(26,24,20,0.14)', background: '#fff', color: '#1A1814',
  fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', outline: 'none',
}
const label = {
  display: 'block', marginBottom: 6, fontFamily: "'Syne Mono', monospace",
  fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,24,20,0.6)',
}

export default function ParticularesForm() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [form, setForm] = useState({ name: '', email: '', idea: '', budget: BUDGETS[0], website: '' })

  useEffect(() => {
    const onOpen = () => { setStatus('idle'); setOpen(true) }
    window.addEventListener('particulares:open', onOpen)
    return () => window.removeEventListener('particulares:open', onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/particular', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      setStatus(r.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,10,11,0.72)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center',
            padding: isMobile ? 0 : '2rem',
          }}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Cuéntanos tu proyecto"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_PREMIUM }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 560, maxHeight: isMobile ? '92dvh' : '90dvh', overflowY: 'auto',
              background: '#FAF8F3', borderRadius: isMobile ? '22px 22px 0 0' : 24,
              padding: isMobile ? '1.5rem 1.25rem 2rem' : '2.25rem 2.25rem 2.5rem',
              boxShadow: '0 40px 120px rgba(0,0,0,0.45)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: isMobile ? '1.6rem' : '1.9rem', color: '#1A1814', lineHeight: 1.1, margin: 0 }}>
                  ¿Tienes una idea <em style={{ ...gradientText, fontStyle: 'italic' }}>personal?</em>
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.92rem', color: 'rgba(26,24,20,0.62)', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                  Cuéntanosla en dos líneas y te respondemos por email en menos de 48 h laborables.
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 999, border: '1px solid rgba(26,24,20,0.12)', background: 'transparent', color: '#1A1814', cursor: 'pointer' }}>✕</button>
            </div>

            {status === 'ok' ? (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: '#1A1814', lineHeight: 1.6, margin: 0 }}>
                Recibido. Te escribimos a <strong>{form.email}</strong> en cuanto lo hayamos leído.
              </p>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={label} htmlFor="pf-name">Nombre</label>
                    <input id="pf-name" required value={form.name} onChange={set('name')} style={field} autoComplete="name" />
                  </div>
                  <div>
                    <label style={label} htmlFor="pf-email">Email</label>
                    <input id="pf-email" type="email" required value={form.email} onChange={set('email')} style={field} autoComplete="email" />
                  </div>
                </div>
                <div>
                  <label style={label} htmlFor="pf-idea">¿Qué quieres crear?</label>
                  <textarea id="pf-idea" required minLength={10} rows={4} value={form.idea} onChange={set('idea')} style={{ ...field, resize: 'vertical' }} placeholder="Ej. un asistente que organice mis apuntes y me pregunte para estudiar" />
                </div>
                <div>
                  <label style={label} htmlFor="pf-budget">Presupuesto aproximado</label>
                  <select id="pf-budget" value={form.budget} onChange={set('budget')} style={field}>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                {/* Honeypot anti-spam */}
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} style={{ position: 'absolute', left: -9999, opacity: 0 }} aria-hidden />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  <CtaButton type="submit" variant="solid" arrow="right" size="lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Enviando…' : 'Enviar mi idea'}
                  </CtaButton>
                  {status === 'error' && (
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(26,24,20,0.6)' }}>
                      No se ha podido enviar. Escríbenos a <a href={`mailto:${EMAIL}`} style={{ color: '#1A1814' }}>{EMAIL}</a>.
                    </span>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
