import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import Counter from './Counter'
import { STAGGER, STAGGER_CHILD } from '../lib/motion'
import { ACCENT } from '../lib/tokens'

const ITEMS = [
  { stat: '3',        label: 'empresas en producción' },
  { stat: '<30 días', label: 'de la idea a producción' },
  { stat: '24/7',     label: 'operación continua'      },
  { stat: '100%',     label: 'soluciones a medida'     },
]

export default function TrustBar() {
  const isMobile = useIsMobile()

  return (
    <div
      style={{
        background: '#0A0A0B',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: isMobile ? '2.75rem 1.25rem' : '2.5rem 2rem',
      }}
    >
      <motion.div
        {...STAGGER(0.08, 0.05)}
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'stretch',
          gap: isMobile ? '0' : '0',
        }}
      >
        {/* Leading label */}
        <motion.div
          variants={STAGGER_CHILD}
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            paddingRight: isMobile ? 0 : '2.5rem',
            marginBottom: isMobile ? '2rem' : 0,
            borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
              BrAIn en cifras
            </span>
          </div>
        </motion.div>

        {/* Metrics */}
        <div
          style={{
            display: isMobile ? 'grid' : 'flex',
            gridTemplateColumns: isMobile ? '1fr 1fr' : undefined,
            flex: 1,
            gap: isMobile ? '1.75rem 1rem' : 0,
          }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              variants={STAGGER_CHILD}
              style={{
                flex: isMobile ? undefined : 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '0.3rem',
                padding: isMobile ? 0 : '0 2rem',
                borderLeft: (!isMobile && i > 0) ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: isMobile ? 'clamp(2.4rem, 8vw, 2.9rem)' : 'clamp(2.6rem, 3.2vw, 3.4rem)',
                  color: '#fff',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                <Counter value={item.stat} />
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: isMobile ? '0.9rem' : '0.88rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.35,
                  maxWidth: '14ch',
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
