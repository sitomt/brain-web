import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const BG = '#0D0D10'

// Timing map (300 frames = 10s @ 30fps):
// 0-18   header fades in                 → hook: timestamp 23:47
// 20-66  user types MSG1
// 66-76  bubble MSG1
// 78-96  bot typing
// 96-108 bot reply 1                     → confirmación rápida + pregunta nombre
// 140-175 user types MSG2
// 175-185 bubble MSG2
// 187-206 bot typing
// 206-218 bot reply 2a                   → knowledge base (sin gluten)
// 220-238 bot typing 2b
// 248-262 bot reply 2b (proactive)       → WOW: ofrece recordatorio WhatsApp
// 287-300 fade out

function useBlink(frame) {
  return Math.floor(frame / 15) % 2 === 0
}

function typeAt(text, frame, start, speed) {
  return text.slice(0, Math.max(0, Math.floor((frame - start) * speed)))
}

function fi(frame, a, b) {
  return interpolate(frame, [a, b], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  })
}

function ChatBubble({ from, text, opacity, faded }) {
  const isUser = from === 'user'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      opacity: opacity * (faded ? 0.38 : 1),
      marginBottom: 7,
    }}>
      <div style={{
        padding: '7px 13px',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: isUser ? GRADIENT : 'rgba(255,255,255,0.1)',
        color: '#fff',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        maxWidth: '82%',
        lineHeight: 1.55,
      }}>
        {text}
      </div>
    </div>
  )
}

function TypingDots({ frame }) {
  const dots = [0, 1, 2].map((i) => {
    const t = (frame + i * 10) % 30
    const sc = interpolate(t, [0, 15, 30], [0.6, 1.2, 0.6], { extrapolateRight: 'clamp' })
    return (
      <div
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.5)',
          transform: `scale(${sc})`,
        }}
      />
    )
  })
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 7 }}>
      <div style={{
        padding: '9px 13px',
        borderRadius: '14px 14px 14px 4px',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex',
        gap: 5,
        alignItems: 'center',
      }}>
        {dots}
      </div>
    </div>
  )
}

export default function ChatbotDemo() {
  const frame = useCurrentFrame()
  const blink = useBlink(frame)

  const MSG1 = 'Buenas, mesa para 4 mañana sábado a las 9'
  const MSG2 = 'García. ¿Tenéis algo sin gluten?'

  const headerOpacity = fi(frame, 0, 18)

  // Exchange 1
  const msg1Typed = frame >= 20 ? typeAt(MSG1, frame, 20, 0.95) : ''
  const msg1Sent = frame >= 66
  const msg1BubbleOp = fi(frame, 66, 76)
  const showTyping1 = frame >= 78 && frame < 96
  const bot1Op = fi(frame, 96, 108)
  const dimFirst = frame >= 206

  // Exchange 2
  const msg2Typed = frame >= 140 && frame < 175 ? typeAt(MSG2, frame, 140, 0.92) : ''
  const msg2Sent = frame >= 175
  const msg2BubbleOp = fi(frame, 175, 185)
  const showTyping2 = frame >= 187 && frame < 206
  const bot2aOp = fi(frame, 206, 218)

  // Proactive offer (typing then message)
  const showTyping2b = frame >= 220 && frame < 238
  const bot2bOp = fi(frame, 248, 262)
  const phoneScale = interpolate(frame, [254, 268], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  })

  const fadeOut = interpolate(frame, [287, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Input field
  let inputText = ''
  let showCursor = false
  if (frame >= 20 && !msg1Sent) { inputText = msg1Typed; showCursor = true }
  if (frame >= 140 && !msg2Sent) { inputText = msg2Typed; showCursor = true }

  const sendActive =
    (frame >= 54 && frame < 80) ||
    (frame >= 165 && frame < 190)

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: "'DM Sans', sans-serif", opacity: fadeOut }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 340,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        overflow: 'hidden',
        opacity: headerOpacity,
      }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: GRADIENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontFamily: "'Syne Mono', monospace",
            color: '#fff',
            fontWeight: 700,
          }}>AI</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>BrAIn Asistente</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: '#22c55e' }} />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>En línea · 24h</span>
            </div>
          </div>
          {/* The hook: late-night timestamp → loss aversion */}
          <div style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: 11,
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.05em',
          }}>23:47</div>
        </div>

        {/* Messages */}
        <div style={{ padding: '12px 14px' }}>
          {msg1Sent && (
            <ChatBubble from="user" text={MSG1} opacity={msg1BubbleOp} faded={dimFirst} />
          )}
          {showTyping1 && <TypingDots frame={frame} />}
          {frame >= 96 && (
            <ChatBubble
              from="bot"
              text="¡Reservado! Mesa para 4 el sábado a las 21:00 🎉 ¿A nombre de quién?"
              opacity={bot1Op}
              faded={dimFirst}
            />
          )}

          {msg2Sent && (
            <ChatBubble from="user" text={MSG2} opacity={msg2BubbleOp} />
          )}
          {showTyping2 && <TypingDots frame={frame} />}
          {frame >= 206 && (
            <ChatBubble
              from="bot"
              text="García ✓ — el 60% de la carta es sin gluten. Os guardamos la mesa 🌿"
              opacity={bot2aOp}
            />
          )}

          {showTyping2b && <TypingDots frame={frame} />}
          {frame >= 248 && (
            <div style={{
              opacity: bot2bOp,
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: 7,
            }}>
              <div style={{
                padding: '7px 13px',
                borderRadius: '14px 14px 14px 4px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                lineHeight: 1.55,
              }}>
                <span style={{
                  display: 'inline-block',
                  transform: `scale(${phoneScale})`,
                  fontSize: 15,
                }}>📲</span>
                ¿Te mando un recordatorio por WhatsApp el viernes?
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          padding: '10px 14px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 999,
            padding: '7px 14px',
            fontSize: 12,
            color: inputText ? '#fff' : 'rgba(255,255,255,0.3)',
            fontFamily: "'DM Sans', sans-serif",
            minHeight: 30,
            display: 'flex',
            alignItems: 'center',
          }}>
            {inputText || 'Escribe un mensaje...'}
            {showCursor && blink && (
              <span style={{
                display: 'inline-block',
                width: 1,
                height: 13,
                background: '#fff',
                marginLeft: 1,
              }} />
            )}
          </div>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            background: sendActive ? GRADIENT : 'rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: '#fff',
          }}>→</div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
