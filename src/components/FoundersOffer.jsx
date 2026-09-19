import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import Eyebrow from './Eyebrow'
import CtaButton from './CtaButton'
import AuroraBackground from './AuroraBackground'
import { REVEAL } from '../lib/motion'
import { h2, body, label } from '../lib/typography'
import { FOUNDERS } from '../lib/founders'
import { openBooking } from '../lib/booking'
import { CTA_LABEL } from '../lib/cta'

// Programa Fundadores: pertenencia, acceso y co-creación. Sin barra, sin contador,
// sin fecha, sin cifras. El "quedan ocho" es una frase del titular, no un marcador.
const NUM = ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince']
const cap = (w) => String(w).charAt(0).toUpperCase() + String(w).slice(1)
const ITEMS = [
  'Tu nombre, si quieres, en la lista de empresas fundadoras.',
  'Hablas con quien lo construye. Hoy y cuando algo cambie.',
  'Lo que pidas tú, lo tendrán los demás después. Y a precio fundador.',
]

export default function FoundersOffer() {
  const isMobile = useIsMobile()
  if (!FOUNDERS.active) return null
  const left = NUM[FOUNDERS.spotsLeft] || FOUNDERS.spotsLeft
  const total = NUM[FOUNDERS.spotsTotal] || FOUNDERS.spotsTotal

  return (
    <AuroraBackground variant="dark" id="fundadores" style={{ padding: isMobile ? '3.5rem 1.25rem 3rem' : '8rem 2rem', scrollMarginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div {...REVEAL} style={{ maxWidth: 720 }}>
          <div style={{ marginBottom: '1.25rem' }}><Eyebrow variant="pill" tone="light">Programa Fundadores</Eyebrow></div>
          <h2 style={{ ...h2, color: '#fff', maxWidth: '20ch' }}>
            {cap(total)} empresas. Las primeras. <em style={{ fontStyle: 'italic' }}>Quedan {left}.</em>
          </h2>
          <p style={{ ...body, color: 'rgba(255,255,255,0.7)', marginTop: '1.25rem' }}>
            Con {total} podemos sentarnos contigo y construirlo a tu medida. Con cien, no.
          </p>
        </motion.div>

        <motion.ul {...REVEAL} style={{ listStyle: 'none', padding: 0, margin: isMobile ? '1.5rem 0 0' : '2.5rem 0 0', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '0.75rem' : '2rem', maxWidth: 1000 }}>
          {ITEMS.map((t, i) => (
            <li key={t} style={{ borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: isMobile ? '0.75rem' : '1rem', display: isMobile ? 'flex' : 'block', gap: 12 }}>
              <span style={{ ...label, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: isMobile ? 0 : '0.5rem', paddingTop: isMobile ? 5 : 0, flexShrink: 0 }}>0{i + 1}</span>
              <span style={{ ...body, color: 'rgba(255,255,255,0.85)' }}>{t}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div {...REVEAL} style={{ margin: isMobile ? '1.75rem 0 0' : '3rem 0 0', display: 'flex', alignItems: 'center', gap: isMobile ? '0.75rem' : '1.25rem', flexWrap: 'wrap' }}>
          <CtaButton onClick={() => openBooking('fundadores')} variant="light" arrow="right" size="lg">
            {CTA_LABEL}
          </CtaButton>
          <span style={{ ...label, color: 'rgba(255,255,255,0.5)', textTransform: 'none', letterSpacing: '0.04em' }}>
            La plaza no se decide en la llamada. Se decide después, con el plan delante.
          </span>
        </motion.div>
      </div>
    </AuroraBackground>
  )
}
