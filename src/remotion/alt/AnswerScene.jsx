import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

/**
 * Scaffold reutilizable extraído del demo #4 (AltAnalistaDashboard).
 * Formato: pregunta en lenguaje natural → tarjeta con dato grande + visual
 * propio + alerta proactiva + insight. Letra grande y legible.
 *
 * Cada caso de uso es una composición que calcula su visual con el frame y
 * lo pasa como `children`; aquí se gestiona toda la coreografía común y los
 * tiempos, de modo que las escenas sean reutilizables (también para un hero
 * encadenado con <Sequence> en el futuro).
 *
 * 640×460 · 300 frames @ 30fps (loop).
 */

export const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
export const BLUE = '#4361EE'
export const RED = '#F72585'
export const GREEN = '#22c55e'

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
export const SOFT = Easing.bezier(0.16, 1, 0.3, 1)
export const SPRING = Easing.bezier(0.34, 1.56, 0.64, 1)
export const ci = (f, i, o, easing) => interpolate(f, i, o, easing ? { ...clamp, easing } : clamp)
export const eur = (n) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)))
export const typeAt = (text, frame, start, speed) => text.slice(0, Math.max(0, Math.floor((frame - start) * speed)))

// Ventanas estándar (las usan los casos para animar su visual)
export const W = {
  headline: [98, 142],
  viz: [104, 168],
  trend: [148, 162],
}

export default function AnswerScene({ question, eyebrow, children, alert, insight }) {
  const frame = useCurrentFrame()

  const fadeOut = ci(frame, [288, 300], [1, 0])
  const panelOp = ci(frame, [0, 15], [0, 1], SOFT)

  const qTyped = frame >= 15 && frame < 58 ? typeAt(question, frame, 15, 0.85) : (frame >= 58 ? question : '')
  const qSent = frame >= 58
  const blink = Math.floor(frame / 15) % 2 === 0
  const showThinking = frame >= 72 && frame < 92

  const answerOp = ci(frame, [92, 106], [0, 1], SOFT)
  const answerY = ci(frame, [92, 110], [14, 0], SOFT)
  const alertOp = ci(frame, [186, 202], [0, 1], SOFT)
  const alertY = ci(frame, [186, 206], [16, 0], SPRING)
  const roiOp = ci(frame, [240, 256], [0, 1], SOFT)
  const roiSc = ci(frame, [240, 258], [0.96, 1], SPRING)

  return (
    <AbsoluteFill style={{ background: '#0D0D10', opacity: fadeOut, fontFamily: "'DM Sans', sans-serif" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${BLUE}0C 0%, transparent 70%)` }} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 478, opacity: panelOp }}>
        {/* pregunta en lenguaje natural */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <div style={{ padding: '9px 14px', maxWidth: '84%', borderRadius: '14px 14px 4px 14px', background: GRADIENT, color: '#fff', fontSize: 14, lineHeight: 1.45, display: 'flex', alignItems: 'center' }}>
            <span>{qTyped}</span>
            {!qSent && blink && frame >= 15 && <span style={{ display: 'inline-block', width: 1.5, height: 14, background: '#fff', marginLeft: 2, opacity: 0.85 }} />}
          </div>
        </div>

        {showThinking && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
            <div style={{ padding: '9px 13px', borderRadius: '14px 14px 14px 4px', background: 'rgba(255,255,255,0.1)', display: 'flex', gap: 5 }}>
              {[0, 1, 2].map((i) => <div key={i} style={{ width: 5, height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.5)', transform: `scale(${ci(((frame * 2 + i * 10) % 30), [0, 15, 30], [0.5, 1.3, 0.5])})` }} />)}
            </div>
          </div>
        )}

        {/* tarjeta respuesta */}
        {frame >= 92 && (
          <div style={{ opacity: answerOp, transform: `translateY(${answerY}px)`, borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: 18 }}>
            {eyebrow && (
              <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>{eyebrow}</div>
            )}

            {children}

            {alert && frame >= 186 && (
              <div style={{ opacity: alertOp, transform: `translateY(${alertY}px)`, marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: 'rgba(247,37,133,0.1)', border: `1px solid ${RED}55` }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>⚠️</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: '#fff', fontWeight: 600, lineHeight: 1.35 }}>{alert.title}</div>
                  {alert.sub && <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{alert.sub}</div>}
                </div>
              </div>
            )}

            {insight && frame >= 240 && (
              <div style={{ opacity: roiOp, transform: `scale(${roiSc})`, transformOrigin: 'left center', marginTop: 10, padding: '9px 12px', borderRadius: 10, background: 'rgba(67,97,238,0.12)', border: '1px solid rgba(67,97,238,0.28)' }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>💡 {insight}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  )
}

// ── Helpers de presentación compartidos ─────────────────────────────────────

export function Headline({ value, unit, sub, signed }) {
  const sign = signed && value > 0 ? '+' : ''
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, lineHeight: 1, color: '#fff' }}>{sign}{value}</span>
      {unit && <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: 'rgba(255,255,255,0.8)' }}>{unit}</span>}
      {sub && <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 11, color: GREEN, marginLeft: 6 }}>{sub}</span>}
    </div>
  )
}

export const grad = { background: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontWeight: 700 }
