import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AuroraBackground from './AuroraBackground'
import SpotlightCard from './SpotlightCard'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import { ArrowRight } from './icons/ArrowIcon'
import useIsMobile from '../hooks/useIsMobile'
import { EASE_PREMIUM, STAGGER, STAGGER_CHILD } from '../lib/motion'
import { ACCENT, gradientText } from '../lib/tokens'
import { h2, h3, bodyLg } from '../lib/typography'

// Cuatro pilares del valor añadido: criterio empresarial por encima de la IA.
// span define el ancho en la rejilla bento de 6 columnas (escritorio).
const PILLARS = [
  {
    num: '01',
    title: 'Criterio de negocio',
    desc: 'Decidimos como quien rinde cuentas a final de mes. La tecnología es el medio; el resultado, lo que importa.',
    span: 4,
    featured: true,
  },
  {
    num: '02',
    title: 'Probado en casa',
    desc: 'Cada solución la usamos primero en nuestras propias empresas. Si no nos sirve a nosotros, no te la proponemos.',
    span: 2,
  },
  {
    num: '03',
    title: 'Resultados medibles',
    desc: 'Nos comprometemos con números: tiempo recuperado, costes que bajan, ingresos que dejan de escaparse.',
    span: 2,
  },
  {
    num: '04',
    title: 'A medida y rápido',
    desc: 'Diseñamos para tu operativa concreta y la ponemos en marcha en semanas, no en trimestres.',
    span: 4,
  },
]

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
            <Eyebrow variant="pill" tone="light">Nuestro enfoque</Eyebrow>
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

        {/* Pilares — bento asimétrico */}
        <motion.div
          {...STAGGER(0.1, 0.05)}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)',
            gap: isMobile ? '1rem' : '1.25rem',
          }}
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.num}
              variants={STAGGER_CHILD}
              style={{ gridColumn: isMobile ? 'span 1' : `span ${pillar.span}` }}
            >
              <SpotlightCard tone="dark" radius={20} padding={isMobile ? '1.75rem 1.5rem' : '2.25rem'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', height: '100%' }}>
                  <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.78rem', color: ACCENT, letterSpacing: '0.1em' }}>
                    {pillar.num}
                  </span>
                  <h3 style={{ ...h3, color: '#fff', fontSize: pillar.featured ? 'clamp(1.7rem, 3vw, 2.2rem)' : 'clamp(1.4rem, 2.6vw, 1.7rem)' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: pillar.featured ? '1rem' : '0.92rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
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
