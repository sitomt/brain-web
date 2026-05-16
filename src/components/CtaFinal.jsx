import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'

export default function CtaFinal({ onChatOpen }) {
  const handleReserva = () => {
    onChatOpen()
    // Open chat then dispatch the agenda message after animation settles
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('chat:send', {
          detail: { message: 'Hola. Quiero agendar una reunión.' },
        })
      )
    }, 400)
  }

  return (
    <AuroraBackground intense style={{ padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(3rem,6vw,5rem)', color: '#fff', lineHeight: 1 }}
        >
          ¿Empezamos?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}
        >
          Sin permanencia. Sin sorpresas.<br />
          Con resultados en menos de 30 días.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleReserva}
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 500,
            fontSize: '1rem',
            padding: '1rem 2.5rem',
            borderRadius: 4,
            border: '1.5px solid #ffffff',
            background: 'transparent',
            color: '#fff',
            cursor: 'none',
            transition: 'background 0.3s, border-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
            e.currentTarget.style.borderColor = 'transparent'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = '#ffffff'
          }}
        >
          Reserva tu reunión gratuita
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', cursor: 'none' }}
          onClick={onChatOpen}
        >
          o habla ahora mismo con nuestro asistente ↓
        </motion.p>
      </div>
    </AuroraBackground>
  )
}
