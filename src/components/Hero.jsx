import { useState } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@remotion/player'
import CometCard from './CometCard'
import useIsMobile from '../hooks/useIsMobile'
import HeroChatDemo from '../remotion/HeroChatDemo'

const COMP_W = 420
const COMP_H = 380

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})


export default function Hero({ onChatOpen }) {
  const isMobile = useIsMobile()
  const [empecemosHovered, setEmpecemosHovered] = useState(false)
  return (
    <section
      id="hero"
      style={{
        background: '#FAF8F3',
        minHeight: '100vh',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div {...fadeUp(0.1)}>
            <span
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.72rem',
                background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ width: 32, height: 1, background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)', display: 'inline-block', flexShrink: 0 }} />
              Agencia de IA · Murcia, España
            </span>
          </motion.div>

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
              Menos llamadas que nadie contesta.
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#4A4740', lineHeight: 1.7 }}>
              Menos tareas que ralentizan a tu equipo.
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '1rem', lineHeight: 1.7, background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Más negocio con los mismos recursos.
            </span>
          </motion.div>

          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2A2824' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#1A1814' }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.9rem',
                padding: isMobile ? '11px 22px' : '12px 28px',
                borderRadius: 999,
                border: 'none',
                background: '#1A1814',
                color: '#FAF8F3',
                cursor: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'background 0.25s ease',
              }}
            >
              Ver soluciones ↓
            </button>
            <button
              onMouseEnter={() => setEmpecemosHovered(true)}
              onMouseLeave={() => setEmpecemosHovered(false)}
              onClick={onChatOpen}
              style={{
                position: 'relative',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.9rem',
                padding: isMobile ? '11px 22px' : '12px 28px',
                borderRadius: 999,
                cursor: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                border: '1.5px solid',
                borderColor: empecemosHovered ? 'transparent' : '#1A1814',
                background: 'transparent',
                color: empecemosHovered ? '#ffffff' : '#1A1814',
                transition: 'color 0.3s ease, border-color 0.3s ease',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 999,
                  background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
                  opacity: empecemosHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 0,
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>Empecemos →</span>
            </button>
          </motion.div>
        </div>

        {/* Right column — Animated chat */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
