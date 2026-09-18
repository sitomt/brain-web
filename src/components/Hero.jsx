import { useRef } from 'react'
import { motion } from 'framer-motion'
import CtaButton from './CtaButton'
import RotatingWord from './RotatingWord'
import ChatWidget from './ChatWidget'
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
        padding: isMobile ? '6rem 1.25rem 3.5rem' : '8rem 2rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '-20%', right: '-10%', width: 720, height: 720,
          background: 'radial-gradient(circle at center, rgba(67,97,238,0.06), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          maxWidth: 1180, margin: '0 auto', width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 0.9fr',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'start',
          position: 'relative',
        }}
      >
        {/* Columna izquierda: todo alineado a la izquierda, también en móvil */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', alignItems: 'flex-start', paddingTop: isMobile ? 0 : '1rem' }}>
          {/* Sin fade en el H1: es el LCP y no debe esperar a ninguna animación */}
          <h1 style={{ ...display, color: '#1A1814', maxWidth: '12ch' }}>
            La IA que hace funcionar tu{' '}
            <RotatingWord words={WORDS} style={{ fontStyle: 'italic', ...gradientText, verticalAlign: 'baseline' }} />
          </h1>

          <p style={{ ...bodyLg, color: '#4A4740' }}>
            Contesta clientes, controla stock, sigue leads y hace el reporting.
            La usamos a diario en nuestros propios negocios.
          </p>

          <motion.div {...fadeUp(0.1)} ref={ctaRef} data-hero-cta style={{ width: isMobile ? '100%' : 'auto', display: 'flex', flexDirection: 'column', gap: '0.7rem', alignItems: 'flex-start' }}>
            <CtaButton
              onClick={() => openBooking('hero')}
              variant="solid"
              arrow="right"
              size="lg"
              magnetic={!isMobile}
              style={isMobile ? { width: '100%', justifyContent: 'space-between' } : undefined}
            >
              {CTA_LABEL}
            </CtaButton>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.95rem', color: 'rgba(26,24,20,0.62)', lineHeight: 1.5 }}>
              30 min con Ginés. Te dice qué haría la IA en tu negocio, y si no encaja, también.
            </span>
          </motion.div>

          <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.35rem 0.8rem', marginTop: '0.4rem' }}>
            <span style={{ ...label, color: 'rgba(26,24,20,0.5)' }}>Lo usamos en</span>
            {TRUST.map((name, i) => (
              <span key={name} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.8rem' }}>
                {i > 0 && <span aria-hidden style={{ width: 3, height: 3, borderRadius: 999, background: 'rgba(26,24,20,0.25)', alignSelf: 'center' }} />}
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1rem', color: 'rgba(26,24,20,0.72)' }}>{name}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Columna derecha: el chat real */}
        <motion.div {...fadeUp(0.25)} style={{ width: '100%', maxWidth: isMobile ? '100%' : 440, justifySelf: isMobile ? 'stretch' : 'end' }}>
          <ChatWidget inline context="hero" />
        </motion.div>
      </div>
    </section>
  )
}
