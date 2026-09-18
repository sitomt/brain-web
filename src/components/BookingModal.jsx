import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import CtaButton from './CtaButton'
import { CAL_URL } from '../lib/booking'
import { EMAIL, PHONE, WHATSAPP_URL } from '../lib/site'
import { EASE } from '../lib/motion'
import { gradientText } from '../lib/tokens'
import { body, label } from '../lib/typography'

// Modal de reserva (Cal.com embebido). Estados: cargando → calendario → reservado.
// Al confirmar, Cal.com envía un postMessage y mostramos nuestra propia pantalla
// (día y hora + WhatsApp precargado) en vez de la confirmación genérica.
const fmt = (iso) => {
  try {
    const d = new Date(iso)
    const day = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
    const time = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    return { day, time }
  } catch { return null }
}

export default function BookingModal() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('web')
  const [loaded, setLoaded] = useState(false)
  const [booked, setBooked] = useState(null) // { day, time } | true
  const closeRef = useRef(null)
  const lastFocus = useRef(null)

  useEffect(() => {
    const onOpen = (e) => {
      lastFocus.current = document.activeElement
      setSource(e.detail?.source || 'web'); setLoaded(false); setBooked(null); setOpen(true)
    }
    window.addEventListener('booking:open', onOpen)
    return () => window.removeEventListener('booking:open', onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    setTimeout(() => closeRef.current?.focus(), 50)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onMsg = (e) => {
      if (!/^https:\/\/(app\.)?cal\.com$/.test(e.origin)) return
      const d = e.data
      if (d?.originator === 'CAL' && /^bookingSuccessful/.test(d.method || '')) {
        const start = d.data?.startTime || d.data?.booking?.startTime || d.data?.date
        setBooked(fmt(start) || true)
        window.dispatchEvent(new CustomEvent('booking:success', { detail: { source } }))
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('message', onMsg)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('message', onMsg)
      lastFocus.current?.focus?.()
    }
  }, [open, source])

  const src = `${CAL_URL}?embed=true&theme=light&layout=month_view&metadata[source]=${encodeURIComponent(source)}`
  const waAfter = 'https://wa.me/34641310956?text=' + encodeURIComponent(`Hola Ginés, acabo de reservar${booked?.day ? ` para el ${booked.day}` : ''}. Mi negocio es…`)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,10,11,0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', padding: isMobile ? 0 : '2rem' }}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Agendar llamada"
            initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 32, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 980, height: isMobile ? '92dvh' : 'min(760px, 90dvh)', background: '#FAF8F3', borderRadius: isMobile ? '22px 22px 0 0' : 24, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 120px rgba(0,0,0,0.45)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: isMobile ? '1rem 1.1rem' : '1.1rem 1.6rem', borderBottom: '1px solid rgba(26,24,20,0.08)', flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: isMobile ? '1.3rem' : '1.55rem', color: '#1A1814', lineHeight: 1.1 }}>
                  {booked ? <>Hecho. <em data-gradient-text style={{ ...gradientText, fontStyle: 'italic' }}>Ginés te llama.</em></> : <>Elige día y hora. <em data-gradient-text style={{ ...gradientText, fontStyle: 'italic' }}>30 min, gratis.</em></>}
                </span>
                {!booked && (
                  <span style={{ ...body, fontSize: '0.88rem', color: 'rgba(26,24,20,0.62)' }}>
                    Te atiende Ginés Munuera. La invitación te llega al email al momento.
                  </span>
                )}
              </div>
              <button ref={closeRef} onClick={() => setOpen(false)} aria-label="Cerrar" style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 999, border: '1px solid rgba(26,24,20,0.12)', background: 'transparent', color: '#1A1814', cursor: 'pointer', fontSize: '0.95rem' }}>✕</button>
            </div>

            {booked ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '1.25rem', padding: isMobile ? '2rem 1.25rem' : '3rem 4rem', maxWidth: 640 }}>
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: isMobile ? '1.8rem' : '2.4rem', color: '#1A1814', lineHeight: 1.1, margin: 0 }}>
                  {booked?.day ? <>El {booked.day} a las {booked.time}.</> : <>Reserva confirmada.</>}
                </p>
                <p style={{ ...body, color: 'rgba(26,24,20,0.72)' }}>
                  Te ha llegado la invitación por email. No prepares nada: solo ten a mano qué te quita más tiempo.
                </p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <CtaButton onClick={() => setOpen(false)} variant="solid" arrow="none" size="md">Cerrar</CtaButton>
                  <a href={waAfter} target="_blank" rel="noopener noreferrer" style={{ ...body, fontSize: '0.95rem', color: '#1A1814', textUnderlineOffset: 3 }}>
                    ¿Quieres adelantarle algo? Escríbele por WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
                {!loaded && (
                  <div aria-live="polite" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 14, padding: isMobile ? '1.5rem 1.1rem' : '2rem 1.6rem' }}>
                    <span style={{ ...label, color: 'rgba(26,24,20,0.5)' }}>Cargando el calendario de Ginés…</span>
                    {[0.6, 0.9, 0.75, 0.85].map((w, i) => (
                      <span key={i} style={{ display: 'block', height: 44, width: `${w * 100}%`, maxWidth: 520, borderRadius: 10, background: 'rgba(26,24,20,0.06)' }} />
                    ))}
                  </div>
                )}
                <iframe
                  title="Calendario de reservas"
                  src={src}
                  onLoad={() => setLoaded(true)}
                  style={{ width: '100%', height: '100%', border: 0, background: '#FAF8F3', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
                />
              </div>
            )}

            {!booked && (
              <div style={{ padding: isMobile ? '0.7rem 1.1rem' : '0.75rem 1.6rem', borderTop: '1px solid rgba(26,24,20,0.08)', ...body, fontSize: '0.85rem', color: 'rgba(26,24,20,0.62)', flexShrink: 0, maxWidth: 'none' }}>
                ¿No ves el calendario? Escríbenos por <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#1A1814' }}>WhatsApp al {PHONE}</a> o a <a href={`mailto:${EMAIL}`} style={{ color: '#1A1814' }}>{EMAIL}</a> y te proponemos hora.
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
