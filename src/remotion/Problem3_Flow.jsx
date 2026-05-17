import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion'

// 330 frames = 11 seconds at 30fps
const BG = '#0A0A0C'

const CENTER = { x: 300, y: 160, r: 36 }
const OUTER = [
  { x: 300, y: 62,  r: 26, label: 'CLIENTES' },
  { x: 445, y: 160, r: 26, label: 'PEDIDOS' },
  { x: 300, y: 258, r: 26, label: 'STOCK' },
  { x: 155, y: 160, r: 26, label: 'AGENDA' },
]

const LINES = [
  { x1: 300,                    y1: CENTER.y - CENTER.r, x2: 300,                    y2: OUTER[0].y + OUTER[0].r },
  { x1: CENTER.x + CENTER.r,    y1: 160,                 x2: OUTER[1].x - OUTER[1].r, y2: 160 },
  { x1: 300,                    y1: CENTER.y + CENTER.r, x2: 300,                    y2: OUTER[2].y - OUTER[2].r },
  { x1: CENTER.x - CENTER.r,    y1: 160,                 x2: OUTER[3].x + OUTER[3].r, y2: 160 },
]

// Stagger: appear (slower, spaced out)
const APPEAR = {
  center: [0, 28],
  nodes:  [[10, 36], [22, 48], [34, 60], [46, 72]],
  lines:  [[5,  28], [17, 40], [29, 52], [41, 64]],
}

// Stagger: disappear (cascade, starting ~frame 140)
const DISAPPEAR = {
  lines: [[140, 156], [148, 164], [156, 172], [164, 180]],
  nodes: [[148, 168], [158, 178], [168, 188], [178, 198]],
}

export default function Problem3_Flow() {
  const frame = useCurrentFrame()

  // Global fade out
  const globalOpacity = interpolate(frame, [298, 330], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // ── ACT 1: Network builds (0-80) ──
  const centerAppear = interpolate(frame, APPEAR.center, [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Gentle pulse (frames 28-110)
  const centerPulse = frame >= 28 && frame < 110 ? 1 + 0.05 * Math.sin(frame * 0.18) : 1

  // ── ACT 2: María goes offline (110-200) ──

  // "NO DISPONIBLE" + X (frames 112-140)
  const noDispOpacity = interpolate(frame, [112, 124, 134, 144], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const xOpacity = interpolate(frame, [112, 124, 134, 144], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Center node blinks red then disappears
  const blinkCycle = Math.floor((frame - 110) / 9) % 2
  const centerColor =
    frame < 110 ? 'rgba(255,255,255,0.9)'
    : frame < 138 ? (blinkCycle === 0 ? '#F72585' : 'rgba(255,255,255,0.85)')
    : '#F72585'

  const centerOpacity =
    centerAppear *
    interpolate(frame, [136, 154], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })

  // Outer nodes appear then turn red and cascade out
  const nodeOpacities = OUTER.map((_, i) =>
    interpolate(frame, APPEAR.nodes[i], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
    interpolate(frame, DISAPPEAR.nodes[i], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  )
  const nodeColors = OUTER.map((_, i) => {
    const dp = interpolate(frame, DISAPPEAR.nodes[i], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    return dp > 0.1 ? 'rgba(247,37,133,0.7)' : 'rgba(255,255,255,0.75)'
  })
  const sinRespOps = OUTER.map((_, i) =>
    interpolate(frame, [DISAPPEAR.nodes[i][0], DISAPPEAR.nodes[i][0] + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
    interpolate(frame, DISAPPEAR.nodes[i], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  )

  // Lines: solid, disappear with stagger
  const lineOps = LINES.map((_, i) => {
    const appear = interpolate(frame, APPEAR.lines[i], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    const disappear = interpolate(frame, DISAPPEAR.lines[i], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    return appear * disappear * 0.35
  })

  // Pulse glow along lines during "everything works" phase
  const linePulse = frame >= 28 && frame < 110
    ? 0.35 + 0.15 * Math.abs(Math.sin(frame * 0.1))
    : null

  // ── ACT 3: Peak (195-270) ──
  const peakOpacity = interpolate(frame, [196, 214], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const peakY = interpolate(frame, [196, 214], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })
  const subOpacity = interpolate(frame, [218, 234], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: BG,
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '30px 30px',
        overflow: 'hidden',
      }}
    >
      <div style={{ opacity: globalOpacity, width: '100%', height: '100%', position: 'relative' }}>

        <svg width="600" height="340" viewBox="0 0 600 340" style={{ position: 'absolute', inset: 0 }}>

          {/* Lines */}
          {LINES.map((l, i) => (
            <line
              key={i}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="white"
              strokeWidth={1.2}
              strokeOpacity={linePulse !== null ? linePulse : lineOps[i]}
            />
          ))}

          {/* Outer nodes */}
          {OUTER.map((n, i) => (
            <g key={i} opacity={nodeOpacities[i]}>
              <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke={nodeColors[i]} strokeWidth={1.2} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" dominantBaseline="middle" fontSize={8} fontFamily="'Syne Mono', monospace" fill={nodeColors[i]} letterSpacing="0.1em">
                {n.label}
              </text>
              <text x={n.x} y={n.y + n.r + 14} textAnchor="middle" fontSize={7} fontFamily="'Syne Mono', monospace" fill="#F72585" opacity={sinRespOps[i]} letterSpacing="0.08em">
                SIN RESPUESTA
              </text>
            </g>
          ))}

          {/* Center node — María */}
          <g
            opacity={centerOpacity}
            transform={`translate(${CENTER.x},${CENTER.y}) scale(${centerPulse}) translate(-${CENTER.x},-${CENTER.y})`}
          >
            <circle cx={CENTER.x} cy={CENTER.y} r={CENTER.r} fill="rgba(255,255,255,0.04)" stroke={centerColor} strokeWidth={1.8} />
            <text x={CENTER.x} y={CENTER.y + 5} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontFamily="'Syne Mono', monospace" fill={centerColor} letterSpacing="0.04em">
              María
            </text>
          </g>

          {/* Center label */}
          <text x={CENTER.x} y={CENTER.y + CENTER.r + 14} textAnchor="middle" fontSize={8} fontFamily="'Syne Mono', monospace" fill={`rgba(255,255,255,${centerOpacity * 0.35})`} letterSpacing="0.1em">
            TU EQUIPO
          </text>

          {/* "NO DISPONIBLE" */}
          <text x={CENTER.x} y={CENTER.y - CENTER.r - 12} textAnchor="middle" fontSize={9} fontFamily="'Syne Mono', monospace" fill="#F72585" opacity={noDispOpacity} letterSpacing="0.12em">
            NO DISPONIBLE
          </text>

          {/* X mark */}
          <g opacity={xOpacity}>
            <line x1={CENTER.x - 11} y1={CENTER.y - 11} x2={CENTER.x + 11} y2={CENTER.y + 11} stroke="#F72585" strokeWidth={2} strokeLinecap="round" />
            <line x1={CENTER.x + 11} y1={CENTER.y - 11} x2={CENTER.x - 11} y2={CENTER.y + 11} stroke="#F72585" strokeWidth={2} strokeLinecap="round" />
          </g>
        </svg>

        {/* ── PEAK — stays ~1.6s before fade out ── */}
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
            María no está.
          </div>
          <div
            style={{
              opacity: subOpacity,
              fontFamily: "'Syne Mono', monospace",
              fontSize: 12,
              color: '#F72585',
              letterSpacing: '0.07em',
              textAlign: 'center',
            }}
          >
            ¿Cuántos días aguanta tu negocio?
          </div>
        </div>

      </div>
    </AbsoluteFill>
  )
}
