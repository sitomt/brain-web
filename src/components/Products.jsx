import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@remotion/player'
import useIsMobile from '../hooks/useIsMobile'
import ChatbotDemo from '../remotion/ChatbotDemo'
import DataQueryDemo from '../remotion/DataQueryDemo'
import AgentDemo from '../remotion/AgentDemo'
import AuroraBackground from './AuroraBackground'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

/* ---- Product data ---- */
const PRODUCTS = [
  {
    num: '01',
    name: 'Contact Center IA',
    benefit: 'Tu negocio atiende solo.\nA cualquier hora.',
    desc: 'Chatbot o voz inteligente que atiende a tus clientes por cualquier canal. Reservas, consultas, pedidos. Sin que tú hagas nada. Sin que nadie se quede sin respuesta.',
    precio: 'Desde 1.200€ · Mantenimiento desde 97€/mes',
    component: ChatbotDemo,
    bullets: [
      'Respuesta automática por WhatsApp y email',
      'Gestión de reservas — restaurantes, peluquerías, clínicas',
      'Atención por Instagram, Telegram y Web',
      'Voz inteligente que atiende llamadas',
      'Escalado a humano cuando es necesario',
      'Conexión con tu CRM',
      'Trazabilidad de todas las conversaciones',
      'Disponible 24/7 sin intervención humana',
    ],
    closingLine: 'Desde lo más simple hasta lo más completo.\nEl precio depende de lo que necesites.',
  },
  {
    num: '02',
    name: 'Back Office IA',
    benefit: 'Las tareas que frenan a tu equipo.\nResueltas solas.',
    desc: 'Emails respondidos. Documentos generados. Informes listos cada lunes. Facturas procesadas. Todo lo que consume el tiempo de tu equipo sin generar un euro.',
    precio: 'Desde 2.000€ · Mantenimiento desde 200€/mes',
    component: AgentDemo,
    bullets: [
      'Respuesta y redacción de emails',
      'Generación de documentos desde plantillas',
      'Informes automáticos — diarios, semanales o mensuales',
      'Procesado y clasificación de facturas',
      'Recordatorios y seguimientos automáticos',
      'Alertas cuando algo no cuadra',
      'Resúmenes de reuniones',
      'Gestión de tareas repetitivas internas',
    ],
    closingLine: 'Todo lo que tu equipo hace porque\nalguien tiene que hacerlo.',
  },
  {
    num: '03',
    name: 'Asistente IA',
    benefit: 'Pregúntale a tu negocio.\nResponde en segundos.',
    desc: 'Tus datos conectados a un chat. Stock, reservas, albaranes, métricas. Tu equipo pregunta en español normal y obtiene la respuesta al instante.',
    precio: 'Desde 1.500€ · Mantenimiento desde 150€/mes',
    component: DataQueryDemo,
    bullets: [
      'Chat conectado a tu stock',
      'Chat conectado a tus reservas',
      'Digitalización de albaranes por foto',
      'Control de costes en tiempo real',
      'Reportes automáticos bajo demanda',
      'Alertas si algún gasto se dispara',
      'Consultas en lenguaje natural',
      'Conexión a cualquier base de datos del negocio',
    ],
    closingLine: 'Pregunta lo que necesitas.\nTu negocio responde.',
  },
]

/* ---- Lazy video column — cover scaling via ResizeObserver ---- */
const COMP_W = 640
const COMP_H = 480

function LazyVideoColumn({ component, isMobile, isActive }) {
  const [hasEnteredView, setHasEnteredView] = useState(false)
  const [coverScale, setCoverScale] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

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
          setHasEnteredView(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)

    return () => { ro.disconnect(); io.disconnect() }
  }, [])

  const showPlayer = hasEnteredView && coverScale !== null && isActive

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        minHeight: isMobile ? 280 : 480,
      }}
    >
      {showPlayer ? (
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
            durationInFrames={330}
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

/* ---- Front face flip button ---- */
function FlipButton({ onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 22px',
        borderRadius: 999,
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.2)'}`,
        background: hovered ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
        color: hovered ? '#ffffff' : 'rgba(255,255,255,0.85)',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: '0.85rem',
        cursor: 'none',
        transition: 'border-color 0.25s ease, background 0.25s ease, color 0.25s ease',
        width: 'fit-content',
        marginTop: 'auto',
      }}
    >
      Ver precios →
    </button>
  )
}

/* ---- Back face ---- */
function CardBack({ product, onFlip, onChatOpen, isMobile }) {
  const [backBtnHovered, setBackBtnHovered] = useState(false)
  const [ctaBtnHovered, setCtaBtnHovered] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 24,
        padding: isMobile ? '1.75rem' : '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* 1. Number + Name */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.75rem',
            background: GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.1em',
            flexShrink: 0,
          }}
        >
          {product.num}
        </span>
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
            color: '#ffffff',
            lineHeight: 1.05,
          }}
        >
          {product.name}
        </span>
      </div>

      {/* 2. Separator */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)',
          marginTop: '1.25rem',
          marginBottom: '1.5rem',
          flexShrink: 0,
        }}
      />

      {/* 3. Price badge */}
      <div
        style={{
          display: 'inline-block',
          background: GRADIENT,
          borderRadius: 999,
          padding: 1,
          alignSelf: isMobile ? 'center' : 'flex-start',
          marginBottom: '1.5rem',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            background: '#0D0D10',
            borderRadius: 999,
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.82rem',
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            {product.precio}
          </span>
        </div>
      </div>

      {/* 4. Bullets title */}
      <p
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.15em',
          margin: '0 0 1rem',
          flexShrink: 0,
        }}
      >
        ¿QUÉ INCLUYE?
      </p>

      {/* 5. Bullets grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '0.6rem 2rem',
        }}
      >
        {product.bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: GRADIENT,
                marginTop: 7,
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
              }}
            >
              {b}
            </span>
          </div>
        ))}
      </div>

      {/* 6. Closing line */}
      {product.closingLine && (
        <p
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '1.25rem',
            marginBottom: 0,
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
            flexShrink: 0,
          }}
        >
          {product.closingLine}
        </p>
      )}

      {/* 7. Footer row — Volver + CTA */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '1.5rem',
          flexShrink: 0,
          gap: '1rem',
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onFlip() }}
          onMouseEnter={() => setBackBtnHovered(true)}
          onMouseLeave={() => setBackBtnHovered(false)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'none',
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.72rem',
            color: backBtnHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)',
            letterSpacing: '0.06em',
            transition: 'color 0.2s',
            padding: 0,
          }}
        >
          ← Volver
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onChatOpen() }}
          onMouseEnter={() => setCtaBtnHovered(true)}
          onMouseLeave={() => setCtaBtnHovered(false)}
          style={{
            padding: '9px 20px',
            borderRadius: 999,
            border: `1px solid ${ctaBtnHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
            background: 'transparent',
            color: ctaBtnHovered ? '#ffffff' : 'rgba(255,255,255,0.75)',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.82rem',
            cursor: 'none',
            transition: 'border-color 0.2s, color 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          Hablamos →
        </button>
      </div>
    </div>
  )
}

/* ---- Tier 1 card with 3D flip ---- */
function Tier1Card({ product, index, isFlipped, onFlip, onChatOpen }) {
  const isMobile = useIsMobile()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: '1200px' }}
    >
      {/* Rotating container */}
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: isMobile ? 620 : 480,
        }}
      >
        {/* ── FRONT FACE ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          }}
        >
          {/* Text column */}
          <div
            style={{
              padding: isMobile ? '2rem' : '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: isMobile ? 'center' : 'flex-start',
              textAlign: isMobile ? 'center' : 'left',
              gap: '1.25rem',
              order: isMobile ? 2 : 0,
            }}
          >
            {/* Name */}
            <h3
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                color: '#ffffff',
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              {product.name}
            </h3>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.3,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {product.benefit}
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {product.desc}
            </p>

            {/* Flip button — only trigger for flip */}
            <div style={{ alignSelf: isMobile ? 'center' : 'flex-start' }}>
              <FlipButton onClick={(e) => { e.stopPropagation(); onFlip() }} />
            </div>
          </div>

          {/* Video column */}
          <div style={{ overflow: 'hidden', order: isMobile ? 1 : 0 }}>
            <LazyVideoColumn
              component={product.component}
              isMobile={isMobile}
              isActive={!isFlipped}
            />
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <CardBack
          product={product}
          onFlip={onFlip}
          onChatOpen={onChatOpen}
          isMobile={isMobile}
        />
      </div>
    </motion.div>
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
  const isMobile = useIsMobile()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: '3rem', textAlign: isMobile ? 'center' : 'left' }}
    >
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

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
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
              padding: '8px 16px',
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.25rem 1.75rem',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', margin: 0, marginBottom: '0.2rem' }}>
            ¿No ves tu caso aquí?
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Si hay algo repetitivo en tu negocio que consume tiempo de tu equipo, casi seguro podemos automatizarlo.
          </p>
        </div>
        <button
          onClick={onChatOpen}
          style={{
            flexShrink: 0,
            padding: '9px 22px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: 'rgba(255,255,255,0.75)',
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 400,
            fontSize: '0.85rem',
            cursor: 'none',
            transition: 'border-color 0.2s, color 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
        >
          Hablamos →
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: '1.25rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
        {[
          { icon: '🔒', label: 'RGPD compliant' },
          { icon: '📄', label: 'NDA disponible' },
          { icon: '🛡️', label: 'Datos confidenciales' },
        ].map(({ icon, label }) => (
          <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: '0.75rem' }}>{icon}</span>
            <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ---- Main section ---- */
export default function Products({ onChatOpen }) {
  const isMobile = useIsMobile()
  const [flippedIndex, setFlippedIndex] = useState(null)

  const handleFlip = (index) => {
    setFlippedIndex(prev => prev === index ? null : index)
  }

  return (
    <AuroraBackground intense>
    <section
      id="lo-que-hacemos"
      style={{ padding: isMobile ? '4rem 1.25rem' : '6rem 2rem' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem', textAlign: isMobile ? 'center' : 'left' }}
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
              margin: 0,
            }}
          >
            Tres sistemas. Un objetivo:
            <br />
            que tu negocio funcione solo.
          </h2>
        </motion.div>

        {/* Tier 1 — 3 flip cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.5rem' }}>
          {PRODUCTS.map((product, index) => (
            <Tier1Card
              key={product.num}
              product={product}
              index={index}
              isFlipped={flippedIndex === index}
              onFlip={() => handleFlip(index)}
              onChatOpen={onChatOpen}
            />
          ))}
        </div>

        {/* Tier 2 */}
        <Tier2Block onChatOpen={onChatOpen} />
      </div>
    </section>
    </AuroraBackground>
  )
}
