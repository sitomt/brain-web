import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

/**
 * ALTERNATIVA 2 — ChatbotDemo (Tu Recepcionista)  →  "Tres canales a la vez"
 *
 * En vez de una sola conversación, la recepcionista atiende TRES canales en
 * paralelo (WhatsApp, Instagram, Web) a ritmos distintos. Cada conversación
 * acaba soltando un token que cae al CRM compartido de abajo, que se va
 * llenando, mientras "En espera" se mantiene en 0. Demuestra la promesa real:
 * "ni un cliente sin atender · cada conversación acaba en cita/pedido/lead y
 * la registra en tu CRM".
 *
 * 640×460 · 300 frames @ 30fps (loop).
 */

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const IG = 'linear-gradient(135deg,#F72585,#FB5607,#7209B7)'
const GREEN = '#22c55e'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const SOFT = Easing.bezier(0.16, 1, 0.3, 1)
const SPRING = Easing.bezier(0.34, 1.56, 0.64, 1)
const ci = (f, i, o, easing) => interpolate(f, i, o, { ...clamp, easing })

// Geometría fija (640×460)
const PAD = 16
const TOP = 70           // zona cabecera
const CRM_Y = 360        // borde superior de la barra CRM
const LANE_W = (640 - PAD * 2 - 24) / 3   // 24 = 2 huecos de 12
const CX = [0, 1, 2].map((i) => PAD + LANE_W / 2 + i * (LANE_W + 12))

const LANES = [
  {
    channel: 'WhatsApp', accent: '#25D366', accentBg: 'rgba(37,211,102,0.13)',
    cust: 'Mesa para 4 mañana sábado, 21:00',
    ai: '✓ Reserva confirmada · os guardo la mesa',
    outcome: 'Reserva', tStart: 18, tResolve: 116,
  },
  {
    channel: 'Web', accent: '#4361EE', accentBg: 'rgba(67,97,238,0.13)',
    cust: 'Quiero presupuesto para placas solares',
    ai: '✓ Lead capturado · te llamamos hoy',
    outcome: 'Lead', tStart: 40, tResolve: 162,
  },
  {
    channel: 'Instagram', accent: '#F72585', accentBg: 'rgba(247,37,133,0.13)',
    cust: '¿Hacéis envíos a Murcia? 👀',
    ai: '✓ Pedido registrado · sale mañana 📦',
    outcome: 'Pedido', tStart: 62, tResolve: 206,
  },
]

function Dots({ frame }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[0, 1, 2].map((i) => {
        const t = (frame * 2 + i * 10) % 30
        return <div key={i} style={{ width: 4.5, height: 4.5, borderRadius: 999, background: 'rgba(255,255,255,0.5)', transform: `scale(${ci(t, [0, 15, 30], [0.5, 1.3, 0.5])})` }} />
      })}
    </div>
  )
}

function Lane({ lane, frame }) {
  const { tStart, tResolve, accent, accentBg } = lane
  const headOp = ci(frame, [tStart, tStart + 12], [0, 1], SOFT)

  const custOp = ci(frame, [tStart + 14, tStart + 28], [0, 1], SOFT)
  const custY = ci(frame, [tStart + 14, tStart + 28], [8, 0], SOFT)
  const showTyping = frame >= tStart + 40 && frame < tStart + 68
  const aiOp = ci(frame, [tStart + 72, tStart + 86], [0, 1], SOFT)
  const aiY = ci(frame, [tStart + 72, tStart + 86], [8, 0], SOFT)
  // glow de resolución
  const resolveGlow = ci(frame, [tResolve - 6, tResolve + 4, tResolve + 26], [0, 0.5, 0])

  return (
    <div style={{
      position: 'absolute', top: TOP, left: lane.x, width: LANE_W, height: CRM_Y - TOP - 12,
      borderRadius: 14, background: 'rgba(255,255,255,0.035)',
      border: `1px solid ${resolveGlow > 0.02 ? accent : 'rgba(255,255,255,0.08)'}`,
      boxShadow: resolveGlow > 0.02 ? `0 0 24px ${accent}55` : 'none',
      padding: 12, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* chip canal */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, opacity: headOp, flexShrink: 0, marginBottom: 10 }}>
        <div style={{ width: 18, height: 18, borderRadius: 6, background: lane.channel === 'Instagram' ? IG : accent, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9.5, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>{lane.channel}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 7 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', opacity: custOp, transform: `translateY(${custY}px)` }}>
          <div style={{ padding: '6px 10px', maxWidth: '92%', borderRadius: '12px 12px 12px 3px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 11, lineHeight: 1.45 }}>{lane.cust}</div>
        </div>
        {showTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ padding: '7px 10px', borderRadius: '12px 12px 3px 12px', background: accentBg, display: 'flex' }}><Dots frame={frame} /></div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: aiOp, transform: `translateY(${aiY}px)` }}>
          <div style={{ padding: '6px 10px', maxWidth: '92%', borderRadius: '12px 12px 3px 12px', background: accentBg, border: `1px solid ${accent}55`, color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 11, lineHeight: 1.45 }}>{lane.ai}</div>
        </div>
      </div>
    </div>
  )
}

// token que cae de la conversación al CRM
function DropToken({ lane, cx, frame }) {
  const t = ci(frame, [lane.tResolve, lane.tResolve + 16], [0, 1], SOFT)
  if (t <= 0 || t >= 1) return null
  const y0 = CRM_Y - 20, y1 = CRM_Y + 22
  const y = y0 + (y1 - y0) * t
  const fade = t < 0.7 ? 1 : ci(t, [0.7, 1], [1, 0])
  return (
    <div style={{ position: 'absolute', left: cx - 6, top: y - 6, width: 12, height: 12, borderRadius: 999, background: lane.accent, opacity: fade, boxShadow: `0 0 12px ${lane.accent}, 0 0 24px ${lane.accent}88`, pointerEvents: 'none' }} />
  )
}

function CrmCard({ lane, cx, frame }) {
  const appear = lane.tResolve + 14
  const op = ci(frame, [appear, appear + 12], [0, 1], SOFT)
  const sc = ci(frame, [appear, appear + 16], [0.7, 1], SPRING)
  const w = LANE_W
  return (
    <div style={{ position: 'absolute', left: cx - w / 2, top: CRM_Y + 16, width: w, opacity: op, transform: `scale(${sc})`, transformOrigin: 'center top' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', borderRadius: 11, background: 'rgba(255,255,255,0.05)', border: `1px solid ${lane.accent}66` }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#0D0D10', flexShrink: 0 }}>✓</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: '#fff', fontWeight: 600 }}>{lane.outcome}</div>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 8.5, color: 'rgba(255,255,255,0.42)' }}>vía {lane.channel}</div>
        </div>
      </div>
    </div>
  )
}

export default function AltRecepcionistaOmnicanal() {
  const frame = useCurrentFrame()
  const fadeOut = ci(frame, [288, 300], [1, 0])

  const attended = LANES.filter((l) => frame >= l.tResolve + 14).length
  const dot = ci((frame % 45) / 45, [0, 0.5, 1], [1, 0.3, 1])

  return (
    <AbsoluteFill style={{ background: '#0D0D10', opacity: fadeOut }}>
      {/* cabecera */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: TOP, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 3 }}>Tu Recepcionista</div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#fff', lineHeight: 1 }}>Tres canales a la vez<span style={{ color: 'rgba(255,255,255,0.4)' }}>, ni uno caído</span></div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: GREEN, opacity: dot }} />
            <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 18, color: '#fff', fontWeight: 700 }}>{attended}</span>
            <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>atendidos</span>
          </div>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9.5, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}><span style={{ color: GREEN }}>0</span> en espera</div>
        </div>
      </div>

      {/* lanes */}
      {LANES.map((l, i) => <Lane key={i} lane={{ ...l, x: CX[i] - LANE_W / 2 }} frame={frame} />)}

      {/* etiqueta CRM */}
      <div style={{ position: 'absolute', top: CRM_Y - 8, left: 20, fontFamily: "'Syne Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>→ registrado en tu CRM</div>

      {/* tokens + tarjetas CRM */}
      {LANES.map((l, i) => <DropToken key={`t${i}`} lane={l} cx={CX[i]} frame={frame} />)}
      {LANES.map((l, i) => <CrmCard key={`c${i}`} lane={l} cx={CX[i]} frame={frame} />)}
    </AbsoluteFill>
  )
}
