import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import Counter from './Counter'
import useIsMobile from '../hooks/useIsMobile'
import baktunLogo from '../assets/baktun13-logo.png'
import clesolLogo from '../assets/clesol-logo.png'
import { EASE_PREMIUM, STAGGER, STAGGER_CHILD } from '../lib/motion'
import { ACCENT } from '../lib/tokens'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

// Índice editorial de clientes: una fila por caso, separadas por hairlines.
// stat = dato destacado (cuenta al entrar en vista) · outcome = qué hicimos.
// NOTA: las cifras de `stat` son PLACEHOLDERS realistas — sustituir por reales.
const cases = [
  {
    name: 'Baktun 13',
    sector: 'Centro deportivo · Murcia',
    logo: baktunLogo,
    logoWhite: false,
    alt: 'Baktun 13 — centro deportivo que digitalizó su operación con IA de BrAIn',
    statValue: '14 h/sem',
    statLabel: 'recuperadas por el equipo',
    outcome: 'De papel y WhatsApp a una app: fichaje, limpieza, incidencias y equipo.',
    product: 'Operaciones',
  },
  {
    name: 'Clesol',
    sector: 'Empresa solar · Murcia',
    logo: clesolLogo,
    logoWhite: true,
    alt: 'Clesol — empresa solar que automatizó la clasificación de leads con BrAIn',
    statValue: '+32%',
    statLabel: 'leads cualificados',
    outcome: 'El equipo solo habla con quien tiene intención real de comprar.',
    product: 'Operaciones',
  },
  {
    name: 'Venta Alegría',
    sector: 'Restaurante · Murcia',
    logoPlaceholder: 'VA',
    statValue: '+9%',
    statLabel: 'de margen',
    outcome: 'Foto del albarán al chat: costes al día y alertas si un gasto se dispara.',
    product: 'Inteligencia',
  },
  {
    name: 'Foodmatica',
    sector: 'Hostelería · Gestión de bares',
    logoPlaceholder: 'Fo',
    statValue: '−40%',
    statLabel: 'trabajo manual diario',
    outcome: 'Software propio que lleva sus bares de principio a fin, con las cuentas al día.',
    product: 'A medida',
  },
  {
    name: 'Playgame Italia',
    sector: 'Operaciones · Italia',
    logoPlaceholder: 'Pg',
    statValue: '+30%',
    statLabel: 'volumen gestionado',
    outcome: 'Procesos internos resueltos por sistemas, a cualquier hora y sin errores.',
    product: 'Operaciones',
  },
]

// Visual de identidad: si hay logo oficial, solo el logo (sin nombre escrito);
// si no, chip con iniciales + nombre. El sector acompaña en ambos casos.
function Identity({ c }) {
  if (c.logo) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
        <img
          src={c.logo}
          alt={c.alt}
          style={{
            height: 30,
            width: 'auto',
            maxWidth: 130,
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
            filter: c.logoWhite ? 'brightness(0) invert(1)' : 'none',
          }}
        />
        <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
          {c.sector}
        </span>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', minWidth: 0 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1rem', color: '#fff', lineHeight: 1 }}>
          {c.logoPlaceholder}
        </span>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.2rem', color: '#fff', lineHeight: 1.15 }}>
          {c.name}
        </div>
        <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em', marginTop: 3 }}>
          {c.sector}
        </div>
      </div>
    </div>
  )
}

function CaseRow({ c, isMobile }) {
  return (
    <motion.div
      variants={STAGGER_CHILD}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '230px minmax(0, 1fr) auto',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '0.9rem' : '2rem',
        padding: isMobile ? '1.6rem 0.5rem' : '1.85rem 1rem',
      }}
    >
      {/* Zona A — identidad */}
      <Identity c={c} />

      {/* Zona B — estadística + qué hicimos */}
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.55rem', flexWrap: 'wrap' }}>
          <Counter
            value={c.statValue}
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', color: '#fff', lineHeight: 1 }}
          />
          <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {c.statLabel}
          </span>
        </div>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>
          {c.outcome}
        </span>
      </div>

      {/* Zona C — producto (sin CTA) */}
      <div style={{ justifySelf: isMobile ? 'flex-start' : 'flex-end', flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.66rem',
            color: ACCENT,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: '1px solid rgba(67,97,238,0.3)',
            borderRadius: 999,
            padding: '5px 12px',
            whiteSpace: 'nowrap',
          }}
        >
          {c.product}
        </span>
      </div>
    </motion.div>
  )
}

export default function Cases() {
  const isMobile = useIsMobile()

  return (
    <AuroraBackground id="casos" intense style={{ background: '#0A0A0B', padding: isMobile ? '5rem 1.25rem' : '7.5rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ marginBottom: isMobile ? '2.5rem' : '3.5rem', textAlign: isMobile ? 'center' : 'left' }}
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
            <span style={{ color: '#fff', display: 'block' }}>Empresas reales.</span>
            <WipeReveal display="block" delay={0.2}>
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
                Resultados medibles.
              </em>
            </WipeReveal>
          </h2>
        </motion.div>

        {/* Índice — filas divididas por hairlines */}
        <motion.div
          {...STAGGER(0.1, 0.05)}
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {cases.map((c) => (
            <CaseRow key={c.name} c={c} isMobile={isMobile} />
          ))}
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
          Sectores distintos.
          <br />
          Retos distintos.
          <br />
          Un mismo método.
        </motion.p>
      </div>
    </AuroraBackground>
  )
}
