import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import Counter from './Counter'
import { STAGGER, STAGGER_CHILD } from '../lib/motion'
import { ACCENT } from '../lib/tokens'

const ITEMS = [
  { stat: '7',        label: 'empresas en producción'        },
  { stat: '<30 días', label: 'de la idea a producción'       },
  { stat: '24/7',     label: 'operación, sin descanso'       },
  { stat: '+40h',     label: 'liberadas al mes, de media'    },
]

export default function TrustBar() {
  const isMobile = useIsMobile()

  return (
    <div
      style={{
        background: '#0A0A0B',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: isMobile ? '3.25rem 1.25rem' : '3.5rem 2rem',
      }}
    >
      <motion.div
        {...STAGGER(0.08, 0.05)}
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Centered header — flanked by hairlines so it reads as a section label */}
        <motion.div
          variants={STAGGER_CHILD}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '0.9rem' : '1.1rem',
            marginBottom: isMobile ? '2.5rem' : '2.75rem',
          }}
        >
          <span
            style={{
              height: 1,
              width: isMobile ? 28 : 56,
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))',
            }}
          />
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              fontFamily: "'Syne Mono', monospace",
              fontSize: isMobile ? '0.8rem' : '0.85rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.62)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 999, background: ACCENT, flexShrink: 0, boxShadow: `0 0 10px ${ACCENT}` }} />
            BrAIn en cifras
          </span>
          <span
            style={{
              height: 1,
              width: isMobile ? 28 : 56,
              background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.2))',
            }}
          />
        </motion.div>

        {/* Metrics — every cell centered, dividers between */}
        <div
          style={{
            width: '100%',
            display: isMobile ? 'grid' : 'flex',
            gridTemplateColumns: isMobile ? '1fr 1fr' : undefined,
            justifyContent: 'center',
            gap: isMobile ? '2.5rem 1rem' : 0,
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
                alignItems: 'center',
                textAlign: 'center',
                gap: '0.45rem',
                padding: isMobile ? 0 : '0 1.5rem',
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
                  maxWidth: '16ch',
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
