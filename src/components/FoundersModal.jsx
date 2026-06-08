import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import CtaButton from './CtaButton'
import { BRAND, gradientText } from '../lib/tokens'
import { FOUNDERS, spotsTaken } from '../lib/founders'

export default function FoundersModal({ open, onClose, onChatOpen }) {
  const isMobile = useIsMobile()

  // Bloquear scroll del body y cerrar con Escape mientras está abierto.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const handleClaim = () => {
    onClose()
    onChatOpen()
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('chat:send', { detail: { message: FOUNDERS.chatPrefill } })
      )
    }, 450)
  }

  const pct = Math.round((spotsTaken() / FOUNDERS.spotsTotal) * 100)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
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
              maxWidth: 520,
              width: '100%',
              background: '#FAF8F3',
              borderRadius: 20,
              padding: isMobile ? '2.25rem 1.5rem 1.75rem' : '2.75rem 2.75rem 2.25rem',
              boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
              overflow: 'hidden',
            }}
          >
            {/* línea de gradiente superior */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: BRAND.gradient,
              }}
            />

            <button
              onClick={onClose}
              aria-label="Cerrar"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
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
                ...gradientText,
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              PROGRAMA FUNDADORES
            </span>

            <h3
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(1.7rem, 4vw, 2.25rem)',
                color: '#1A1814',
                lineHeight: 1.12,
                margin: '0 0 1.1rem',
              }}
            >
              Llevamos meses puliéndolo en casa. Ahora abrimos
              <em style={{ ...gradientText, fontStyle: 'italic' }}>
                {' '}las {FOUNDERS.spotsTotal} primeras plazas.
              </em>
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.98rem',
                color: 'rgba(26,24,20,0.7)',
                lineHeight: 1.65,
                margin: '0 0 1rem',
              }}
            >
              Nuestras soluciones llevan tiempo funcionando dentro de nuestros
              propios negocios. Ahora las abrimos a clientes externos — y buscamos
              los primeros {FOUNDERS.spotsTotal} con los que construir casos de
              referencia.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.98rem',
                color: 'rgba(26,24,20,0.7)',
                lineHeight: 1.65,
                margin: '0 0 1.6rem',
              }}
            >
              A cambio de acompañarnos en este arranque:{' '}
              <strong style={{ fontWeight: 500, color: '#1A1814' }}>
                precio fundador, acceso directo al equipo y prioridad
              </strong>
              . Cuando se cierren las {FOUNDERS.spotsTotal} plazas, este precio
              desaparece.
            </p>

            {/* Bloque oferta + contador */}
            <div
              style={{
                background: '#FEFCF7',
                border: '1px solid rgba(26,24,20,0.07)',
                borderRadius: 14,
                padding: '1rem 1.15rem',
                marginBottom: '1.6rem',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 12,
                  marginBottom: 10,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: '#1A1814',
                  }}
                >
                  Hasta un {FOUNDERS.discountLabel} sobre el precio de catálogo
                </span>
                <span
                  style={{
                    fontFamily: "'Syne Mono', monospace",
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(26,24,20,0.55)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Quedan {FOUNDERS.spotsLeft} de {FOUNDERS.spotsTotal} plazas
                </span>
              </div>
              <div
                style={{
                  position: 'relative',
                  height: 6,
                  borderRadius: 999,
                  background: 'rgba(26,24,20,0.08)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${pct}%`,
                    borderRadius: 999,
                    background: BRAND.gradient,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '0.7rem',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <CtaButton onClick={handleClaim} variant="solid" arrow="right" size="lg">
                Quiero mi plaza fundador
              </CtaButton>
              <button
                onClick={onClose}
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

            <p
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.68rem',
                letterSpacing: '0.06em',
                color: 'rgba(26,24,20,0.45)',
                margin: '1.25rem 0 0',
              }}
            >
              Sin permanencia · el precio solo sube desde aquí
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
