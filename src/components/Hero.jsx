import { motion } from 'framer-motion'
import CometCard from './CometCard'
import useIsMobile from '../hooks/useIsMobile'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const chatMessages = [
  { from: 'user', text: 'Quiero reservar mesa para 4 el sábado a las 9pm.' },
  { from: 'bot',  text: '¡Perfecto! Mesa para 4 el sábado 17 a las 21:00 h confirmada. ¿Nombre para la reserva?' },
  { from: 'user', text: 'García, gracias!' },
  { from: 'bot',  text: 'Reserva confirmada a nombre de García. Te mandamos el recordatorio por WhatsApp.' },
]

export default function Hero({ onChatOpen }) {
  const isMobile = useIsMobile()
  return (
    <section
      id="hero"
      style={{
        background: '#FAF8F3',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '8rem 2rem 4rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2.5rem' : '4rem',
          alignItems: 'center',
        }}
      >
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div {...fadeUp(0.1)}>
            <span
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.72rem',
                background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ width: 32, height: 1, background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)', display: 'inline-block', flexShrink: 0 }} />
              Agencia de IA · Murcia, España
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.5rem,5vw,5rem)', lineHeight: 1.05, color: '#1A1814' }}>
            Inteligencia que trabaja
            <br />
            <em
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              mientras tú no estás.
            </em>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', color: '#4A4740', lineHeight: 1.7, maxWidth: 420 }}>
            Diseñamos sistemas de IA para que tu negocio funcione solo. Sin depender de personas. Con resultados consistentes.
          </motion.p>

          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <motion.button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: '0.9rem',
                padding: '12px 28px',
                borderRadius: 999,
                border: 'none',
                background: '#1A1814',
                color: '#FAF8F3',
                cursor: 'none',
              }}
            >
              Ver soluciones ↓
            </motion.button>
            <button
              onClick={onChatOpen}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.9rem',
                color: '#4A4740',
                background: 'none',
                border: 'none',
                cursor: 'none',
                opacity: 0.8,
              }}
            >
              Empecemos →
            </button>
          </motion.div>
        </div>

        {/* Right column — Chat mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '100%', maxWidth: 420 }}
          >
            <CometCard style={{ background: 'rgba(26,24,20,0.96)' }}>
              {/* Header */}
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Syne Mono', monospace",
                    fontSize: '0.7rem',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                >
                  AI
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.85rem', color: '#fff' }}>BrAIn Asistente</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }}
                    />
                    <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>En línea</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.from === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.3 }}
                    style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <div
                      style={{
                        maxWidth: '80%',
                        padding: '8px 14px',
                        borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: msg.from === 'user'
                          ? 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)'
                          : 'rgba(255,255,255,0.08)',
                        color: '#fff',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: '0.78rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ flex: 1, padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
                  Escribe tu mensaje...
                </div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                  →
                </div>
              </div>
            </CometCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
