import { useCurrentFrame } from 'remotion'
import AnswerScene, { Headline, ci, SOFT, BLUE, RED, GRADIENT, grad } from './AnswerScene'

/**
 * Caso 08 — Placas solares / despacho · pipeline de leads.
 * Visual propio: embudo de 3 etapas en cascada.
 */

const STAGES = [
  { name: 'Nuevos', n: 41, w: 100, from: 110, color: 'rgba(67,97,238,0.55)' },
  { name: 'Cualificados', n: 18, w: 62, from: 124, color: 'rgba(114,9,183,0.7)' },
  { name: 'Cerrados', n: 6, w: 34, from: 138, color: 'gradient' },
]

export default function AltCaseLeads() {
  const frame = useCurrentFrame()
  const closed = Math.round(6 * ci(frame, [100, 140], [0, 1], SOFT))

  const body = (
    <>
      <div style={{ marginBottom: 16 }}>
        <Headline value={closed} unit="cerrados" sub="de 41 leads · 15% conversión" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, alignItems: 'center' }}>
        {STAGES.map((s) => {
          const p = ci(frame, [s.from, s.from + 30], [0, 1], SOFT)
          const n = Math.round(s.n * p)
          return (
            <div key={s.name} style={{ width: `${s.w * (0.4 + 0.6 * p)}%`, maxWidth: '100%' }}>
              <div style={{ height: 38, borderRadius: 9, background: s.color === 'gradient' ? GRADIENT : s.color, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', boxShadow: s.color === 'gradient' ? `0 0 22px ${RED}44` : 'none', opacity: 0.35 + 0.65 * p }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#fff', fontWeight: 500 }}>{s.name}</span>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#fff' }}>{n}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )

  return (
    <AnswerScene
      question="¿Cómo va el pipeline esta semana?"
      eyebrow="Captación y seguimiento de leads"
      alert={{ title: <><span style={{ color: RED }}>8 leads sin seguimiento</span> &gt; 48 h — los retomo yo</>, sub: 'reactivación automática en marcha' }}
      insight={<>Cierra 2 más → <span style={grad}>+14.400 € en proyecto</span></>}
    >
      {body}
    </AnswerScene>
  )
}
