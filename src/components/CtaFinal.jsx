import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CtaButton from './CtaButton'
import Eyebrow from './Eyebrow'
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
    <AuroraBackground intense style={{ padding: isMobile ? '5rem 1.5rem' : '8rem 2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
        <motion.div {...REVEAL(0)}>
          <Eyebrow variant="pill" tone="light">Primera reunión, gratis</Eyebrow>
        </motion.div>

        <motion.h2
          {...REVEAL(0.05)}
          style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(2.6rem,6vw,4.8rem)', color: '#fff', lineHeight: 1.05, margin: 0 }}
        >
          Treinta minutos.<br />
          <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Y el resto cambia.
          </em>
        </motion.h2>

        <motion.p
          {...REVEAL(0.15)}
          style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520 }}
        >
          Te decimos qué automatizamos en tu negocio, cómo lo hacemos
          y cuánto cuesta. Sin rodeos. Sin compromiso.
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
            Probar el asistente
          </CtaButton>
        </motion.div>

        <motion.p
          {...REVEAL(0.32)}
          style={{ fontFamily: "'DM Sans',sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', margin: '-0.75rem 0 0', lineHeight: 1.5, maxWidth: 460 }}
        >
          El mismo asistente que pondremos en tu negocio.
        </motion.p>

        <motion.div
          {...REVEAL(0.4)}
          style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
        >
          {['Sin permanencia', 'Resultados en 30 días', 'Sin coste inicial'].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'Syne Mono',monospace",
                fontSize: '0.62rem',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.06em',
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
