import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

const BG = '#07070F'
const C = ['#4361EE', '#7209B7', '#F72585', '#FB5607', '#22c55e']

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const springEase = Easing.bezier(0.34, 1.56, 0.64, 1)
const flowEase = Easing.bezier(0.16, 1, 0.3, 1)

const cx = 225, cy = 102
const ox = 225, oy = 47

const brainSize = 52, brainHalf = 26
const orchSize = 60, orchHalf = 30
const nodeSize = 40, nodeHalf = 20
const agentSize = 48, agentHalf = 24

const TOOLS = [
  { icon: '✉',  label: 'EMAIL',     text: 'Solicitud recibida',   color: C[0], x: 225, y: 12  },
  { icon: '📊', label: 'CRM',       text: 'Lead #1247 creado',    color: C[1], x: 314, y: 74  },
  { icon: '📅', label: 'AGENDA',    text: 'Cita agendada',        color: C[2], x: 280, y: 178 },
  { icon: '💬', label: 'WHATSAPP',  text: 'Recordatorio enviado', color: C[3], x: 170, y: 178 },
  { icon: '📈', label: 'ANALYTICS', text: 'Informe generado',     color: C[4], x: 136, y: 74  },
]

const AGENTS = [
  { icon: '🎯', label: 'CAPTACIÓN', color: C[0], x: 100, y: 156, miniTools: ['✉', '📅'] },
  { icon: '📊', label: 'CRM',       color: C[1], x: 225, y: 156, miniTools: ['📊', '📈'] },
  { icon: '💬', label: 'SOPORTE',   color: C[2], x: 350, y: 156, miniTools: ['💬', '✉'] },
]

const toolLineLens = TOOLS.map(t => Math.hypot(t.x - cx, t.y - cy))
const orchLineLens = AGENTS.map(a =>
  Math.hypot(a.x - ox, (a.y - agentHalf) - (oy + orchHalf))
)

function fi(frame, a, b) {
  return interpolate(frame, [a, b], [0, 1], clamp)
}

// 3-particle trail — lead + 2 trailing dots
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
        const opacity = fade * (1 - i * 0.3)
        const sz = sizes[i]
        return (
          <div key={i} style={{
            position: 'absolute',
            left: x - sz / 2, top: y - sz / 2,
            width: sz, height: sz,
            borderRadius: 999,
            background: color,
            opacity,
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

// Expanding ring emitted on node activation
function PulseRing({ t, x, y, color, baseSize = 46 }) {
  if (t <= 0 || t >= 1) return null
  const scale = interpolate(t, [0, 1], [0.9, 2.4], clamp)
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

  // Global
  const fadeIn   = fi(frame, 0, 20)
  const fadeOut  = interpolate(frame, [285, 300], [1, 0], clamp)
  const masterOp = fadeIn * fadeOut

  const phase1Op = interpolate(frame, [120, 150], [1, 0], clamp)
  const phase2Op = interpolate(frame, [148, 168], [0, 1], clamp)

  // Phase 1 headers & badge
  const p1HeadOp  = fi(frame, 0, 16)
  const p1BadgeOp = fi(frame, 96, 110)

  // Brain
  const brainScale = interpolate(frame, [8, 22],  [0, 1], { easing: springEase, ...clamp })
  const brainPulse = interpolate((frame - 8) % 30, [0, 15, 30], [1, 1.12, 1], clamp)
  const brainFinal = brainScale * brainPulse

  // Tool line draw
  const tLine0 = fi(frame, 20,  32)
  const tLine1 = fi(frame, 44,  56)
  const tLine2 = fi(frame, 68,  80)
  const tLine3 = fi(frame, 92,  104)
  const tLine4 = fi(frame, 116, 128)

  // Tool glow
  const tGlow0 = fi(frame, 38,  50)
  const tGlow1 = fi(frame, 62,  74)
  const tGlow2 = fi(frame, 86,  98)
  const tGlow3 = fi(frame, 110, 122)
  const tGlow4 = fi(frame, 134, 146)

  // Tool status text
  const tText0 = fi(frame, 48,  60)
  const tText1 = fi(frame, 72,  84)
  const tText2 = fi(frame, 96,  108)
  const tText3 = fi(frame, 120, 132)
  const tText4 = fi(frame, 144, 156)

  // Particle t
  const tPart0 = interpolate(frame, [32,  60],  [0, 1], { easing: flowEase, ...clamp })
  const tPart1 = interpolate(frame, [56,  84],  [0, 1], { easing: flowEase, ...clamp })
  const tPart2 = interpolate(frame, [80,  108], [0, 1], { easing: flowEase, ...clamp })
  const tPart3 = interpolate(frame, [104, 132], [0, 1], { easing: flowEase, ...clamp })
  const tPart4 = interpolate(frame, [128, 156], [0, 1], { easing: flowEase, ...clamp })

  // Pulse rings per tool (one-shot on activation)
  const pRing0 = fi(frame, 38,  62)
  const pRing1 = fi(frame, 62,  86)
  const pRing2 = fi(frame, 86,  110)
  const pRing3 = fi(frame, 110, 134)
  const pRing4 = fi(frame, 134, 158)

  // Phase 2 headers & badge
  const p2HeadOp  = fi(frame, 148, 164)
  const p2BadgeOp = fi(frame, 240, 256)

  // Orchestrator
  const orchScale = interpolate(frame, [155, 172], [0, 1], { easing: springEase, ...clamp })
  const orchPulse = interpolate((frame - 155) % 30, [0, 15, 30], [1, 1.08, 1], clamp)
  const orchFinal = orchScale * orchPulse

  // Orch→agent lines
  const oLine0 = fi(frame, 168, 182)
  const oLine1 = fi(frame, 178, 194)
  const oLine2 = fi(frame, 188, 204)

  // Agent drop-in
  const aScale0 = interpolate(frame, [180, 195], [0, 1], { easing: springEase, ...clamp })
  const aScale1 = interpolate(frame, [192, 207], [0, 1], { easing: springEase, ...clamp })
  const aScale2 = interpolate(frame, [204, 219], [0, 1], { easing: springEase, ...clamp })

  // Down particles (orch → agents)
  const down0 = interpolate(frame, [182, 210], [0, 1], { easing: flowEase, ...clamp })
  const down1 = interpolate(frame, [190, 218], [0, 1], { easing: flowEase, ...clamp })
  const down2 = interpolate(frame, [198, 226], [0, 1], { easing: flowEase, ...clamp })

  // Up particles (agents → orch)
  const up0 = interpolate(frame, [218, 246], [0, 1], { easing: flowEase, ...clamp })
  const up1 = interpolate(frame, [226, 254], [0, 1], { easing: flowEase, ...clamp })
  const up2 = interpolate(frame, [234, 262], [0, 1], { easing: flowEase, ...clamp })

  // Mini tool icons
  const mt00 = fi(frame, 210, 222)
  const mt01 = fi(frame, 218, 230)
  const mt10 = fi(frame, 216, 228)
  const mt11 = fi(frame, 224, 236)
  const mt20 = fi(frame, 222, 234)
  const mt21 = fi(frame, 230, 242)

  // Agent pulse rings
  const aPRing0 = fi(frame, 180, 204)
  const aPRing1 = fi(frame, 192, 216)
  const aPRing2 = fi(frame, 204, 228)

  // Arrays
  const tLines  = [tLine0, tLine1, tLine2, tLine3, tLine4]
  const tGlows  = [tGlow0, tGlow1, tGlow2, tGlow3, tGlow4]
  const tTexts  = [tText0, tText1, tText2, tText3, tText4]
  const tParts  = [tPart0, tPart1, tPart2, tPart3, tPart4]
  const pRings  = [pRing0, pRing1, pRing2, pRing3, pRing4]
  const oLines  = [oLine0, oLine1, oLine2]
  const aScales = [aScale0, aScale1, aScale2]
  const downPs  = [down0,  down1,  down2]
  const upPs    = [up0,    up1,    up2]
  const miniOps = [[mt00, mt01], [mt10, mt11], [mt20, mt21]]
  const aPRings = [aPRing0, aPRing1, aPRing2]

  const orchFromY = oy + orchHalf
  const agentToY  = (a) => a.y - agentHalf

  // Orbital ring rotations (frame-driven, works in Remotion render)
  const ring1Rot  = frame * 1.8
  const ring2Rot  = -frame * 1.2
  const orchRot   = frame * 1.5

  return (
    <AbsoluteFill style={{ background: BG, opacity: masterOp }}>

      {/* Ambient background glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(67,97,238,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) scale(1.35)',
        transformOrigin: 'center center',
        width: 450, height: 310,
      }}>

        {/* ══════════════ PHASE 1: AGENTE AUTÓNOMO ══════════════ */}
        <div style={{ position: 'absolute', inset: 0, opacity: phase1Op }}>

          <div style={{ opacity: p1HeadOp, textAlign: 'center', marginBottom: 10 }}>
            <div style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: 13, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em',
            }}>AGENTE AUTÓNOMO</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, color: 'rgba(255,255,255,0.75)', marginTop: 4,
            }}>Un agente que actúa solo, conectado con tus herramientas</div>
          </div>

          <div style={{ position: 'relative', height: 220 }}>

            {/* Lines: soft glow layer + sharp layer */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 450 220">
              <defs>
                <filter id="lineGlow1" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {TOOLS.map((t, i) => (
                <line key={`sg-${i}`}
                  x1={cx} y1={cy} x2={t.x} y2={t.y}
                  stroke={t.color} strokeWidth={3}
                  strokeDasharray={toolLineLens[i]}
                  strokeDashoffset={toolLineLens[i] * (1 - tLines[i])}
                  opacity={tGlows[i] * 0.10}
                  filter="url(#lineGlow1)"
                />
              ))}
              {TOOLS.map((t, i) => (
                <line key={i}
                  x1={cx} y1={cy} x2={t.x} y2={t.y}
                  stroke={tGlows[i] > 0.05 ? t.color : 'rgba(255,255,255,0.06)'}
                  strokeWidth={1}
                  strokeDasharray={toolLineLens[i]}
                  strokeDashoffset={toolLineLens[i] * (1 - tLines[i])}
                  opacity={0.12 + tGlows[i] * 0.40}
                />
              ))}
            </svg>

            {/* Pulse rings on tool activation */}
            {TOOLS.map((t, i) => (
              <PulseRing key={i} t={pRings[i]} x={t.x} y={t.y} color={t.color} baseSize={nodeSize + 6} />
            ))}

            {/* Central brain with orbital rings */}
            <div style={{
              position: 'absolute',
              left: cx - brainHalf, top: cy - brainHalf,
              width: brainSize, height: brainSize,
              transform: `scale(${brainFinal})`,
              transformOrigin: 'center',
            }}>
              {/* Outer orbital ring */}
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
                  width: 6, height: 6, borderRadius: 999,
                  background: C[1],
                  boxShadow: `0 0 8px ${C[1]}, 0 0 16px ${C[1]}88`,
                  transform: 'translateX(-50%)',
                }} />
              </div>
              {/* Inner dashed ring */}
              <div style={{
                position: 'absolute', left: -8, top: -8,
                width: brainSize + 16, height: brainSize + 16,
                borderRadius: 999,
                border: `1px dashed ${C[1]}25`,
                transform: `rotate(${ring2Rot}deg)`,
                transformOrigin: 'center',
              }} />
              {/* Brain box */}
              <div style={{
                width: brainSize, height: brainSize,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${C[1]}55, ${C[1]}20)`,
                border: `2px solid ${C[1]}CC`,
                boxShadow: `0 0 28px ${C[1]}70, 0 0 60px ${C[1]}30, inset 0 1px 0 rgba(255,255,255,0.15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>🧠</div>
            </div>

            {/* Tool nodes */}
            {TOOLS.map((t, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: t.x - nodeHalf, top: t.y - nodeHalf,
                width: nodeSize,
              }}>
                {/* Outer glow ring when active */}
                {tGlows[i] > 0.05 && (
                  <div style={{
                    position: 'absolute', left: -5, top: -5,
                    width: nodeSize + 10, height: nodeSize + 10,
                    borderRadius: 14,
                    border: `1px solid ${t.color}`,
                    opacity: tGlows[i] * 0.45,
                    boxShadow: `0 0 14px ${t.color}50`,
                  }} />
                )}
                <div style={{
                  width: nodeSize, height: nodeSize,
                  borderRadius: 10,
                  background: tGlows[i] > 0.05
                    ? `linear-gradient(135deg, ${t.color}45, ${t.color}18)`
                    : 'rgba(255,255,255,0.025)',
                  border: `1.5px solid ${tGlows[i] > 0.05 ? t.color + 'CC' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: tGlows[i] > 0.05
                    ? `0 0 22px ${t.color}60, 0 0 44px ${t.color}25, inset 0 1px 0 rgba(255,255,255,0.12)`
                    : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15,
                  opacity: 0.15 + tGlows[i] * 0.85,
                }}>{t.icon}</div>

                <div style={{
                  fontFamily: "'Syne Mono', monospace", fontSize: 10,
                  color: tGlows[i] > 0.05 ? t.color : 'rgba(255,255,255,0.35)',
                  textAlign: 'center', marginTop: 3, letterSpacing: '0.06em', whiteSpace: 'nowrap',
                }}>{t.label}</div>

                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                  color: 'rgba(255,255,255,0.82)',
                  textAlign: 'center', marginTop: 2, opacity: tTexts[i],
                  whiteSpace: 'nowrap', width: 84, marginLeft: (nodeSize - 84) / 2,
                }}>{t.text}</div>
              </div>
            ))}

            {/* 3-particle trails */}
            {TOOLS.map((t, i) => (
              <Particles key={i} t={tParts[i]} fromX={cx} fromY={cy} toX={t.x} toY={t.y} color={t.color} />
            ))}
          </div>

          <div style={{ opacity: p1BadgeOp, textAlign: 'center', marginTop: 4 }}>
            <span style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.06)',
              fontFamily: "'Syne Mono', monospace", fontSize: 13,
              color: 'rgba(255,255,255,0.7)', letterSpacing: '0.07em',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}>
              ⚡{'  '}
              <span style={{ color: C[4] }}>5 herramientas</span>
              {'  ·  Autónomo  ·  '}
              <span style={{ color: C[4] }}>0 intervención humana</span>
            </span>
          </div>
        </div>
        {/* ══════════════ END PHASE 1 ══════════════ */}


        {/* ══════════════ PHASE 2: ENJAMBRE MULTIAGENTE ══════════════ */}
        <div style={{ position: 'absolute', inset: 0, opacity: phase2Op }}>

          <div style={{ opacity: p2HeadOp, textAlign: 'center', marginBottom: 10 }}>
            <div style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: 13, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em',
            }}>ENJAMBRE MULTIAGENTE</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16, color: 'rgba(255,255,255,0.75)', marginTop: 4,
            }}>Múltiples agentes coordinados jerárquicamente</div>
          </div>

          <div style={{ position: 'relative', height: 220 }}>

            {/* Lines: soft glow + sharp */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 450 220">
              <defs>
                <filter id="lineGlow2" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {AGENTS.map((a, i) => (
                <line key={`sg-${i}`}
                  x1={ox} y1={orchFromY} x2={a.x} y2={agentToY(a)}
                  stroke={a.color} strokeWidth={3}
                  strokeDasharray={orchLineLens[i]}
                  strokeDashoffset={orchLineLens[i] * (1 - oLines[i])}
                  opacity={oLines[i] * 0.10}
                  filter="url(#lineGlow2)"
                />
              ))}
              {AGENTS.map((a, i) => (
                <line key={i}
                  x1={ox} y1={orchFromY} x2={a.x} y2={agentToY(a)}
                  stroke={oLines[i] > 0.05 ? a.color : 'rgba(255,255,255,0.06)'}
                  strokeWidth={1}
                  strokeDasharray={orchLineLens[i]}
                  strokeDashoffset={orchLineLens[i] * (1 - oLines[i])}
                  opacity={0.12 + oLines[i] * 0.40}
                />
              ))}
            </svg>

            {/* Orchestrator with orbital ring */}
            <div style={{
              position: 'absolute',
              left: ox - orchHalf, top: oy - orchHalf,
              transform: `scale(${orchFinal})`,
              transformOrigin: 'center',
            }}>
              {/* Outer orbital ring with two dots */}
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
                  width: 7, height: 7, borderRadius: 999,
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
              {/* Inner dashed ring */}
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
                borderRadius: 16,
                background: `linear-gradient(135deg, ${C[1]}60, ${C[1]}22)`,
                border: `2px solid ${C[1]}CC`,
                boxShadow: `0 0 32px ${C[1]}75, 0 0 70px ${C[1]}35, inset 0 1px 0 rgba(255,255,255,0.18)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26,
              }}>🧠</div>
              <div style={{
                fontFamily: "'Syne Mono', monospace", fontSize: 11, color: C[1],
                textAlign: 'center', marginTop: 4, letterSpacing: '0.08em', whiteSpace: 'nowrap',
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
                {/* Pulse ring on drop-in */}
                <PulseRing t={aPRings[i]} x={agentHalf} y={agentHalf} color={a.color} baseSize={agentSize + 4} />
                {/* Outer glow ring */}
                <div style={{
                  position: 'absolute', left: -5, top: -5,
                  width: agentSize + 10, height: agentSize + 10,
                  borderRadius: 16,
                  border: `1px solid ${a.color}50`,
                  opacity: aScales[i],
                  boxShadow: `0 0 18px ${a.color}30`,
                }} />
                <div style={{
                  width: agentSize, height: agentSize,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${a.color}45, ${a.color}18)`,
                  border: `1.5px solid ${a.color}CC`,
                  boxShadow: `0 0 24px ${a.color}60, 0 0 48px ${a.color}28, inset 0 1px 0 rgba(255,255,255,0.14)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>{a.icon}</div>

                <div style={{
                  fontFamily: "'Syne Mono', monospace", fontSize: 10, color: a.color,
                  textAlign: 'center', marginTop: 3, letterSpacing: '0.06em', whiteSpace: 'nowrap',
                }}>{a.label}</div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 5 }}>
                  <span style={{ fontSize: 16, opacity: miniOps[i][0] }}>{a.miniTools[0]}</span>
                  <span style={{ fontSize: 16, opacity: miniOps[i][1] }}>{a.miniTools[1]}</span>
                </div>
              </div>
            ))}

            {/* Down particle trails */}
            {AGENTS.map((a, i) => (
              <Particles key={`d${i}`} t={downPs[i]} fromX={ox} fromY={orchFromY} toX={a.x} toY={agentToY(a)} color={a.color} />
            ))}

            {/* Up particle trails */}
            {AGENTS.map((a, i) => (
              <Particles key={`u${i}`} t={upPs[i]} fromX={a.x} fromY={agentToY(a)} toX={ox} toY={orchFromY} color={a.color} />
            ))}
          </div>

          <div style={{ opacity: p2BadgeOp, textAlign: 'center', marginTop: 4 }}>
            <span style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.06)',
              fontFamily: "'Syne Mono', monospace", fontSize: 13,
              color: 'rgba(255,255,255,0.7)', letterSpacing: '0.07em',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}>
              🤖{'  '}
              <span style={{ color: C[1] }}>3 agentes</span>
              {'  ·  Coordinados en tiempo real  ·  '}
              <span style={{ color: C[1] }}>24/7</span>
            </span>
          </div>
        </div>
        {/* ══════════════ END PHASE 2 ══════════════ */}

      </div>
    </AbsoluteFill>
  )
}
