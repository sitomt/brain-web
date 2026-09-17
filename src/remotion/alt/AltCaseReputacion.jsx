import { useCurrentFrame } from 'remotion'
import AnswerScene, { ci, SOFT, GREEN, RED, grad } from './AnswerScene'

/**
 * Caso 10 — Reputación · reseñas y sentimiento de la semana.
 * Visual propio: 5 estrellas que se rellenan + barra de sentimiento.
 */

const STAR = '#FB5607'

function Star({ fill }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', fontSize: 30, lineHeight: 1 }}>
      <span style={{ color: 'rgba(255,255,255,0.14)' }}>★</span>
      <span style={{ position: 'absolute', left: 0, top: 0, width: `${Math.max(0, Math.min(1, fill)) * 100}%`, overflow: 'hidden', color: STAR, filter: `drop-shadow(0 0 6px ${STAR}66)` }}>★</span>
    </span>
  )
}

export default function AltCaseReputacion() {
  const frame = useCurrentFrame()
  const rating = 4.7 * ci(frame, [100, 142], [0, 1], SOFT)
  const ratingStr = rating.toFixed(1).replace('.', ',')
  const p2 = ci(frame, [136, 172], [0, 1], SOFT)

  const body = (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 18 }}>
        <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, lineHeight: 1, color: '#fff' }}>{ratingStr}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} fill={rating - i} />)}
          </div>
          <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>28 reseñas esta semana</span>
        </div>
      </div>

      <div style={{ display: 'flex', height: 12, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)', marginBottom: 8 }}>
        <div style={{ width: `${82 * p2}%`, background: GREEN }} />
        <div style={{ width: `${11 * p2}%`, background: 'rgba(255,255,255,0.3)' }} />
        <div style={{ width: `${7 * p2}%`, background: RED }} />
      </div>
      <div style={{ display: 'flex', gap: 16, fontFamily: "'Syne Mono', monospace", fontSize: 10 }}>
        <span style={{ color: GREEN }}>● Positivo 82%</span>
        <span style={{ color: 'rgba(255,255,255,0.5)' }}>● Neutro 11%</span>
        <span style={{ color: RED }}>● Negativo 7%</span>
      </div>
    </>
  )

  return (
    <AnswerScene
      question="¿Qué dicen los clientes esta semana?"
      eyebrow="Reseñas · todos los canales"
      alert={{ title: <><span style={{ color: RED }}>3 reseñas</span> mencionan "esperas" — te he redactado la respuesta</>, sub: 'lista para enviar con tu tono' }}
      insight={<>Responde hoy → recuperas al <span style={grad}>60% de los críticos</span></>}
    >
      {body}
    </AnswerScene>
  )
}
