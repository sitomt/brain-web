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
          detail: { message: 'Hola. Quiero agendar un diagnóstico gratuito.' },
        })
      )
    }, 400)
  }

  return (
    <AuroraBackground intense style={{ padding: isMobile ? '5rem 1.5rem' : '8rem 2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Syne Mono',monospace",
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Primera reunión, gratis
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(2.6rem,6vw,4.8rem)', color: '#fff', lineHeight: 1.05, margin: 0 }}
        >
          Treinta minutos.<br />
          <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Y el resto cambia.
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520 }}
        >
          Te decimos qué automatizamos en tu negocio, cómo lo hacemos
          y cuánto cuesta. Sin rodeos. Sin compromiso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
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
              Hablemos.
            </span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', margin: '-0.5rem 0 0' }}
        >
          Normalmente responde en menos de 2 horas
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
        >
          {['Sin permanencia', 'Resultados en 30 días', 'Sin coste inicial'].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'Syne Mono',monospace",
                fontSize: '0.62rem',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.06em',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ width: 4, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.25)', display: 'inline-block', flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </AuroraBackground>
  )
}
