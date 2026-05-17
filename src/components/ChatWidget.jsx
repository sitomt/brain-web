import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const responses = [
  {
    keys: ['precio', 'coste', 'cuesta', 'cuánto', 'tarifa', 'presupuesto', 'cuanto'],
    reply: 'La primera reunión es gratuita y te damos presupuesto exacto. Sin compromiso. ¿Quieres reservarla?',
  },
  {
    keys: ['chatbot', 'bot', 'whatsapp', 'instagram', 'telegram'],
    reply: 'Implementamos chatbots en WhatsApp, Instagram, Telegram, web y voz. Operativo en menos de 2 semanas.',
  },
  {
    keys: ['voz', 'teléfono', 'llamada', 'telefono'],
    reply: 'Nuestro voicebot atiende llamadas 24/7. Tu cliente habla, la IA entiende y responde.',
  },
  {
    keys: ['tiempo', 'cuándo', 'cuanto', 'semanas', 'rápido', 'rapido', 'plazo'],
    reply: 'La mayoría de soluciones están operativas en 1-2 semanas desde el primer día.',
  },
  {
    keys: ['restaurante', 'bar', 'hostelería', 'hosteleria', 'comida', 'carta'],
    reply: 'Para hostelería automatizamos reservas, consultas de carta y atención al cliente 24/7. ¿Quieres que te lo expliquemos?',
  },
  {
    keys: ['hotel', 'apartamento', 'turismo', 'alojamiento'],
    reply: 'Nuestros bots gestionan reservas, preguntas frecuentes y check-in para hoteles y alojamientos. ¿Te explicamos cómo?',
  },
  {
    keys: ['clínica', 'clinica', 'médico', 'medico', 'salud', 'dental', 'veterinaria', 'veterinario', 'fisio'],
    reply: 'En clínicas automatizamos citas, recordatorios y consultas de horarios. Tu equipo se centra en los pacientes. ¿Hablamos?',
  },
  {
    keys: ['gimnasio', 'deporte', 'entrenamiento', 'fitness', 'crossfit', 'pilates', 'yoga'],
    reply: 'Para centros deportivos gestionamos bajas, fichajes, comunicación de equipo e incidencias. Como lo hacemos para Baktun 13. ¿Te contamos?',
  },
  {
    keys: ['solar', 'energía', 'energia', 'instalación', 'instalacion', 'mantenimiento', 'leads', 'crm'],
    reply: 'Automatizamos la clasificación de leads y el CRM para que tu equipo solo cierre ventas. Como hacemos para Clesol. ¿Te explicamos?',
  },
  {
    keys: ['inmobiliaria', 'inmueble', 'piso', 'alquiler', 'compraventa'],
    reply: 'Para inmobiliarias clasificamos leads, respondemos consultas 24/7 y automatizamos el seguimiento. ¿Quieres una reunión gratuita?',
  },
  {
    keys: ['logística', 'logistica', 'transporte', 'almacén', 'almacen', 'distribución', 'distribucion'],
    reply: 'En logística automatizamos seguimiento de pedidos, incidencias y comunicación con clientes. ¿Te lo explicamos?',
  },
  {
    keys: ['tienda', 'ecommerce', 'e-commerce', 'online', 'shop', 'comercio'],
    reply: 'Para tiendas online automatizamos atención al cliente, seguimiento de pedidos y recuperación de carritos. ¿Hablamos?',
  },
  {
    keys: ['academia', 'escuela', 'formación', 'formacion', 'clases', 'cursos', 'idiomas'],
    reply: 'En academias y centros de formación automatizamos matrículas, consultas de horarios y seguimiento de alumnos. ¿Te explicamos cómo?',
  },
  {
    keys: ['franquicia', 'cadena', 'multitienda'],
    reply: 'Para franquicias y cadenas implementamos soluciones escalables que funcionan igual en todos los puntos de venta. ¿Hablamos?',
  },
  {
    keys: ['peluquería', 'peluqueria', 'estetica', 'estética', 'spa', 'belleza', 'salón', 'salon'],
    reply: 'Para salones y centros de estética automatizamos citas, recordatorios y respuestas 24/7. Tu cliente reserva aunque estés ocupado. ¿Te lo mostramos?',
  },
  {
    keys: ['agente', 'persona', 'humano', 'hablar', 'sito', 'directo', 'email', 'contacto'],
    reply: 'Claro. Escríbele directamente a Sito: ginesmunuera@gmail.com — o deja tu email aquí y te llama él.',
  },
  {
    keys: ['seguridad', 'datos', 'rgpd', 'gdpr', 'privacidad', 'confidencial', 'nda'],
    reply: 'Trabajamos bajo RGPD. Tus datos son confidenciales y firmamos NDA si lo necesitas. Sin excepciones.',
  },
  {
    keys: ['agendar', 'reunión', 'reunion', 'cita', 'gratuita', 'diagnóstico', 'diagnostico'],
    reply: 'Perfecto. Sito se pondrá en contacto contigo en menos de 24 horas. ¿Cuál es tu email?',
  },
]

const QUICK_REPLIES = [
  '¿Cuánto cuesta?',
  '¿Cuánto tarda en implementarse?',
  'Hablar con una persona',
]

function getReply(input) {
  const lower = input.toLowerCase()
  for (const r of responses) {
    if (r.keys.some((k) => lower.includes(k))) return r.reply
  }
  return '¡Apuntado! Sito revisará tu mensaje y te contactará en menos de 24h. ¿Me dices a qué sector pertenece tu negocio? Así puede preparar la reunión.'
}

export default function ChatWidget({ isOpen, onOpen, onClose }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el asistente de BrAIn. ¿En qué puedo ayudarte?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, showQuickReplies])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => {
      const text = e.detail?.message
      if (!text) return
      setShowQuickReplies(false)
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
        setShowQuickReplies(true)
        setTimeout(() => {
          setTyping(true)
          setTimeout(() => {
            setTyping(false)
            setMessages((m) => [
              ...m,
              { from: 'bot', text: '¿Me dices a qué sector pertenece tu negocio? Así Sito puede preparar la reunión.' },
            ])
          }, 1000)
        }, 3000)
      }, 1200)
    }
    window.addEventListener('chat:send', handler)
    return () => window.removeEventListener('chat:send', handler)
  }, [])

  const send = (textOverride) => {
    const text = (textOverride || input).trim()
    if (!text) return
    setShowQuickReplies(false)
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
              {showQuickReplies && !typing && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => send(qr)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 999,
                        border: '1px solid #4361EE',
                        background: 'transparent',
                        color: '#4361EE',
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 400,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#4361EE'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4361EE' }}
                    >
                      {qr}
                    </button>
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
