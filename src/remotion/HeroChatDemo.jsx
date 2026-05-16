import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

// ── Scene boundaries (30 fps) ──────────────────────────────────────────────
// Scene 1: frames   0–299  (10 s) — Reserva restaurante 23:18
// Scene 2: frames 300–599  (10 s) — Consulta de datos negocio 10:15
// Scene 3: frames 600–899  (10 s) — Lead / clínica 14:07
// Crossfade: 18 frames entre escenas
const S2 = 300
const S3 = 600
const TOTAL = 900
const XF = 18   // crossfade frames

// ── Utilities ─────────────────────────────────────────────────────────────

const ci = (frame, input, output, easing) =>
  interpolate(frame, input, output, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing })

const fadeIn = (lf, start, dur = 14) =>
  ci(lf, [start, start + dur], [0, 1], Easing.bezier(0.22, 1, 0.36, 1))

const typeAt = (text, lf, start, speed = 1.5) =>
  text.slice(0, Math.max(0, Math.floor((lf - start) * speed)))

const blinkOn = (frame) => Math.floor(frame / 15) % 2 === 0

const dotPulse = (frame) =>
  ci((frame % 45) / 45, [0, 0.5, 1], [1, 0.25, 1])

// opacity envelope for each scene — crossfades overlap at boundaries
function sceneOp(frame, start) {
  const end = start + 300
  return ci(frame, [start - XF, start, end - XF, end], [0, 1, 1, 0])
}

// ── Shared UI ─────────────────────────────────────────────────────────────

function Header({ clock, subtitle, frame }) {
  return (
    <div
      style={{
        padding: '13px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: GRADIENT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Syne Mono', monospace",
          fontSize: 10,
          color: '#fff',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        AI
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
          {subtitle || 'BrAIn Asistente'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#22C55E',
              opacity: dotPulse(frame),
            }}
          />
          <span
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: 9,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            En línea
          </span>
        </div>
      </div>
      <div
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: 10.5,
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.05em',
          flexShrink: 0,
        }}
      >
        {clock}
      </div>
    </div>
  )
}

function TypingDots({ frame }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 7 }}>
      <div
        style={{
          padding: '9px 13px',
          borderRadius: '14px 14px 14px 4px',
          background: 'rgba(255,255,255,0.1)',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => {
          const t = (frame * 2 + i * 10) % 30
          const s = ci(t, [0, 15, 30], [0.5, 1.3, 0.5])
          return (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.45)',
                transform: `scale(${s})`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

function Bubble({ from, text, opacity = 1 }) {
  const isUser = from === 'user'
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        opacity,
        marginBottom: 7,
      }}
    >
      <div
        style={{
          padding: '8px 13px',
          maxWidth: '82%',
          lineHeight: 1.55,
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: isUser ? GRADIENT : 'rgba(255,255,255,0.1)',
          color: '#fff',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12.5,
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </div>
    </div>
  )
}

function InputBar({ inputText, showCursor, frame, sendActive }) {
  return (
    <div
      style={{
        padding: '9px 15px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 999,
          padding: '7px 13px',
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          color: inputText ? '#fff' : 'rgba(255,255,255,0.25)',
          fontFamily: "'DM Sans', sans-serif",
          minHeight: 30,
        }}
      >
        <span>{inputText || 'Escribe tu mensaje...'}</span>
        {showCursor && blinkOn(frame) && (
          <span
            style={{
              display: 'inline-block',
              width: 1.5,
              height: 12,
              background: '#fff',
              marginLeft: 2,
              opacity: 0.8,
            }}
          />
        )}
      </div>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: sendActive ? GRADIENT : 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          color: '#fff',
          flexShrink: 0,
        }}
      >
        →
      </div>
    </div>
  )
}

// ── Scene 1 badges ────────────────────────────────────────────────────────

function WhatsAppBadge({ lf, from }) {
  const op = fadeIn(lf, from, 15)
  const scale = ci(lf, [from, from + 14], [0.78, 1], Easing.bezier(0.34, 1.56, 0.64, 1))
  return (
    <div
      style={{
        opacity: op,
        transform: `scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(37,211,102,0.12)',
        border: '1px solid rgba(37,211,102,0.28)',
        borderRadius: 10,
        padding: '7px 13px',
        marginBottom: 4,
        transformOrigin: 'left center',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.522 5.859L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.368l-.36-.214-3.726.972.999-3.634-.235-.374A9.818 9.818 0 1112 21.818z" />
      </svg>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: '#25D366',
          fontWeight: 500,
        }}
      >
        Confirmación enviada por WhatsApp
      </span>
    </div>
  )
}

// ── Scene 2 — MetricCard ───────────────────────────────────────────────────

function MetricCard({ lf, from }) {
  const op = fadeIn(lf, from, 12)
  // missed calls count-up: 0 → 73
  const calls = Math.round(ci(lf, [from, from + 22], [0, 73], Easing.bezier(0.22, 1, 0.36, 1)))
  // euro loss count-up: 0 → 2190
  const euros = Math.round(ci(lf, [from + 6, from + 28], [0, 2190], Easing.bezier(0.22, 1, 0.36, 1)))
  // gradient bar fill
  const barW = ci(lf, [from + 8, from + 32], [0, 72])

  return (
    <div
      style={{
        opacity: op,
        background: 'rgba(247,37,133,0.07)',
        border: '1px solid rgba(247,37,133,0.2)',
        borderRadius: 12,
        padding: '11px 14px',
        marginBottom: 7,
      }}
    >
      <div
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: 9,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.08em',
          marginBottom: 8,
        }}
      >
        📊 MAYO — LLAMADAS SIN ATENDER
      </div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', marginBottom: 8 }}>
        <div>
          <div
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 28,
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {calls}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              color: 'rgba(255,255,255,0.4)',
              marginTop: 2,
            }}
          >
            llamadas perdidas
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 18,
              color: '#F72585',
              lineHeight: 1,
            }}
          >
            {euros.toLocaleString('es-ES')} €
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              color: 'rgba(255,255,255,0.4)',
              marginTop: 2,
            }}
          >
            ingreso estimado perdido
          </div>
        </div>
      </div>

      <div
        style={{
          height: 3,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${barW}%`,
            height: '100%',
            background: GRADIENT,
            borderRadius: 99,
          }}
        />
      </div>
    </div>
  )
}

// ── Scene 3 — CalendarBadge ───────────────────────────────────────────────

function CalendarBadge({ lf, from }) {
  const op = fadeIn(lf, from, 15)
  const scale = ci(lf, [from, from + 14], [0.78, 1], Easing.bezier(0.34, 1.56, 0.64, 1))
  return (
    <div
      style={{
        opacity: op,
        transform: `scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'rgba(67,97,238,0.13)',
        border: '1px solid rgba(67,97,238,0.3)',
        borderRadius: 10,
        padding: '9px 13px',
        marginBottom: 4,
        transformOrigin: 'left center',
      }}
    >
      <div style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>📅</div>
      <div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: '#fff',
            fontWeight: 600,
          }}
        >
          Reunión confirmada
        </div>
        <div
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: 9.5,
            color: 'rgba(255,255,255,0.45)',
            marginTop: 2,
          }}
        >
          Mañana · 10:00 h · Sito te llama
        </div>
      </div>
      <div
        style={{
          marginLeft: 'auto',
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#22C55E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          color: '#fff',
          flexShrink: 0,
        }}
      >
        ✓
      </div>
    </div>
  )
}

// ── Scene 1: Reserva restaurante — 23:18 ──────────────────────────────────
// lf 0-15   : (fade-in via sceneOp)
// lf 15-52  : user types msg1
// lf 52-66  : msg1 sent
// lf 66-85  : bot typing
// lf 85-112 : bot msg1 appears
// lf 112-148: user types msg2
// lf 148-163: msg2 sent
// lf 163-180: bot typing
// lf 180-210: bot msg2 appears
// lf 210-240: WhatsApp badge pops in
// lf 240-282: pause
// lf 282-300: crossfade out

function Scene1({ frame }) {
  const lf = frame

  const U1 = '¿Podéis reservarme mesa para mañana?'
  const B1 = '¡Hola! Claro, estamos aquí 24 h 😊\n¿Para cuántas personas y a qué hora?'
  const U2 = 'Para 6, a las 9 de la noche'
  const B2 = '✓ Mesa para 6 — sábado 21:00 h\nconfirmada. ¿Nombre para la reserva?'

  const typing1 = lf >= 15 && lf < 52 ? typeAt(U1, lf, 15) : ''
  const sent1    = lf >= 52
  const showT1   = lf >= 66 && lf < 85
  const showB1   = lf >= 85

  const typing2 = sent1 && lf >= 112 && lf < 148 ? typeAt(U2, lf, 112) : ''
  const sent2    = lf >= 148
  const showT2   = lf >= 163 && lf < 180
  const showB2   = lf >= 180

  const inputText  = !sent1 ? typing1 : (!sent2 && lf >= 112 ? typing2 : '')
  const showCursor = (!sent1 && lf >= 15) || (!sent2 && lf >= 112 && lf < 148)
  const sendActive = (lf >= 38 && lf < 52) || (lf >= 134 && lf < 148)

  return (
    <>
      <Header clock="23:18" frame={frame} />
      <div
        style={{
          flex: 1,
          padding: '12px 15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {sent1 && <Bubble from="user" text={U1} opacity={fadeIn(lf, 52)} />}
        {showT1 && <TypingDots frame={frame} />}
        {showB1 && <Bubble from="bot" text={B1} opacity={fadeIn(lf, 85)} />}
        {sent2 && <Bubble from="user" text={U2} opacity={fadeIn(lf, 148)} />}
        {showT2 && <TypingDots frame={frame} />}
        {showB2 && <Bubble from="bot" text={B2} opacity={fadeIn(lf, 180)} />}
        {showB2 && <WhatsAppBadge lf={lf} from={210} />}
      </div>
      <InputBar
        inputText={inputText}
        showCursor={showCursor}
        frame={frame}
        sendActive={sendActive}
      />
    </>
  )
}

// ── Scene 2: Consulta de datos — 10:15 ────────────────────────────────────
// lf 0-15   : (fade-in via sceneOp)
// lf 15-55  : user types msg1
// lf 55-68  : msg1 sent
// lf 68-87  : bot typing
// lf 87-200 : bot msg1 (texto) + MetricCard animate
// lf 155-185: user types msg2
// lf 185-198: msg2 sent
// lf 198-215: bot typing
// lf 215-265: bot msg2 aparece
// lf 250-282: pause
// lf 282-300: crossfade out

function Scene2({ frame }) {
  const lf = frame - S2

  const U1 = '¿Cuántas llamadas perdí el mes pasado?'
  const B1 = 'Aquí el resumen de mayo 👇'
  const U2 = '¿En qué franja horaria ocurren más?'
  const B2 = 'El 71% llegaron fuera de tu horario de apertura —\nentre las 22:00 y las 10:00 h 🌙'

  const typing1 = lf >= 15 && lf < 55 ? typeAt(U1, lf, 15) : ''
  const sent1    = lf >= 55
  const showT1   = lf >= 68 && lf < 87
  const showB1   = lf >= 87

  const typing2 = sent1 && lf >= 155 && lf < 185 ? typeAt(U2, lf, 155) : ''
  const sent2    = lf >= 185
  const showT2   = lf >= 198 && lf < 215
  const showB2   = lf >= 215

  const inputText  = !sent1 ? typing1 : (!sent2 && lf >= 155 ? typing2 : '')
  const showCursor = (!sent1 && lf >= 15) || (!sent2 && lf >= 155 && lf < 185)
  const sendActive = (lf >= 40 && lf < 55) || (lf >= 170 && lf < 185)

  return (
    <>
      <Header clock="10:15" subtitle="BrAIn · Datos" frame={frame} />
      <div
        style={{
          flex: 1,
          padding: '12px 15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {sent1 && <Bubble from="user" text={U1} opacity={fadeIn(lf, 55)} />}
        {showT1 && <TypingDots frame={frame} />}
        {showB1 && <Bubble from="bot" text={B1} opacity={fadeIn(lf, 87)} />}
        {showB1 && <MetricCard lf={lf} from={98} />}
        {sent2 && <Bubble from="user" text={U2} opacity={fadeIn(lf, 185)} />}
        {showT2 && <TypingDots frame={frame} />}
        {showB2 && <Bubble from="bot" text={B2} opacity={fadeIn(lf, 215)} />}
      </div>
      <InputBar
        inputText={inputText}
        showCursor={showCursor}
        frame={frame}
        sendActive={sendActive}
      />
    </>
  )
}

// ── Scene 3: Lead qualification — clínica 14:07 ────────────────────────────
// lf 0-15   : (fade-in via sceneOp)
// lf 15-55  : user types msg1
// lf 55-68  : msg1 sent
// lf 68-88  : bot typing
// lf 88-165 : bot msg1
// lf 148-178: user types msg2
// lf 178-192: msg2 sent
// lf 192-210: bot typing
// lf 210-265: bot msg2 + CalendarBadge
// lf 255-282: pause
// lf 282-300: crossfade out

function Scene3({ frame }) {
  const lf = frame - S3

  const U1 = 'Hola, tengo una clínica dental y pierdo muchas llamadas'
  const B1 = '¡Hola! Entiendo el problema 😊\n¿Cuántas llamadas perdidas calculas al día?'
  const U2 = 'Unas 15 o 20 al día'
  const B2 = 'Con nuestro sistema recuperarías entre\n280 y 400 nuevos contactos al mes 💡\n¿Hablamos mañana a las 10:00 h?'

  const typing1 = lf >= 15 && lf < 55 ? typeAt(U1, lf, 15) : ''
  const sent1    = lf >= 55
  const showT1   = lf >= 68 && lf < 88
  const showB1   = lf >= 88

  const typing2 = sent1 && lf >= 148 && lf < 178 ? typeAt(U2, lf, 148) : ''
  const sent2    = lf >= 178
  const showT2   = lf >= 192 && lf < 210
  const showB2   = lf >= 210

  const inputText  = !sent1 ? typing1 : (!sent2 && lf >= 148 ? typing2 : '')
  const showCursor = (!sent1 && lf >= 15) || (!sent2 && lf >= 148 && lf < 178)
  const sendActive = (lf >= 40 && lf < 55) || (lf >= 162 && lf < 178)

  return (
    <>
      <Header clock="14:07" frame={frame} />
      <div
        style={{
          flex: 1,
          padding: '12px 15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {sent1 && <Bubble from="user" text={U1} opacity={fadeIn(lf, 55)} />}
        {showT1 && <TypingDots frame={frame} />}
        {showB1 && <Bubble from="bot" text={B1} opacity={fadeIn(lf, 88)} />}
        {sent2 && <Bubble from="user" text={U2} opacity={fadeIn(lf, 178)} />}
        {showT2 && <TypingDots frame={frame} />}
        {showB2 && <Bubble from="bot" text={B2} opacity={fadeIn(lf, 210)} />}
        {showB2 && <CalendarBadge lf={lf} from={240} />}
      </div>
      <InputBar
        inputText={inputText}
        showCursor={showCursor}
        frame={frame}
        sendActive={sendActive}
      />
    </>
  )
}

// ── Root ───────────────────────────────────────────────────────────────────

const SHELL = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: "'DM Sans', sans-serif",
}

export default function HeroChatDemo() {
  const frame = useCurrentFrame()

  // Crossfading opacities — scenes overlap XF frames at each transition
  const op1 = ci(frame, [0, XF, S2 - XF, S2], [0, 1, 1, 0])
  const op2 = ci(frame, [S2 - XF, S2, S3 - XF, S3], [0, 1, 1, 0])
  const op3 = ci(frame, [S3 - XF, S3, TOTAL - XF, TOTAL], [0, 1, 1, 0])

  return (
    <AbsoluteFill style={{ background: 'transparent' }}>
      {/* Scene 1 */}
      <div style={{ ...SHELL, opacity: op1 }}>
        <Scene1 frame={frame} />
      </div>

      {/* Scene 2 */}
      <div style={{ ...SHELL, opacity: op2 }}>
        <Scene2 frame={frame} />
      </div>

      {/* Scene 3 */}
      <div style={{ ...SHELL, opacity: op3 }}>
        <Scene3 frame={frame} />
      </div>
    </AbsoluteFill>
  )
}
