import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { CAL_URL } from '../lib/booking'
import { FOUNDERS } from '../lib/founders'
import { EASE_PREMIUM } from '../lib/motion'
import { gradientText } from '../lib/tokens'

// Modal único de reserva: el visitante elige día y hora en Cal.com sin salir
// de la web. Cal.com envía la invitación por email a ambos automáticamente.
// Se abre con openBooking() (evento de ventana 'booking:open').
export default function BookingModal() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('web')

  useEffect(() => {
    const onOpen = (e) => { setSource(e.detail?.source || 'web'); setOpen(true) }
    window.addEventListener('booking:open', onOpen)
    return () => window.removeEventListener('booking:open', onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const src = `${CAL_URL}?embed=true&theme=light&layout=month_view&metadata[source]=${encodeURIComponent(source)}`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(10,10,11,0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center',
            padding: isMobile ? 0 : '2rem',
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Agendar llamada"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_PREMIUM }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 980, height: isMobile ? '92dvh' : 'min(760px, 90dvh)',
              background: '#FAF8F3', borderRadius: isMobile ? '22px 22px 0 0' : 24,
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxShadow: '0 40px 120px rgba(0,0,0,0.45)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: isMobile ? '1rem 1.1rem' : '1.1rem 1.6rem', borderBottom: '1px solid rgba(26,24,20,0.08)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: isMobile ? '1.3rem' : '1.55rem', color: '#1A1814', lineHeight: 1.1 }}>
                  Elige día y hora. <em style={{ ...gradientText, fontStyle: 'italic' }}>30 min, gratis.</em>
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.85rem', color: 'rgba(26,24,20,0.6)' }}>
                  Te llega la invitación por email al momento{FOUNDERS.active ? ` · quedan ${FOUNDERS.spotsLeft} plazas fundador` : ''}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 999, border: '1px solid rgba(26,24,20,0.12)', background: 'transparent', color: '#1A1814', cursor: 'pointer', fontSize: '0.95rem' }}
              >
                ✕
              </button>
            </div>
            <iframe
              title="Calendario de reservas"
              src={src}
              style={{ flex: 1, width: '100%', border: 0, background: '#FAF8F3' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
