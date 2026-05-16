import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@remotion/player'
import useIsMobile from '../hooks/useIsMobile'
import ChatbotDemo from '../remotion/ChatbotDemo'
import DataQueryDemo from '../remotion/DataQueryDemo'
import AgentDemo from '../remotion/AgentDemo'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

/* ---- Channel logos for Card 1 ---- */
function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.522 5.859L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.368l-.36-.214-3.726.972.999-3.634-.235-.374A9.818 9.818 0 1112 21.818z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#2AABEE">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.67l-2.945-.924c-.64-.203-.657-.64.136-.954l11.566-4.458c.537-.194 1.006.131.967.887z" />
    </svg>
  )
}

function WebIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  )
}

function VoiceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
    </svg>
  )
}

const CHANNELS = [
  { name: 'WhatsApp', Icon: WhatsAppIcon },
  { name: 'Instagram', Icon: InstagramIcon },
  { name: 'Telegram', Icon: TelegramIcon },
  { name: 'Web', Icon: WebIcon },
  { name: 'Voz', Icon: VoiceIcon },
]

/* ---- Lazy video column — cover scaling via ResizeObserver ---- */
const COMP_W = 640
const COMP_H = 480

function LazyVideoColumn({ component, isMobile }) {
  const [isVisible, setIsVisible] = useState(false)
  const [coverScale, setCoverScale] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Compute scale so the Player COVERS (no letterbox) the container
    const updateScale = () => {
      const { width, height } = el.getBoundingClientRect()
      if (width > 0 && height > 0) {
        setCoverScale(Math.max(width / COMP_W, height / COMP_H))
      }
    }

    const ro = new ResizeObserver(updateScale)
    ro.observe(el)
    updateScale()

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)

    return () => { ro.disconnect(); io.disconnect() }
  }, [])

  const showPlayer = isVisible && coverScale !== null

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? 220 : undefined,
      }}
    >
      {showPlayer ? (
        /*
         * Center a COMP_W×COMP_H div inside the container using negative margins,
         * then scale from its center to cover the container.
         * overflow:hidden on the parent clips the overflow.
         */
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -(COMP_H / 2),
            marginLeft: -(COMP_W / 2),
            width: COMP_W,
            height: COMP_H,
            transform: `scale(${coverScale})`,
            transformOrigin: 'center center',
          }}
        >
          <Player
            component={component}
            durationInFrames={300}
            fps={30}
            compositionWidth={COMP_W}
            compositionHeight={COMP_H}
            style={{ width: COMP_W, height: COMP_H, display: 'block' }}
            autoPlay
            loop
            initiallyMuted
            controls={false}
            clickToPlay={false}
            acknowledgeRemotionLicense
          />
        </div>
      ) : (
        <motion.div
          animate={{ opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, background: '#fff' }}
        />
      )}
    </div>
  )
}

/* ---- Tier 1 card ---- */
function Tier1Card({ num, name, benefit, desc, left, component, index }) {
  const isMobile = useIsMobile()
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        minHeight: 380,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: 0,
      }}
    >
      {/* Text column */}
      <div
        style={{
          padding: isMobile ? '1.75rem 1.5rem' : '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.25rem',
          order: isMobile ? 2 : 0,
        }}
      >
        <div
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.8rem',
            background: GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {num}
        </div>

        <h3
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '2rem',
            color: '#fff',
            lineHeight: 1.1,
          }}
        >
          {name}
        </h3>

        <p
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            background: GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {benefit}
        </p>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.75,
          }}
        >
          {desc}
        </p>

        {left}
      </div>

      {/* Video column */}
      <LazyVideoColumn component={component} isMobile={isMobile} />
    </motion.div>
  )
}

/* ---- Connectors block (Card 1) ---- */
function Connectors() {
  return (
    <div>
      <div
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}
      >
        Conecta con
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {CHANNELS.map(({ name, Icon }) => (
          <div
            key={name}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Icon />
            <span
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '0.04em',
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Tags pill ---- */
function Tags({ items }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {items.map((tag) => (
        <span
          key={tag}
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.65rem',
            padding: '4px 11px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.06em',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

/* ---- Tier 2 secondary block ---- */
const MORE_PILLS = [
  { emoji: '🔒', label: 'Soluciones en local' },
  { emoji: '🎯', label: 'Clasificación de leads' },
  { emoji: '⚙️', label: 'Automatizaciones' },
  { emoji: '💻', label: 'Software a medida' },
  { emoji: '🌐', label: 'Webs y landing pages' },
]

function Tier2Block({ onChatOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: '3rem' }}
    >
      {/* Section label */}
      <div
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '1.1rem',
        }}
      >
        Más soluciones
      </div>

      {/* Pills */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {MORE_PILLS.map(({ emoji, label }) => (
          <div
            key={label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999,
              padding: '8px 18px',
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '0.5rem',
          }}
        >
          ¿No encuentras lo que buscas? Hay más.
        </p>
        <button
          onClick={onChatOpen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '0.95rem',
            background: GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            padding: 0,
          }}
        >
          Exploremos juntos →
        </button>
      </div>
    </motion.div>
  )
}

/* ---- Main section ---- */
export default function Products({ onChatOpen }) {
  return (
    <section
      id="lo-que-hacemos"
      style={{ background: '#0D0D10', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <span
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '1.25rem',
            }}
          >
            — Lo que hacemos
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2rem,4vw,3.5rem)',
              color: '#fff',
              lineHeight: 1.1,
            }}
          >
            Tres maneras de hacer que
            <br />
            tu negocio trabaje solo.
          </h2>
        </motion.div>

        {/* Tier 1 — 3 big cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Tier1Card
            index={0}
            num="01"
            name="Contact Center IA 24/7"
            benefit="Tu negocio atiende solo, siempre."
            desc={
              'Chatbot y voz inteligente que atiende a tus clientes por cualquier canal.\nReservas, consultas, pedidos. A cualquier hora. Sin que tú hagas nada.'
            }
            left={<Connectors />}
            component={ChatbotDemo}
          />

          <Tier1Card
            index={1}
            num="02"
            name="Habla con tus Datos"
            benefit="Pregunta. Obtén respuesta al instante."
            desc={
              'Conectamos tu stock, reservas o CRM a un chat. Preguntas en español normal, respuesta en segundos. Como tener un analista disponible 24/7.'
            }
            left={<Tags items={['Concesionarios', 'Clínicas', 'Hoteles', 'Almacenes']} />}
            component={DataQueryDemo}
          />

          <Tier1Card
            index={2}
            num="03"
            name="Agentes IA"
            benefit="Un empleado digital que nunca descansa."
            desc={
              'Agentes autónomos que ejecutan procesos completos sin supervisión. Leen emails, crean tareas, actualizan sistemas, mandan confirmaciones. Solo.'
            }
            left={<Tags items={['Cualquier sector', 'Alto volumen', '24/7']} />}
            component={AgentDemo}
          />
        </div>

        {/* Tier 2 */}
        <Tier2Block onChatOpen={onChatOpen} />
      </div>
    </section>
  )
}
