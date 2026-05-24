import { motion } from 'framer-motion'
import { Player } from '@remotion/player'
import CometCard from './CometCard'
import CtaButton from './CtaButton'
import useIsMobile from '../hooks/useIsMobile'
import HeroChatDemo from '../remotion/HeroChatDemo'
import { EASE_PREMIUM } from '../lib/motion'

const COMP_W = 420
const COMP_H = 380

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: EASE_PREMIUM },
})

export default function Hero({ onChatOpen }) {
  const isMobile = useIsMobile()

  return (
    <section
      id="hero"
      style={{
        background: '#FAF8F3',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '5.5rem 1.25rem 3rem' : '8rem 2rem 4rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'center',
        }}
      >
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
          <motion.h1 {...fadeUp(0.2)} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 8vw, 5rem)', lineHeight: 1.05, color: '#1A1814' }}>
            Inteligencia que trabaja
            <br />
            <em
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              mientras tú no estás.
            </em>
          </motion.h1>

          <motion.div {...fadeUp(0.3)} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#4A4740', lineHeight: 1.7 }}>
              El negocio no para, tú sí deberías.
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '1rem', lineHeight: 1.7, background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Tu negocio deja de depender de ti.
            </span>
          </motion.div>

          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: isMobile ? 'center' : 'flex-start' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <CtaButton onClick={onChatOpen} variant="solid" arrow="right" size="md" magnetic>
                Probar el asistente
              </CtaButton>
              <CtaButton
                onClick={() => document.getElementById('lo-que-hacemos')?.scrollIntoView({ behavior: 'smooth' })}
                variant="ghost"
                arrow="down"
                size="md"
              >
                Ver soluciones
              </CtaButton>
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.78rem',
                color: 'rgba(26,24,20,0.5)',
                fontStyle: 'italic',
                lineHeight: 1.5,
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              Habla con el mismo asistente que pondremos en tu negocio.
            </span>
          </motion.div>

        </div>

        {/* Right column — Animated chat */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.95, delay: 0.5, ease: EASE_PREMIUM }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '100%', maxWidth: 420 }}
          >
            <CometCard style={{ background: 'rgba(26,24,20,0.96)', padding: 0, overflow: 'hidden' }}>
              <div style={{ width: '100%', aspectRatio: `${COMP_W} / ${COMP_H}`, position: 'relative' }}>
                <Player
                  component={HeroChatDemo}
                  durationInFrames={900}
                  fps={30}
                  compositionWidth={COMP_W}
                  compositionHeight={COMP_H}
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  autoPlay
                  loop
                  initiallyMuted
                  controls={false}
                  clickToPlay={false}
                  acknowledgeRemotionLicense
                />
              </div>
            </CometCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
