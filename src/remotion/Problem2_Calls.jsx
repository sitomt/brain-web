import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion'

// 330 frames = 11 seconds at 30fps
const BG = '#0A0A0C'

function bubbleAnim(frame, inFrame, outFrame) {
  return interpolate(
    frame,
    [inFrame, inFrame + 14, outFrame - 10, outFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )
}

function bubbleSlide(frame, inFrame) {
  return interpolate(frame, [inFrame, inFrame + 14], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })
}

function PhoneIcon({ opacity }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"
      style={{ opacity, flexShrink: 0 }}
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.92 1.18 2 2 0 012.92 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

const BUBBLE_BASE = {
  background: 'rgba(28, 28, 38, 0.92)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 12,
  padding: '9px 14px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  color: 'rgba(255,255,255,0.8)',
  lineHeight: 1.4,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}

export default function Problem2_Calls() {
  const frame = useCurrentFrame()

  // Global fade out
  const globalOpacity = interpolate(frame, [298, 330], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // ── ACT 1: Counter climbs (0-100) ──
  const counterOpacity = interpolate(frame, [0, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const counterValue = Math.round(
    interpolate(frame, [0, 100], [0, 47], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.exp),
    })
  )

  // ── ACT 2: Bubbles loop + time counter (50-165) ──

  // Bubble 1 — first (50-102)
  const b1a = bubbleAnim(frame, 50, 102)
  const b1aY = bubbleSlide(frame, 50)
  // Bubble 2 (78-130)
  const b2 = bubbleAnim(frame, 78, 130)
  const b2Y = bubbleSlide(frame, 78)
  // Bubble 3 (106-158)
  const b3 = bubbleAnim(frame, 106, 158)
  const b3Y = bubbleSlide(frame, 106)
  // Bubble 1 — second pass (134-165)
  const b1b = bubbleAnim(frame, 134, 165)
  const b1bY = bubbleSlide(frame, 134)

  const b1Op = Math.max(b1a, b1b)
  const b1Y = frame < 118 ? b1aY : b1bY

  // Phone ring flash before each bubble
  const mkPhone = (start) =>
    interpolate(frame, [start, start + 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
    interpolate(frame, [start + 4, start + 8], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const phoneOp = Math.max(mkPhone(46), mkPhone(74), mkPhone(102))

  // Time counter (frames 100-165)
  const timeCounterOpacity = interpolate(frame, [100, 116], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const timeMinutes = Math.round(
    interpolate(frame, [100, 165], [0, 167], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  )
  const timeHours = Math.floor(timeMinutes / 60)
  const timeMins = timeMinutes % 60

  // ── ACT 3: Peak (165-270) ──
  const contentFade = interpolate(frame, [162, 180], [1, 0.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const peakOpacity = interpolate(frame, [168, 186], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const peakY = interpolate(frame, [168, 186], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  const subOpacity = interpolate(frame, [190, 206], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
      <div style={{ opacity: globalOpacity, width: '100%', height: '100%', position: 'relative' }}>

        {/* ── Counter + bubbles ── */}
        <div style={{ opacity: contentFade, width: '100%', height: '100%', position: 'relative' }}>

          {/* Counter — top center */}
          <div
            style={{
              position: 'absolute',
              top: 36,
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: counterOpacity,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
              Llamadas atendidas hoy
            </div>
            <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 56, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>
              {counterValue}
            </div>
          </div>

          {/* Time counter */}
          <div
            style={{
              position: 'absolute',
              top: 158,
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: timeCounterOpacity,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
              Tiempo empleado
            </div>
            <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 18, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em' }}>
              {timeHours}h {String(timeMins).padStart(2, '0')}min
            </div>
          </div>

          {/* Phone ring indicator */}
          <div style={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)', opacity: phoneOp }}>
            <PhoneIcon opacity={1} />
          </div>

          {/* Bubbles */}
          <div style={{ ...BUBBLE_BASE, left: 18, top: 205, opacity: b1Op, transform: `translateY(${b1Y}px)`, maxWidth: 210 }}>
            <PhoneIcon opacity={0.4} />
            ¿Cuál es vuestro horario?
          </div>
          <div style={{ ...BUBBLE_BASE, right: 18, top: 225, opacity: b2, transform: `translateY(${b2Y}px)`, maxWidth: 190 }}>
            <PhoneIcon opacity={0.4} />
            ¿Hacéis reservas?
          </div>
          <div style={{ ...BUBBLE_BASE, left: '50%', top: 248, transform: `translateX(-50%) translateY(${b3Y}px)`, opacity: b3, maxWidth: 200, whiteSpace: 'nowrap' }}>
            <PhoneIcon opacity={0.4} />
            ¿Tenéis parking?
          </div>
        </div>

        {/* ── PEAK — visible ~1.6s before fade out ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              opacity: peakOpacity,
              transform: `translateY(${peakY}px)`,
              fontFamily: "'Instrument Serif', serif",
              fontSize: 26,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.25,
            }}
          >
            El 71% preguntaban<br />lo mismo.
          </div>
          <div
            style={{
              opacity: subOpacity,
              fontFamily: "'Syne Mono', monospace",
              fontSize: 13,
              color: '#F72585',
              letterSpacing: '0.08em',
              textAlign: 'center',
            }}
          >
            2h 47min. Cada día. Pagado.
          </div>
        </div>

      </div>
    </AbsoluteFill>
  )
}
