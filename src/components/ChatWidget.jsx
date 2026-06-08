import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'

// CornerRightUp (lucide) inlined — keeps the project free of an icon dependency.
function CornerRightUp({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
      <polyline points="10 9 15 4 20 9" />
      <path d="M4 20h7a4 4 0 0 0 4-4V4" />
    </svg>
  )
}

function MicIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" style={{ display: 'block' }}>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  )
}

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'


const QUICK_REPLIES = [
  '¿Cuánto cuesta?',
  '¿Cuánto tarda en implementarse?',
  'Hablar con una persona',
]

const DEFAULT_GREETING = '¡Hola! Soy el asistente de BrAIn. ¿En qué puedo ayudarte?'

const CONTEXT_GREETINGS = {
  navbar: DEFAULT_GREETING,
  hero: '¡Hola! Soy el asistente de BrAIn. ¿Qué parte de tu negocio te gustaría mejorar?',
  contact_center: 'Te interesa Atención al Cliente: atender cada conversación al instante, en cualquier canal. ¿Por dónde te entran hoy más consultas — WhatsApp, teléfono o web?',
  back_office: 'Te interesa Operaciones: automatizar las tareas administrativas que se repiten. ¿Cuál os roba más tiempo cada semana — emails, facturas, informes?',
  asistente: 'Te interesa Inteligencia de Negocio: preguntar a tus datos y obtener la respuesta al instante. ¿Qué dato te gustaría poder consultar?',
  tier2_other: 'Cuéntame qué proceso repetitivo te gustaría automatizar y te digo si encaja con lo que hacemos.',
  cta_final: 'Para preparar bien la reunión y llegar con los deberes hechos, cuéntame: ¿en qué sector trabajas?',
  nosotros: 'Veo que nos has querido conocer. ¿Hay algo concreto sobre cómo trabajamos que quieras preguntarnos?',
  founders: '¡Genial! El Programa Fundadores es para los primeros negocios que entran con nosotros: precio fundador, acceso directo y prioridad. Quedan pocas plazas. ¿En qué sector trabajas para decirte cómo encajaría?',
}

const greetingFor = (ctx) => CONTEXT_GREETINGS[ctx] || DEFAULT_GREETING

// Nombre de cara al cliente de cada solución (para la frase de recomendación).
const PRODUCT_NAMES = {
  contact_center: 'Atención al Cliente',
  back_office: 'Operaciones',
  asistente: 'Inteligencia de Negocio',
}
// Frase que el bot "dice" en el instante en que abre el producto en pantalla.
// Se inyecta desde el cliente para garantizar que aparece SIEMPRE que hay recomendación.
const recommendPhrase = (productId) =>
  `Por lo que me cuentas, lo que mejor se ajusta a lo que necesitas es ${PRODUCT_NAMES[productId] || 'esta solución'}. Te lo acabo de abrir en pantalla para que puedas echarle un vistazo.`

// Persistencia de la conversación durante la sesión (sessionStorage): sobrevive a
// minimizar, navegar entre rutas y recargar; se borra al cerrar la pestaña.
const MSG_STORAGE_KEY = 'brain_chat_messages'
const LEAD_STORAGE_KEY = 'brain_chat_lead'
const DEFAULT_MESSAGES = [{ from: 'bot', text: DEFAULT_GREETING }]

function loadStored(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

// Hay conversación en curso si el visitante ya escribió algún mensaje.
const hasUserTurn = (msgs) => Array.isArray(msgs) && msgs.some((m) => m.from === 'user')


export default function ChatWidget({ isOpen, context, onOpen, onClose, onRecommendProduct }) {
  const [messages, setMessages] = useState(() => {
    const stored = loadStored(MSG_STORAGE_KEY, null)
    return Array.isArray(stored) && stored.length ? stored : DEFAULT_MESSAGES
  })
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  // Voice input (Web Speech API) — transcribes speech into the text input.
  const [isListening, setIsListening] = useState(false)
  // Feature-detect once at mount (sync, no effect) so the first render is correct
  // and we avoid a cascading re-render from setting state inside an effect.
  const [speechSupported] = useState(
    () => typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition),
  )
  const recognitionRef = useRef(null)
  // Ignora resultados de voz que lleguen DESPUÉS de pulsar enviar (evita que la
  // transcripción reaparezca en la cajita tras mandar el mensaje).
  const ignoreSpeechRef = useRef(false)
  // Live count for the "personas hablando ahora" indicator.
  // Starts 2–4, drifts ±1 every 8–15s, clamped to 1–5.
  const [liveCount, setLiveCount] = useState(() => 2 + Math.floor(Math.random() * 3))
  const wasOpenRef = useRef(false)
  const lastContextRef = useRef(null)
  // Mirror de los mensajes para construir el historial al llamar a la API sin esperar al re-render.
  // Además persiste la conversación en sessionStorage en cada cambio.
  const messagesRef = useRef(messages)
  useEffect(() => {
    messagesRef.current = messages
    try { sessionStorage.setItem(MSG_STORAGE_KEY, JSON.stringify(messages)) } catch { /* incógnito/cuota: seguimos en memoria */ }
  }, [messages])
  // Datos del lead que la API va capturando; se reenvían en cada petición para no repetir preguntas.
  const leadRef = useRef(loadStored(LEAD_STORAGE_KEY, {}) || {})
  // Último producto recomendado por el bot, para no re-navegar en bucle.
  const lastRecommendedRef = useRef(null)
  const langRef = useRef(typeof navigator !== 'undefined' && navigator.language?.startsWith('en') ? 'en' : 'es')
  const endRef = useRef(null)
  const isMobile = useIsMobile()
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: isMobile ? 48 : 44, maxHeight: 120 })

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, showQuickReplies])

  // Drift the live count by ±1 every 8–15s, clamped between 1 and 5
  useEffect(() => {
    let timeoutId
    const tick = () => {
      setLiveCount(prev => {
        const delta = Math.random() < 0.5 ? -1 : 1
        const next = prev + delta
        if (next < 1) return 1
        if (next > 5) return 5
        return next
      })
      timeoutId = setTimeout(tick, 8000 + Math.random() * 7000)
    }
    timeoutId = setTimeout(tick, 8000 + Math.random() * 7000)
    return () => clearTimeout(timeoutId)
  }, [])

  // Web Speech API setup — voice → text into the input. Graceful if unsupported.
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = 'es-ES'
    recognition.continuous = false
    recognition.interimResults = true

    recognition.onresult = (event) => {
      if (ignoreSpeechRef.current) return // se envió mientras dictaba: no repuebles la cajita
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join('')
      setInput(transcript)
      adjustHeight()
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = (e) => {
      setIsListening(false)
      console.warn('Speech recognition error:', e.error)
    }

    recognitionRef.current = recognition
    return () => recognition.abort()
  }, [adjustHeight])

  const toggleListening = () => {
    if (!speechSupported) return
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      ignoreSpeechRef.current = false // nueva dictación: vuelve a aceptar resultados
      setInput('')
      adjustHeight(true)
      try {
        recognitionRef.current?.start()
        setIsListening(true)
      } catch {
        // start() throws if already running — ignore and resync state.
        setIsListening(false)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      // Sólo sembramos el saludo de contexto si NO hay conversación en curso
      // (el visitante aún no ha escrito nada). Si ya está hablando, conservamos
      // el historial y sólo actualizamos el contexto para la próxima llamada a la API.
      const conversationActive = hasUserTurn(messagesRef.current)
      const freshOpen = !wasOpenRef.current
      const contextChanged = context && context !== lastContextRef.current
      if ((freshOpen || contextChanged) && !conversationActive) {
        setMessages([{ from: 'bot', text: greetingFor(context) }])
        setShowQuickReplies(false)
        setTyping(false)
      }
      if (context) lastContextRef.current = context
      wasOpenRef.current = true
      setTimeout(() => textareaRef.current?.focus(), 350)
    } else {
      wasOpenRef.current = false
    }
  }, [isOpen, context, textareaRef])

  // Llama al endpoint /api/chat (Claude Sonnet) con todo el historial + contexto de sección.
  // Si la API falla, muestra un mensaje honesto (sin fingir que funciona) e invita a dejar contacto.
  const respond = useCallback(async (allMsgs) => {
    try {
      const apiMessages = allMsgs
        .filter((m) => m.text)
        .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }))
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          context: lastContextRef.current,
          lang: langRef.current,
          knownLead: leadRef.current,
        }),
      })
      if (!r.ok) throw new Error('http ' + r.status)
      const data = await r.json()
      if (data.lead) {
        leadRef.current = data.lead
        try { sessionStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(data.lead)) } catch { /* noop */ }
      }
      const reply = (data.reply || '').trim()
      // El bot ha identificado el producto que encaja (una sola vez por producto).
      const newRecommend = data.recommendedProduct && data.recommendedProduct !== lastRecommendedRef.current
      if (!reply && !newRecommend) throw new Error('empty')
      setTyping(false)
      // Cuando hay recomendación inyectamos NOSOTROS la frase ("te lo acabo de abrir
      // en pantalla…") para garantizar que aparece siempre, seguida de la respuesta del modelo.
      const bubbles = []
      if (newRecommend) bubbles.push({ from: 'bot', text: recommendPhrase(data.recommendedProduct) })
      if (reply) bubbles.push({ from: 'bot', text: reply })
      setMessages((m) => [...m, ...bubbles])
      if (newRecommend) {
        lastRecommendedRef.current = data.recommendedProduct
        onRecommendProduct?.(data.recommendedProduct) // abre/scrollea a la sección del producto
        // En móvil minimizamos el chat para que vea el producto a pantalla completa
        // (la conversación queda guardada y puede reabrirla). En escritorio sigue abierto.
        if (isMobile) setTimeout(() => onClose?.(), 900)
      }
    } catch {
      setTyping(false)
      setMessages((m) => [
        ...m,
        { from: 'bot', text: 'Uy, se me ha cruzado un cable un momento. ¿Me lo repites? Y si prefieres, déjame tu email o WhatsApp y te escribimos enseguida.' },
      ])
    }
  }, [onRecommendProduct, onClose, isMobile])

  // Mensaje precargado desde un CTA (evento chat:send): se trata como si el visitante lo escribiera.
  useEffect(() => {
    const handler = (e) => {
      const text = e.detail?.message
      if (!text) return
      setShowQuickReplies(false)
      const userMsg = { from: 'user', text }
      setMessages((m) => [...m, userMsg])
      setTyping(true)
      respond([...messagesRef.current, userMsg])
    }
    window.addEventListener('chat:send', handler)
    return () => window.removeEventListener('chat:send', handler)
  }, [respond])

  const send = (textOverride) => {
    // Block submits while the bot is "thinking" (matches the loading state).
    if (typing && !textOverride) return
    const text = (textOverride || input).trim()
    if (!text) return
    // Corta el dictado de voz y descarta transcripciones tardías para que no
    // reaparezcan en la cajita tras enviar.
    ignoreSpeechRef.current = true
    recognitionRef.current?.abort?.()
    setIsListening(false)
    setShowQuickReplies(false)
    const userMsg = { from: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    adjustHeight(true)
    setTyping(true)
    respond([...messagesRef.current, userMsg])
  }

  const btnRight = isMobile ? 16 : 28
  const btnBottom = isMobile ? 20 : 28

  return (
    <>
      {/* Live "personas hablando ahora" indicator — discreet, sits to the left of the closed widget */}
      <AnimatePresence>
        {!isOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: btnBottom + 8,
              right: btnRight + 52 + 12,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '0 14px',
              borderRadius: 999,
              background: 'rgba(26,24,20,0.82)',
              backdropFilter: 'blur(14px) saturate(140%)',
              WebkitBackdropFilter: 'blur(14px) saturate(140%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 199,
            }}
          >
            {/* Pulsing live dot */}
            <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, flexShrink: 0 }}>
              <motion.span
                animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: '#22C55E',
                }}
              />
              <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#22C55E',
                boxShadow: '0 0 6px rgba(34,197,94,0.7)',
              }} />
            </span>
            <span>
              {liveCount} {liveCount === 1 ? 'persona' : 'personas'} hablando
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={isOpen ? onClose : onOpen}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
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
          cursor: 'pointer',
          zIndex: 200,
          marginBottom: 'env(safe-area-inset-bottom)',
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
        <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', color: '#fff' }}>
          {isOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
            </svg>
          )}
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
              bottom: isMobile ? 'calc(84px + env(safe-area-inset-bottom))' : 92,
              right: btnRight,
              left: isMobile ? btnRight : 'auto',
              width: isMobile ? 'auto' : 340,
              maxHeight: isMobile ? 'calc(100dvh - 140px)' : 520,
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
                    fontSize: isMobile ? '0.9rem' : '0.82rem',
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
                        padding: isMobile ? '10px 16px' : '6px 12px',
                        minHeight: isMobile ? 40 : 'auto',
                        borderRadius: 999,
                        border: '1px solid #4361EE',
                        background: 'transparent',
                        color: '#4361EE',
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? '0.85rem' : '0.75rem',
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

            {/* Input — auto-resizing textarea with loading state
                (adapted from 21st.dev AIInputWithLoading to the project's inline styles) */}
            <div style={{ padding: '0.75rem 0.75rem 0.55rem', borderTop: '1px solid #F0EDE6', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {speechSupported && (
                  <motion.button
                    onClick={toggleListening}
                    aria-label={isListening ? 'Detener dictado' : 'Hablar'}
                    aria-pressed={isListening}
                    animate={isListening ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 1, repeat: isListening ? Infinity : 0, ease: 'easeInOut' }}
                    style={{
                      width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
                      flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isListening ? GRADIENT : 'rgba(26,24,20,0.06)',
                      color: isListening ? '#fff' : 'rgba(26,24,20,0.55)',
                      transition: 'background 0.25s ease, color 0.25s ease',
                    }}
                  >
                    <MicIcon size={18} />
                  </motion.button>
                )}
                <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  rows={1}
                  onChange={(e) => { setInput(e.target.value); adjustHeight() }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
                  }}
                  placeholder={isListening ? 'Escuchando... habla ahora' : 'Escribe tu mensaje...'}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    resize: 'none',
                    minHeight: isMobile ? 48 : 44,
                    maxHeight: 120,
                    padding: isMobile ? '13px 50px 13px 16px' : '11px 46px 11px 16px',
                    borderRadius: 18,
                    border: '1px solid #E8E5DE',
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 300,
                    // 16px on mobile prevents iOS Safari from auto-zooming on focus.
                    fontSize: isMobile ? '16px' : '0.82rem',
                    lineHeight: 1.4,
                    outline: 'none',
                    background: '#FAFAFA',
                    color: '#1A1814',
                    overflowY: 'auto',
                  }}
                />
                <button
                  onClick={() => send()}
                  aria-label="Enviar"
                  disabled={typing}
                  style={{
                    position: 'absolute',
                    right: 7,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: isMobile ? 36 : 32,
                    height: isMobile ? 36 : 32,
                    borderRadius: 12,
                    border: 'none',
                    cursor: typing ? 'default' : 'pointer',
                    background: typing ? 'transparent' : 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)',
                    color: '#fff',
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.3s',
                  }}
                >
                  {typing ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 14, height: 14, borderRadius: 3, background: '#1A1814' }}
                    />
                  ) : (
                    <span style={{ display: 'inline-flex', opacity: input.trim() ? 1 : 0.4, transition: 'opacity 0.2s' }}>
                      <CornerRightUp size={15} />
                    </span>
                  )}
                </button>
                </div>
              </div>
              <p style={{
                margin: '6px 0 0', paddingLeft: 14, height: 14,
                fontFamily: "'DM Sans',sans-serif", fontSize: '0.68rem',
                color: 'rgba(26,24,20,0.45)',
              }}>
                {isListening ? (
                  <span style={{
                    fontFamily: "'Syne Mono',monospace", letterSpacing: '0.04em',
                    background: GRADIENT, WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    Escuchando…
                  </span>
                ) : typing ? 'La IA está escribiendo…' : 'Pulsa Enter para enviar · Mayús+Enter salto de línea'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
