import { BrandIcon } from './Brand'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { CTA_LABEL } from '../lib/cta'
import { STORAGE_KEY as COOKIE_STORAGE_KEY } from './CookieBanner'
import useDockRect from '../hooks/useDockRect'
import { EASE_PREMIUM } from '../lib/motion'
import { openBooking } from '../lib/booking'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'

const RESTART_LABEL = 'Empezar de nuevo'
// El servidor y el modelo proponen chips; los que hablan de agendar abren el calendario.
const isBookingChip = (t) => t === CTA_LABEL || /agendar|agéndame|llamada con gin/i.test(t)

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


// Chips de acción al abrir la burbuja: el visitante sabe desde el primer segundo qué puede hacer.
const INITIAL_SUGGESTIONS = ['Tengo una pregunta', 'Mándame info por correo', CTA_LABEL]
// Chips cuando la conversación se ha cerrado (presupuesto agotado): solo acciones.
const CLOSED_SUGGESTIONS = [CTA_LABEL, RESTART_LABEL]

// Arranques del chat embebido en la portada: un toque y ya está hablando.
const STARTERS = ['Tengo un restaurante', 'Tengo una clínica', 'Tengo una tienda online', 'Otro negocio']

const DEFAULT_GREETING = 'Soy el asistente de Sito Labs, el mismo que instalamos en los negocios de nuestros clientes. ¿A qué se dedica el tuyo?'

const CONTEXT_GREETINGS = {
  navbar: DEFAULT_GREETING,
  hero: DEFAULT_GREETING,
  faq: '¿Te ha quedado alguna duda? Pregúntame lo que quieras sobre cómo trabajamos, los plazos o tus datos.',
  cta_final: 'Para que Ginés llegue preparado a la llamada, cuéntame: ¿a qué se dedica tu negocio?',
  nosotros: 'Veo que nos has querido conocer. ¿Hay algo concreto sobre cómo trabajamos que quieras preguntarnos?',
  founders: 'El Programa Fundadores es para las primeras quince empresas que construyen su IA con nosotros. ¿En qué sector trabajas?',
}

const greetingFor = (ctx) => CONTEXT_GREETINGS[ctx] || DEFAULT_GREETING

// Persistencia de la conversación durante la sesión (sessionStorage): sobrevive a
// minimizar, navegar entre rutas y recargar; se borra al cerrar la pestaña.
const MSG_STORAGE_KEY = 'sitolabs_chat_messages'
const LEAD_STORAGE_KEY = 'sitolabs_chat_lead'
const CLOSED_STORAGE_KEY = 'sitolabs_chat_closed'
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


// inline=true: el chat vive dentro de la portada (sin botón flotante, siempre abierto).
// mode="travel" (home escritorio): una sola instancia fija que se acopla al hueco de la
// portada, se comprime en burbuja al hacer scroll y se expande en panel al pulsarla.
const BUBBLE = 52
const PANEL_W = 340, PANEL_H = 520
const TRAVEL = { duration: 0.55, ease: EASE_PREMIUM }

export default function ChatWidget({ isOpen, context, onOpen, onClose, inline = false, mode }) {
  const travel = mode === 'travel'
  const [messages, setMessages] = useState(() => {
    const stored = loadStored(MSG_STORAGE_KEY, null)
    return Array.isArray(stored) && stored.length ? stored : DEFAULT_MESSAGES
  })
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  // Sugerencias de respuesta que propone el servidor tras cada turno (se pintan como chips).
  const [suggestions, setSuggestions] = useState([])
  // La conversación se cierra cuando el servidor agota el presupuesto de turnos.
  const [closed, setClosed] = useState(() => loadStored(CLOSED_STORAGE_KEY, false) === true)
  useEffect(() => {
    try { sessionStorage.setItem(CLOSED_STORAGE_KEY, JSON.stringify(closed)) } catch { /* noop */ }
  }, [closed])
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
  const wasOpenRef = useRef(false)
  const lastContextRef = useRef(null)
  // Mientras el banner de cookies está visible, la burbuja sube para no quedar tapada.
  const [cookiesDone, setCookiesDone] = useState(() => { try { return !!localStorage.getItem(COOKIE_STORAGE_KEY) } catch { return true } })
  useEffect(() => {
    const on = () => setCookiesDone(true)
    window.addEventListener('cookies:done', on)
    return () => window.removeEventListener('cookies:done', on)
  }, [])
  // Mirror de los mensajes para construir el historial al llamar a la API sin esperar al re-render.
  // Además persiste la conversación en sessionStorage en cada cambio.
  const messagesRef = useRef(messages)
  useEffect(() => {
    messagesRef.current = messages
    try { sessionStorage.setItem(MSG_STORAGE_KEY, JSON.stringify(messages)) } catch { /* incógnito/cuota: seguimos en memoria */ }
  }, [messages])
  // Datos del lead que la API va capturando; se reenvían en cada petición para no repetir preguntas.
  const leadRef = useRef(loadStored(LEAD_STORAGE_KEY, {}) || {})
  const langRef = useRef(typeof navigator !== 'undefined' && navigator.language?.startsWith('en') ? 'en' : 'es')
  const endRef = useRef(null)
  const isMobile = useIsMobile()
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: isMobile ? 48 : 44, maxHeight: 120 })

  // Scroll SOLO dentro de la lista de mensajes (nunca de la página).
  const listRef = useRef(null)
  useEffect(() => {
    const el = listRef.current
    if (el && hasUserTurn(messages)) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, suggestions, closed])

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

  const open = inline || isOpen || travel

  useEffect(() => {
    if (open) {
      // Sólo sembramos el saludo de contexto si NO hay conversación en curso
      // (el visitante aún no ha escrito nada). Si ya está hablando, conservamos
      // el historial y sólo actualizamos el contexto para la próxima llamada a la API.
      const conversationActive = hasUserTurn(messagesRef.current)
      const freshOpen = !wasOpenRef.current
      const contextChanged = context && context !== lastContextRef.current
      if ((freshOpen || contextChanged) && !conversationActive) {
        setMessages([{ from: 'bot', text: greetingFor(context) }])
        setSuggestions([])
        setTyping(false)
      }
      if (context) lastContextRef.current = context
      wasOpenRef.current = true
      if (!inline) setTimeout(() => textareaRef.current?.focus(), 350)
    } else {
      wasOpenRef.current = false
    }
  }, [open, inline, context, textareaRef])

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
      if (!reply && !data.openBooking) throw new Error('empty')
      setTyping(false)
      if (reply) setMessages((m) => [...m, { from: 'bot', text: reply }])
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions.slice(0, 3) : [])
      if (data.closed) setClosed(true)
      // El bot ha propuesto agendar: abrimos el calendario y minimizamos el chat.
      if (data.openBooking) {
        setTimeout(() => { if (!inline) onClose?.(); openBooking(inline ? 'hero_chat' : 'chat') }, 700)
      }
    } catch {
      setTyping(false)
      setSuggestions([])
      setMessages((m) => [
        ...m,
        { from: 'bot', text: 'Uy, se me ha cruzado un cable un momento. ¿Me lo repites? Y si prefieres, déjame tu email o WhatsApp y te escribimos enseguida.' },
      ])
    }
  }, [onClose, inline])

  // Mensaje precargado desde un CTA (evento chat:send): se trata como si el visitante lo escribiera.
  useEffect(() => {
    const handler = (e) => {
      const text = e.detail?.message
      if (!text) return
      setSuggestions([])
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
    if ((typing && !textOverride) || closed) return
    const text = (textOverride || input).trim()
    if (!text) return
    // Corta el dictado de voz y descarta transcripciones tardías para que no
    // reaparezcan en la cajita tras enviar.
    ignoreSpeechRef.current = true
    recognitionRef.current?.abort?.()
    setIsListening(false)
    setSuggestions([])
    const userMsg = { from: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    adjustHeight(true)
    setTyping(true)
    respond([...messagesRef.current, userMsg])
  }

  const btnRight = isMobile ? 16 : 28
  const btnBottom = (isMobile ? 20 : 28) + (cookiesDone ? 0 : (isMobile ? 190 : 0))
  const active = hasUserTurn(messages)

  // ---- Modo travel: docked (en la portada) · bubble · panel
  const { rect: dockRect, ratio: dockRatio } = useDockRect('[data-chat-dock]', travel)
  const [userOpen, setUserOpen] = useState(false)
  const dock = !travel ? null : dockRatio >= 0.25 ? 'docked' : userOpen ? 'panel' : 'bubble'
  // La transición larga solo se usa cuando cambia el estado (docked/bubble/panel);
  // mientras está acoplado, el shell sigue al hueco en scroll sin animar.
  const [animating, setAnimating] = useState(false)
  const [prevDock, setPrevDock] = useState(dock)
  const dockChanged = prevDock !== dock
  // Estado derivado durante el render (patrón oficial de React): así la primera
  // pintura tras el cambio ya lleva la transición larga y no salta al destino.
  if (dockChanged) { setPrevDock(dock); setAnimating(true) }
  const travelTransition = (dockChanged || animating) ? TRAVEL : { duration: 0 }
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const shell = !travel ? null
    : dock === 'bubble' ? { top: vh - btnBottom - BUBBLE, left: vw - btnRight - BUBBLE, width: BUBBLE, height: BUBBLE, borderRadius: BUBBLE / 2, backgroundColor: '#1A1814' }
    : dock === 'panel' ? { top: vh - 92 - PANEL_H, left: vw - btnRight - PANEL_W, width: PANEL_W, height: PANEL_H, borderRadius: 20, backgroundColor: '#ffffff' }
    : dockRect ? { top: dockRect.top, left: dockRect.left, width: dockRect.width, height: dockRect.height, borderRadius: 20, backgroundColor: '#ffffff' } : null
  const inlineUI = inline || dock === 'docked'
  const close = travel ? () => setUserOpen(false) : onClose

  // Vuelve a empezar: nueva conversación con el saludo del contexto actual. El lead conocido se conserva.
  const restart = () => {
    setClosed(false)
    setSuggestions([])
    setTyping(false)
    setMessages([{ from: 'bot', text: greetingFor(lastContextRef.current) }])
    setTimeout(() => textareaRef.current?.focus(), 100)
  }

  const onChip = (label) => {
    if (isBookingChip(label)) { if (!inlineUI) close?.(); openBooking(inlineUI ? 'hero_chat' : 'chat'); return }
    if (label === RESTART_LABEL) { restart(); return }
    send(label)
  }

  // Qué chips se ven: cierre > sugerencias del servidor > arranque (sector en portada, acciones en burbuja).
  const chips = closed
    ? CLOSED_SUGGESTIONS
    : hasUserTurn(messages)
      ? suggestions
      : inlineUI ? STARTERS : INITIAL_SUGGESTIONS



  return (
    <>
      {/* Floating button */}
      {!inline && !travel && <motion.button
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
          transition: 'bottom 0.35s cubic-bezier(0.22,1,0.36,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: -1.5,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)',
            opacity: 0.85,
            zIndex: -1,
          }}
        />
        <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: '#1A1814' }} />
        {active && !isOpen && (
          <span aria-hidden style={{ position: 'absolute', top: 1, right: 1, width: 12, height: 12, borderRadius: '50%', background: '#F72585', border: '2px solid #FAF8F3', zIndex: 2 }} />
        )}
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
      </motion.button>}

      {/* Panel */}
      <AnimatePresence>
        {open && (!travel || shell) && (
          <motion.div
            initial={(inline || travel) ? false : { opacity: 0, y: 20, scale: 0.95 }}
            animate={travel ? shell : { opacity: 1, y: 0, scale: 1 }}
            exit={travel ? undefined : { opacity: 0, y: 20, scale: 0.95 }}
            transition={travel ? travelTransition : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={travel ? () => setAnimating(false) : undefined}
            role="dialog"
            aria-label="Asistente de Sito Labs"
            style={travel ? {
              position: 'fixed',
              // Acoplado, va por debajo de la barra de navegación (zIndex 100) para no taparla al hacer scroll;
              // en burbuja/panel flota por encima de todo.
              zIndex: dock === 'docked' ? 90 : 200,
              display: 'flex',
              flexDirection: 'column',
              // En burbuja (ya en reposo) se deja visible para que el punto magenta asome por el borde.
              overflow: dock === 'bubble' && !animating ? 'visible' : 'hidden',
              border: dock === 'bubble' ? '1px solid transparent' : '1px solid rgba(26,24,20,0.08)',
              boxShadow: dock === 'docked'
                ? '0 1px 2px rgba(26,24,20,0.04), 0 28px 56px -28px rgba(26,24,20,0.22)'
                : dock === 'bubble' ? '0 4px 24px rgba(0,0,0,0.35)' : '0 20px 60px rgba(0,0,0,0.18)',
              transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
            } : inline ? {
              position: 'relative',
              width: '100%',
              height: isMobile ? 400 : 460,
              borderRadius: 20,
              background: '#fff',
              boxShadow: '0 1px 2px rgba(26,24,20,0.04), 0 28px 56px -28px rgba(26,24,20,0.22)',
              border: '1px solid rgba(26,24,20,0.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            } : {
              position: 'fixed',
              bottom: isMobile ? `calc(${btnBottom + 68}px + env(safe-area-inset-bottom))` : 92,
              right: btnRight,
              left: isMobile ? btnRight : 'auto',
              width: isMobile ? 'auto' : 340,
              height: isMobile ? `min(500px, calc(100dvh - ${btnBottom + 68 + 96}px))` : undefined,
              maxHeight: isMobile ? 'calc(100dvh - 120px)' : 520,
              borderRadius: 20,
              background: '#fff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Capa chat (en travel se desvanece al comprimirse en burbuja) */}
            <motion.div
              animate={travel ? { opacity: dock === 'bubble' ? 0 : 1 } : undefined}
              transition={travel ? { duration: dock === 'bubble' ? 0.18 : 0.3, delay: dock === 'bubble' ? 0 : 0.2 } : undefined}
              style={{
                display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0,
                pointerEvents: dock === 'bubble' ? 'none' : 'auto', overflow: 'hidden',
                // En travel la capa conserva el tamaño de tarjeta/panel mientras el shell
                // se comprime: el contenido se recorta en vez de re-fluir en cada frame.
                ...(travel ? { flex: 'none', width: dock === 'panel' ? PANEL_W : (dockRect?.width ?? 440), height: dock === 'panel' ? PANEL_H : (dockRect?.height ?? 460) } : {}),
              }}
            >
            {/* Header */}
            <div style={{ background: '#0A0A0B', padding: '0.85rem 1.1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
              <BrandIcon size={36} tone="cream" />
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: '0.88rem', color: '#fff' }}>Sito Labs Asistente</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
                  <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>{inlineUI ? 'Pruébalo: es el mismo que instalamos' : 'En línea'}</span>
                </div>
              </div>
              {!inlineUI && (
                <button
                  type="button" onClick={close} aria-label="Minimizar chat"
                  style={{ marginLeft: 'auto', width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.06)', color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </button>
              )}
            </div>

            {/* Messages */}
            <div ref={listRef} aria-live="polite" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFAFA' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '9px 14px',
                    borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.from === 'user' ? '#0A0A0B' : '#F5F2EA',
                    color: msg.from === 'user' ? '#fff' : '#1A1814',
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 400,
                    fontSize: isMobile ? '0.92rem' : '0.88rem',
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
              {!typing && chips.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {chips.map((label) => (
                    <button
                      key={label}
                      onClick={() => onChip(label)}
                      style={{
                        padding: isMobile ? '10px 16px' : '7px 13px',
                        minHeight: isMobile ? 40 : 'auto',
                        borderRadius: 999,
                        border: '1px solid #4361EE',
                        background: 'transparent',
                        color: '#4361EE',
                        fontFamily: "'DM Sans',sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? '0.85rem' : '0.78rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#4361EE'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4361EE' }}
                    >
                      {label}
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
                {speechSupported && !(inline && isMobile) && (
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
                <textarea aria-label="Escribe tu mensaje"
                  ref={textareaRef}
                  value={input}
                  rows={1}
                  onChange={(e) => { setInput(e.target.value); adjustHeight() }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
                  }}
                  disabled={closed}
                  placeholder={closed ? 'Conversación finalizada' : isListening ? 'Escuchando... habla ahora' : 'Escribe tu mensaje...'}
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
                  disabled={typing || closed}
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
                ) : typing ? 'La IA está escribiendo…' : (inline && isMobile ? 'Escribe o toca una opción' : 'Pulsa Enter para enviar · Mayús+Enter salto de línea')}
              </p>
            </div>
            </motion.div>

            {/* Capa burbuja (solo travel): anillo degradado + icono + punto de conversación activa */}
            {travel && (
              <motion.button
                type="button"
                onClick={() => setUserOpen(true)}
                aria-label="Abrir chat"
                tabIndex={dock === 'bubble' ? 0 : -1}
                initial={false}
                animate={{ opacity: dock === 'bubble' ? 1 : 0, scale: dock === 'bubble' ? [0.9, 1.08, 1] : 1 }}
                transition={{ opacity: { duration: 0.2, delay: dock === 'bubble' ? 0.3 : 0 }, scale: { duration: 0.35, delay: 0.3, ease: EASE_PREMIUM } }}
                whileHover={dock === 'bubble' ? { scale: 1.08 } : undefined}
                whileTap={dock === 'bubble' ? { scale: 0.94 } : undefined}
                style={{ position: 'absolute', inset: 0, border: 'none', padding: 0, background: 'transparent', cursor: 'pointer', pointerEvents: dock === 'bubble' ? 'auto' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: GRADIENT, opacity: 0.85 }} />
                <span aria-hidden style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: '#1A1814' }} />
                {active && (
                  <span aria-hidden style={{ position: 'absolute', top: 1, right: 1, width: 12, height: 12, borderRadius: '50%', background: '#F72585', border: '2px solid #FAF8F3', zIndex: 2 }} />
                )}
                <svg style={{ position: 'relative', zIndex: 1 }} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
