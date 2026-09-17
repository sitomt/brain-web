import { useCurrentFrame } from 'remotion'
import AnswerScene, { Headline, ci, SOFT, GRADIENT, RED, grad } from './AnswerScene'

/**
 * Caso 05 — Hostelería · ocupación del fin de semana.
 * Visual propio: barras verticales por día (Vie/Sáb/Dom), sábado destacado.
 */

const DAYS = [
  { d: 'VIE', pct: 72, from: 110 },
  { d: 'SÁB', pct: 96, from: 122, hot: true },
  { d: 'DOM', pct: 78, from: 134 },
]
const BAR_H = 92

export default function AltCaseHosteleria() {
  const frame = useCurrentFrame()
  const occ = Math.round(87 * ci(frame, [100, 142], [0, 1], SOFT))

  const body = (
    <>
      <div style={{ marginBottom: 16 }}>
        <Headline value={occ} unit="%" sub="ocupación media del finde" />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        {DAYS.map((day) => {
          const p = ci(frame, [day.from, day.from + 34], [0, 1], SOFT)
          const h = (day.pct / 100) * BAR_H * p
          const labelOp = ci(frame, [day.from + 18, day.from + 30], [0, 1], SOFT)
          return (
            <div key={day.d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 12, color: day.hot ? '#fff' : 'rgba(255,255,255,0.6)', opacity: labelOp }}>{Math.round(day.pct * p)}%</span>
              <div style={{ width: '100%', height: BAR_H, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: h, borderRadius: 8, background: day.hot ? GRADIENT : 'rgba(67,97,238,0.55)', boxShadow: day.hot ? `0 0 20px ${RED}44` : 'none' }} />
              </div>
              <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: day.hot ? '#fff' : 'rgba(255,255,255,0.4)' }}>{day.d}</span>
            </div>
          )
        })}
      </div>
    </>
  )

  return (
    <AnswerScene
      question="¿Cómo viene el finde?"
      eyebrow="Ocupación · reservas confirmadas"
      alert={{ title: <>Sábado 22:00 <span style={{ color: RED }}>casi lleno</span> — ¿abro lista de espera?</>, sub: 'turno de cena · 96% reservado' }}
      insight={<>Mueve 2 reservas a las 20:00 → <span style={grad}>+8 cubiertos</span></>}
    >
      {body}
    </AnswerScene>
  )
}
