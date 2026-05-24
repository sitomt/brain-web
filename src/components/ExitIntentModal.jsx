import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import CtaButton from './CtaButton'

const STORAGE_KEY = 'brain_exit_intent_shown'

export default function ExitIntentModal({ onChatOpen }) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return

    let armed = false
    const armTimer = setTimeout(() => { armed = true }, 8000)

    const handleMouseLeave = (e) => {
      if (!armed) return
      if (e.clientY <= 0 && !e.relatedTarget && e.target.nodeName === 'HTML') {
        sessionStorage.setItem(STORAGE_KEY, '1')
        setOpen(true)
      }
    }

    document.addEventListener('mouseout', handleMouseLeave)
    return () => {
      clearTimeout(armTimer)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  const handleTry = () => {
    setOpen(false)
    onChatOpen()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,10,12,0.72)',
            backdropFilter: 'blur(8px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: 480,
              width: '100%',
              background: '#FAF8F3',
              borderRadius: 20,
              padding: isMobile ? '2rem 1.5rem' : '2.5rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: 999,
                border: 'none',
                background: 'transparent',
                color: 'rgba(26,24,20,0.45)',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            <span
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.7rem',
                background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '1.25rem',
              }}
            >
              UN MINUTO ANTES DE IRTE
            </span>

            <h3
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(1.7rem, 4vw, 2.2rem)',
                color: '#1A1814',
                lineHeight: 1.1,
                margin: 0,
                marginBottom: '0.9rem',
              }}
            >
              ¿Te vas sin probar el asistente?
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.95rem',
                color: 'rgba(26,24,20,0.65)',
                lineHeight: 1.65,
                margin: 0,
                marginBottom: '1.75rem',
              }}
            >
              Es la forma más rápida de entender qué podemos hacer por tu negocio.
              Pregúntale lo que quieras — responde en segundos.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '0.6rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <CtaButton
                onClick={handleTry}
                variant="solid"
                arrow="right"
                size="md"
              >
                Probar el asistente
              </CtaButton>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.88rem',
                  padding: '12px 18px',
                  borderRadius: 999,
                  border: 'none',
                  background: 'transparent',
                  color: 'rgba(26,24,20,0.55)',
                  cursor: 'pointer',
                }}
              >
                Ahora no
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
