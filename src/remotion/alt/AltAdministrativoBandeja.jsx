import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

/**
 * ALTERNATIVA 3 — AgentDemo (Tu Administrativo)  →  "La bandeja que se vacía sola"
 *
 * En vez de un grafo abstracto de nodos, una bandeja real: un token-agente
 * recorre la columna PENDIENTE, coge cada tarea concreta (factura, email,
 * informe), la procesa y la deja en HECHO con el contador bajando 4→0. Una
 * factura que no cuadra NO se resuelve sola: se escala a una tarjeta
 * "Te aviso · Sito". Materializa la promesa: "el trabajo que odias, hecho sin
 * que lo pidas · te avisa solo cuando algo se sale de lo previsto".
 *
 * 640×460 · 300 frames @ 30fps (loop).
 */

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const C = ['#4361EE', '#7209B7', '#F72585', '#FB5607', '#22c55e']

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const SOFT = Easing.bezier(0.16, 1, 0.3, 1)
const SPRING = Easing.bezier(0.34, 1.56, 0.64, 1)
const ci = (f, i, o, easing) => interpolate(f, i, o, { ...clamp, easing })

// Geometría (640×460)
const CARD_W = 196
const PEND_X = 18
const DONE_X = 640 - 18 - CARD_W
const ROW_Y = (i) => 96 + i * 54
const TOKEN_X = PEND_X + CARD_W + 14

const TASKS = [
  { icon: '🧾', title: 'Factura #2231',  done: 'Conciliada',          move: [46, 74],   color: C[0] },
  { icon: '✉',  title: 'Email a proveedor', done: 'Redactado y enviado', move: [98, 126], color: C[1] },
  { icon: '📊', title: 'Informe semanal', done: 'Generado',            move: [150, 178], color: C[4] },
]
const ALERT = { icon: '⚠', title: 'Factura #2310', note: 'El importe no cuadra', move: [206, 236] }

const ALERT_DEST = { x: (640 - 250) / 2, y: 372 }

function PulseRing({ t, x, y, color }) {
  if (t <= 0 || t >= 1) return null
  return (
    <div style={{
      position: 'absolute', left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 999,
      border: `1.5px solid ${color}`, opacity: ci(t, [0, 0.2, 1], [0, 0.8, 0]),
      transform: `scale(${ci(t, [0, 1], [0.8, 2.2])})`, pointerEvents: 'none',
    }} />
  )
}

function TaskCard({ task, i, frame }) {
  const [ms, me] = task.move
  const p = ci(frame, [ms, me], [0, 1], SOFT)
  const x = PEND_X + (DONE_X - PEND_X) * p
  const processing = frame >= ms - 4 && frame < me
  const doneState = p >= 0.5
  const accent = processing ? task.color : (doneState ? C[4] : 'rgba(255,255,255,0.08)')

  return (
    <div style={{
      position: 'absolute', left: x, top: ROW_Y(i), width: CARD_W,
      display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 11,
      background: doneState ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${accent}${processing || doneState ? '88' : ''}`,
      boxShadow: processing ? `0 0 22px ${task.color}55` : 'none',
      opacity: doneState && p >= 1 ? 0.72 : 1,
    }}>
      <span style={{ fontSize: 15, flexShrink: 0, filter: doneState ? 'grayscale(0.2)' : 'none' }}>{doneState ? '' : task.icon}</span>
      {doneState && <span style={{ width: 18, height: 18, borderRadius: '50%', background: C[4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#0D0D10', flexShrink: 0 }}>✓</span>}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.title}</div>
        <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 8.5, color: doneState ? C[4] : 'rgba(255,255,255,0.4)', marginTop: 1 }}>
          {processing ? 'procesando…' : doneState ? task.done : 'en cola'}
        </div>
      </div>
    </div>
  )
}

function AlertCard({ frame }) {
  const [ms, me] = ALERT.move
  const p = ci(frame, [ms, me], [0, 1], SOFT)
  const x = PEND_X + (ALERT_DEST.x - PEND_X) * p
  const y = ROW_Y(3) + (ALERT_DEST.y - ROW_Y(3)) * p
  const sc = ci(frame, [me - 8, me + 10], [0.96, 1], SPRING)
  const glow = ci(frame, [me, me + 8, me + 40, me + 70], [0, 1, 1, 0.5])

  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: p > 0.3 ? 250 : CARD_W, transform: `scale(${sc})`, transformOrigin: 'center',
      borderRadius: 12, padding: 1.5, background: GRADIENT, boxShadow: `0 0 ${18 + glow * 16}px rgba(247,37,133,${0.3 + glow * 0.25})`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10.5, background: '#15131A' }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: '#fff', fontWeight: 600 }}>{ALERT.title} · {ALERT.note}</div>
          {p > 0.5 && <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 8.5, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>Te aviso → <span style={{ background: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontWeight: 700 }}>Sito</span> · no lo decido yo</div>}
        </div>
      </div>
    </div>
  )
}

export default function AltAdministrativoBandeja() {
  const frame = useCurrentFrame()
  const fadeOut = ci(frame, [288, 300], [1, 0])

  // contador de pendientes (4 → 0)
  const resolved = TASKS.filter((t) => frame >= t.move[1]).length + (frame >= ALERT.move[1] ? 1 : 0)
  const pend = 4 - resolved
  const escalated = frame >= ALERT.move[1] ? 1 : 0

  // token-agente recorre la columna
  const tokenY = interpolate(
    frame,
    [0, 46, 74, 98, 126, 150, 178, 206],
    [ROW_Y(0), ROW_Y(0), ROW_Y(1), ROW_Y(1), ROW_Y(2), ROW_Y(2), ROW_Y(3), ROW_Y(3)],
    clamp,
  ) + 14
  const grabRing = [...TASKS, ALERT].reduce((mx, t) => Math.max(mx, ci(frame, [t.move[0] - 6, t.move[0] + 18], [0, 1])), 0)
  const tokenPulse = ci((frame % 30), [0, 15, 30], [1, 1.08, 1])
  const ring1Rot = frame * 2

  return (
    <AbsoluteFill style={{ background: '#0D0D10', opacity: fadeOut }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 60% at 50% 35%, ${C[1]}0C 0%, transparent 70%)` }} />

      {/* cabecera */}
      <div style={{ position: 'absolute', top: 18, left: 20, right: 20, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 3 }}>Tu Administrativo · cada día, 07:00</div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#fff', lineHeight: 1 }}>La bandeja que <span style={{ fontStyle: 'italic', background: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>se vacía sola</span></div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 26, color: '#fff', fontWeight: 700, lineHeight: 1 }}>{pend}</div>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.45)' }}>pendientes</div>
          {escalated > 0 && <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: C[2], marginTop: 3 }}>1 te aviso</div>}
        </div>
      </div>

      {/* etiquetas de columna */}
      <div style={{ position: 'absolute', top: 74, left: PEND_X + 2, fontFamily: "'Syne Mono', monospace", fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>Pendiente</div>
      <div style={{ position: 'absolute', top: 74, left: DONE_X + 2, fontFamily: "'Syne Mono', monospace", fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>Hecho ✓</div>

      {/* token-agente */}
      <PulseRing t={grabRing} x={TOKEN_X} y={tokenY} color={C[1]} />
      <div style={{ position: 'absolute', left: TOKEN_X - 18, top: tokenY - 18, width: 36, height: 36, transform: `scale(${tokenPulse})` }}>
        <div style={{ position: 'absolute', left: -6, top: -6, width: 48, height: 48, borderRadius: 999, border: `1px dashed ${C[1]}40`, transform: `rotate(${ring1Rot}deg)` }} />
        <div style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg, ${C[1]}55, ${C[1]}20)`, border: `2px solid ${C[1]}CC`, boxShadow: `0 0 20px ${C[1]}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🧠</div>
      </div>

      {/* tareas */}
      {TASKS.map((t, i) => <TaskCard key={i} task={t} i={i} frame={frame} />)}
      <AlertCard frame={frame} />
    </AbsoluteFill>
  )
}
