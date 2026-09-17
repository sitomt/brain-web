import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

/**
 * ALTERNATIVA 1 — HeroChatDemo  →  "El contador que no duerme"
 *
 * En vez de tres chats que se cruzan, una sola operación nocturna: a la
 * izquierda la conversación activa, a la derecha un LIBRO MAYOR en vivo donde
 * cada trato cerrado estampa una fila y un total en € que sube con count-up,
 * mientras el reloj avanza de la madrugada al mediodía y el fondo pasa de
 * noche cerrada a amanecer cálido. Refuerza "la IA que hace funcionar tu
 * negocio · operativa 24/7": ves el negocio facturar sin nadie conectado.
 *
 * 640×440 · 900 frames @ 30fps (loop).
 */

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const C = ['#4361EE', '#7209B7', '#F72585', '#FB5607', '#22c55e']

const SPRING = Easing.bezier(0.34, 1.56, 0.64, 1)
const SOFT = Easing.bezier(0.16, 1, 0.3, 1)

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const ci = (f, i, o, easing) => interpolate(f, i, o, { ...clamp, easing })
const eur = (n) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)))

// ── Escena por trato (cada una dura 300 frames de reloj local) ──────────────
const DEALS = [
  { from: 0,   land: 230, amount: 380,  label: 'Urgencia nocturna cerrada', clockMin: 134,
    cust: 'Se me ha ido la luz y tengo un bebé 😰', ai: '🔦 Técnico en camino · llega en 40 min' },
  { from: 300, land: 530, amount: 1200, label: 'Visita a local agendada',   clockMin: 615,
    cust: '¿Sigue libre el local en alquiler?',    ai: '✓ Visita el jueves · 17:00 h' },
  { from: 600, land: 800, amount: 3600, label: 'Lead recuperado',           clockMin: 847,
    cust: 'Llamé la semana pasada por el presupuesto', ai: '✓ Te recupero la cita · mañana 10:00 h' },
]

function lerpHex(a, b, t) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  const m = pa.map((v, i) => Math.round(v + (pb[i] - v) * t))
  return `rgb(${m[0]},${m[1]},${m[2]})`
}

const fmtClock = (min) => {
  const h = Math.floor(min / 60)
  const m = Math.floor(min % 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

// ── Conversación activa (rail izquierdo) ────────────────────────────────────
function Conversation({ deal, frame }) {
  const lf = frame - deal.from
  const sceneOp = ci(frame, [deal.from, deal.from + 14, deal.from + 286, deal.from + 300], [0, 1, 1, 0])

  const custOp = ci(lf, [22, 38], [0, 1], SOFT)
  const custY = ci(lf, [22, 38], [10, 0], SOFT)
  const showTyping = lf >= 58 && lf < 88
  const aiOp = ci(lf, [92, 108], [0, 1], SOFT)
  const aiY = ci(lf, [92, 108], [10, 0], SOFT)
  const dot = ci((frame % 45) / 45, [0, 0.5, 1], [1, 0.3, 1])

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneOp, display: 'flex', flexDirection: 'column', padding: 18, boxSizing: 'border-box' }}>
      {/* mini header de canal */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne Mono', monospace", fontSize: 9, color: '#fff', fontWeight: 700 }}>AI</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>BrAIn Asistente</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C[4], opacity: dot }} />
            <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 8.5, color: 'rgba(255,255,255,0.42)' }}>En línea</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8 }}>
        {/* cliente */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', opacity: custOp, transform: `translateY(${custY}px)` }}>
          <div style={{ padding: '8px 12px', maxWidth: '88%', borderRadius: '14px 14px 14px 4px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 12, lineHeight: 1.5 }}>{deal.cust}</div>
        </div>
        {/* typing */}
        {showTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ padding: '9px 13px', borderRadius: '14px 14px 4px 14px', background: 'rgba(255,255,255,0.08)', display: 'flex', gap: 5 }}>
              {[0, 1, 2].map((i) => {
                const t = (frame * 2 + i * 10) % 30
                return <div key={i} style={{ width: 5, height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.5)', transform: `scale(${ci(t, [0, 15, 30], [0.5, 1.3, 0.5])})` }} />
              })}
            </div>
          </div>
        )}
        {/* ai */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: aiOp, transform: `translateY(${aiY}px)` }}>
          <div style={{ padding: '8px 12px', maxWidth: '88%', borderRadius: '14px 14px 4px 14px', background: GRADIENT, color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 12, lineHeight: 1.5 }}>{deal.ai}</div>
        </div>
      </div>
    </div>
  )
}

// ── Fila del libro mayor ────────────────────────────────────────────────────
function LedgerRow({ deal, frame }) {
  const op = ci(frame, [deal.land, deal.land + 18], [0, 1], SOFT)
  const y = ci(frame, [deal.land, deal.land + 22], [16, 0], SPRING)
  return (
    <div style={{ opacity: op, transform: `translateY(${y}px)`, display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', borderRadius: 10, background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ width: 16, height: 16, borderRadius: '50%', background: C[4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#0D0D10', flexShrink: 0 }}>✓</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: 'rgba(255,255,255,0.86)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{deal.label}</div>
        <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{fmtClock(deal.clockMin)} h · sin intervención humana</div>
      </div>
      <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 13, color: C[4], fontWeight: 700, flexShrink: 0 }}>+{eur(deal.amount)} €</div>
    </div>
  )
}

export default function AltHeroLedger() {
  const frame = useCurrentFrame()

  // total con count-up acumulado por trato
  const total = DEALS.reduce((sum, d) => sum + d.amount * ci(frame, [d.land - 20, d.land + 18], [0, 1], SOFT), 0)
  // pulso del total cuando aterriza un trato
  const pulse = DEALS.reduce((mx, d) => Math.max(mx, ci(frame, [d.land, d.land + 8, d.land + 22], [1, 1.08, 1])), 1)

  // reloj continuo madrugada → mediodía
  const clock = fmtClock(interpolate(frame, [0, 900], [134, 847], clamp))
  // fondo noche → amanecer
  const dawn = interpolate(frame, [0, 900], [0, 1], clamp)
  const bg = lerpHex('#080B16', '#1A130B', dawn)
  const glow = lerpHex('#1B2660', '#3A2410', dawn)
  const onlineDot = ci((frame % 45) / 45, [0, 0.5, 1], [1, 0.3, 1])

  const activeDeal = DEALS[Math.min(2, Math.floor(frame / 300))]

  return (
    <AbsoluteFill style={{ background: bg }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 60% at 70% 30%, ${glow} 0%, transparent 70%)` }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', padding: 16, gap: 14, boxSizing: 'border-box' }}>

        {/* ── Rail conversación ── */}
        <div style={{ width: 246, flexShrink: 0, position: 'relative', borderRadius: 16, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          {DEALS.map((d, i) => (
            <Conversation key={i} deal={d} frame={frame} />
          ))}
        </div>

        {/* ── Libro mayor ── */}
        <div style={{ flex: 1, minWidth: 0, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Facturación recuperada hoy</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Syne Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: C[4], opacity: onlineDot }} />{clock} h
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16, transform: `scale(${pulse})`, transformOrigin: 'left center' }}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 52, lineHeight: 1, background: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{eur(total)}</span>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: 'rgba(255,255,255,0.85)' }}>€</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {DEALS.map((d, i) => <LedgerRow key={i} deal={d} frame={frame} />)}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14 }}>
            <span style={{ display: 'inline-block', padding: '6px 13px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.05)', fontFamily: "'Syne Mono', monospace", fontSize: 9.5, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.06em' }}>
              ⚡ <span style={{ color: C[4] }}>3 tratos cerrados</span> mientras nadie miraba
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
