import { useCurrentFrame } from 'remotion'
import AnswerScene, { Headline, ci, eur, SOFT, BLUE, RED, grad } from './AnswerScene'

/**
 * Caso 06 — Retail / tienda · cierre de caja del día + stock.
 * Visual propio: ranking top-3 productos con barras horizontales.
 */

const TOP = [
  { name: 'Menú degustación', val: 1280, w: 100, from: 112 },
  { name: 'Vino de la casa', val: 760, w: 60, from: 124, low: true },
  { name: 'Postres', val: 540, w: 42, from: 136 },
]

export default function AltCaseRetail() {
  const frame = useCurrentFrame()
  const total = eur(3480 * ci(frame, [100, 142], [0, 1], SOFT))

  const body = (
    <>
      <div style={{ marginBottom: 16 }}>
        <Headline value={total} unit="€" sub="↑ 12% vs media de un martes" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {TOP.map((p, i) => {
          const prog = ci(frame, [p.from, p.from + 32], [0, 1], SOFT)
          return (
            <div key={p.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.82)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', marginRight: 6 }}>{i + 1}</span>{p.name}
                  {p.low && <span style={{ color: RED, fontFamily: "'Syne Mono', monospace", fontSize: 9.5, marginLeft: 8 }}>· 2 días de stock</span>}
                </span>
                <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 12, color: '#fff' }}>{eur(p.val * prog)} €</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${p.w * prog}%`, borderRadius: 999, background: p.low ? RED : BLUE }} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )

  return (
    <AnswerScene
      question="¿Cómo ha ido el día?"
      eyebrow="Cierre de caja · hoy"
      alert={{ title: <>Te quedan <span style={{ color: RED }}>2 días de stock</span> del vino de la casa</>, sub: '2º más vendido · ritmo actual' }}
      insight={<>Repón hoy → no pierdes la venta del <span style={grad}>finde</span></>}
    >
      {body}
    </AnswerScene>
  )
}
