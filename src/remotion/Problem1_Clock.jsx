import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion'

// 330 frames = 11 seconds at 30fps
const BG = '#0A0A0C'

export default function Problem1_Clock() {
  const frame = useCurrentFrame()

  // Global fade out (last second)
  const globalOpacity = interpolate(frame, [298, 330], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // ── ACT 1: Setup (0-80) ──

  const clockOpacity = interpolate(frame, [0, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const colonVisible = Math.floor(frame / 15) % 2 === 0

  // Clock accelerates: 23:47 → 2:00 AM (nobody answered)
  // Frame 0-44: locked at 23:47; frame 44-185: races to 2:00 AM
  const MINS_START = 23 * 60 + 47  // 1427 (23:47)
  const MINS_END   = 26 * 60 + 0   // 1560 = 2:00 AM next day
  const rawMins = Math.floor(interpolate(frame, [0, 44, 185], [MINS_START, MINS_START, MINS_END], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  })) % 1440
  const clockH = Math.floor(rawMins / 60)
  const clockM  = rawMins % 60
  const clockTime = `${String(clockH).padStart(2, '0')}:${String(clockM).padStart(2, '0')}`

  // Bubble 1 — client asks (frames 44-66)
  const bubble1Opacity = interpolate(frame, [44, 66], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const bubble1Y = interpolate(frame, [44, 66], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  // Tick — enviado, no leído (frames 90-106)
  const tickOpacity = interpolate(frame, [90, 106], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // ── ACT 2: Escalada (80-165) ──

  // Typing indicator ⋯ (frames 120-162)
  const typingOpacity = interpolate(frame, [120, 132, 150, 162], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const dot1 = 0.35 + 0.65 * Math.max(0, Math.sin((frame - 120) * 0.45))
  const dot2 = 0.35 + 0.65 * Math.max(0, Math.sin((frame - 125) * 0.45))
  const dot3 = 0.35 + 0.65 * Math.max(0, Math.sin((frame - 130) * 0.45))

  // Bubble 2 — client gives up (frames 164-185)
  const bubble2Opacity = interpolate(frame, [164, 184], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const bubble2Y = interpolate(frame, [164, 184], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  // ── ACT 3: Consecuencia / Peak (185-330) ──

  // Clock + bubbles fade to background — delayed so bubble2 is readable
  const contentFade = interpolate(frame, [204, 222], [1, 0.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Peak headline (frames 207-224) — overlaps content fade so peak has max time visible
  const peakOpacity = interpolate(frame, [207, 224], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const peakY = interpolate(frame, [207, 224], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  // Subline (frames 226-242)
  const subOpacity = interpolate(frame, [226, 242], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          opacity: globalOpacity,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* ── Background: clock + bubbles ── */}
        <div
          style={{
            opacity: contentFade,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 22,
          }}
        >
          {/* Clock */}
          <div style={{ opacity: clockOpacity, textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: 60,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {clockTime.split(':')[0]}
              <span style={{ opacity: colonVisible ? 1 : 0.1, margin: '0 4px' }}>:</span>
              {clockTime.split(':')[1]}
              {clockH < 6 && (
                <span style={{ fontSize: 18, opacity: 0.4, marginLeft: 10, letterSpacing: 0 }}>AM</span>
              )}
            </div>
          </div>

          {/* Bubble 1 — client asking */}
          <div
            style={{
              opacity: bubble1Opacity,
              transform: `translateY(${bubble1Y}px)`,
              background: 'rgba(15, 38, 26, 0.9)',
              border: '1px solid rgba(37, 211, 102, 0.18)',
              borderRadius: 14,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              maxWidth: 270,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.522 5.859L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.368l-.36-.214-3.726.972.999-3.634-.235-.374A9.818 9.818 0 1112 21.818z" />
            </svg>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.45 }}>
              Hola, ¿tenéis mesa para 2 mañana?
            </div>
          </div>

          {/* Tick + typing area */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, width: 270 }}>
            <div style={{ opacity: tickOpacity, fontFamily: "'Syne Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em' }}>
              ✓ enviado
            </div>
            <div
              style={{
                opacity: typingOpacity,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 10,
                padding: '6px 12px',
                alignSelf: 'flex-start',
              }}
            >
              <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.3)', marginRight: 4 }}>escribe</span>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', opacity: dot1, display: 'inline-block' }} />
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', opacity: dot2, display: 'inline-block' }} />
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', opacity: dot3, display: 'inline-block' }} />
            </div>
          </div>

          {/* Bubble 2 — client leaves */}
          <div
            style={{
              opacity: bubble2Opacity,
              transform: `translateY(${bubble2Y}px)`,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '9px 14px',
              maxWidth: 270,
              alignSelf: 'flex-start',
            }}
          >
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4, fontStyle: 'italic' }}>
              Nada. Voy a mirar en otro sitio.
            </div>
          </div>
        </div>

        {/* ── PEAK — stays on screen ~1.6s before fade out ── */}
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
              fontSize: 28,
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Mesa para 2.<br />Reserva no hecha.
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
            Ticket medio: 47 €. Perdido.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
