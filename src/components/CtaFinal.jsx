import { useState } from 'react'
import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import useIsMobile from '../hooks/useIsMobile'

export default function CtaFinal({ onChatOpen }) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()

  const handleReserva = () => {
    onChatOpen()
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('chat:send', {
          detail: { message: 'Hola. Quiero agendar una reunión.' },
        })
      )
    }, 400)
  }

  return (
    <AuroraBackground intense style={{ padding: isMobile ? '5rem 1.5rem' : '8rem 2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(2.8rem,6vw,5rem)', color: '#fff', lineHeight: 1 }}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <button
            onClick={handleReserva}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: 'relative',
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 500,
              fontSize: isMobile ? '0.9rem' : '1rem',
              padding: isMobile ? '0.9rem 1.75rem' : '1rem 2.5rem',
              borderRadius: 999,
              border: '1.5px solid',
              borderColor: hovered ? 'transparent' : '#ffffff',
              background: 'transparent',
              color: '#fff',
              cursor: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 999,
                background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
                zIndex: 0,
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>
              Agenda tu diagnóstico gratuito →
            </span>
          </button>
        </motion.div>

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
