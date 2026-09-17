import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

/**
 * ALTERNATIVA 4 — DataQueryDemo (Tu Analista)  →  "Lenguaje claro + alerta proactiva"
 *
 * Fuera la estética de terminal con prompt `>` (lee como código/SQL y
 * contradice "pregúntale en español, sin saber de tecnología"). La pregunta es
 * una burbuja en lenguaje natural y la respuesta se materializa como una
 * tarjeta de dato premium: número con count-up, sparkline que se dibuja solo y
 * tendencia. El beat diferencial: una ALERTA PROACTIVA que la IA saca sola
 * —punto rojo latiendo + tarjeta de desviación— antes de que el usuario
 * pregunte, cumpliendo "detecta desviaciones antes de que sean un problema".
 *
 * 640×460 · 300 frames @ 30fps (loop).
 */

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const C = ['#4361EE', '#7209B7', '#F72585', '#FB5607', '#22c55e']
const RED = '#F72585'

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
const SOFT = Easing.bezier(0.16, 1, 0.3, 1)
const SPRING = Easing.bezier(0.34, 1.56, 0.64, 1)
const ci = (f, i, o, easing) => interpolate(f, i, o, { ...clamp, easing })
const eur = (n) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)))

const typeAt = (text, frame, start, speed) => text.slice(0, Math.max(0, Math.floor((frame - start) * speed)))

export default function AltAnalistaDashboard() {
  const frame = useCurrentFrame()
  const fadeOut = ci(frame, [288, 300], [1, 0])
  const panelOp = ci(frame, [0, 15], [0, 1], SOFT)

  const Q = '¿Cómo va el negocio esta semana?'
  const qTyped = frame >= 15 && frame < 58 ? typeAt(Q, frame, 15, 0.85) : (frame >= 58 ? Q : '')
  const qSent = frame >= 58
  const qBubbleOp = ci(frame, [56, 70], [0, 1], SOFT)
  const showThinking = frame >= 72 && frame < 92
  const blink = Math.floor(frame / 15) % 2 === 0

  // tarjeta respuesta
  const answerOp = ci(frame, [92, 106], [0, 1], SOFT)
  const answerY = ci(frame, [92, 110], [14, 0], SOFT)
  const revenue = 12840 * ci(frame, [98, 142], [0, 1], SOFT)
  const sparkOffset = ci(frame, [104, 168], [620, 0], SOFT)   // dibujado del sparkline
  const trendOp = ci(frame, [148, 162], [0, 1], SOFT)

  // alerta proactiva (sin que el usuario la pida)
  const anomalyT = ci(frame, [176, 200], [0, 1])
  const markerPulse = ci((frame % 30), [0, 15, 30], [1, 1.5, 1])
  const alertOp = ci(frame, [186, 202], [0, 1], SOFT)
  const alertY = ci(frame, [186, 206], [16, 0], SPRING)

  // insight ROI (clímax)
  const roiOp = ci(frame, [240, 256], [0, 1], SOFT)
  const roiSc = ci(frame, [240, 258], [0.96, 1], SPRING)

  // sparkline: tendencia al alza con bajón final (= la desviación)
  const sparkD = 'M0,56 L40,50 L80,52 L120,40 L160,30 L200,22 L240,16 L280,32'

  return (
    <AbsoluteFill style={{ background: '#0D0D10', opacity: fadeOut, fontFamily: "'DM Sans', sans-serif" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${C[0]}0C 0%, transparent 70%)` }} />

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 460, opacity: panelOp }}>
        {/* pregunta en lenguaje natural */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <div style={{ padding: '9px 14px', maxWidth: '80%', borderRadius: '14px 14px 4px 14px', background: GRADIENT, color: '#fff', fontSize: 13.5, lineHeight: 1.45, display: 'flex', alignItems: 'center' }}>
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

        {/* tarjeta respuesta premium */}
        {frame >= 92 && (
          <div style={{ opacity: answerOp, transform: `translateY(${answerY}px)`, borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>Facturación · esta semana</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, lineHeight: 1, color: '#fff' }}>{eur(revenue)}</span>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: 'rgba(255,255,255,0.8)' }}>€</span>
                </div>
                <div style={{ opacity: trendOp, fontFamily: "'Syne Mono', monospace", fontSize: 11, color: C[4], marginTop: 6 }}>↑ 18% vs semana anterior · mejor semana en 3 meses</div>
              </div>

              {/* sparkline */}
              <svg width="160" height="72" viewBox="-4 -4 296 80" style={{ overflow: 'visible', flexShrink: 0 }}>
                <path d={sparkD} fill="none" stroke="url(#spg)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={620} strokeDashoffset={sparkOffset} />
                <defs>
                  <linearGradient id="spg" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor={C[0]} />
                    <stop offset="0.7" stopColor={C[4]} />
                    <stop offset="1" stopColor={RED} />
                  </linearGradient>
                </defs>
                {/* marcador de anomalía en el bajón final */}
                {anomalyT > 0 && (
                  <>
                    <circle cx={280} cy={32} r={6 * markerPulse} fill="none" stroke={RED} strokeWidth={1.5} opacity={ci(anomalyT, [0, 1], [0, 0.6]) * (2 - markerPulse)} />
                    <circle cx={280} cy={32} r={4} fill={RED} opacity={anomalyT} style={{ filter: `drop-shadow(0 0 6px ${RED})` }} />
                  </>
                )}
              </svg>
            </div>

            {/* alerta proactiva */}
            {frame >= 186 && (
              <div style={{ opacity: alertOp, transform: `translateY(${alertY}px)`, marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: 'rgba(247,37,133,0.1)', border: `1px solid ${RED}55` }}>
                <span style={{ fontSize: 15 }}>⚠️</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>Costes de proveedor <span style={{ color: RED }}>+14%</span> esta semana</div>
                  <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>te lo aviso ahora — sin que lo preguntes</div>
                </div>
              </div>
            )}

            {/* insight ROI */}
            {frame >= 240 && (
              <div style={{ opacity: roiOp, transform: `scale(${roiSc})`, transformOrigin: 'left center', marginTop: 10, padding: '9px 12px', borderRadius: 10, background: 'rgba(67,97,238,0.12)', border: '1px solid rgba(67,97,238,0.28)' }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5 }}>💡 Si renegocias ese proveedor esta semana → <span style={{ color: C[0], fontWeight: 700 }}>+1.900 €/mes</span></span>
              </div>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  )
}
