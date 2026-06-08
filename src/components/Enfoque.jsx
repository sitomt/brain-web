import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AuroraBackground from './AuroraBackground'
import SpotlightCard from './SpotlightCard'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import { ArrowRight } from './icons/ArrowIcon'
import SectorIcon from './icons/SectorIcon'
import useIsMobile from '../hooks/useIsMobile'
import { EASE_PREMIUM, STAGGER, STAGGER_CHILD } from '../lib/motion'
import { ACCENT, gradientText } from '../lib/tokens'
import { h2, h3, bodyLg } from '../lib/typography'
import { FOUNDERS } from '../lib/founders'

// "Probado en casa", hecho tangible: los negocios reales que dirige el grupo.
// No son afirmaciones de marketing — son la prueba de que somos operadores, no
// un taller de software. Cada sector mapea a un dolor que resolvemos. La
// diversidad ES la credencial. span = ancho en la rejilla bento de 6 columnas.
const NEGOCIOS = [
  {
    icon: 'juego',
    label: 'Salones de juego',
    line: 'Operación 24/7 que no se puede caer: cada turno cubierto, cada incidencia atendida.',
    span: 3,
  },
  {
    icon: 'hosteleria',
    label: 'Hostelería',
    line: 'Gestionada con sistema, sin nadie clavado a la barra para que todo funcione.',
    span: 3,
  },
  {
    icon: 'fitness',
    label: 'Gimnasios',
    line: 'Altas, bajas y cobros recurrentes que se gestionan solos.',
    span: 2,
  },
  {
    icon: 'solar',
    label: 'Placas solares',
    line: 'Proyectos por toda España, coordinados sin caos.',
    span: 2,
  },
  {
    icon: 'inversion',
    label: 'Inversión',
    line: 'Decisiones con los números delante, no a final de mes.',
    span: 2,
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

          {FOUNDERS.active && (
            <p style={{ ...bodyLg, color: 'rgba(255,255,255,0.7)', margin: '1rem 0 0' }}>
              Llevamos meses puliendo esta IA en nuestros propios negocios. Ahora
              abrimos las primeras {FOUNDERS.spotsTotal} plazas a clientes externos
              — y con ellos crecemos, paso a paso, hasta llevar cada negocio a su
              máximo potencial.
            </p>
          )}
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
            Dirigimos estos negocios cada día. En ellos probamos cada solución
            antes de proponértela.
          </p>
        </motion.div>

        {/* Negocios del grupo — bento asimétrico (2 anchas + 3 medianas) */}
        <motion.div
          {...STAGGER(0.1, 0.05)}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)',
            gap: isMobile ? '1rem' : '1.25rem',
          }}
        >
          {NEGOCIOS.map((n) => (
            <motion.div
              key={n.label}
              variants={STAGGER_CHILD}
              style={{ gridColumn: isMobile ? 'span 1' : `span ${n.span}` }}
            >
              <SpotlightCard tone="dark" radius={20} padding={isMobile ? '1.75rem 1.5rem' : '2.1rem 2.25rem'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', height: '100%' }}>
                  <span
                    aria-hidden
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 13,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(67,97,238,0.12)',
                      border: '1px solid rgba(67,97,238,0.22)',
                      color: ACCENT,
                    }}
                  >
                    <SectorIcon name={n.icon} size={23} />
                  </span>
                  <h3 style={{ ...h3, color: '#fff', fontSize: 'clamp(1.3rem, 2.4vw, 1.6rem)' }}>
                    {n.label}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.94rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
                    {n.line}
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
