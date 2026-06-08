import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Player } from '@remotion/player'
import CometCard from './CometCard'
import CtaButton from './CtaButton'
import Eyebrow from './Eyebrow'
import RotatingWord from './RotatingWord'
import useIsMobile from '../hooks/useIsMobile'
import HeroChatDemo from '../remotion/HeroChatDemo'
import { EASE_PREMIUM } from '../lib/motion'
import { gradientText } from '../lib/tokens'
import { display, bodyLg } from '../lib/typography'

const COMP_W = 420
const COMP_H = 380

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: EASE_PREMIUM },
})

const TRUST = ['Baktun 13', 'Clesol', 'Venta Alegría', 'Foodmatica', 'Playgame Italia']

export default function Hero({ onChatOpen, introComplete = true }) {
  const isMobile = useIsMobile()
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)

  // Subtle parallax on the chat demo as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const demoY = useTransform(scrollYProgress, [0, 1], [0, reduce || isMobile ? 0 : 80])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FAF8F3',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '6.5rem 1.25rem 3rem' : '9rem 2rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Very subtle warm aura — adds depth without colour noise */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: 720,
          height: 720,
          background: 'radial-gradient(circle at center, rgba(67,97,238,0.06), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
          gap: isMobile ? '2.5rem' : '4rem',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
          <motion.div {...fadeUp(0.1)}>
            <Eyebrow variant="pill" tone="dark">Agencia de IA · Murcia</Eyebrow>
          </motion.div>

          {/* H1 — resultado, con sector rotatorio en gradiente */}
          <motion.h1 {...fadeUp(0.2)} style={{ ...display, color: '#1A1814' }}>
            La IA que hace funcionar tu{' '}
            <RotatingWord
              words={['negocio', 'restaurante', 'clínica', 'despacho', 'tienda', 'gimnasio', 'hotel']}
              start={introComplete}
              startDelay={1000}
              style={{ fontStyle: 'italic', ...gradientText, verticalAlign: 'baseline' }}
            />
          </motion.h1>

          <motion.p {...fadeUp(0.3)} style={{ ...bodyLg, color: '#4A4740' }}>
            Diseñada con criterio de empresario. Operativa en semanas.
          </motion.p>

          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <CtaButton onClick={onChatOpen} variant="solid" arrow="right" size="lg" magnetic>
              Habla con nuestra IA
            </CtaButton>
            <CtaButton
              onClick={() => document.getElementById('soluciones')?.scrollIntoView({ behavior: 'smooth' })}
              variant="ghost"
              arrow="down"
              size="lg"
            >
              Ver soluciones
            </CtaButton>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            {...fadeUp(0.55)}
            style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start', marginTop: '0.5rem' }}
          >
            <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(26,24,20,0.45)' }}>
              Ya operan con nosotros
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap', rowGap: '0.5rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              {TRUST.map((name, i) => (
                <span key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  {i > 0 && <span style={{ width: 3, height: 3, borderRadius: 999, background: 'rgba(26,24,20,0.2)' }} />}
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(26,24,20,0.62)' }}>{name}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column — Animated chat with parallax + float */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.95, delay: 0.5, ease: EASE_PREMIUM }}
          style={{ display: 'flex', justifyContent: 'center', y: demoY }}
        >
          <motion.div
            animate={reduce || isMobile ? undefined : { y: [0, -10, 0] }}
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
