import { useCurrentFrame } from 'remotion'
import AnswerScene, { Headline, ci, SOFT, GREEN, RED, grad } from './AnswerScene'

/**
 * Caso 09 — Salón de juego · cobertura de turnos 24/7.
 * Visual propio: tira de 24 h con bloques cubiertos y un hueco que parpadea.
 */

const GAP = [3, 4, 5, 6] // domingo madrugada sin cubrir

export default function AltCaseTurnos() {
  const frame = useCurrentFrame()
  const covered = Math.round(23 * ci(frame, [100, 140], [0, 1], SOFT))
  const pulse = ci((frame % 30), [0, 15, 30], [0.35, 1, 0.35])

  const body = (
    <>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <Headline value={covered} unit="/ 24 turnos" />
        <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 11, color: RED }}>1 hueco</span>
      </div>

      <div style={{ display: 'flex', gap: 2.5 }}>
        {Array.from({ length: 24 }).map((_, h) => {
          const appear = ci(frame, [110 + h * 1.4, 110 + h * 1.4 + 12], [0, 1], SOFT)
          const isGap = GAP.includes(h)
          return (
            <div key={h} style={{
              flex: 1, height: 40, borderRadius: 4,
              background: isGap ? `rgba(247,37,133,${0.25 + pulse * 0.5})` : 'rgba(34,197,94,0.5)',
              border: isGap ? `1px solid ${RED}` : '1px solid rgba(34,197,94,0.3)',
              opacity: appear,
            }} />
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {['00', '06', '12', '18', '24'].map((t) => (
          <span key={t} style={{ fontFamily: "'Syne Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{t}h</span>
        ))}
      </div>
    </>
  )

  return (
    <AnswerScene
      question="¿Tengo todos los turnos cubiertos?"
      eyebrow="Cobertura · próximas 24 h"
      alert={{ title: <><span style={{ color: RED }}>Domingo 03:00–07:00</span> sin cubrir — te propongo a Marta</>, sub: 'disponible y dentro de horas · 1 toque para confirmar' }}
      insight={<>Confirma → <span style={grad}>100% cubierto, 0 incidencias</span></>}
    >
      {body}
    </AnswerScene>
  )
}
