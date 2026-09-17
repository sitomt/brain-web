import { useCurrentFrame } from 'remotion'
import AnswerScene, { Headline, ci, eur, SOFT, GREEN, RED, grad } from './AnswerScene'

/**
 * Caso 07 — Gimnasio · socios y recibos del mes.
 * Visual propio: pills Altas/Bajas + barra divergente + MRR.
 */

export default function AltCaseGimnasio() {
  const frame = useCurrentFrame()
  const net = Math.round(24 * ci(frame, [100, 142], [0, 1], SOFT))
  const altas = Math.round(38 * ci(frame, [112, 150], [0, 1], SOFT))
  const bajas = Math.round(14 * ci(frame, [120, 158], [0, 1], SOFT))
  const mrr = eur(8450 * ci(frame, [126, 168], [0, 1], SOFT))
  const barP = ci(frame, [130, 168], [0, 1], SOFT)

  const body = (
    <>
      <div style={{ marginBottom: 14 }}>
        <Headline value={net} unit="netos" signed sub="socios este mes" />
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: `1px solid ${GREEN}44` }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: GREEN, lineHeight: 1 }}>{altas}</div>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>ALTAS</div>
        </div>
        <div style={{ flex: 1, padding: '8px 12px', borderRadius: 10, background: 'rgba(247,37,133,0.08)', border: `1px solid ${RED}40` }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: RED, lineHeight: 1 }}>{bajas}</div>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>BAJAS</div>
        </div>
        <div style={{ flex: 1.3, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: '#fff', lineHeight: 1 }}>{mrr}<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}> €</span></div>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>CUOTA RECURRENTE / MES</div>
        </div>
      </div>

      <div style={{ display: 'flex', height: 8, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ width: `${73 * barP}%`, background: GREEN }} />
        <div style={{ width: `${27 * barP}%`, background: RED }} />
      </div>
    </>
  )

  return (
    <AnswerScene
      question="¿Cómo vamos de socios este mes?"
      eyebrow="Altas, bajas y cobros"
      alert={{ title: <><span style={{ color: RED }}>12 recibos devueltos</span> — reintento automático lanzado</>, sub: 'sin que muevas un dedo' }}
      insight={<>Recuperados 9 de 12 → <span style={grad}>+540 € salvados</span></>}
    >
      {body}
    </AnswerScene>
  )
}
