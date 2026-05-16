import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const responses = [
  {
    keys: ['precio', 'coste', 'cuesta', 'cuánto', 'tarifa'],
    reply: 'La primera reunión es gratuita y te damos presupuesto exacto. ¿Quieres reservarla?',
  },
  {
    keys: ['chatbot', 'bot', 'whatsapp'],
    reply: 'Implementamos chatbots en WhatsApp, web y voz. Operativo en menos de 2 semanas.',
  },
  {
    keys: ['voz', 'teléfono', 'llamada'],
    reply: 'Nuestro voicebot atiende llamadas 24/7. Tu cliente habla, la IA entiende y responde.',
  },
  {
    keys: ['tiempo', 'cuándo', 'semanas', 'rápido'],
    reply: 'La mayoría de soluciones están operativas en 1-2 semanas desde el primer día.',
  },
  {
    keys: ['restaurante', 'hotel', 'clínica', 'gimnasio', 'clinica'],
    reply: 'Tenemos experiencia específica en tu sector. ¿Quieres que te expliquemos cómo lo haríamos?',
  },
  {
    keys: ['agendar', 'reunión', 'reunion', 'cita', 'gratuita'],
    reply: 'Perfecto. Sito se pondrá en contacto contigo en menos de 24 horas. ¿Cuál es tu email?',
  },
]

function getReply(input) {
  const lower = input.toLowerCase()
  for (const r of responses) {
    if (r.keys.some((k) => lower.includes(k))) return r.reply
  }
  return 'Me encantaría conectarte con Sito para entender tu caso específico. ¿Te parece bien que te contactemos?'
}

export default function ChatWidget({ isOpen, onOpen, onClose }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el asistente de BrAIn. ¿En qué puedo ayudarte?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => {
      const text = e.detail?.message
      if (!text) return
      setMessages((m) => [...m, { from: 'user', text }])
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages((m) => [
          ...m,
          {
            from: 'bot',
            text: 'Perfecto. Sito se pondrá en contacto contigo en menos de 24 horas. ¿Cuál es tu email?',
          },
        ])
      }, 1200)
    }
    window.addEventListener('chat:send', handler)
    return () => window.removeEventListener('chat:send', handler)
  }, [])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: getReply(text) }])
    }, 1000 + Math.random() * 600)
  }

  const btnRight = isMobile ? 16 : 28
  const btnBottom = isMobile ? 20 : 28

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={isOpen ? onClose : onOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed',
          bottom: btnBottom,
          right: btnRight,
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: '#1A1814',
          border: 'none',
          cursor: 'none',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: '50%',
            background: 'conic-gradient(#4361EE, #7209B7, #F72585, #FB5607, #4361EE)',
            zIndex: -1,
          }}
        />
        <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: '#1A1814' }} />
        <span style={{ position: 'relative', fontSize: '1.1rem', zIndex: 1 }}>
          {isOpen ? '✕' : '💬'}
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: isMobile ? 84 : 92,
              right: btnRight,
              left: isMobile ? btnRight : 'auto',
              width: isMobile ? 'auto' : 340,
              maxHeight: isMobile ? 'calc(100vh - 120px)' : 520,
              borderRadius: 20,
              background: '#fff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ background: '#1A1814', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne Mono',monospace", fontSize: '0.7rem', color: '#fff', fontWeight: 700, flexShrink: 0 }}>
                AI
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: '0.88rem', color: '#fff' }}>BrAIn Asistente</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
                  <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)' }}>En línea ahora</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFAFA' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '9px 14px',
                    borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.from === 'user' ? 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)' : '#F5F2EA',
                    color: msg.from === 'user' ? '#fff' : '#1A1814',
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 300,
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div style={{ display: 'flex', gap: 4, padding: '9px 14px', background: '#F5F2EA', borderRadius: '16px 16px 16px 4px', width: 'fit-content' }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#999' }} />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '0.75rem', borderTop: '1px solid #F0EDE6', display: 'flex', gap: 8, background: '#fff' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Escribe tu mensaje..."
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: 999,
                  border: '1px solid #E8E5DE',
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 300,
                  fontSize: '0.82rem',
                  outline: 'none',
                  background: '#FAFAFA',
                  cursor: 'text',
                }}
              />
              <button
                onClick={send}
                style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', color: '#fff', fontSize: '0.9rem', cursor: 'none', flexShrink: 0 }}
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
