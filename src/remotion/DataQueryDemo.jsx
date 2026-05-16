import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

const BG = '#0D0D10'
const C = ['#4361EE', '#7209B7', '#F72585', '#FB5607']

// Timing map (300 frames = 10s @ 30fps):
// 0-15   terminal fades in
// 15-62  user types Q1
// 62-78  loading dots
// 78-95  "Consultando registros de venta..."
// 95-112 "12.840€ — esta semana"              → revenue fact
// 112-130 "↑ 18% vs semana anterior · Mejor semana en 3 meses"  → trend (social proof)
// 142-188 user types Q2
// 188-202 loading dots
// 202-218 "Calculando márgenes por línea de servicio..."
// 218-252 bar Premium grows to 68%
// 245-272 bar Estándar grows to 31%
// 268-292 insight line fades in              → ROI calculado → núcleo accumbens
// 288-300 fade out

function typeAt(text, frame, start, speed) {
  return text.slice(0, Math.max(0, Math.floor((frame - start) * speed)))
}

function useBlink(frame) {
  return Math.floor(frame / 15) % 2 === 0
}

function fi(frame, a, b) {
  return interpolate(frame, [a, b], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })
}

function ResultLine({ text, color, opacity, indent }) {
  return (
    <div style={{ opacity, marginBottom: 5, paddingLeft: indent ? 14 : 0 }}>
      <span style={{
        fontFamily: "'Syne Mono', monospace",
        fontSize: 12,
        color,
        lineHeight: 1.65,
      }}>{text}</span>
    </div>
  )
}

function ServiceBar({ label, pct, color, barPct, opacity }) {
  return (
    <div style={{ opacity, marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 11, color }}>
          {pct}% margen
        </span>
      </div>
      <div style={{
        height: 4,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${barPct}%`,
          borderRadius: 999,
          background: color,
        }} />
      </div>
    </div>
  )
}

export default function DataQueryDemo() {
  const frame = useCurrentFrame()
  const blink = useBlink(frame)

  const Q1 = '¿Cuánto facturamos esta semana?'
  const Q2 = '¿Qué servicio tiene más margen?'

  const terminalOpacity = fi(frame, 0, 15)

  // Q1 flow
  const q1Text = frame >= 15 ? typeAt(Q1, frame, 15, 0.68) : ''
  const q1Done = frame >= 62
  const showLoading1 = frame >= 62 && frame < 78

  const r1Op = fi(frame, 78, 91)
  const r2Op = fi(frame, 91, 104)
  const r3Op = fi(frame, 104, 118)

  const loadingDots1 = '.'.repeat(
    Math.floor(interpolate(frame, [62, 77], [0, 10], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }))
  )

  // Q2 flow
  const q2Text = frame >= 142 && frame < 188 ? typeAt(Q2, frame, 142, 0.69) : ''
  const q2Done = frame >= 188
  const showLoading2 = frame >= 188 && frame < 202

  const loadingDots2 = '.'.repeat(
    Math.floor(interpolate(frame, [188, 201], [0, 10], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }))
  )

  const r4Op = fi(frame, 202, 215)

  // Premium bar
  const premiumBarWidth = interpolate(frame, [218, 252], [0, 68], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })
  const premiumOp = fi(frame, 215, 228)

  // Estándar bar
  const standardBarWidth = interpolate(frame, [245, 272], [0, 31], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })
  const standardOp = fi(frame, 242, 255)

  // Insight line — the ROI number that activates reward circuits
  const insightOp = fi(frame, 268, 282)

  const fadeOut = interpolate(frame, [288, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: "'Syne Mono', monospace", opacity: fadeOut }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 390,
        opacity: terminalOpacity,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {/* Titlebar */}
          <div style={{
            padding: '8px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: 6,
            alignItems: 'center',
          }}>
            {['#F72585', '#FB5607', '#22c55e'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: c, opacity: 0.8 }} />
            ))}
            <span style={{
              marginLeft: 8,
              fontSize: 10,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: "'Syne Mono', monospace",
            }}>brain — consulta de datos</span>
          </div>

          {/* Content */}
          <div style={{ padding: '16px 20px', minHeight: 240 }}>
            {/* Q1 */}
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: C[0], fontSize: 13 }}>{'> '}</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{q1Text}</span>
              {!q1Done && blink && frame >= 15 && (
                <span style={{
                  display: 'inline-block',
                  width: 7,
                  height: 13,
                  background: C[0],
                  verticalAlign: 'text-bottom',
                  marginLeft: 1,
                }} />
              )}
            </div>

            {showLoading1 && (
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginBottom: 6 }}>
                {loadingDots1}
              </div>
            )}

            {frame >= 78 && (
              <div style={{ marginBottom: 10 }}>
                <ResultLine
                  text="Consultando registros de venta..."
                  color="rgba(255,255,255,0.35)"
                  opacity={r1Op}
                />
                <ResultLine
                  text="12.840€ — esta semana"
                  color={C[0]}
                  opacity={r2Op}
                />
                <ResultLine
                  text="↑ 18% vs semana anterior · Mejor semana en 3 meses"
                  color={C[2]}
                  opacity={r3Op}
                />
              </div>
            )}

            {/* Q2 */}
            {frame >= 142 && (
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: C[0], fontSize: 13 }}>{'> '}</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{q2Text}</span>
                {!q2Done && blink && frame >= 142 && (
                  <span style={{
                    display: 'inline-block',
                    width: 7,
                    height: 13,
                    background: C[0],
                    verticalAlign: 'text-bottom',
                    marginLeft: 1,
                  }} />
                )}
              </div>
            )}

            {showLoading2 && (
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginBottom: 6 }}>
                {loadingDots2}
              </div>
            )}

            {frame >= 202 && (
              <div style={{ marginBottom: 10 }}>
                <ResultLine
                  text="Calculando márgenes por línea de servicio..."
                  color="rgba(255,255,255,0.35)"
                  opacity={r4Op}
                />
              </div>
            )}

            {/* Service bars */}
            {frame >= 215 && (
              <ServiceBar
                label="Servicio Premium"
                pct={68}
                color={C[1]}
                barPct={premiumBarWidth}
                opacity={premiumOp}
              />
            )}
            {frame >= 242 && (
              <ServiceBar
                label="Servicio Estándar"
                pct={31}
                color="rgba(255,255,255,0.35)"
                barPct={standardBarWidth}
                opacity={standardOp}
              />
            )}

            {/* ROI insight — the number that activates reward circuits */}
            {frame >= 268 && (
              <div style={{
                opacity: insightOp,
                marginTop: 10,
                padding: '8px 12px',
                borderRadius: 8,
                background: 'rgba(67,97,238,0.12)',
                border: '1px solid rgba(67,97,238,0.25)',
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.5,
                }}>
                  💡 Si el 30% de tus clientes estándar pasan a Premium →{' '}
                  <span style={{ color: C[0], fontWeight: 600 }}>+3.200€/mes</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
