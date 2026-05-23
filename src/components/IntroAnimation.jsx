import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Brand constants ──────────────────────────────────────────────────────────

const GRAD = 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)'
const COLORS = ['#4361EE', '#7209B7', '#F72585', '#FB5607', '#22D3EE']
const GLITCH_POOL = '01<>[]{}/\\=+-*#@$%&?!ΛΣΨΦΩ▲▼◆◇'

const CHARS = [
  { char: 'b', kind: 'white' },
  { char: 'r', kind: 'white' },
  { char: '[', kind: 'grad' },
  { char: 'A', kind: 'grad' },
  { char: 'I', kind: 'grad' },
  { char: ']', kind: 'grad' },
  { char: 'n', kind: 'white' },
  { char: '.', kind: 'white' },
]

const BLOBS = [
  { color: '#4361EE', size: 700, left: '10%', top: '15%', duration: 45 },
  { color: '#7209B7', size: 650, left: '70%', top: '60%', duration: 55 },
  { color: '#F72585', size: 750, left: '20%', top: '75%', duration: 50 },
  { color: '#FB5607', size: 600, left: '80%', top: '10%', duration: 40 },
  { color: '#4361EE', size: 680, left: '45%', top: '40%', duration: 60 },
]

// ─── Timing (ms) ──────────────────────────────────────────────────────────────

const T = {
  // ignition: when each char position lights up (particles arrive here)
  ignitionStart: 800,
  ignitionStagger: 110,
  // settle: when each position locks to its real letter (sequential, ~300ms after ignition)
  settleStart: 1100,
  settleStagger: 110,
  // particle travel — slower, more graceful
  particleTravel: 1100,
  particleArrivalSpread: 280,
  // glitch cycle rate (ms per symbol swap) — slower, more deliberate
  glitchSwapMs: 95,
  shimmer: [1800, 2600],
  pulse: [2400, 2750],
  total: 2900,
  outroFade: 700,
}

const PARTICLES_PER_CHAR = 4

// ─── Math helpers ─────────────────────────────────────────────────────────────

const clamp01 = (t) => Math.max(0, Math.min(1, t))
const lerp = (a, b, t) => a + (b - a) * t
const norm = (x, a, b) => clamp01((x - a) / (b - a))

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const hash = (n) => {
  const v = Math.abs(Math.sin(n * 12.9898) * 43758.5453)
  return v - Math.floor(v)
}
const pickGlitch = (seed) =>
  GLITCH_POOL[Math.floor(hash(seed) * GLITCH_POOL.length)]

// ─── Particle field ───────────────────────────────────────────────────────────

function ParticleField({ elapsed, particles }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        pointerEvents: 'none',
      }}
    >
      {particles.map((p) => {
        const local = elapsed - p.delay
        if (local < 0) return null
        const t = clamp01(local / T.particleTravel)
        // Gentler easing: ease-in-out cubic for graceful drift
        const eased = easeInOutCubic(t)
        const x = lerp(p.startX, p.targetX, eased)
        const y = lerp(p.startY, p.targetY, eased)
        // Long fade in, gentle dissolve in the last 25%
        const opacityIn = clamp01(local / 220)
        const opacityOut = 1 - clamp01((t - 0.75) / 0.25)
        const opacity = Math.max(0, opacityIn * opacityOut * 0.85)
        const scale = lerp(0.6, 1, eased) * (1 - clamp01((t - 0.8) / 0.2) * 0.5)
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 2.4}px ${p.color}`,
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              opacity,
              willChange: 'transform, opacity',
            }}
          />
        )
      })}
    </div>
  )
}

// ─── Glyph ────────────────────────────────────────────────────────────────────

function Glyph({ index, char, kind, elapsed, shimmerPos, refCb }) {
  const ignitionTime = T.ignitionStart + index * T.ignitionStagger
  const settleTime = T.settleStart + index * T.settleStagger
  const ignited = elapsed >= ignitionTime
  const settled = elapsed >= settleTime

  // Soft fade in at ignition (no scale punch — keeps the letter still)
  const local = elapsed - ignitionTime
  const opacity = ignited ? clamp01(local / 280) : 0

  let display
  if (!ignited) display = char // invisible placeholder so layout is stable
  else if (settled) display = char
  else display = pickGlitch(Math.floor(elapsed / T.glitchSwapMs) + index * 7)

  const baseStyle = {
    display: 'inline-block',
    opacity,
    willChange: 'opacity',
    position: 'relative',
  }

  // For grad-kind chars, paint the gradient per-character but anchor it to
  // the viewport via background-attachment: fixed. This way all chars show
  // continuous slices of the same gradient — no seams between [, A, I, ].
  if (kind === 'grad') {
    return (
      <span
        ref={refCb}
        style={{
          ...baseStyle,
          background: GRAD,
          backgroundSize: '100vw 100vh',
          backgroundAttachment: 'fixed',
          backgroundPosition: `${shimmerPos}% 50%`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {display}
      </span>
    )
  }

  return (
    <span ref={refCb} style={{ ...baseStyle, color: 'white' }}>
      {display}
    </span>
  )
}

// ─── BrainSplash ──────────────────────────────────────────────────────────────

function BrainSplash({ onReady }) {
  const [elapsed, setElapsed] = useState(0)
  const [positions, setPositions] = useState(null)
  const [ready, setReady] = useState(false)
  const charRefs = useRef([])
  const wrapperRef = useRef(null)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  const measure = () => {
    if (!wrapperRef.current) return
    const wr = wrapperRef.current.getBoundingClientRect()
    const cx = wr.left + wr.width / 2
    const cy = wr.top + wr.height / 2
    const pos = charRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 }
      const r = el.getBoundingClientRect()
      return { x: r.left + r.width / 2 - cx, y: r.top + r.height / 2 - cy }
    })
    setPositions(pos)
  }

  // First measurement before paint (font may still be fallback)
  useLayoutEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Wait for the real font to load, then re-measure with correct metrics,
  // then mark ready (which starts the RAF and the parent timer).
  useEffect(() => {
    let cancelled = false
    const fontsReady = (document.fonts && document.fonts.ready) || Promise.resolve()
    Promise.race([
      fontsReady,
      new Promise((r) => setTimeout(r, 1200)), // hard cap so we never hang
    ]).then(() => {
      if (cancelled) return
      // One frame of breathing room so the browser settles layout post-font swap
      requestAnimationFrame(() => {
        if (cancelled) return
        measure()
        setReady(true)
        onReady?.()
      })
    })
    return () => {
      cancelled = true
    }
  }, [onReady])

  // RAF loop — only starts once the font is loaded and positions are final
  useEffect(() => {
    if (!ready) return
    const tick = (ts) => {
      if (startRef.current == null) startRef.current = ts
      setElapsed(ts - startRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [ready])

  // Build particles once positions are known
  const particles = useMemo(() => {
    if (!positions) return []
    const arr = []
    for (let charIdx = 0; charIdx < CHARS.length; charIdx++) {
      const ignitionTime = T.ignitionStart + charIdx * T.ignitionStagger
      for (let j = 0; j < PARTICLES_PER_CHAR; j++) {
        const i = charIdx * PARTICLES_PER_CHAR + j
        const angle = hash(i + 1) * Math.PI * 2
        const dist = 550 + hash(i + 7) * 500
        // Stagger arrival within a window ending at ignitionTime
        const arrivalOffset = (j / (PARTICLES_PER_CHAR - 1)) * T.particleArrivalSpread
        const delay = Math.max(
          0,
          ignitionTime - T.particleTravel - T.particleArrivalSpread + arrivalOffset,
        )
        arr.push({
          id: i,
          startX: Math.cos(angle) * dist,
          startY: Math.sin(angle) * dist,
          // Target near the char center with a small jitter
          targetX: positions[charIdx].x + (hash(i + 13) - 0.5) * 50,
          targetY: positions[charIdx].y + (hash(i + 19) - 0.5) * 50,
          size: 3.5 + hash(i + 23) * 4,
          color: COLORS[(charIdx + j) % COLORS.length],
          delay,
        })
      }
    }
    return arr
  }, [positions])

  // Shimmer position on [AI]
  const shimmerT = norm(elapsed, T.shimmer[0], T.shimmer[1])
  const shimmerPos = lerp(150, -50, easeInOutCubic(shimmerT))

  // Soft glow behind logo — appears with the shimmer
  const glowOpacity = norm(elapsed, T.shimmer[0] - 200, T.shimmer[0] + 200) * 0.45

  // Settle pulse
  let pulse = 1
  if (elapsed >= T.pulse[0] && elapsed <= T.pulse[1]) {
    const t = (elapsed - T.pulse[0]) / (T.pulse[1] - T.pulse[0])
    pulse = 1 + Math.sin(t * Math.PI) * 0.03
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          transform: `scale(${pulse})`,
          willChange: 'transform',
        }}
      >
        <ParticleField elapsed={elapsed} particles={particles} />

        {/* Soft glow behind logo */}
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
            opacity: glowOpacity,
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        <div
          style={{
            fontFamily: "'Syne Mono', ui-monospace, monospace",
            fontSize: 'clamp(4rem, 11vw, 9rem)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            userSelect: 'none',
            display: 'flex',
            alignItems: 'baseline',
            whiteSpace: 'nowrap',
          }}
        >
          {CHARS.map((c, i) => (
            <Glyph
              key={i}
              index={i}
              char={c.char}
              kind={c.kind}
              elapsed={elapsed}
              shimmerPos={shimmerPos}
              refCb={(el) => (charRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── IntroAnimation ───────────────────────────────────────────────────────────

export default function IntroAnimation({ onComplete }) {
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  // Once BrainSplash signals it is ready (font loaded + positions measured),
  // start the outro timer. This way the parent doesn't fade out before the
  // animation has had a chance to play.
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => {
      setDone(true)
      setTimeout(() => onComplete?.(), T.outroFade)
    }, T.total)
    return () => clearTimeout(t)
  }, [started, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{
            opacity: 0,
            transition: { duration: T.outroFade / 1000, ease: [0.4, 0, 0.2, 1] },
          }}
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

          <BrainSplash onReady={() => setStarted(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
