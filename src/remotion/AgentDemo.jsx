import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

const BG = '#0A0A0C'
const C = ['#4361EE', '#7209B7', '#F72585', '#FB5607', '#22c55e']

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const springEase = Easing.bezier(0.34, 1.56, 0.64, 1)
const flowEase   = Easing.bezier(0.16, 1, 0.3, 1)

// ── Zone 2 pixel dimensions (derived from fixed 640×480 composition) ──────
// Padding: 24px | Zone 1: 72px | gap: 8px | Zone 3: 44px
// Z2W = 640 - 2×24 = 592
// Z2H = 480 - 2×24 - 72 - 8 - 44 = 308
const Z2W = 592
const Z2H = 308

// ── Node centers in Zone 2 (px) ────────────────────────────────────────────
const cx = 296           // brain  x  (50% of Z2W)
const cy = Math.round(Z2H * 0.48)   // brain  y  ≈ 148
const ox = 296           // orch   x
const oy = Math.round(Z2H * 0.17)   // orch   y  ≈ 52

const brainSize = 52, brainHalf = 26
const orchSize  = 52, orchHalf  = 26
const nodeSize  = 44, nodeHalf  = 22
const agentSize = 44, agentHalf = 22

const TOOLS = [
  { icon: '✉',  label: 'EMAIL',     text: 'Solicitud recibida',   color: C[0], x: 296, y: Math.round(Z2H * 0.12) },  // 37
  { icon: '📊', label: 'CRM',       text: 'Lead #1247 creado',    color: C[1], x: Math.round(Z2W * 0.75), y: Math.round(Z2H * 0.38) },  // 444, 117
  { icon: '📅', label: 'AGENDA',    text: 'Cita agendada',        color: C[2], x: Math.round(Z2W * 0.70), y: Math.round(Z2H * 0.72) },  // 414, 222
  { icon: '💬', label: 'WHATSAPP',  text: 'Recordatorio enviado', color: C[3], x: Math.round(Z2W * 0.30), y: Math.round(Z2H * 0.72) },  // 178, 222
  { icon: '📈', label: 'ANALYTICS', text: 'Informe generado',     color: C[4], x: Math.round(Z2W * 0.25), y: Math.round(Z2H * 0.38) },  // 148, 117
]

const AGENTS = [
  { icon: '🎯', label: 'CAPTACIÓN', color: C[0], x: Math.round(Z2W * 0.18), y: Math.round(Z2H * 0.65), miniTools: ['✉', '📅'] },  // 107, 200
  { icon: '📊', label: 'CRM',       color: C[1], x: 296,                     y: Math.round(Z2H * 0.65), miniTools: ['📊', '📈'] },  // 296, 200
  { icon: '💬', label: 'SOPORTE',   color: C[2], x: Math.round(Z2W * 0.82), y: Math.round(Z2H * 0.65), miniTools: ['💬', '✉'] },  // 485, 200
]

const toolLineLens = TOOLS.map(t => Math.hypot(t.x - cx, t.y - cy))
const orchLineLens = AGENTS.map(a =>
  Math.hypot(a.x - ox, (a.y - agentHalf) - (oy + orchHalf))
)

function fi(frame, a, b) {
  return interpolate(frame, [a, b], [0, 1], clamp)
}

// 3-particle trail
function Particles({ t, fromX, fromY, toX, toY, color }) {
  const trail = [0, 0.14, 0.28]
  const sizes = [9, 6, 4]
  return (
    <>
      {trail.map((off, i) => {
        const adj = off === 0 ? t : interpolate(t, [off, 1], [0, 1], clamp)
        if (adj <= 0 || adj >= 1) return null
        const x = fromX + (toX - fromX) * adj
        const y = fromY + (toY - fromY) * adj
        const fade = adj < 0.8 ? 1 : interpolate(adj, [0.8, 1], [1, 0], clamp)
        const sz = sizes[i]
        return (
          <div key={i} style={{
            position: 'absolute',
            left: x - sz / 2, top: y - sz / 2,
            width: sz, height: sz,
            borderRadius: 999,
            background: color,
            opacity: fade * (1 - i * 0.3),
            boxShadow: i === 0
              ? `0 0 ${sz + 6}px ${color}, 0 0 ${sz * 3}px ${color}66`
              : `0 0 ${sz + 3}px ${color}88`,
            pointerEvents: 'none',
          }} />
        )
      })}
    </>
  )
}

// Expanding activation ring
function PulseRing({ t, x, y, color, baseSize = 52 }) {
  if (t <= 0 || t >= 1) return null
  const scale   = interpolate(t, [0, 1], [0.9, 2.4], clamp)
  const opacity = interpolate(t, [0, 0.2, 1], [0, 0.9, 0], clamp)
  return (
    <div style={{
      position: 'absolute',
      left: x - baseSize / 2, top: y - baseSize / 2,
      width: baseSize, height: baseSize,
      borderRadius: 999,
      border: `1.5px solid ${color}`,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      pointerEvents: 'none',
    }} />
  )
}

export default function AgentDemo() {
  const frame = useCurrentFrame()

  const fadeIn   = fi(frame, 0, 20)
  const fadeOut  = interpolate(frame, [285, 300], [1, 0], clamp)
  const masterOp = fadeIn * fadeOut

  const phase1Op = interpolate(frame, [120, 150], [1, 0], clamp)
  const phase2Op = interpolate(frame, [148, 168], [0, 1], clamp)

  const p1HeadOp  = fi(frame, 0, 16)
  const p1BadgeOp = fi(frame, 96, 110)

  const brainScale = interpolate(frame, [8, 22], [0, 1], { easing: springEase, ...clamp })
  const brainPulse = interpolate((frame - 8) % 30, [0, 15, 30], [1, 1.1, 1], clamp)
  const brainFinal = brainScale * brainPulse

  const tLine0 = fi(frame, 20, 32)
  const tLine1 = fi(frame, 44, 56)
  const tLine2 = fi(frame, 68, 80)
  const tLine3 = fi(frame, 92, 104)
  const tLine4 = fi(frame, 116, 128)

  const tGlow0 = fi(frame, 38, 50)
  const tGlow1 = fi(frame, 62, 74)
  const tGlow2 = fi(frame, 86, 98)
  const tGlow3 = fi(frame, 110, 122)
  const tGlow4 = fi(frame, 134, 146)

  const tText0 = fi(frame, 48, 60)
  const tText1 = fi(frame, 72, 84)
  const tText2 = fi(frame, 96, 108)
  const tText3 = fi(frame, 120, 132)
  const tText4 = fi(frame, 144, 156)

  const tPart0 = interpolate(frame, [32, 60],   [0, 1], { easing: flowEase, ...clamp })
  const tPart1 = interpolate(frame, [56, 84],   [0, 1], { easing: flowEase, ...clamp })
  const tPart2 = interpolate(frame, [80, 108],  [0, 1], { easing: flowEase, ...clamp })
  const tPart3 = interpolate(frame, [104, 132], [0, 1], { easing: flowEase, ...clamp })
  const tPart4 = interpolate(frame, [128, 156], [0, 1], { easing: flowEase, ...clamp })

  const pRing0 = fi(frame, 38, 62)
  const pRing1 = fi(frame, 62, 86)
  const pRing2 = fi(frame, 86, 110)
  const pRing3 = fi(frame, 110, 134)
  const pRing4 = fi(frame, 134, 158)

  const p2HeadOp  = fi(frame, 148, 164)
  const p2BadgeOp = fi(frame, 240, 256)

  const orchScale = interpolate(frame, [155, 172], [0, 1], { easing: springEase, ...clamp })
  const orchPulse = interpolate((frame - 155) % 30, [0, 15, 30], [1, 1.07, 1], clamp)
  const orchFinal = orchScale * orchPulse

  const oLine0 = fi(frame, 168, 182)
  const oLine1 = fi(frame, 178, 194)
  const oLine2 = fi(frame, 188, 204)

  const aScale0 = interpolate(frame, [180, 195], [0, 1], { easing: springEase, ...clamp })
  const aScale1 = interpolate(frame, [192, 207], [0, 1], { easing: springEase, ...clamp })
  const aScale2 = interpolate(frame, [204, 219], [0, 1], { easing: springEase, ...clamp })

  const down0 = interpolate(frame, [182, 210], [0, 1], { easing: flowEase, ...clamp })
  const down1 = interpolate(frame, [190, 218], [0, 1], { easing: flowEase, ...clamp })
  const down2 = interpolate(frame, [198, 226], [0, 1], { easing: flowEase, ...clamp })
  const up0   = interpolate(frame, [218, 246], [0, 1], { easing: flowEase, ...clamp })
  const up1   = interpolate(frame, [226, 254], [0, 1], { easing: flowEase, ...clamp })
  const up2   = interpolate(frame, [234, 262], [0, 1], { easing: flowEase, ...clamp })

  const mt00 = fi(frame, 210, 222); const mt01 = fi(frame, 218, 230)
  const mt10 = fi(frame, 216, 228); const mt11 = fi(frame, 224, 236)
  const mt20 = fi(frame, 222, 234); const mt21 = fi(frame, 230, 242)

  const aPRing0 = fi(frame, 180, 204)
  const aPRing1 = fi(frame, 192, 216)
  const aPRing2 = fi(frame, 204, 228)

  const tLines  = [tLine0, tLine1, tLine2, tLine3, tLine4]
  const tGlows  = [tGlow0, tGlow1, tGlow2, tGlow3, tGlow4]
  const tTexts  = [tText0, tText1, tText2, tText3, tText4]
  const tParts  = [tPart0, tPart1, tPart2, tPart3, tPart4]
  const pRings  = [pRing0, pRing1, pRing2, pRing3, pRing4]
  const oLines  = [oLine0, oLine1, oLine2]
  const aScales = [aScale0, aScale1, aScale2]
  const downPs  = [down0, down1, down2]
  const upPs    = [up0, up1, up2]
  const miniOps = [[mt00, mt01], [mt10, mt11], [mt20, mt21]]
  const aPRings = [aPRing0, aPRing1, aPRing2]

  const orchFromY = oy + orchHalf
  const agentToY  = (a) => a.y - agentHalf

  const ring1Rot = frame * 1.8
  const ring2Rot = -frame * 1.2
  const orchRot  = frame * 1.5

  // Shared zone styles
  const zone2Style = {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
  }

  // ── Badge pill (shared style) ─────────────────────────────────────────────
  const pillStyle = {
    display: 'inline-block',
    padding: '7px 18px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.07)',
    fontFamily: "'Syne Mono', monospace",
    fontSize: '0.62rem',
    color: 'rgba(255,255,255,0.72)',
    letterSpacing: '0.07em',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    whiteSpace: 'nowrap',
  }

  return (
    <AbsoluteFill style={{
      background: BG,
      opacity: masterOp,
      display: 'flex',
      flexDirection: 'column',
      padding: 24,
      boxSizing: 'border-box',
      gap: 0,
    }}>

      {/* ══════════════ PHASE 1: AGENTE AUTÓNOMO ══════════════ */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: 24, boxSizing: 'border-box', opacity: phase1Op }}>

        {/* ZONA 1 — Header (72px) */}
        <div style={{
          height: 72,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          opacity: p1HeadOp,
        }}>
          <div style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.50)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>Agente Autónomo</div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.82)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}>Un agente que actúa solo, conectado con tus herramientas</div>
        </div>

        {/* ZONA 2 — Animación central (flex: 1 → ~308px) */}
        <div style={zone2Style}>

          {/* Ambient glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 60% 50% at 50% 48%, ${C[1]}0D 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* SVG connector lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
            viewBox={`0 0 ${Z2W} ${Z2H}`}>
            <defs>
              <filter id="lg1" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {TOOLS.map((t, i) => (
              <line key={`gs${i}`} x1={cx} y1={cy} x2={t.x} y2={t.y}
                stroke={t.color} strokeWidth={3}
                strokeDasharray={toolLineLens[i]}
                strokeDashoffset={toolLineLens[i] * (1 - tLines[i])}
                opacity={tGlows[i] * 0.12} filter="url(#lg1)" />
            ))}
            {TOOLS.map((t, i) => (
              <line key={i} x1={cx} y1={cy} x2={t.x} y2={t.y}
                stroke={tGlows[i] > 0.05 ? t.color : 'rgba(255,255,255,0.06)'}
                strokeWidth={1}
                strokeDasharray={toolLineLens[i]}
                strokeDashoffset={toolLineLens[i] * (1 - tLines[i])}
                opacity={0.12 + tGlows[i] * 0.42} />
            ))}
          </svg>

          {/* Pulse rings on activation */}
          {TOOLS.map((t, i) => (
            <PulseRing key={i} t={pRings[i]} x={t.x} y={t.y} color={t.color} baseSize={nodeSize + 10} />
          ))}

          {/* Central brain */}
          <div style={{
            position: 'absolute',
            left: cx - brainHalf, top: cy - brainHalf,
            width: brainSize, height: brainSize,
            transform: `scale(${brainFinal})`,
            transformOrigin: 'center',
          }}>
            <div style={{
              position: 'absolute', left: -16, top: -16,
              width: brainSize + 32, height: brainSize + 32,
              borderRadius: 999,
              border: `1px solid ${C[1]}42`,
              transform: `rotate(${ring1Rot}deg)`,
              transformOrigin: 'center',
            }}>
              <div style={{
                position: 'absolute', top: -3, left: '50%',
                width: 7, height: 7, borderRadius: 999,
                background: C[1],
                boxShadow: `0 0 8px ${C[1]}, 0 0 16px ${C[1]}88`,
                transform: 'translateX(-50%)',
              }} />
            </div>
            <div style={{
              position: 'absolute', left: -8, top: -8,
              width: brainSize + 16, height: brainSize + 16,
              borderRadius: 999,
              border: `1px dashed ${C[1]}25`,
              transform: `rotate(${ring2Rot}deg)`,
              transformOrigin: 'center',
            }} />
            <div style={{
              width: brainSize, height: brainSize,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${C[1]}55, ${C[1]}20)`,
              border: `2px solid ${C[1]}CC`,
              boxShadow: `0 0 28px ${C[1]}70, 0 0 60px ${C[1]}30, inset 0 1px 0 rgba(255,255,255,0.15)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>🧠</div>
          </div>

          {/* Tool nodes */}
          {TOOLS.map((t, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: t.x - nodeHalf,
              top: t.y - nodeHalf,
              width: nodeSize,
            }}>
              {tGlows[i] > 0.05 && (
                <div style={{
                  position: 'absolute', left: -5, top: -5,
                  width: nodeSize + 10, height: nodeSize + 10,
                  borderRadius: 12,
                  border: `1px solid ${t.color}`,
                  opacity: tGlows[i] * 0.45,
                  boxShadow: `0 0 12px ${t.color}50`,
                }} />
              )}
              <div style={{
                width: nodeSize, height: nodeSize,
                borderRadius: 11,
                background: tGlows[i] > 0.05
                  ? `linear-gradient(135deg, ${t.color}45, ${t.color}18)`
                  : 'rgba(255,255,255,0.025)',
                border: `1.5px solid ${tGlows[i] > 0.05 ? t.color + 'BB' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: tGlows[i] > 0.05
                  ? `0 0 20px ${t.color}55, 0 0 40px ${t.color}22, inset 0 1px 0 rgba(255,255,255,0.12)`
                  : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
                opacity: 0.15 + tGlows[i] * 0.85,
              }}>{t.icon}</div>

              <div style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.55rem',
                color: tGlows[i] > 0.05 ? t.color : 'rgba(255,255,255,0.35)',
                textAlign: 'center', marginTop: 4,
                letterSpacing: '0.06em', whiteSpace: 'nowrap',
              }}>{t.label}</div>

              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.78)',
                textAlign: 'center', marginTop: 2,
                opacity: tTexts[i],
                whiteSpace: 'nowrap',
              }}>{t.text}</div>
            </div>
          ))}

          {/* Particle trails */}
          {TOOLS.map((t, i) => (
            <Particles key={i} t={tParts[i]} fromX={cx} fromY={cy} toX={t.x} toY={t.y} color={t.color} />
          ))}
        </div>

        {/* ZONA 3 — Badge (44px) */}
        <div style={{
          height: 44,
          flexShrink: 0,
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: p1BadgeOp,
        }}>
          <span style={pillStyle}>
            ⚡{'  '}
            <span style={{ color: C[4] }}>5 herramientas</span>
            {'  ·  Autónomo  ·  '}
            <span style={{ color: C[4] }}>0 intervención humana</span>
          </span>
        </div>
      </div>
      {/* ══ END PHASE 1 ══ */}


      {/* ══════════════ PHASE 2: ENJAMBRE MULTIAGENTE ══════════════ */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: 24, boxSizing: 'border-box', opacity: phase2Op }}>

        {/* ZONA 1 — Header (72px) */}
        <div style={{
          height: 72,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          opacity: p2HeadOp,
        }}>
          <div style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.50)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>Enjambre Multiagente</div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.82)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}>Múltiples agentes coordinados jerárquicamente</div>
        </div>

        {/* ZONA 2 — Animación central (flex: 1 → ~308px) */}
        <div style={zone2Style}>

          {/* Ambient glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 60% 50% at 50% 17%, ${C[1]}0D 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* SVG lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
            viewBox={`0 0 ${Z2W} ${Z2H}`}>
            <defs>
              <filter id="lg2" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {AGENTS.map((a, i) => (
              <line key={`gs${i}`} x1={ox} y1={orchFromY} x2={a.x} y2={agentToY(a)}
                stroke={a.color} strokeWidth={3}
                strokeDasharray={orchLineLens[i]}
                strokeDashoffset={orchLineLens[i] * (1 - oLines[i])}
                opacity={oLines[i] * 0.12} filter="url(#lg2)" />
            ))}
            {AGENTS.map((a, i) => (
              <line key={i} x1={ox} y1={orchFromY} x2={a.x} y2={agentToY(a)}
                stroke={oLines[i] > 0.05 ? a.color : 'rgba(255,255,255,0.06)'}
                strokeWidth={1}
                strokeDasharray={orchLineLens[i]}
                strokeDashoffset={orchLineLens[i] * (1 - oLines[i])}
                opacity={0.12 + oLines[i] * 0.42} />
            ))}
          </svg>

          {/* Orchestrator */}
          <div style={{
            position: 'absolute',
            left: ox - orchHalf, top: oy - orchHalf,
            transform: `scale(${orchFinal})`,
            transformOrigin: 'center',
          }}>
            <div style={{
              position: 'absolute', left: -18, top: -18,
              width: orchSize + 36, height: orchSize + 36,
              borderRadius: 999,
              border: `1px solid ${C[1]}45`,
              transform: `rotate(${orchRot}deg)`,
              transformOrigin: 'center',
            }}>
              <div style={{
                position: 'absolute', top: -3, left: '50%',
                width: 8, height: 8, borderRadius: 999,
                background: C[1],
                boxShadow: `0 0 10px ${C[1]}, 0 0 20px ${C[1]}88`,
                transform: 'translateX(-50%)',
              }} />
              <div style={{
                position: 'absolute', bottom: -3, left: '50%',
                width: 5, height: 5, borderRadius: 999,
                background: C[2],
                boxShadow: `0 0 8px ${C[2]}`,
                transform: 'translateX(-50%)',
              }} />
            </div>
            <div style={{
              position: 'absolute', left: -8, top: -8,
              width: orchSize + 16, height: orchSize + 16,
              borderRadius: 999,
              border: `1px dashed ${C[1]}22`,
              transform: `rotate(${-orchRot * 0.7}deg)`,
              transformOrigin: 'center',
            }} />
            <div style={{
              width: orchSize, height: orchSize,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${C[1]}60, ${C[1]}22)`,
              border: `2px solid ${C[1]}CC`,
              boxShadow: `0 0 32px ${C[1]}75, 0 0 70px ${C[1]}35, inset 0 1px 0 rgba(255,255,255,0.18)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>🧠</div>
            <div style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.55rem', color: C[1],
              textAlign: 'center', marginTop: 4,
              letterSpacing: '0.08em', whiteSpace: 'nowrap',
            }}>ORQUESTADOR</div>
          </div>

          {/* Sub-agents */}
          {AGENTS.map((a, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: a.x - agentHalf, top: a.y - agentHalf,
              transform: `scale(${aScales[i]})`,
              transformOrigin: 'center top',
            }}>
              <PulseRing t={aPRings[i]} x={agentHalf} y={agentHalf} color={a.color} baseSize={agentSize + 8} />
              <div style={{
                position: 'absolute', left: -5, top: -5,
                width: agentSize + 10, height: agentSize + 10,
                borderRadius: 13,
                border: `1px solid ${a.color}50`,
                opacity: aScales[i],
                boxShadow: `0 0 16px ${a.color}30`,
              }} />
              <div style={{
                width: agentSize, height: agentSize,
                borderRadius: 11,
                background: `linear-gradient(135deg, ${a.color}45, ${a.color}18)`,
                border: `1.5px solid ${a.color}BB`,
                boxShadow: `0 0 22px ${a.color}55, 0 0 44px ${a.color}25, inset 0 1px 0 rgba(255,255,255,0.13)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>{a.icon}</div>

              <div style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.55rem', color: a.color,
                textAlign: 'center', marginTop: 4,
                letterSpacing: '0.06em', whiteSpace: 'nowrap',
              }}>{a.label}</div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 5 }}>
                <span style={{ fontSize: 15, opacity: miniOps[i][0] }}>{a.miniTools[0]}</span>
                <span style={{ fontSize: 15, opacity: miniOps[i][1] }}>{a.miniTools[1]}</span>
              </div>
            </div>
          ))}

          {/* Particle trails */}
          {AGENTS.map((a, i) => (
            <Particles key={`d${i}`} t={downPs[i]} fromX={ox} fromY={orchFromY} toX={a.x} toY={agentToY(a)} color={a.color} />
          ))}
          {AGENTS.map((a, i) => (
            <Particles key={`u${i}`} t={upPs[i]} fromX={a.x} fromY={agentToY(a)} toX={ox} toY={orchFromY} color={a.color} />
          ))}
        </div>

        {/* ZONA 3 — Badge (44px) */}
        <div style={{
          height: 44,
          flexShrink: 0,
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: p2BadgeOp,
        }}>
          <span style={pillStyle}>
            🤖{'  '}
            <span style={{ color: C[1] }}>3 agentes</span>
            {'  ·  Coordinados en tiempo real  ·  '}
            <span style={{ color: C[1] }}>24/7</span>
          </span>
        </div>
      </div>
      {/* ══ END PHASE 2 ══ */}

    </AbsoluteFill>
  )
}
