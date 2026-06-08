import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CtaButton from './CtaButton'
import Eyebrow from './Eyebrow'
import GradientMesh from './GradientMesh'
import useIsMobile from '../hooks/useIsMobile'
import { EASE_PREMIUM } from '../lib/motion'

const REVEAL = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, delay, ease: EASE_PREMIUM },
})

export default function CtaFinal({ onChatOpen }) {
  const isMobile = useIsMobile()

  const handleReserva = () => {
    onChatOpen()
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('chat:send', {
          detail: { message: 'Hola. Quiero agendar un diagnóstico gratuito.' },
        })
      )
    }, 400)
  }

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
          Analizamos tu operación, te decimos qué tiene sentido automatizar,
          cómo lo haríamos y cuánto costaría. Con claridad y sin compromiso.
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
            Reservar mi diagnóstico
          </CtaButton>
        </motion.div>

        <motion.p
          {...REVEAL(0.32)}
          style={{ fontFamily: "'DM Sans',sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.92rem', color: 'rgba(255,255,255,0.55)', margin: '-0.75rem 0 0', lineHeight: 1.5, maxWidth: 460 }}
        >
          Te respondemos en el mismo chat, al momento.
        </motion.p>

        <motion.div
          {...REVEAL(0.4)}
          style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
        >
          {['Sin permanencia', 'Operativo en semanas', 'Sin compromiso'].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'Syne Mono',monospace",
                fontSize: '0.74rem',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.25)', display: 'inline-block', flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </AuroraBackground>
  )
}
