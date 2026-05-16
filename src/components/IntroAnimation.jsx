import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

// ─── Constants ────────────────────────────────────────────────────────────────

const GRAD = 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)'
const COLORS = ['#4361EE', '#7209B7', '#F72585', '#FB5607']

const BLOBS = [
  { color: '#4361EE', size: 700, left: '10%', top: '15%', duration: 45 },
  { color: '#7209B7', size: 650, left: '70%', top: '60%', duration: 55 },
  { color: '#F72585', size: 750, left: '20%', top: '75%', duration: 50 },
  { color: '#FB5607', size: 600, left: '80%', top: '10%', duration: 40 },
  { color: '#4361EE', size: 680, left: '45%', top: '40%', duration: 60 },
]

const FONT_SIZE = 'clamp(2.8rem, 5vw, 4.5rem)'

// Computed once at module load — stable random particles
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 14,
  color: COLORS[i % 4],
  x: (Math.random() - 0.5) * 1200,
  y: (Math.random() - 0.5) * 600,
  rotate: (Math.random() - 0.5) * 360,
  duration: 0.9 + Math.random() * 0.6,
  delay: Math.random() * 0.2,
}))

// ─── Particle ─────────────────────────────────────────────────────────────────

function Particle({ size, color, x, y, rotate, duration, delay }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
      animate={{ opacity: 0, scale: 0, x, y, rotate }}
      transition={{ duration, delay, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: size,
        height: size,
        marginTop: -size / 2,
        marginLeft: -size / 2,
        borderRadius: '50%',
        background: color,
        pointerEvents: 'none',
        zIndex: 10010,
      }}
    />
  )
}

// ─── ProgressDots ─────────────────────────────────────────────────────────────

function ProgressDots({ current, total, isMobile }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        ...(isMobile
          ? { bottom: 28, left: '50%', transform: 'translateX(-50%)', flexDirection: 'row' }
          : { right: 32, top: '50%', transform: 'translateY(-50%)', flexDirection: 'column' }),
        display: 'flex',
        gap: 12,
        zIndex: 10001,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 8 : 4,
            height: i === current ? 8 : 4,
            opacity: i === current ? 1 : 0.2,
          }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: '50%', background: 'white', flexShrink: 0 }}
        />
      ))}
    </div>
  )
}

// ─── Phrase 1 ─────────────────────────────────────────────────────────────────

const P1_WORDS = 'Un buen negocio no depende de nadie.'.split(' ')

function Phrase1() {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      {P1_WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: FONT_SIZE,
            fontStyle: 'normal',
            lineHeight: 1.15,
            color: 'white',
            display: 'inline-block',
            marginRight: '0.25em',
            userSelect: 'none',
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// ─── Phrase 2 ─────────────────────────────────────────────────────────────────

function Phrase2() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '100%',
        textAlign: 'center',
        fontFamily: "'Instrument Serif', serif",
        fontSize: FONT_SIZE,
        fontStyle: 'italic',
        lineHeight: 1.15,
        color: 'rgba(255,255,255,0.45)',
        userSelect: 'none',
      }}
    >
      Depende de sistemas.
    </motion.div>
  )
}

// ─── Phrase 3 ─────────────────────────────────────────────────────────────────

const P3_WORDS = 'Hay tareas que no te necesitan a ti.'.split(' ')

function Phrase3() {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      {P3_WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: FONT_SIZE,
            fontStyle: 'normal',
            lineHeight: 1.15,
            color: 'white',
            display: 'inline-block',
            marginRight: '0.25em',
            userSelect: 'none',
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// ─── Phrase 4 ─────────────────────────────────────────────────────────────────

function Phrase4() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        width: '100%',
        textAlign: 'center',
        fontFamily: "'Instrument Serif', serif",
        fontSize: FONT_SIZE,
        fontStyle: 'italic',
        lineHeight: 1.15,
        color: 'rgba(255,255,255,0.45)',
        userSelect: 'none',
      }}
    >
      Nosotros nos encargamos.
    </motion.div>
  )
}

// ─── Phrase 5 — BrAIn ─────────────────────────────────────────────────────────

function Phrase5() {
  const [step, setStep] = useState(0)
  const [showParticles, setShowParticles] = useState(false)
  const gradRef = useRef(null)

  useEffect(() => {
    const t2   = setTimeout(() => setStep(2), 500)
    const t3p  = setTimeout(() => setShowParticles(true), 800)
    const t3pe = setTimeout(() => setShowParticles(false), 2400)
    const t4   = setTimeout(() => setStep(3), 1500)
    return () => [t2, t3p, t3pe, t4].forEach(clearTimeout)
  }, [])

  // Animate gradient background-position via rAF
  useEffect(() => {
    if (step < 2 || !gradRef.current) return
    let start = null
    let rafId
    const duration = 800
    const tick = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      if (gradRef.current) {
        gradRef.current.style.backgroundPosition = `${150 * (1 - p)}% 50%`
      }
      if (p < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [step])

  const fontSize = 'clamp(7rem, 16vw, 14rem)'

  return (
    <>
      <AnimatePresence>
        {showParticles && PARTICLES.map((p) => <Particle key={p.id} {...p} />)}
      </AnimatePresence>

      {/* Subtle flash on mount */}
      <motion.div
        animate={{ opacity: [0, 0.04, 0] }}
        transition={{ duration: 0.3, ease: 'easeInOut', times: [0, 0.5, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'white',
          pointerEvents: 'none',
          zIndex: 10009,
        }}
      />

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* BrAIn text layers */}
        <div style={{ position: 'relative', lineHeight: 1 }}>
          {/* Glow — appears at step 2 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '60%',
              height: 2,
              transform: 'translate(-50%, -50%) scaleX(3)',
              filter: 'blur(60px)',
              background: GRAD,
              opacity: step >= 2 ? 0.6 : 0,
              transition: 'opacity 0.8s ease',
              pointerEvents: 'none',
            }}
          />

          {/* Layer A — white, scale-in on mount, fades out on step 2 */}
          <motion.div
            initial={{ scale: 0.92 }}
            animate={{
              scale: 1,
              opacity: step >= 2 ? 0 : 1,
            }}
            transition={{
              scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.5, ease: 'easeOut' },
            }}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize,
              color: 'white',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            BrAIn.
          </motion.div>

          {/* Layer B — gradient, fades in on step 2, pulses on step 3 */}
          <motion.div
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <motion.div
              animate={step >= 3 ? { scale: [1, 1.012, 1] } : { scale: 1 }}
              transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
            >
              <div
                ref={gradRef}
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize,
                  lineHeight: 1,
                  userSelect: 'none',
                  background: GRAD,
                  backgroundSize: '200% 200%',
                  backgroundPosition: '150% 50%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                BrAIn.
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Hint — appears at step 3 */}
        <motion.div
          animate={{ opacity: step >= 3 ? 0.4 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            animate={step >= 3 ? { opacity: [0.3, 0.65, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'block',
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.65rem',
              color: 'white',
              letterSpacing: '0.15em',
              userSelect: 'none',
            }}
          >
            continuar →
          </motion.span>
        </motion.div>
      </div>
    </>
  )
}

// ─── IntroAnimation ───────────────────────────────────────────────────────────

export default function IntroAnimation({ onComplete }) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [done, setDone] = useState(false)
  const isMobile = useIsMobile()

  const containerRef    = useRef(null)
  const currentRef      = useRef(0)
  const lastInputRef    = useRef(0)
  const doneRef         = useRef(false)
  const onCompleteRef   = useRef(onComplete)
  const touchStartRef   = useRef(0)
  onCompleteRef.current = onComplete

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const completeRef = useRef(null)
  completeRef.current = () => {
    if (doneRef.current) return
    doneRef.current = true
    setDone(true)
    document.body.style.overflow = ''
    setTimeout(() => onCompleteRef.current?.(), 600)
  }

  const advanceRef = useRef(null)
  advanceRef.current = () => {
    const now = Date.now()
    if (now - lastInputRef.current < 900) return
    lastInputRef.current = now
    if (currentRef.current >= 4) {
      completeRef.current()
    } else {
      const next = currentRef.current + 1
      currentRef.current = next
      setCurrentPhrase(next)
    }
  }

  const retreatRef = useRef(null)
  retreatRef.current = () => {
    const now = Date.now()
    if (now - lastInputRef.current < 900) return
    lastInputRef.current = now
    if (currentRef.current <= 0) return
    const prev = currentRef.current - 1
    currentRef.current = prev
    setCurrentPhrase(prev)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e) => {
      e.preventDefault()
      if (e.deltaY > 0) advanceRef.current()
      else retreatRef.current()
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        advanceRef.current()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        retreatRef.current()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleTouchStart = (e) => { touchStartRef.current = e.touches[0].clientY }
  const handleTouchEnd   = (e) => {
    const delta = touchStartRef.current - e.changedTouches[0].clientY
    if (delta > 50)  advanceRef.current()
    if (delta < -50) retreatRef.current()
  }

  const showHint = currentPhrase === 0

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          ref={containerRef}
          aria-label="Introducción animada de BrAIn"
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#050508',
            overflow: 'hidden',
          }}
        >
          {/* ── Aurora blobs — CSS animation ── */}
          <div
            aria-hidden
            role="presentation"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            {BLOBS.map((blob, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: blob.left,
                  top: blob.top,
                  width: blob.size,
                  height: blob.size,
                  borderRadius: '50%',
                  background: blob.color,
                  filter: 'blur(120px)',
                  opacity: currentPhrase === 4 ? 0.18 : 0.07,
                  transition: 'opacity 0.8s ease',
                  animation: `floatBlob ${blob.duration}s ease-in-out infinite`,
                  animationDelay: `${i * -9}s`,
                }}
              />
            ))}
          </div>

          {/* ── Active phrase ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhrase}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                opacity: 0,
                y: -40,
                transition: { duration: 0.4, ease: 'easeIn' },
              }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? '0 2rem' : '0 8rem',
              }}
            >
              {currentPhrase === 0 && <Phrase1 />}
              {currentPhrase === 1 && <Phrase2 />}
              {currentPhrase === 2 && <Phrase3 />}
              {currentPhrase === 3 && <Phrase4 />}
              {currentPhrase === 4 && <Phrase5 />}
            </motion.div>
          </AnimatePresence>

          {/* ── Scroll hint (phrase 0 only) ── */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                style={{
                  position: 'fixed',
                  bottom: 40,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 10001,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      fontFamily: "'Syne Mono', monospace",
                      fontSize: '0.6rem',
                      color: 'rgba(255,255,255,0.4)',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    SCROLL PARA AVANZAR
                  </span>
                  <button
                    onClick={() => completeRef.current()}
                    style={{
                      fontFamily: "'Syne Mono', monospace",
                      fontSize: '0.55rem',
                      color: 'rgba(255,255,255,0.35)',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '3px 8px',
                      cursor: 'pointer',
                      borderRadius: 2,
                    }}
                  >
                    SALTAR
                  </button>
                </div>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ pointerEvents: 'none' }}
                >
                  <svg width="16" height="24" viewBox="0 0 16 24">
                    <line x1="8" y1="0" x2="8" y2="20" stroke="white" strokeWidth="1" opacity="0.4" />
                    <polyline points="3,15 8,21 13,15" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Progress indicator ── */}
          <ProgressDots current={currentPhrase} total={5} isMobile={isMobile} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
