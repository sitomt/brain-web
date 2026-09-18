import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AuroraBackground from './AuroraBackground'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import { ArrowRight } from './icons/ArrowIcon'
import useIsMobile from '../hooks/useIsMobile'
import { EASE_PREMIUM } from '../lib/motion'
import { ACCENT, gradientText } from '../lib/tokens'
import { h2, bodyLg } from '../lib/typography'

function GrainOverlay({ isMobile }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        // El grano vive dentro del contenedor de contenido, que está inset por el
        // padding de la sección. Con inset negativo igual al padding, la textura se
        // extiende a sangre hasta los bordes de la sección y no deja margen visible.
        inset: isMobile ? '-5rem -1.25rem' : '-7.5rem -2rem',
        pointerEvents: 'none',
        opacity: 0.06,
        mixBlendMode: 'overlay',
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: '160px 160px',
      }}
    />
  )
}

export default function Enfoque() {
  const isMobile = useIsMobile()

  return (
    <AuroraBackground
      variant="dark"
      style={{ padding: isMobile ? '5rem 1.25rem' : '7.5rem 2rem', position: 'relative' }}
    >
      <GrainOverlay isMobile={isMobile} />
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{
            marginBottom: isMobile ? '3rem' : '4.5rem',
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: 760,
            marginLeft: isMobile ? 'auto' : 0,
            marginRight: isMobile ? 'auto' : 0,
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <Eyebrow variant="pill" tone="light">Enfoque</Eyebrow>
          </div>

          <h2 style={{ ...h2 }}>
            <span style={{ color: '#fff', display: 'block' }}>Antes que especialistas en IA,</span>
            <WipeReveal display="block" delay={0.2}>
              <em style={{ fontStyle: 'italic', display: 'block', ...gradientText }}>somos empresarios.</em>
            </WipeReveal>
          </h2>

          <p style={{ ...bodyLg, color: 'rgba(255,255,255,0.7)', margin: isMobile ? '1.5rem auto 0' : '1.75rem 0 0' }}>
            Dirigimos negocios reales. Por eso implementamos tecnología con
            criterio: sabemos qué mueve resultados, qué cuesta dinero y qué solo
            lo parece.
          </p>

        </motion.div>

        {/* Lead-in: le da un trabajo claro a las cards — son la PRUEBA del titular */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          style={{ marginBottom: isMobile ? '1.75rem' : '2.25rem', maxWidth: 720, textAlign: isMobile ? 'center' : 'left', marginInline: isMobile ? 'auto' : undefined }}
        >
          <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.68rem', color: ACCENT, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '0.85rem' }}>
            — Probado en casa
          </span>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(1.35rem, 2.6vw, 1.85rem)', color: 'rgba(255,255,255,0.92)', lineHeight: 1.3, margin: 0 }}>
            Salones de juego, hostelería, gimnasios, placas solares, inversión.
            Cada solución la probamos primero en nuestros negocios antes de proponértela.
          </p>
        </motion.div>

        {/* Enlace a Nosotros */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.15 }}
          style={{ marginTop: isMobile ? '2.5rem' : '3.25rem', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}
        >
          <Link
            to="/nosotros"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0.85rem 1.5rem',
              borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.92)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem',
              letterSpacing: '0.02em', textDecoration: 'none', transition: 'background 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
          >
            Conoce nuestra historia
            <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>
    </AuroraBackground>
  )
}
