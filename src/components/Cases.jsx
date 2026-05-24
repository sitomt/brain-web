import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CometCard from './CometCard'
import Eyebrow from './Eyebrow'
import useIsMobile from '../hooks/useIsMobile'
import baktunLogo from '../assets/baktun13-logo.png'
import clesolLogo from '../assets/clesol-logo.png'
import { EASE_PREMIUM, STAGGER, STAGGER_CHILD } from '../lib/motion'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

const cases = [
  {
    type: 'Centro deportivo · Murcia',
    name: 'Baktun 13',
    logo: baktunLogo,
    logoWhite: false,
    alt: 'Baktun 13 — centro deportivo que automatizó su gestión operativa con IA de BrAIn',
    stat: '3 semanas',
    statDetail: 'de cero a operativo',
    result: 'De papel y WhatsApp a operación 100% digital. Fichaje, limpieza, incidencias y comunicación de equipo en una sola app construida con IA.',
    span: 'wide', // bento: feature card, takes more space
  },
  {
    type: 'Empresa solar · Murcia',
    name: 'Clesol',
    logo: clesolLogo,
    logoWhite: true,
    alt: 'Clesol — empresa de paneles solares que automatizó la clasificación de leads con BrAIn',
    stat: '2 semanas',
    statDetail: 'de implementación',
    result: 'Leads clasificados automáticamente. El equipo solo habla con quien tiene intención real de comprar.',
    span: 'narrow',
  },
  {
    type: 'Restaurante · Murcia',
    name: 'Venta Alegría',
    logo: null,
    logoPlaceholder: 'VA',
    stat: '100% digitalizado',
    statDetail: 'control total de costes',
    result: 'Foto del albarán al chat. La IA lo procesa, estructura y añade a la base de datos. Control de costes en tiempo real, reportes automáticos y alertas si algún gasto se dispara.',
    span: 'narrow',
  },
]

function LogoArea({ c, isMobile }) {
  if (c.logo) {
    return (
      <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', width: '100%', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
        <img
          src={c.logo}
          alt={c.alt}
          style={{
            height: 48,
            width: 'auto',
            maxWidth: '100%',
            objectFit: 'contain',
            display: 'block',
            filter: c.logoWhite ? 'brightness(0) invert(1)' : 'none',
          }}
        />
      </div>
    )
  }

  return (
    <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', width: '100%', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: GRADIENT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '1rem',
            color: '#fff',
            lineHeight: 1,
          }}
        >
          {c.logoPlaceholder}
        </span>
      </div>
    </div>
  )
}

// Double-bezel wrapper around CometCard for a "machined" feel
function BezeledCase({ c, isMobile }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 26,
        padding: 5,
        height: '100%',
      }}
    >
      <CometCard
        style={{
          padding: isMobile ? '1.75rem 1.5rem' : '2.25rem',
          borderRadius: 21,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <LogoArea c={c} isMobile={isMobile} />

        {/* Stat — dominant editorial element */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', gap: '0.2rem' }}>
          <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#ffffff', lineHeight: 1.0 }}>
            {c.stat}
          </span>
          <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
            {c.statDetail}
          </span>
        </div>

        {/* Type tag */}
        <div style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.65rem', background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.1em' }}>
          {c.type}
        </div>

        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, margin: 0, flexGrow: 1 }}>
          {c.result}
        </p>
      </CometCard>
    </div>
  )
}

export default function Cases() {
  const isMobile = useIsMobile()

  // Bento layout: feature wide card spanning 2 columns on row 1,
  // then 2 narrower cards on row 2. Mobile collapses to single column.
  const gridTemplate = isMobile ? '1fr' : 'repeat(6, 1fr)'

  return (
    <AuroraBackground id="casos" intense style={{ background: '#020203', padding: isMobile ? '5rem 1.25rem' : '6.5rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ marginBottom: '3rem', textAlign: isMobile ? 'center' : 'left' }}
        >
          <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <Eyebrow variant="pill" tone="light">Clientes</Eyebrow>
          </div>
          <h2
            style={{
              fontFamily: "'Instrument Serif',serif",
              fontSize: 'clamp(2rem,4vw,3rem)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            <span style={{ color: '#fff', display: 'block' }}>Negocios reales.</span>
            <em
              style={{
                fontStyle: 'italic',
                display: 'block',
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Resultados reales.
            </em>
          </h2>
        </motion.div>

        <motion.div
          {...STAGGER(0.12, 0.05)}
          style={{
            display: 'grid',
            gridTemplateColumns: gridTemplate,
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {cases.map((c, i) => {
            // Bento spans on desktop: first card 4/6 wide, others 3/6 (or stack)
            const colSpan = isMobile
              ? 1
              : i === 0
              ? 6 // feature card spans full first row
              : 3 // remaining two cards split row 2
            return (
              <motion.div
                key={i}
                variants={STAGGER_CHILD}
                style={{ gridColumn: `span ${colSpan}` }}
              >
                <BezeledCase c={c} isMobile={isMobile} />
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
          style={{
            fontFamily: "'Instrument Serif',serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem,2vw,1.2rem)',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            maxWidth: 500,
            margin: '3rem auto 0',
            lineHeight: 1.7,
          }}
        >
          Tres sectores distintos.
          <br />
          Tres problemas distintos.
          <br />
          Una misma solución.
        </motion.p>
      </div>
    </AuroraBackground>
  )
}
