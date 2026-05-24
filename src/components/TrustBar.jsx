import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { STAGGER, STAGGER_CHILD } from '../lib/motion'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

const ITEMS = [
  { stat: '3',         label: 'negocios automatizados' },
  { stat: '<30 días',  label: 'de cero a operativo' },
  { stat: '24/7',      label: 'sin intervención humana' },
  { stat: '0€',        label: 'la primera reunión' },
]

export default function TrustBar() {
  const isMobile = useIsMobile()

  return (
    <div style={{
      background: '#07070A',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: isMobile ? '1.5rem 1.25rem' : '1.25rem 2rem',
      overflow: 'hidden',
    }}>
      <motion.div
        {...STAGGER(0.08, 0.05)}
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
          gap: isMobile ? '1.25rem 1rem' : '0',
        }}
      >
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            variants={STAGGER_CHILD}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              padding: isMobile ? '0' : '0 1.5rem',
              borderRight: (!isMobile && i < ITEMS.length - 1) ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
          >
            <span style={{
              fontFamily: "'Instrument Serif',serif",
              fontSize: isMobile ? '1.5rem' : '1.6rem',
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}>
              {item.stat}
            </span>
            <span style={{
              fontFamily: "'Syne Mono',monospace",
              fontSize: '0.62rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.08em',
              textAlign: 'center',
            }}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
