import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

// ─── BrainSplash ──────────────────────────────────────────────────────────────
//
// Timing:
//   0ms    → Layer A (white) fades in
//   350ms  → gradient ignites, Layer A fades out
//   560ms  → particles explode
//   910ms  → glow appears
//   1050ms → one pulse
//   1610ms → particles done
//   1900ms → fade out begins (longer, smoother)
//   2500ms → onDone()

function BrainSplash({ onDone }) {
  const [step, setStep] = useState(0)
  const [showParticles, setShowParticles] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const gradRef = useRef(null)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(2), 350),
      setTimeout(() => setShowParticles(true), 560),
      setTimeout(() => setStep(3), 910),
      setTimeout(() => setStep(4), 1050),
      setTimeout(() => setShowParticles(false), 1610),
      setTimeout(() => setFadeOut(true), 1900),
      setTimeout(onDone, 2500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (step < 2 || !gradRef.current) return
    let start = null
    let rafId
    const tick = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 560, 1)
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
    <motion.div
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence>
        {showParticles && PARTICLES.map((p) => <Particle key={p.id} {...p} />)}
      </AnimatePresence>

      <div style={{ position: 'relative', lineHeight: 1 }}>
        {/* Glow behind text — appears at step 3 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80%',
            height: 4,
            transform: 'translate(-50%, -50%) scaleX(2.5)',
            filter: 'blur(80px)',
            background: GRAD,
            opacity: step >= 3 ? 0.5 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        {/* Layer A — white, scale-in on mount, fades out at step 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: step >= 2 ? 0 : 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.35, ease: 'easeOut' },
            scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
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

        {/* Layer B — gradient, appears at step 2, pulses once at step 4 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: step >= 2 ? 1 : 0,
            scale: step >= 4 ? [1, 1.02, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.56, ease: 'easeInOut' },
            scale: { duration: 0.56, ease: 'easeInOut' },
          }}
          style={{ position: 'absolute', inset: 0 }}
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
      </div>
    </motion.div>
  )
}

// ─── IntroAnimation ───────────────────────────────────────────────────────────

export default function IntroAnimation({ onComplete }) {
  const [done, setDone] = useState(false)

  const handleDone = () => {
    setDone(true)
    setTimeout(() => onComplete?.(), 600)
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#050508',
            overflow: 'hidden',
          }}
        >
          {/* Aurora blobs */}
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
                  opacity: 0.07,
                  animation: `floatBlob ${blob.duration}s ease-in-out infinite`,
                  animationDelay: `${i * -9}s`,
                }}
              />
            ))}
          </div>

          <BrainSplash onDone={handleDone} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
