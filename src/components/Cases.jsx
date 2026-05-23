import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CometCard from './CometCard'
import useIsMobile from '../hooks/useIsMobile'
import baktunLogo from '../assets/baktun13-logo.png'
import clesolLogo from '../assets/clesol-logo.png'

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
  },
  {
    type: 'Restaurante · Murcia',
    name: 'Venta Alegría',
    logo: null,
    logoPlaceholder: 'VA',
    stat: '100% digitalizado',
    statDetail: 'control total de costes',
    result: 'Foto del albarán al chat. La IA lo procesa, estructura y añade a la base de datos. Control de costes en tiempo real, reportes automáticos y alertas si algún gasto se dispara.',
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

export default function Cases() {
  const isMobile = useIsMobile()

  return (
    <AuroraBackground id="casos" intense style={{ background: '#020203', padding: isMobile ? '4rem 1.25rem' : '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem', textAlign: isMobile ? 'center' : 'left' }}
        >
          <span
            style={{
              fontFamily: "'Syne Mono',monospace",
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-start',
              gap: 8,
              marginBottom: '1.25rem',
            }}
          >
            <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.3)', display: isMobile ? 'none' : 'inline-block' }} />
            — Clientes
          </span>
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

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <CometCard
                style={{
                  padding: isMobile ? '1.75rem 1.5rem' : '2.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                <LogoArea c={c} isMobile={isMobile} />

                {/* Stat — elemento dominante */}
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
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
