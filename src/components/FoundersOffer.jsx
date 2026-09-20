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
    <AuroraBackground variant="dark" id="fundadores" style={{ padding: isMobile ? '5.5rem 1.5rem 5.5rem' : '8rem 2rem', scrollMarginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div {...REVEAL} style={{ maxWidth: 720, textAlign: isMobile ? 'center' : 'left', display: isMobile ? 'flex' : 'block', flexDirection: 'column', alignItems: 'center', margin: isMobile ? '0 auto' : 0 }}>
          <div style={{ marginBottom: '1.25rem' }}><Eyebrow variant="pill" tone="light">Programa Fundadores</Eyebrow></div>
          <h2 style={{ ...h2, fontSize: isMobile ? '2.1rem' : h2.fontSize, color: '#fff', maxWidth: isMobile ? '14ch' : '20ch' }}>
            {cap(total)} empresas. Las primeras. <em style={{ fontStyle: 'italic' }}>Quedan {left}.</em>
          </h2>
          <p style={{ ...body, color: 'rgba(255,255,255,0.7)', marginTop: '1.25rem', maxWidth: isMobile ? '32ch' : body.maxWidth }}>
            Con {total} podemos sentarnos contigo y construirlo a tu medida. Con cien, no.
          </p>
        </motion.div>

        <motion.ul {...REVEAL} style={{ listStyle: 'none', padding: 0, margin: isMobile ? '2.5rem 0 0' : '2.5rem 0 0', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '0.75rem' : '2rem', maxWidth: 1000 }}>
          {ITEMS.map((t, i) => (
            <li key={t} style={isMobile ? { display: 'flex', gap: 14, alignItems: 'flex-start', padding: '1.15rem 1.25rem', borderRadius: 18, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' } : { borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: '1rem' }}>
              <span style={{ ...label, color: isMobile ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.4)', display: 'block', marginBottom: isMobile ? 0 : '0.5rem', paddingTop: isMobile ? 6 : 0, flexShrink: 0 }}>0{i + 1}</span>
              <span style={{ ...body, fontSize: isMobile ? '1rem' : body.fontSize, lineHeight: isMobile ? 1.5 : body.lineHeight, color: 'rgba(255,255,255,0.85)' }}>{t}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div {...REVEAL} style={{ margin: isMobile ? '2.5rem 0 0' : '3rem 0 0', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: isMobile ? '0.75rem' : '1.25rem', flexWrap: 'wrap' }}>
          <CtaButton onClick={() => openBooking('fundadores')} variant="light" arrow="right" size="lg" style={isMobile ? { width: '100%', maxWidth: 360, justifyContent: 'space-between' } : undefined}>
            {CTA_LABEL}
          </CtaButton>
        </motion.div>
      </div>
    </AuroraBackground>
  )
}
