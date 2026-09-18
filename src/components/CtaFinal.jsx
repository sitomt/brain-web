import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CtaButton from './CtaButton'
import Eyebrow from './Eyebrow'
import GradientMesh from './GradientMesh'
import useIsMobile from '../hooks/useIsMobile'
import { EASE_PREMIUM } from '../lib/motion'
import { openBooking, openParticulares } from '../lib/booking'
import { WHATSAPP_URL, PHONE, EMAIL } from '../lib/site'
import { CTA_LABEL } from '../lib/cta'

const REVEAL = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, delay, ease: EASE_PREMIUM },
})

export default function CtaFinal() {
  const isMobile = useIsMobile()

  const handleReserva = () => openBooking('cta_final')

  return (
    <AuroraBackground intense fadeSides style={{ padding: isMobile ? '5rem 1.5rem' : '8rem 2rem', position: 'relative' }}>
      <GradientMesh />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
        <motion.div {...REVEAL(0)}>
          <Eyebrow variant="pill" tone="light">Primera reunión sin coste</Eyebrow>
        </motion.div>

        <motion.h2
          {...REVEAL(0.05)}
          style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(2.6rem,6vw,4.8rem)', color: '#fff', lineHeight: 1.05, margin: 0 }}
        >
          Treinta minutos.<br />
          <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Y un plan concreto.
          </em>
        </motion.h2>

        <motion.p
          {...REVEAL(0.15)}
          style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520 }}
        >
          Nos cuentas tu negocio, te decimos qué haría la IA en él y cómo lo haríamos.
          Si encaja, te llega un plan con precio cerrado. Si no encaja, te lo decimos igual.
        </motion.p>

        <motion.div
          {...REVEAL(0.25)}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: isMobile ? '1.5rem' : '2.5rem' }}
        >
          <CtaButton
            onClick={handleReserva}
            variant="light"
            arrow="right"
            size="lg"
            magnetic
          >
            {CTA_LABEL}
          </CtaButton>
        </motion.div>

        <motion.p
          {...REVEAL(0.32)}
          style={{ fontFamily: "'DM Sans',sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.92rem', color: 'rgba(255,255,255,0.6)', margin: '-0.75rem 0 0', lineHeight: 1.7, maxWidth: 520 }}
        >
          Eliges día y hora y te llega la invitación al email. La llamada la hace Ginés.
          <br />
          ¿Prefieres hablar?{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.85)', textUnderlineOffset: 3 }}>{PHONE} · WhatsApp o llamada</a>
          {' · '}<a href={`mailto:${EMAIL}`} style={{ color: 'rgba(255,255,255,0.85)', textUnderlineOffset: 3 }}>{EMAIL}</a>
          <br />
          ¿Eres particular?{' '}
          <button type="button" onClick={openParticulares} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255,255,255,0.85)', font: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>Cuéntanos tu idea</button>
        </motion.p>
      </div>
    </AuroraBackground>
  )
}
