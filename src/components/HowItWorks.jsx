import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

const STEPS = [
  {
    num: '01',
    title: 'Diagnóstico gratuito',
    desc: 'Nos cuentas cómo funciona tu negocio. Identificamos qué procesos consumen más tiempo y dónde puede entrar la IA.',
  },
  {
    num: '02',
    title: 'Sistema a medida',
    desc: 'Diseñamos e implementamos exactamente lo que necesitas. Sin soluciones genéricas. Sin meses de espera.',
  },
  {
    num: '03',
    title: 'Operativo en 30 días',
    desc: 'Tu negocio funciona solo. Nosotros lo monitorizamos, lo ajustamos y lo hacemos crecer contigo.',
  },
]

export default function HowItWorks() {
  const isMobile = useIsMobile()

  return (
    <div style={{
      background: '#0D0D10',
      padding: isMobile ? '4rem 1.25rem' : '5rem 2rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: isMobile ? '2.5rem' : '3.5rem', textAlign: isMobile ? 'center' : 'left' }}
        >
          <span style={{
            fontFamily: "'Syne Mono',monospace",
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '0.75rem',
          }}>
            — El proceso
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif',serif",
            fontSize: 'clamp(1.8rem,4vw,2.8rem)',
            color: '#fff',
            lineHeight: 1.1,
            margin: 0,
          }}>
            De la primera llamada
            <br />
            <em style={{
              fontStyle: 'italic',
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              a un negocio que se mueve solo.
            </em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: isMobile ? '2rem' : '2px',
          position: 'relative',
        }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              style={{
                padding: isMobile ? '0' : '0 2.5rem',
                borderRight: (!isMobile && i < STEPS.length - 1) ? '1px solid rgba(255,255,255,0.07)' : 'none',
                paddingLeft: (!isMobile && i > 0) ? '2.5rem' : (isMobile ? 0 : 0),
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: "'Syne Mono',monospace",
                fontSize: '0.72rem',
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.1em',
              }}>
                {step.num}
              </span>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Instrument Serif',serif",
                fontSize: 'clamp(1.3rem,2.5vw,1.6rem)',
                color: '#ffffff',
                lineHeight: 1.15,
                margin: 0,
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 300,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.75,
                margin: 0,
              }}>
                {step.desc}
              </p>

              {/* Connector arrow — only on desktop between steps */}
              {!isMobile && i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '2.2rem',
                  left: `calc(${(i + 1) * (100 / 3)}% - 8px)`,
                  transform: 'translateX(-50%)',
                  color: 'rgba(255,255,255,0.15)',
                  fontSize: '0.8rem',
                  pointerEvents: 'none',
                }}>
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
