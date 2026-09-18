import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CtaButton from './CtaButton'
import Eyebrow from './Eyebrow'
import useIsMobile from '../hooks/useIsMobile'
import { REVEAL } from '../lib/motion'
import { gradientText } from '../lib/tokens'
import { display, body, label } from '../lib/typography'
import { openBooking } from '../lib/booking'
import { WHATSAPP_URL, PHONE } from '../lib/site'
import { CTA_LABEL } from '../lib/cta'

// Cierre: el único degradado de sección y una sola alternativa (WhatsApp).
export default function CtaFinal() {
  const isMobile = useIsMobile()

  return (
    <AuroraBackground intense id="cta" style={{ padding: isMobile ? '4rem 1.25rem 3.5rem' : '8rem 2rem' }}>
      <motion.div {...REVEAL} style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '1.1rem' : '1.5rem' }}>
        <Eyebrow variant="pill" tone="light">Primera llamada sin coste</Eyebrow>
        <h2 style={{ ...display, fontSize: isMobile ? '2.5rem' : display.fontSize, color: '#fff' }}>
          Treinta minutos.<br />
          <em data-gradient-text style={{ fontStyle: 'italic', ...gradientText }}>Y un plan concreto.</em>
        </h2>
        <p style={{ ...body, color: 'rgba(255,255,255,0.7)', maxWidth: '46ch' }}>
          Nos cuentas tu negocio. Te decimos qué haría la IA y, si encaja, te llega un plan con precio cerrado.
        </p>
        <div id="cta-final-button" style={{ marginTop: '0.5rem', width: isMobile ? '100%' : 'auto' }}>
          <CtaButton onClick={() => openBooking('cta_final')} variant="light" arrow="right" size="lg" magnetic={!isMobile} style={isMobile ? { width: '100%', justifyContent: 'space-between', background: '#FAF8F3', color: '#1A1814', border: 'none' } : undefined}>
            {CTA_LABEL}
          </CtaButton>
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ ...label, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '8px 0' }}>
          {PHONE} · WhatsApp
        </a>
      </motion.div>
    </AuroraBackground>
  )
}
