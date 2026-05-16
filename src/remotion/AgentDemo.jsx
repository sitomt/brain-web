import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

const BG = '#0D0D10'
const C = ['#4361EE', '#7209B7', '#F72585', '#FB5607', '#22c55e']

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const springEase = Easing.bezier(0.34, 1.56, 0.64, 1)
const flowEase = Easing.bezier(0.16, 1, 0.3, 1)

// ── Geometry (defined outside component — static values) ──────────
const cx = 225, cy = 102           // Phase 1: brain center
const ox = 225, oy = 47            // Phase 2: orchestrator center

const brainSize = 52, brainHalf = 26
const orchSize = 60, orchHalf = 30
const nodeSize = 40, nodeHalf = 20
const agentSize = 48, agentHalf = 24

const TOOLS = [
  { icon: '✉',  label: 'EMAIL',     text: 'Solicitud recibida',     color: C[0], x: 225, y: 12 },
  { icon: '📊', label: 'CRM',       text: 'Lead #1247 creado',      color: C[1], x: 314, y: 74 },
  { icon: '📅', label: 'AGENDA',    text: 'Cita agendada',          color: C[2], x: 280, y: 178 },
  { icon: '💬', label: 'WHATSAPP',  text: 'Recordatorio enviado',   color: C[3], x: 170, y: 178 },
  { icon: '📈', label: 'ANALYTICS', text: 'Informe generado',       color: C[4], x: 136, y: 74 },
]

const AGENTS = [
  { icon: '🎯', label: 'CAPTACIÓN', color: C[0], x: 100, y: 156, miniTools: ['✉', '📅'] },
  { icon: '📊', label: 'CRM',       color: C[1], x: 225, y: 156, miniTools: ['📊', '📈'] },
  { icon: '💬', label: 'SOPORTE',   color: C[2], x: 350, y: 156, miniTools: ['💬', '✉'] },
]

// Line lengths for SVG strokeDasharray technique
const toolLineLens = TOOLS.map(t => Math.hypot(t.x - cx, t.y - cy))
const orchLineLens = AGENTS.map(a =>
  Math.hypot(a.x - ox, (a.y - agentHalf) - (oy + orchHalf))
)

function fi(frame, a, b) {
  return interpolate(frame, [a, b], [0, 1], clamp)
}

function Particle({ t, fromX, fromY, toX, toY, color, size = 7 }) {
  if (t <= 0 || t >= 1) return null
  const x = fromX + (toX - fromX) * t
  const y = fromY + (toY - fromY) * t
  const opacity = t < 0.85 ? 1 : interpolate(t, [0.85, 1], [1, 0], clamp)
  return (
    <div style={{
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: 999,
      background: color,
      opacity,
      boxShadow: `0 0 ${size + 5}px ${color}`,
      pointerEvents: 'none',
    }} />
  )
}

export default function AgentDemo() {
  const frame = useCurrentFrame()

  // ── Global ────────────────────────────────────────────────────────
  const fadeIn      = fi(frame, 0, 20)
  const fadeOut     = interpolate(frame, [285, 300], [1, 0], clamp)
  const masterOp    = fadeIn * fadeOut

  const phase1Op    = interpolate(frame, [120, 150], [1, 0], clamp)
  const phase2Op    = interpolate(frame, [148, 168], [0, 1], clamp)

  // ── Phase 1: headers & badge ──────────────────────────────────────
  const p1HeadOp    = fi(frame, 0, 16)
  const p1BadgeOp   = fi(frame, 110, 126)

  // ── Phase 1: central brain ────────────────────────────────────────
  const brainScale  = interpolate(frame, [8, 22], [0, 1], { easing: springEase, ...clamp })
  const brainPulse  = interpolate((frame - 8) % 30, [0, 15, 30], [1, 1.12, 1], clamp)
  const brainFinal  = brainScale * brainPulse

  // ── Phase 1: tool line draw (0→1 = line appears) ─────────────────
  const tLine0 = fi(frame, 20, 32)
  const tLine1 = fi(frame, 44, 56)
  const tLine2 = fi(frame, 68, 80)
  const tLine3 = fi(frame, 92, 104)
  const tLine4 = fi(frame, 116, 128)

  // ── Phase 1: tool node glow ───────────────────────────────────────
  const tGlow0 = fi(frame, 38, 50)
  const tGlow1 = fi(frame, 62, 74)
  const tGlow2 = fi(frame, 86, 98)
  const tGlow3 = fi(frame, 110, 122)
  const tGlow4 = fi(frame, 134, 146)

  // ── Phase 1: tool status text ─────────────────────────────────────
  const tText0 = fi(frame, 48, 60)
  const tText1 = fi(frame, 72, 84)
  const tText2 = fi(frame, 96, 108)
  const tText3 = fi(frame, 120, 132)
  const tText4 = fi(frame, 144, 156)

  // ── Phase 1: particles center → tool (t = 0→1) ───────────────────
  const tPart0 = interpolate(frame, [32, 60],   [0, 1], { easing: flowEase, ...clamp })
  const tPart1 = interpolate(frame, [56, 84],   [0, 1], { easing: flowEase, ...clamp })
  const tPart2 = interpolate(frame, [80, 108],  [0, 1], { easing: flowEase, ...clamp })
  const tPart3 = interpolate(frame, [104, 132], [0, 1], { easing: flowEase, ...clamp })
  const tPart4 = interpolate(frame, [128, 156], [0, 1], { easing: flowEase, ...clamp })

  // ── Phase 2: headers & badge ──────────────────────────────────────
  const p2HeadOp    = fi(frame, 148, 164)
  const p2BadgeOp   = fi(frame, 240, 256)

  // ── Phase 2: orchestrator ─────────────────────────────────────────
  const orchScale   = interpolate(frame, [155, 172], [0, 1], { easing: springEase, ...clamp })
  const orchPulse   = interpolate((frame - 155) % 30, [0, 15, 30], [1, 1.08, 1], clamp)
  const orchFinal   = orchScale * orchPulse

  // ── Phase 2: orch→agent line draw ────────────────────────────────
  const oLine0 = fi(frame, 168, 182)
  const oLine1 = fi(frame, 178, 194)
  const oLine2 = fi(frame, 188, 204)

  // ── Phase 2: agent drop-in ────────────────────────────────────────
  const aScale0 = interpolate(frame, [180, 195], [0, 1], { easing: springEase, ...clamp })
  const aScale1 = interpolate(frame, [192, 207], [0, 1], { easing: springEase, ...clamp })
  const aScale2 = interpolate(frame, [204, 219], [0, 1], { easing: springEase, ...clamp })

  // ── Phase 2: DOWN particles (orch → agents) ───────────────────────
  const down0 = interpolate(frame, [182, 210], [0, 1], { easing: flowEase, ...clamp })
  const down1 = interpolate(frame, [190, 218], [0, 1], { easing: flowEase, ...clamp })
  const down2 = interpolate(frame, [198, 226], [0, 1], { easing: flowEase, ...clamp })

  // ── Phase 2: UP particles (agents → orch) ────────────────────────
  const up0 = interpolate(frame, [218, 246], [0, 1], { easing: flowEase, ...clamp })
  const up1 = interpolate(frame, [226, 254], [0, 1], { easing: flowEase, ...clamp })
  const up2 = interpolate(frame, [234, 262], [0, 1], { easing: flowEase, ...clamp })

  // ── Phase 2: mini-tool icon opacities ────────────────────────────
  const mt00 = fi(frame, 210, 222)
  const mt01 = fi(frame, 218, 230)
  const mt10 = fi(frame, 216, 228)
  const mt11 = fi(frame, 224, 236)
  const mt20 = fi(frame, 222, 234)
  const mt21 = fi(frame, 230, 242)

  // ── Aggregate into arrays (no hook calls inside) ──────────────────
  const tLines  = [tLine0, tLine1, tLine2, tLine3, tLine4]
  const tGlows  = [tGlow0, tGlow1, tGlow2, tGlow3, tGlow4]
  const tTexts  = [tText0, tText1, tText2, tText3, tText4]
  const tParts  = [tPart0, tPart1, tPart2, tPart3, tPart4]

  const oLines  = [oLine0, oLine1, oLine2]
  const aScales = [aScale0, aScale1, aScale2]
  const downPs  = [down0, down1, down2]
  const upPs    = [up0, up1, up2]
  const miniOps = [[mt00, mt01], [mt10, mt11], [mt20, mt21]]

  // Orch connection endpoints in SVG coords
  const orchFromY = oy + orchHalf   // bottom of orchestrator
  const agentToY  = (a) => a.y - agentHalf  // top of each agent

  return (
    <AbsoluteFill style={{ background: BG, opacity: masterOp }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        height: 310,
      }}>

        {/* ══════════════════ PHASE 1: AGENTE AUTÓNOMO ══════════════════ */}
        <div style={{ position: 'absolute', inset: 0, opacity: phase1Op }}>

          {/* Header */}
          <div style={{ opacity: p1HeadOp, textAlign: 'center', marginBottom: 10 }}>
            <div style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: 8,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '0.14em',
            }}>AGENTE AUTÓNOMO</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: 'rgba(255,255,255,0.45)',
              marginTop: 4,
            }}>Un agente que actúa solo, conectado con tus herramientas</div>
          </div>

          {/* Graph: hub-and-spoke */}
          <div style={{ position: 'relative', height: 220 }}>

            {/* SVG connector lines */}
            <svg
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
              viewBox="0 0 450 220"
            >
              {TOOLS.map((t, i) => (
                <line
                  key={i}
                  x1={cx} y1={cy}
                  x2={t.x} y2={t.y}
                  stroke={tGlows[i] > 0.05 ? t.color : 'rgba(255,255,255,0.1)'}
                  strokeWidth={1.5}
                  strokeDasharray={toolLineLens[i]}
                  strokeDashoffset={toolLineLens[i] * (1 - tLines[i])}
                  opacity={0.28 + tGlows[i] * 0.55}
                />
              ))}
            </svg>

            {/* Central brain */}
            <div style={{
              position: 'absolute',
              left: cx - brainHalf,
              top: cy - brainHalf,
              width: brainSize,
              height: brainSize,
              transform: `scale(${brainFinal})`,
              transformOrigin: 'center',
            }}>
              <div style={{
                width: brainSize,
                height: brainSize,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${C[1]}45, ${C[1]}18)`,
                border: `2px solid ${C[1]}`,
                boxShadow: `0 0 22px ${C[1]}65, 0 0 44px ${C[1]}28`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
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
                <div style={{
                  width: nodeSize,
                  height: nodeSize,
                  borderRadius: 10,
                  background: tGlows[i] > 0.05
                    ? `linear-gradient(135deg, ${t.color}38, ${t.color}12)`
                    : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${tGlows[i] > 0.05 ? t.color : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: tGlows[i] > 0.05 ? `0 0 16px ${t.color}55` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  opacity: 0.22 + tGlows[i] * 0.78,
                }}>{t.icon}</div>

                <div style={{
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: 6.5,
                  color: tGlows[i] > 0.05 ? t.color : 'rgba(255,255,255,0.22)',
                  textAlign: 'center',
                  marginTop: 3,
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}>{t.label}</div>

                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 7.5,
                  color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                  marginTop: 2,
                  opacity: tTexts[i],
                  whiteSpace: 'nowrap',
                  width: 84,
                  marginLeft: (nodeSize - 84) / 2,
                }}>{t.text}</div>
              </div>
            ))}

            {/* Particles: center → each tool */}
            <Particle t={tParts[0]} fromX={cx} fromY={cy} toX={TOOLS[0].x} toY={TOOLS[0].y} color={C[0]} />
            <Particle t={tParts[1]} fromX={cx} fromY={cy} toX={TOOLS[1].x} toY={TOOLS[1].y} color={C[1]} />
            <Particle t={tParts[2]} fromX={cx} fromY={cy} toX={TOOLS[2].x} toY={TOOLS[2].y} color={C[2]} />
            <Particle t={tParts[3]} fromX={cx} fromY={cy} toX={TOOLS[3].x} toY={TOOLS[3].y} color={C[3]} />
            <Particle t={tParts[4]} fromX={cx} fromY={cy} toX={TOOLS[4].x} toY={TOOLS[4].y} color={C[4]} />
          </div>

          {/* Badge */}
          <div style={{ opacity: p1BadgeOp, textAlign: 'center', marginTop: 4 }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              fontFamily: "'Syne Mono', monospace",
              fontSize: 9,
              color: 'rgba(255,255,255,0.42)',
              letterSpacing: '0.07em',
            }}>
              ⚡{'  '}
              <span style={{ color: C[4] }}>5 herramientas</span>
              {'  ·  Autónomo  ·  '}
              <span style={{ color: C[4] }}>0 intervención humana</span>
            </span>
          </div>
        </div>
        {/* ══════════════════ END PHASE 1 ══════════════════ */}


        {/* ══════════════════ PHASE 2: ENJAMBRE MULTIAGENTE ══════════════════ */}
        <div style={{ position: 'absolute', inset: 0, opacity: phase2Op }}>

          {/* Header */}
          <div style={{ opacity: p2HeadOp, textAlign: 'center', marginBottom: 10 }}>
            <div style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: 8,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '0.14em',
            }}>ENJAMBRE MULTIAGENTE</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: 'rgba(255,255,255,0.45)',
              marginTop: 4,
            }}>Múltiples agentes coordinados jerárquicamente</div>
          </div>

          {/* Graph: hierarchy tree */}
          <div style={{ position: 'relative', height: 220 }}>

            {/* SVG connector lines: orch → agents */}
            <svg
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
              viewBox="0 0 450 220"
            >
              {AGENTS.map((a, i) => (
                <line
                  key={i}
                  x1={ox} y1={orchFromY}
                  x2={a.x} y2={agentToY(a)}
                  stroke={oLines[i] > 0.05 ? a.color : 'rgba(255,255,255,0.1)'}
                  strokeWidth={1.5}
                  strokeDasharray={orchLineLens[i]}
                  strokeDashoffset={orchLineLens[i] * (1 - oLines[i])}
                  opacity={0.28 + oLines[i] * 0.55}
                />
              ))}
            </svg>

            {/* Orchestrator */}
            <div style={{
              position: 'absolute',
              left: ox - orchHalf,
              top: oy - orchHalf,
              transform: `scale(${orchFinal})`,
              transformOrigin: 'center',
            }}>
              <div style={{
                width: orchSize,
                height: orchSize,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${C[1]}50, ${C[1]}20)`,
                border: `2px solid ${C[1]}`,
                boxShadow: `0 0 26px ${C[1]}70, 0 0 52px ${C[1]}32`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
              }}>🧠</div>
              <div style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: 7,
                color: C[1],
                textAlign: 'center',
                marginTop: 4,
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}>ORQUESTADOR</div>
            </div>

            {/* Sub-agents */}
            {AGENTS.map((a, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: a.x - agentHalf,
                top: a.y - agentHalf,
                transform: `scale(${aScales[i]})`,
                transformOrigin: 'center top',
              }}>
                <div style={{
                  width: agentSize,
                  height: agentSize,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${a.color}38, ${a.color}14)`,
                  border: `1.5px solid ${a.color}`,
                  boxShadow: `0 0 18px ${a.color}55`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}>{a.icon}</div>

                <div style={{
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: 6.5,
                  color: a.color,
                  textAlign: 'center',
                  marginTop: 3,
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}>{a.label}</div>

                {/* Mini tool icons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 4,
                  marginTop: 5,
                }}>
                  <span style={{ fontSize: 12, opacity: miniOps[i][0] }}>{a.miniTools[0]}</span>
                  <span style={{ fontSize: 12, opacity: miniOps[i][1] }}>{a.miniTools[1]}</span>
                </div>
              </div>
            ))}

            {/* DOWN particles: orch → agents (tareas) */}
            <Particle t={downPs[0]} fromX={ox} fromY={orchFromY} toX={AGENTS[0].x} toY={agentToY(AGENTS[0])} color={C[0]} />
            <Particle t={downPs[1]} fromX={ox} fromY={orchFromY} toX={AGENTS[1].x} toY={agentToY(AGENTS[1])} color={C[1]} />
            <Particle t={downPs[2]} fromX={ox} fromY={orchFromY} toX={AGENTS[2].x} toY={agentToY(AGENTS[2])} color={C[2]} />

            {/* UP particles: agents → orch (resultados) */}
            <Particle t={upPs[0]} fromX={AGENTS[0].x} fromY={agentToY(AGENTS[0])} toX={ox} toY={orchFromY} color={C[0]} />
            <Particle t={upPs[1]} fromX={AGENTS[1].x} fromY={agentToY(AGENTS[1])} toX={ox} toY={orchFromY} color={C[1]} />
            <Particle t={upPs[2]} fromX={AGENTS[2].x} fromY={agentToY(AGENTS[2])} toX={ox} toY={orchFromY} color={C[2]} />
          </div>

          {/* Badge */}
          <div style={{ opacity: p2BadgeOp, textAlign: 'center', marginTop: 4 }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              fontFamily: "'Syne Mono', monospace",
              fontSize: 9,
              color: 'rgba(255,255,255,0.42)',
              letterSpacing: '0.07em',
            }}>
              🤖{'  '}
              <span style={{ color: C[1] }}>3 agentes</span>
              {'  ·  Coordinados en tiempo real  ·  '}
              <span style={{ color: C[1] }}>24/7</span>
            </span>
          </div>
        </div>
        {/* ══════════════════ END PHASE 2 ══════════════════ */}

      </div>
    </AbsoluteFill>
  )
}
