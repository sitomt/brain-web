import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────────────────────────────────
   BrAIn — Aperture Morph intro
   Frame-driven animation (Remotion-style: interpolate / spring / cubic-bezier)
   Total: 150 frames @ 60fps = 2.5s. Then a 0.5s exit fade.
   Sequence:
     1. Staggered entry of b r [ A I ] n (4f stagger, 16f animation each)
     2. Bracket morph (anticipation + width collapse + glyph fly-out)
     3. A→a / I→i 3D flip
     4. Logo scale punch (spring)
     5. Period drop from above (gravity + bounce) — conic-gradient circle
     6. Eyebrow + meta line fade-in
   ──────────────────────────────────────────────────────────────────────── */

// ── Remotion-style math primitives ───────────────────────────────────────
const bezier = (mX1, mY1, mX2, mY2) => {
  const A = (a1, a2) => 1 - 3*a2 + 3*a1
  const B = (a1, a2) => 3*a2 - 6*a1
  const C = (a1) => 3*a1
  const calc = (t, a1, a2) => ((A(a1,a2)*t + B(a1,a2))*t + C(a1))*t
  const slope = (t, a1, a2) => 3*A(a1,a2)*t*t + 2*B(a1,a2)*t + C(a1)
  const solve = (x) => {
    let t = x
    for (let i = 0; i < 8; i++){
      const cs = slope(t, mX1, mX2); if (cs === 0) return t
      t -= (calc(t, mX1, mX2) - x) / cs
    }
    return t
  }
  return (x) => x <= 0 ? 0 : x >= 1 ? 1 : calc(solve(x), mY1, mY2)
}

const interpolate = (input, [iA, iB], [oA, oB], opts = {}) => {
  const easing = opts.easing || ((x) => x)
  if (input <= iA) return oA
  if (input >= iB) return oB
  const t = Math.max(0, Math.min(1, (input - iA) / (iB - iA)))
  return oA + (oB - oA) * easing(t)
}

const spring = ({ frame, fps, config = {} }) => {
  if (frame <= 0) return 0
  const stiffness = config.stiffness ?? 100
  const damping   = config.damping   ?? 10
  const mass      = config.mass      ?? 1
  const dt = 1 / fps
  let v = 0, x = 0
  const steps = Math.ceil(frame)
  for (let i = 0; i < steps; i++){
    const a = (-stiffness * (x - 1) - damping * v) / mass
    v += a * dt
    x += v * dt
  }
  return x
}

const EASE_OUT_QUINT = bezier(0.22, 1, 0.36, 1)
const EASE_IN_QUART  = bezier(0.5, 0, 0.75, 0)
const EASE_INOUT     = bezier(0.65, 0, 0.35, 1)
const EASE_SCAN      = bezier(0.83, 0, 0.17, 1)
const EASE_GRAVITY   = bezier(0.55, 0.05, 0.85, 0.20)

const FPS = 60
const TOTAL_FRAMES = 150
const STAGGER = 4
const ENTRY_DUR = 16

// ── Brand tokens ─────────────────────────────────────────────────────────
const BG    = '#FAF8F3'
const INK   = '#14110E'
const HAIR  = 'rgba(20,17,14,0.10)'
const MUTED = 'rgba(20,17,14,0.42)'
const GRAD  = 'linear-gradient(118deg, #3A55E0 0%, #6E0BB5 38%, #E81F7B 68%, #F35D0A 100%)'

// ── BrainSplash: the actual animated wordmark ───────────────────────────
function BrainSplash({ onComplete }) {
  const stageRef = useRef(null)
  const logoRef = useRef(null)
  const bRef = useRef(null)
  const rRef = useRef(null)
  const nRef = useRef(null)
  const lbRef = useRef(null)
  const rbRef = useRef(null)
  const lbGlyphRef = useRef(null)
  const rbGlyphRef = useRef(null)
  const AupRef = useRef(null)
  const AloRef = useRef(null)
  const IupRef = useRef(null)
  const IloRef = useRef(null)
  const dotRef = useRef(null)
  const scanRef = useRef(null)
  const eyebrowRef = useRef(null)
  const pulseRef = useRef(null)
  const metaRef = useRef(null)

  const rafRef = useRef(null)
  const startTsRef = useRef(null)
  const completedRef = useRef(false)
  const measurementsRef = useRef({ lbW: 0, rbW: 0, fall: 600 })

  const startOf = (i) => i * STAGGER
  const entryO = (f, i) => interpolate(f, [startOf(i), startOf(i)+ENTRY_DUR], [0,1], { easing: EASE_OUT_QUINT })
  const entryB = (f, i) => interpolate(f, [startOf(i), startOf(i)+ENTRY_DUR], [14,0], { easing: EASE_OUT_QUINT })
  const entryY = (f, i) => interpolate(f, [startOf(i), startOf(i)+ENTRY_DUR], [22,0], { easing: EASE_OUT_QUINT })

  const render = (frame) => {
    const { lbW, rbW, fall } = measurementsRef.current

    // 1. Staggered entry — b(0) r(1) [(2) A(3) I(4) ](5) n(6)
    bRef.current.style.opacity = entryO(frame, 0)
    bRef.current.style.filter = `blur(${entryB(frame, 0)}px)`
    bRef.current.style.transform = `translateY(${entryY(frame, 0)}px)`

    rRef.current.style.opacity = entryO(frame, 1)
    rRef.current.style.filter = `blur(${entryB(frame, 1)}px)`
    rRef.current.style.transform = `translateY(${entryY(frame, 1)}px)`

    nRef.current.style.opacity = entryO(frame, 6)
    nRef.current.style.filter = `blur(${entryB(frame, 6)}px)`
    nRef.current.style.transform = `translateY(${entryY(frame, 6)}px)`

    // A upper (index 3) + I upper (index 4) — entry + perpetual mesh + flip-out
    const AentryO = entryO(frame, 3)
    const AflipR = interpolate(frame, [62, 94], [0, -92], { easing: EASE_INOUT })
    const AflipO = interpolate(frame, [62, 94], [1, 0], { easing: EASE_INOUT })
    AupRef.current.style.opacity = AentryO * AflipO
    AupRef.current.style.filter = `blur(${entryB(frame, 3)}px)`
    AupRef.current.style.transform = `translateY(${entryY(frame, 3)}px) rotateX(${AflipR}deg)`
    AupRef.current.style.backgroundPosition = `${50 + Math.sin(frame / 30) * 50}% 50%`

    const IentryO = entryO(frame, 4)
    const IflipR = interpolate(frame, [66, 98], [0, -92], { easing: EASE_INOUT })
    const IflipO = interpolate(frame, [66, 98], [1, 0], { easing: EASE_INOUT })
    IupRef.current.style.opacity = IentryO * IflipO
    IupRef.current.style.filter = `blur(${entryB(frame, 4)}px)`
    IupRef.current.style.transform = `translateY(${entryY(frame, 4)}px) rotateX(${IflipR}deg)`
    IupRef.current.style.backgroundPosition = `${50 + Math.sin(frame / 30 + 0.4) * 50}% 50%`

    // 2. Bracket morph — width collapse + glyph anticipation/explosion
    lbRef.current.style.opacity = entryO(frame, 2)
    lbRef.current.style.filter = `blur(${entryB(frame, 2)}px)`
    lbRef.current.style.transform = `translateY(${entryY(frame, 2)}px)`
    rbRef.current.style.opacity = entryO(frame, 5)
    rbRef.current.style.filter = `blur(${entryB(frame, 5)}px)`
    rbRef.current.style.transform = `translateY(${entryY(frame, 5)}px)`

    lbRef.current.style.width = `${interpolate(frame, [58, 92], [lbW, 0], { easing: EASE_IN_QUART })}px`
    rbRef.current.style.width = `${interpolate(frame, [58, 92], [rbW, 0], { easing: EASE_IN_QUART })}px`

    let lbGX = 0, lbGS = 1, lbGO = 1
    if (frame >= 50 && frame < 58){
      lbGX = interpolate(frame, [50, 58], [0, 3], { easing: EASE_OUT_QUINT })
      lbGS = interpolate(frame, [50, 58], [1, 1.08], { easing: EASE_OUT_QUINT })
    } else if (frame >= 58){
      lbGX = interpolate(frame, [58, 92], [3, -110], { easing: EASE_IN_QUART })
      lbGS = interpolate(frame, [58, 92], [1.08, 0.5], { easing: EASE_IN_QUART })
      lbGO = interpolate(frame, [58, 86], [1, 0], { easing: EASE_IN_QUART })
    }
    lbGlyphRef.current.style.transform = `translate(${lbGX}px, 0) scale(${lbGS})`
    lbGlyphRef.current.style.opacity = lbGO

    let rbGX = 0, rbGS = 1, rbGO = 1
    if (frame >= 50 && frame < 58){
      rbGX = interpolate(frame, [50, 58], [0, -3], { easing: EASE_OUT_QUINT })
      rbGS = interpolate(frame, [50, 58], [1, 1.08], { easing: EASE_OUT_QUINT })
    } else if (frame >= 58){
      rbGX = interpolate(frame, [58, 92], [-3, 110], { easing: EASE_IN_QUART })
      rbGS = interpolate(frame, [58, 92], [1.08, 0.5], { easing: EASE_IN_QUART })
      rbGO = interpolate(frame, [58, 86], [1, 0], { easing: EASE_IN_QUART })
    }
    rbGlyphRef.current.style.transform = `translate(${rbGX}px, 0) scale(${rbGS})`
    rbGlyphRef.current.style.opacity = rbGO

    // 3. Lower a / i flip-in
    const AloR = interpolate(frame, [78, 110], [-90, 0], { easing: EASE_OUT_QUINT })
    const AloO = interpolate(frame, [78, 110], [0, 1], { easing: EASE_OUT_QUINT })
    AloRef.current.style.opacity = AloO
    AloRef.current.style.transform = `translateX(-50%) rotateX(${AloR}deg)`

    const IloR = interpolate(frame, [82, 114], [-90, 0], { easing: EASE_OUT_QUINT })
    const IloO = interpolate(frame, [82, 114], [0, 1], { easing: EASE_OUT_QUINT })
    IloRef.current.style.opacity = IloO
    IloRef.current.style.transform = `translateX(-50%) rotateX(${IloR}deg)`

    // 4. Scan-bar sweep
    const scanPos = interpolate(frame, [56, 100], [150, -50], { easing: EASE_SCAN })
    let scanOpacity = 0
    if (frame >= 56 && frame < 66) scanOpacity = interpolate(frame, [56, 66], [0, 1], { easing: EASE_OUT_QUINT })
    else if (frame >= 66 && frame < 92) scanOpacity = 1
    else if (frame >= 92 && frame < 100) scanOpacity = interpolate(frame, [92, 100], [1, 0], { easing: EASE_OUT_QUINT })
    scanRef.current.style.backgroundPosition = `${scanPos}% 0`
    scanRef.current.style.opacity = scanOpacity

    // 5. Logo punch (spring scale)
    const punch = spring({ frame: frame - 100, fps: FPS, config: { stiffness: 140, damping: 13, mass: 0.8 } })
    logoRef.current.style.transform = `scale(${1 + (punch - 1) * 0.035})`

    // 6. Period drop — conic-gradient circle from above with bounce
    const DROP_START = 105
    const FALL_END = 125
    let dotY, dotOpacity = 0
    if (frame < DROP_START){
      dotY = -fall
      dotOpacity = 0
    } else if (frame < FALL_END){
      dotY = interpolate(frame, [DROP_START, FALL_END], [-fall, 0], { easing: EASE_GRAVITY })
      dotOpacity = 1
    } else {
      const t = (frame - FALL_END) / FPS
      dotY = -38 * Math.exp(-t * 6) * Math.sin(t * 18)
      dotOpacity = 1
    }
    let dotScale = 1
    if (frame >= FALL_END && frame < FALL_END + 10){
      if (frame < FALL_END + 4){
        dotScale = interpolate(frame, [FALL_END, FALL_END + 4], [1, 1.22], { easing: EASE_OUT_QUINT })
      } else {
        dotScale = interpolate(frame, [FALL_END + 4, FALL_END + 10], [1.22, 1], { easing: EASE_OUT_QUINT })
      }
    }
    dotRef.current.style.opacity = dotOpacity
    dotRef.current.style.transform = `translateY(${dotY}px) scale(${dotScale})`

    // 7. Eyebrow + meta fade-in
    const eO = interpolate(frame, [125, 145], [0, 1], { easing: EASE_OUT_QUINT })
    const eY = interpolate(frame, [125, 145], [-8, 0], { easing: EASE_OUT_QUINT })
    eyebrowRef.current.style.opacity = eO
    eyebrowRef.current.style.transform = `translate(-50%, ${eY}px)`

    const mO = interpolate(frame, [130, 150], [0, 1], { easing: EASE_OUT_QUINT })
    metaRef.current.style.opacity = mO

    // 8. Live-dot perpetual pulse
    const pulseT = 0.55 + (Math.sin(frame / 12) * 0.5 + 0.5) * 0.45
    pulseRef.current.style.opacity = pulseT
    pulseRef.current.style.transform = `scale(${0.9 + (pulseT - 0.55) * 0.5})`
  }

  const measure = () => {
    if (!lbRef.current || !rbRef.current || !logoRef.current) return
    lbRef.current.style.width = ''
    rbRef.current.style.width = ''
    const lbW = lbRef.current.getBoundingClientRect().width
    const rbW = rbRef.current.getBoundingClientRect().width
    const r = logoRef.current.getBoundingClientRect()
    const fall = r.top + r.height + 80
    measurementsRef.current = { lbW, rbW, fall }
  }

  useEffect(() => {
    let cancelled = false
    const fontsReady = (document.fonts && document.fonts.ready) || Promise.resolve()
    Promise.race([fontsReady, new Promise(r => setTimeout(r, 1200))]).then(() => {
      if (cancelled) return
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (cancelled) return
        measure()
        startTsRef.current = null
        const tick = (ts) => {
          if (cancelled) return
          if (startTsRef.current == null) startTsRef.current = ts
          const elapsedMs = ts - startTsRef.current
          const frame = Math.min(TOTAL_FRAMES, (elapsedMs / 1000) * FPS)
          render(frame)
          if (frame < TOTAL_FRAMES){
            rafRef.current = requestAnimationFrame(tick)
          } else {
            // Hold final state briefly, then signal complete
            if (!completedRef.current){
              completedRef.current = true
              setTimeout(() => onComplete?.(), 350)
            }
            // Keep perpetual pulse alive
            const perpetual = (ts2) => {
              if (cancelled) return
              const elapsed2 = ts2 - startTsRef.current
              const f = (elapsed2 / 1000) * FPS
              const pulseT = 0.55 + (Math.sin(f / 12) * 0.5 + 0.5) * 0.45
              if (pulseRef.current){
                pulseRef.current.style.opacity = pulseT
                pulseRef.current.style.transform = `scale(${0.9 + (pulseT - 0.55) * 0.5})`
              }
              rafRef.current = requestAnimationFrame(perpetual)
            }
            rafRef.current = requestAnimationFrame(perpetual)
          }
        }
        rafRef.current = requestAnimationFrame(tick)
      }))
    })

    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [onComplete])

  // Styles
  const sLogo = {
    position: 'relative',
    fontFamily: "'Syne Mono', monospace",
    fontSize: 'clamp(4.2rem, 12vw, 10rem)',
    lineHeight: 1,
    letterSpacing: '-0.025em',
    color: INK,
    display: 'inline-flex',
    alignItems: 'baseline',
    isolation: 'isolate',
    willChange: 'transform',
  }
  const sCh = { display: 'inline-block', willChange: 'opacity,filter,transform' }
  const sMorph = { display: 'inline-block', position: 'relative', perspective: '900px' }
  const sUpper = {
    display: 'inline-block',
    background: GRAD,
    backgroundSize: '220% 220%',
    WebkitBackgroundClip: 'text', backgroundClip: 'text',
    WebkitTextFillColor: 'transparent', color: 'transparent',
    transformOrigin: '50% 100%',
    backfaceVisibility: 'hidden',
    willChange: 'opacity,transform,background-position',
  }
  const sLower = {
    position: 'absolute',
    left: '50%', bottom: 0,
    transform: 'translateX(-50%)',
    color: INK,
    opacity: 0,
    transformOrigin: '50% 0%',
    backfaceVisibility: 'hidden',
    lineHeight: 1,
    willChange: 'opacity,transform',
  }
  const sBracket = {
    display: 'inline-block',
    color: INK,
    overflow: 'hidden',
    verticalAlign: 'baseline',
    willChange: 'width',
  }
  const sBracketGlyph = { display: 'inline-block', willChange: 'transform,opacity' }
  const sDot = {
    display: 'inline-block',
    position: 'relative',
    color: 'transparent',
    transformOrigin: '50% 70%',
    opacity: 0,
    willChange: 'transform,opacity',
  }
  const sDotAfter = {
    content: '""',
    position: 'absolute',
    bottom: '0.06em',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0.17em',
    height: '0.17em',
    borderRadius: '50%',
    background: `conic-gradient(from 215deg, #3A55E0 0deg, #6E0BB5 90deg, #E81F7B 180deg, #F35D0A 270deg, #3A55E0 360deg)`,
    boxShadow: `inset 0 0.012em 0.025em rgba(255,255,255,0.45), 0 0 0.22em rgba(110,11,181,0.30), 0 0 0.35em rgba(247,37,133,0.20)`,
  }
  const sScan = {
    position: 'absolute',
    top: '50%', left: 0, right: 0,
    height: '1px',
    pointerEvents: 'none',
    background: `linear-gradient(90deg, transparent 0%, rgba(110,11,181,0) 30%, rgba(110,11,181,0.9) 48%, rgba(247,37,133,1) 50%, rgba(243,93,10,0.9) 52%, transparent 70%, transparent 100%)`,
    backgroundSize: '200% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '150% 0',
    opacity: 0,
    filter: 'blur(0.4px) drop-shadow(0 0 6px rgba(247,37,133,0.6))',
    transform: 'translateY(-50%)',
    willChange: 'background-position,opacity',
  }

  return (
    <>
      <style>{`@keyframes brainSplashDotAfter { from{} to{} }`}</style>

      <div ref={eyebrowRef} style={{
        position: 'fixed', top: 32, left: '50%',
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '8px 16px 8px 14px',
        border: `1px solid ${HAIR}`,
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderRadius: 999,
        font: "500 11px/1 'DM Sans', sans-serif",
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: MUTED,
        whiteSpace: 'nowrap',
        opacity: 0,
        zIndex: 50,
      }}>
        <span ref={pulseRef} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: '#6E0BB5',
          boxShadow: '0 0 10px rgba(110,11,181,0.7)',
          willChange: 'transform,opacity',
        }}/>
        <span>AI Agency · Live</span>
      </div>

      <div ref={stageRef} style={{
        position: 'relative', zIndex: 2,
        display: 'grid', placeItems: 'center',
        padding: '0 24px',
      }}>
        <div ref={logoRef} style={sLogo} aria-label="brain.">
          <span ref={bRef} style={sCh}>b</span>
          <span ref={rRef} style={sCh}>r</span>
          <span ref={lbRef} style={sBracket}>
            <span ref={lbGlyphRef} style={sBracketGlyph}>[</span>
          </span>
          <span style={sMorph}>
            <span ref={AupRef} style={sUpper}>A</span>
            <span ref={AloRef} style={sLower}>a</span>
          </span>
          <span style={sMorph}>
            <span ref={IupRef} style={sUpper}>I</span>
            <span ref={IloRef} style={sLower}>i</span>
          </span>
          <span ref={rbRef} style={sBracket}>
            <span ref={rbGlyphRef} style={sBracketGlyph}>]</span>
          </span>
          <span ref={nRef} style={sCh}>n</span>
          <span ref={dotRef} style={sDot}>
            .
            <span style={sDotAfter}/>
          </span>
          <span ref={scanRef} style={sScan} aria-hidden="true"/>
        </div>
      </div>

      <div ref={metaRef} style={{
        position: 'fixed', bottom: 30, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 14,
        font: "400 11px/1 'DM Sans', sans-serif",
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: MUTED,
        whiteSpace: 'nowrap',
        opacity: 0,
        zIndex: 50,
      }}>
        <span>MURCIA</span>
        <span style={{ width: 26, height: 1, background: HAIR }}/>
        <span>EST 2026</span>
        <span style={{ width: 26, height: 1, background: HAIR }}/>
        <span>INTELLIGENCE REFINED</span>
      </div>
    </>
  )
}

// ── Outer overlay: handles mount, ambient background, exit fade ─────────
export default function IntroAnimation({ onComplete }) {
  const [done, setDone] = useState(false)

  const handleAnimationComplete = () => {
    setDone(true)
    // Exit fade is 500ms; signal parent slightly before so the fade overlaps
    setTimeout(() => onComplete?.(), 500)
  }

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: BG,
            overflow: 'hidden',
            display: 'grid',
            placeItems: 'center',
            fontFamily: "'DM Sans', sans-serif",
            color: INK,
          }}
        >
          {/* Whisper-quiet ambient depth */}
          <div aria-hidden style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: `
              radial-gradient(60% 50% at 50% 42%, rgba(110,11,181,0.05), transparent 70%),
              radial-gradient(40% 35% at 70% 70%, rgba(58,85,224,0.04), transparent 70%)
            `,
          }}/>
          {/* Grain */}
          <div aria-hidden style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 60,
            opacity: 0.028, mixBlendMode: 'multiply',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          }}/>

          <BrainSplash onComplete={handleAnimationComplete} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
