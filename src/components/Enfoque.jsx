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

// "Lo usamos en casa": qué hace la IA HOY en los negocios que dirigimos.
// Describimos la TAREA, nunca cifras de resultados. Es la prueba del titular.
const NEGOCIOS = [
  {
    icon: 'fitness',
    name: 'Baktun 13',
    label: 'Gimnasio',
    line: 'Una sola app para todo el trabajo interno del equipo: manuales, limpieza, mantenimiento, tareas del día y documentos.',
    span: 3,
  },
  {
    icon: 'solar',
    name: 'Clesol',
    label: 'Placas solares',
    line: 'CRM con seguimiento de cada cliente hasta la firma. Los leads que entran se clasifican solos: sabes a quién llamar primero. Atención al cliente automatizada.',
    span: 3,
  },
  {
    icon: 'hosteleria',
    name: 'Foodmatica',
    label: 'Bares',
    line: 'Stock en tiempo real subiendo los albaranes: ves el dinero que tienes guardado. Facturación, contabilidad y asesoría, automatizadas.',
    span: 2,
  },
  {
    icon: 'juego',
    name: 'Playgame Italia',
    label: 'Salones de juego',
    line: 'Agentes que recogen datos de muchas plataformas y los juntan en un único reporte de ingresos y costes.',
    span: 2,
  },
  {
    icon: 'hosteleria',
    name: 'Venta Alegría',
    label: 'Restaurante',
    line: 'Asistente de reservas y consultas, en desarrollo ahora mismo. En la llamada te lo enseñamos tal cual está.',
    tag: 'En desarrollo',
    span: 2,
  },
]

function GrainOverlay({ isMobile }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
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

// Quién te atiende — la persona detrás, en primera persona.
function GinesCard({ isMobile }) {
  return (
    <SpotlightCard tone="dark" radius={22} padding={isMobile ? '1.5rem' : '2rem 2.25rem'}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '150px 1fr', gap: isMobile ? '1.25rem' : '2rem', alignItems: 'center' }}>
        <div style={{ width: isMobile ? 110 : 150, aspectRatio: '3/4', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', margin: isMobile ? '0 auto' : 0 }}>
          <img
            src="/sito2.jpg"
            alt="Ginés Munuera, fundador de Sito Labs"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </div>
        <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.66rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '0.7rem' }}>
            Quién te atiende
          </span>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: 'rgba(255,255,255,0.92)', lineHeight: 1.4, margin: 0 }}>
            «Soy Ginés Munuera. La llamada la hago yo. Dirijo negocios con mis socios y fui quien
            empezó a meter la IA en ellos. Te diré con sinceridad si en el tuyo tiene sentido.»
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', margin: '0.85rem 0 0' }}>
            Ginés Munuera · Fundador de Sito Labs · Murcia
          </p>
        </div>
      </div>
    </SpotlightCard>
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
            marginBottom: isMobile ? '3rem' : '4rem',
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: 760,
            marginLeft: isMobile ? 'auto' : 0,
            marginRight: isMobile ? 'auto' : 0,
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <Eyebrow variant="pill" tone="light">Probado en nuestros negocios</Eyebrow>
          </div>

          <h2 style={{ ...h2 }}>
            <span style={{ color: '#fff', display: 'block' }}>Antes que especialistas en IA, somos empresarios.</span>
            <WipeReveal display="block" delay={0.2}>
              <em style={{ fontStyle: 'italic', display: 'block', ...gradientText }}>Y lo primero que automatizamos fue lo nuestro.</em>
            </WipeReveal>
          </h2>

          <p style={{ ...bodyLg, color: 'rgba(255,255,255,0.7)', margin: isMobile ? '1.5rem auto 0' : '1.75rem 0 0' }}>
            Somos un grupo de socios con negocios reales. Cada cosa que te propongamos la hemos
            probado primero en casa, con nuestro dinero y nuestros clientes. Por eso sabemos qué
            ahorra tiempo de verdad y qué solo queda bonito en una demo.
          </p>
        </motion.div>

        {/* Lead-in */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          style={{ marginBottom: isMobile ? '1.75rem' : '2.25rem', textAlign: isMobile ? 'center' : 'left' }}
        >
          <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.68rem', color: ACCENT, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block' }}>
            — Lo usamos en casa
          </span>
        </motion.div>

        {/* Negocios — bento (2 anchas + 3 medianas) */}
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
              key={n.name}
              variants={STAGGER_CHILD}
              style={{ gridColumn: isMobile ? 'span 1' : `span ${n.span}` }}
            >
              <SpotlightCard tone="dark" radius={20} padding={isMobile ? '1.75rem 1.5rem' : '2.1rem 2.25rem'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <span
                      aria-hidden
                      style={{
                        width: 46, height: 46, borderRadius: 13,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(67,97,238,0.12)', border: '1px solid rgba(67,97,238,0.22)', color: ACCENT,
                      }}
                    >
                      <SectorIcon name={n.icon} size={23} />
                    </span>
                    {n.tag && (
                      <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 999, padding: '4px 10px' }}>
                        {n.tag}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 style={{ ...h3, color: '#fff', fontSize: 'clamp(1.3rem, 2.4vw, 1.6rem)', margin: 0 }}>
                      {n.name}
                    </h3>
                    <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                      {n.label}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.94rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, margin: 0 }}>
                    {n.line}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Quién te atiende */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          style={{ marginTop: isMobile ? '1rem' : '1.25rem' }}
        >
          <GinesCard isMobile={isMobile} />
        </motion.div>

        {/* Enlace a Nosotros — terciario */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.1 }}
          style={{ marginTop: isMobile ? '2rem' : '2.5rem', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}
        >
          <Link
            to="/nosotros"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.7)', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.92rem',
              textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            Nuestra historia, con los errores incluidos
            <ArrowRight size={12} />
          </Link>
        </motion.div>

      </div>
    </AuroraBackground>
  )
}
