import { useRef } from 'react'
import { motion } from 'framer-motion'
import CtaButton from './CtaButton'
import RotatingWord from './RotatingWord'
import useIsMobile from '../hooks/useIsMobile'
import { fadeUp } from '../lib/motion'
import { gradientText } from '../lib/tokens'
import { display, bodyLg, label } from '../lib/typography'
import { openBooking } from '../lib/booking'
import { CTA_LABEL } from '../lib/cta'

// Portada: titular rotatorio (visible desde el frame 0), un botón, una línea de
// confianza y el chat REAL embebido: el producto funcionando en la primera pantalla.
const TRUST = ['Baktun 13', 'Clesol', 'Foodmatica', 'Playgame Italia', 'Venta Alegría']
const WORDS = ['negocio', 'gimnasio', 'bar', 'restaurante', 'salón de juego', 'empresa solar', 'clínica', 'tienda']

export default function Hero() {
  const isMobile = useIsMobile()
  const ctaRef = useRef(null)

  return (
    <section
      id="hero"
      style={{
        background: '#FAF8F3',
        minHeight: isMobile ? 'auto' : '100dvh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '8.5rem 1.5rem 5rem' : '8rem 2rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          ...(isMobile
            ? { top: '-6%', left: '50%', transform: 'translateX(-50%)', width: 560, height: 560, background: 'radial-gradient(circle at center, rgba(67,97,238,0.10), rgba(247,37,133,0.04) 40%, transparent 68%)' }
            : { top: '-20%', right: '-10%', width: 720, height: 720, background: 'radial-gradient(circle at center, rgba(67,97,238,0.06), transparent 60%)' }),
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          maxWidth: 1180, margin: '0 auto', width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 0.9fr',
          gap: isMobile ? '1.75rem' : '4rem',
          alignItems: 'start',
          position: 'relative',
        }}
      >
        {/* Columna izquierda. En móvil, composición centrada con más aire. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.75rem' : '1.4rem', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left', paddingTop: isMobile ? 0 : '1rem' }}>
          {/* Sin fade en el H1: es el LCP y no debe esperar a ninguna animación */}
          <h1 style={{ ...display, fontSize: isMobile ? 'clamp(2.6rem, 11vw, 3.1rem)' : display.fontSize, lineHeight: isMobile ? 1.04 : display.lineHeight, color: '#1A1814', maxWidth: isMobile ? '11ch' : '12ch' }}>
            La IA que hace funcionar tu{' '}
            <RotatingWord words={WORDS} style={{ fontStyle: 'italic', ...gradientText, verticalAlign: 'baseline' }} />
          </h1>

          <p style={{ ...bodyLg, fontSize: isMobile ? '1.08rem' : bodyLg.fontSize, color: '#4A4740', maxWidth: isMobile ? '32ch' : bodyLg.maxWidth }}>
            Contesta clientes, controla stock, sigue leads y hace el reporting.
            La usamos a diario en nuestros propios negocios.
          </p>

          <motion.div {...fadeUp(0.1)} ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.9rem' : '0.7rem', alignItems: isMobile ? 'center' : 'flex-start', width: isMobile ? '100%' : 'auto', marginTop: isMobile ? '0.25rem' : 0 }}>
            <CtaButton
              onClick={() => openBooking('hero')}
              variant="solid"
              arrow="right"
              size="lg"
              magnetic={!isMobile}
              style={isMobile ? { width: '100%', maxWidth: 360, justifyContent: 'space-between' } : undefined}
            >
              {CTA_LABEL}
            </CtaButton>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: isMobile ? '0.9rem' : '0.95rem', color: 'rgba(26,24,20,0.62)', lineHeight: 1.5, maxWidth: isMobile ? '30ch' : 'none' }}>
              {isMobile ? '30 min con Ginés. Si no encaja, también te lo dice.' : '30 min con Ginés. Te dice qué haría la IA en tu negocio, y si no encaja, también.'}
            </span>
          </motion.div>

          {isMobile ? (
            <motion.div {...fadeUp(0.2)} style={{ marginTop: '1.25rem', width: '100%', paddingTop: '1.75rem', borderTop: '1px solid rgba(26,24,20,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem' }}>
              <span style={{ ...label, color: 'rgba(26,24,20,0.45)' }}>Lo usamos en</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                {TRUST.map((name) => (
                  <span key={name} style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1rem', color: 'rgba(26,24,20,0.75)', padding: '0.3rem 0.85rem', borderRadius: 999, border: '1px solid rgba(26,24,20,0.1)', background: 'rgba(255,255,255,0.55)' }}>{name}</span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.35rem 0.8rem', marginTop: '0.4rem' }}>
              <span style={{ ...label, color: 'rgba(26,24,20,0.5)' }}>Lo usamos en</span>
              {TRUST.map((name, i) => (
                <span key={name} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.8rem' }}>
                  {i > 0 && <span aria-hidden style={{ width: 3, height: 3, borderRadius: 999, background: 'rgba(26,24,20,0.25)', alignSelf: 'center' }} />}
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1rem', color: 'rgba(26,24,20,0.72)' }}>{name}</span>
                </span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Columna derecha: hueco donde se «acopla» el chat real (ChatWidget mode="travel",
            montado en App.jsx). En móvil el chat vive en la burbuja flotante. */}
        {!isMobile && (
          <motion.div {...fadeUp(0.25)} style={{ width: '100%', maxWidth: 440, justifySelf: 'end' }}>
            <div data-chat-dock aria-hidden style={{ width: '100%', height: 460 }} />
          </motion.div>
        )}
      </div>
    </section>
  )
}
