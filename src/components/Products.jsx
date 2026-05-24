import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Player } from '@remotion/player'
import {
  LockKey,
  Target,
  Lightning,
  Monitor,
  Globe,
  FileText,
  ShieldCheck,
} from '@phosphor-icons/react'
import useIsMobile from '../hooks/useIsMobile'
import ChatbotDemo from '../remotion/ChatbotDemo'
import DataQueryDemo from '../remotion/DataQueryDemo'
import AgentDemo from '../remotion/AgentDemo'
import AuroraBackground from './AuroraBackground'
import CtaButton from './CtaButton'
import Eyebrow from './Eyebrow'
import { ArrowRight, ArrowLeft } from './icons/ArrowIcon'
import { EASE_PREMIUM } from '../lib/motion'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

/* ---- Product data ---- */
const PRODUCTS = [
  {
    num: '01',
    contextId: 'contact_center',
    humanName: 'Quien atiende.',
    name: 'Contact Center IA',
    benefit: 'Tu negocio atiende solo.\nA cualquier hora.',
    desc: 'A las 23:47 alguien intenta reservar. Tu sistema le confirma la mesa en cuatro segundos. Tú no te enteras hasta el desayuno. Y mañana, ese cliente vendrá.',
    precio: 'Desde 1.200€ · Mantenimiento desde 97€/mes',
    component: ChatbotDemo,
    bullets: [
      'Contesta reservas mientras estás en otra mesa',
      'Cierra citas cuando todos duermen',
      'Atiende cinco conversaciones a la vez sin perder el tono',
      'Escala a una persona real cuando hace falta',
      'Se conecta a tu CRM sin que toques nada',
      'Atiende por WhatsApp, Instagram, Telegram y web',
      'Recoge llamadas con voz que parece humana',
      'Sin horarios. Sin festivos. Sin enfermedades.',
    ],
    closingLine: 'Desde lo más simple hasta lo más completo.\nEl precio depende de lo que necesites.',
  },
  {
    num: '02',
    contextId: 'back_office',
    humanName: 'Quien resuelve.',
    name: 'Back Office IA',
    benefit: 'Las tareas que frenan a tu equipo.\nResueltas solas.',
    desc: 'Las facturas se ordenan solas. Los emails se contestan sin que abras la bandeja. El informe del lunes ya está hecho el domingo por la noche. Y tu equipo, por fin, hace lo importante.',
    precio: 'Desde 2.000€ · Mantenimiento desde 200€/mes',
    component: AgentDemo,
    bullets: [
      'Responde y redacta emails con tu tono',
      'Procesa facturas sin que nadie las abra',
      'Te entrega informes listos cada lunes',
      'Te avisa cuando algo no cuadra',
      'Resume tus reuniones mientras hablas',
      'Manda recordatorios sin que se te olvide',
      'Genera documentos desde tus plantillas',
      'Se ocupa de lo repetitivo que ahoga al equipo',
    ],
    closingLine: 'Todo lo que tu equipo hace porque\nalguien tiene que hacerlo.',
  },
  {
    num: '03',
    contextId: 'asistente',
    humanName: 'Quien sabe.',
    name: 'Asistente IA',
    benefit: 'Pregúntale a tu negocio.\nResponde en segundos.',
    desc: 'Pregunta "¿cuánto vendí ayer?" y obtienes la respuesta. En español. En segundos. Tu stock, tus reservas, tus albaranes, tus costes — todo a una conversación de distancia.',
    precio: 'Desde 1.500€ · Mantenimiento desde 150€/mes',
    component: DataQueryDemo,
    bullets: [
      'Pregunta en español, responde al instante',
      'Sabe cuánto vendiste, cuánto te queda, cuánto te cuesta',
      'Digitaliza albaranes con solo una foto',
      'Te avisa cuando un gasto se dispara',
      'Genera reportes bajo demanda',
      'Conectado a cualquier base de datos del negocio',
      'Detecta lo que se te escapa',
      'No necesitas saber SQL, ni Excel, ni nada',
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
        // Cover scaling: video fills the entire column (both axes). Any side
        // crop is minimal since demos compose centered content. Parent bg is
        // #0D0D10 (matches demo bg) so there's no visible seam in any edge.
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
        background: '#0D0D10',
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
          style={{ position: 'absolute', inset: 0, background: '#0D0D10' }}
        />
      )}
    </div>
  )
}

/* ---- Front face flip button ---- */
function FlipButton({ onClick, label = 'Ver precios', direction = 'right' }) {
  const [hovered, setHovered] = useState(false)
  const Arrow = direction === 'left' ? ArrowLeft : ArrowRight
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        paddingLeft: direction === 'left' ? 14 : 18,
        paddingRight: direction === 'left' ? 18 : 14,
        height: 42,
        borderRadius: 999,
        border: `1px solid ${hovered ? 'rgba(26,24,20,0.45)' : 'rgba(26,24,20,0.18)'}`,
        background: hovered ? 'rgba(26,24,20,0.07)' : 'rgba(26,24,20,0.03)',
        color: hovered ? '#1A1814' : 'rgba(26,24,20,0.8)',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.32,0.72,0,1)',
        width: 'fit-content',
        marginTop: 'auto',
      }}
    >
      {direction === 'left' && (
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: 'rgba(26,24,20,0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
            transform: hovered ? 'translateX(-2px)' : 'translateX(0)',
          }}
        >
          <Arrow size={12} />
        </span>
      )}
      {label}
      {direction === 'right' && (
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: 'rgba(26,24,20,0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
            transform: hovered ? 'translateX(2px)' : 'translateX(0)',
          }}
        >
          <Arrow size={12} />
        </span>
      )}
    </button>
  )
}

/* ---- Back face ---- */
function CardBack({ product, onFlip, onChatOpen, isMobile }) {
  const [ctaBtnHovered, setCtaBtnHovered] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: '#FFFFFF',
        border: '1px solid rgba(26,24,20,0.07)',
        borderRadius: 22,
        padding: isMobile ? '2rem' : '3rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Centered content block */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
      {/* 1. Number + Name (human primary, technical whispered) */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            background: GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.05em',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          {product.num}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#1A1814',
              lineHeight: 1.05,
            }}
          >
            {product.humanName}
          </span>
          <span
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.65rem',
              color: 'rgba(26,24,20,0.55)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {product.name}
          </span>
        </div>
      </div>

      {/* 2. Separator */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, rgba(26,24,20,0.15) 0%, rgba(26,24,20,0.02) 100%)',
          marginTop: '1.25rem',
          marginBottom: '1.5rem',
          flexShrink: 0,
        }}
      />

      {/* 3. Price badge — gradient pill with white text for readability */}
      <div
        style={{
          display: 'inline-block',
          background: GRADIENT,
          borderRadius: 999,
          padding: '10px 20px',
          alignSelf: isMobile ? 'center' : 'flex-start',
          marginBottom: '1.5rem',
          flexShrink: 0,
          boxShadow: '0 4px 18px rgba(114,9,183,0.25)',
        }}
      >
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.85rem',
            color: '#FFFFFF',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            fontWeight: 500,
          }}
        >
          {product.precio}
        </span>
      </div>

      {/* 4. Bullets title */}
      <p
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.65rem',
          color: 'rgba(26,24,20,0.55)',
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
                color: 'rgba(26,24,20,0.7)',
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
            color: 'rgba(26,24,20,0.5)',
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
      </div>
      {/* end centered content */}

      {/* 7. Footer row — Volver + CTA */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1.5rem',
          flexShrink: 0,
          gap: '1rem',
        }}
      >
        <FlipButton label="Volver" direction="left" onClick={(e) => { e.stopPropagation(); onFlip() }} />

        <CtaButton
          onClick={(e) => { e.stopPropagation(); onChatOpen(product.contextId) }}
          variant="solid"
          arrow="right"
          size="md"
          style={{ height: 42, paddingLeft: 16 }}
        >
          Probar el asistente
        </CtaButton>
      </div>
    </div>
  )
}

/* ---- Tier 1 card with 3D flip ---- */
function Tier1Card({ product, isFlipped, onFlip, onChatOpen }) {
  const isMobile = useIsMobile()

  // Double-bezel outer shell — physical "machined" feel
  return (
    <div
      style={{
        perspective: '1200px',
        height: '100%',
        background: 'rgba(26,24,20,0.025)',
        border: '1px solid rgba(26,24,20,0.06)',
        borderRadius: 28,
        padding: 6,
      }}
    >
      {/* Rotating container */}
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: isMobile ? 760 : 580,
          height: '100%',
        }}
      >
        {/* ── FRONT FACE ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#FFFFFF',
            border: '1px solid rgba(26,24,20,0.07)',
            borderRadius: 22,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          }}
        >
          {/* Text column — same structure as back: flex:1 centered content + fixed footer */}
          <div
            style={{
              padding: isMobile ? '2rem' : '3rem',
              display: 'flex',
              flexDirection: 'column',
              order: isMobile ? 2 : 0,
            }}
          >
            {/* Centered content */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: isMobile ? 'center' : 'flex-start',
              textAlign: isMobile ? 'center' : 'left',
              gap: '1.25rem',
              minHeight: 0,
            }}>
              {/* Name — human (primary) + technical badge */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: isMobile ? 'center' : 'flex-start' }}>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                    color: '#1A1814',
                    lineHeight: 1.0,
                    margin: 0,
                  }}
                >
                  {product.humanName}
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    fontFamily: "'Syne Mono', monospace",
                    fontSize: '0.65rem',
                    color: 'rgba(26,24,20,0.55)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    background: 'rgba(26,24,20,0.06)',
                    border: '1px solid rgba(26,24,20,0.12)',
                    borderRadius: 999,
                    padding: '4px 12px',
                  }}
                >
                  {product.name}
                </span>
              </div>

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
                  color: 'rgba(26,24,20,0.6)',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {product.desc}
              </p>
            </div>

            {/* Footer — FlipButton at bottom-left, mirrors back face position exactly */}
            <div style={{ paddingTop: '1.5rem', flexShrink: 0, alignSelf: isMobile ? 'center' : 'flex-start' }}>
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
    </div>
  )
}

/* ---- Vertical coverflow ----
   Active card centered & flat. Off cards translate horizontally, rotate on Y,
   shrink and dim — so they read as preview thumbnails of "next/previous".
   The user always sees the 3 cards, but only one is in focus and detail. */
function StackedCard({ progress, index, total, children }) {
  const N = total

  // queuePos: signed distance to the active card. 0 = active centered; positive
  // = waiting to the right; negative = passed to the left.
  const queuePos = (p) => index - p * (N - 1)

  const x = useTransform(progress, (p) => {
    const q = queuePos(p)
    const sign = q < 0 ? -1 : 1
    const cd = Math.min(2, Math.abs(q))
    return sign * cd * 360
  })
  const scale = useTransform(progress, (p) => {
    const cd = Math.min(2, Math.abs(queuePos(p)))
    return Math.max(0.45, 0.92 - cd * 0.28)
  })
  const rotateY = useTransform(progress, (p) => {
    const q = queuePos(p)
    const sign = q < 0 ? -1 : 1
    const cd = Math.min(2, Math.abs(q))
    return -sign * cd * 32
  })
  // Cards stay fully opaque so they read as solid surfaces stacked in depth —
  // no content bleed-through between front and back cards.
  const opacity = useTransform(progress, (p) => {
    const cd = Math.min(2, Math.abs(queuePos(p)))
    // Only fade beyond queue distance > 1.5 (cards leaving viewport).
    return cd > 1.5 ? Math.max(0, 1 - (cd - 1.5) * 2) : 1
  })
  const zIndex = useTransform(progress, (p) => Math.round(100 - Math.abs(queuePos(p)) * 30))
  const pointerEvents = useTransform(progress, (p) => (Math.abs(queuePos(p)) < 0.15 ? 'auto' : 'none'))

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        x,
        scale,
        rotateY,
        opacity,
        zIndex,
        pointerEvents,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  )
}

function ScrollStack({ products, flippedIndex, handleFlip, onChatOpen, header }) {
  const stackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  // Snap-scroll: when the section is pinned, hijack wheel events so one scroll
  // = one card advance. Uses a custom RAF-driven scroll animation with
  // ease-in-out-quart for a smooth, premium, cinematic feel (native
  // behavior:'smooth' is browser-dependent and often abrupt).
  useEffect(() => {
    const N = products.length
    let rafId = null
    let isAnimating = false
    let lastWheelAt = 0
    const ANIM_MS = 1100

    // ease-in-out-quart — slow start, smooth acceleration, slow finish.
    const ease = (t) => t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2

    const animateTo = (targetY, onDone) => {
      cancelAnimationFrame(rafId)
      const startY = window.scrollY
      const dist = targetY - startY
      const t0 = performance.now()
      isAnimating = true
      const step = (now) => {
        const t = Math.min(1, (now - t0) / ANIM_MS)
        window.scrollTo(0, startY + dist * ease(t))
        if (t < 1) {
          rafId = requestAnimationFrame(step)
        } else {
          isAnimating = false
          onDone && onDone()
        }
      }
      rafId = requestAnimationFrame(step)
    }

    const onWheel = (e) => {
      const el = stackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const stickyRange = el.offsetHeight - window.innerHeight
      if (rect.top > 1 || rect.bottom < window.innerHeight - 1) return

      const now = performance.now()
      // While an animation runs OR within cooldown, absorb wheel events (so
      // trackpad inertia / fast multi-scrolls don't trigger multiple snaps).
      if (isAnimating || now - lastWheelAt < 1200) {
        e.preventDefault()
        return
      }

      const currentProgress = Math.max(0, Math.min(1, -rect.top / stickyRange))
      const currentIdx = Math.round(currentProgress * (N - 1))
      const dir = e.deltaY > 0 ? 1 : -1
      const newIdx = currentIdx + dir
      // Boundary — let native scroll carry the user out of the section.
      if (newIdx < 0 || newIdx > N - 1) return

      e.preventDefault()
      lastWheelAt = now
      const targetProgress = newIdx / (N - 1)
      const stackTopAbs = rect.top + window.scrollY
      animateTo(stackTopAbs + targetProgress * stickyRange)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafId)
    }
  }, [products.length])

  return (
    <div ref={stackRef} style={{ position: 'relative', height: '300vh' }}>
      <div
        style={{
          position: 'sticky',
          top: '8vh',
          height: '88vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {/* Sticky header — stays visible the whole time cards rotate */}
        {header && (
          <div style={{ flexShrink: 0 }}>{header}</div>
        )}
        {/* Card stack area — perspective for true 3D coverflow rotation */}
        <div style={{ position: 'relative', flex: 1, minHeight: 0, perspective: '1600px', perspectiveOrigin: 'center center' }}>
          {products.map((product, i) => (
            <StackedCard
              key={product.num}
              progress={scrollYProgress}
              index={i}
              total={products.length}
            >
              <Tier1Card
                product={product}
                isFlipped={flippedIndex === i}
                onFlip={() => handleFlip(i)}
                onChatOpen={onChatOpen}
              />
            </StackedCard>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---- Mobile horizontal snap carousel ---- */
function MobileCarousel({ products, flippedIndex, handleFlip, onChatOpen }) {
  return (
    <>
      <style>{`.brain-mobile-carousel::-webkit-scrollbar{display:none}`}</style>
      <div
        className="brain-mobile-carousel"
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          paddingBottom: '0.5rem',
          marginLeft: '-1.25rem',
          marginRight: '-1.25rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
        }}
      >
        {products.map((product, i) => (
          <div
            key={product.num}
            style={{
              flex: '0 0 90vw',
              scrollSnapAlign: 'center',
            }}
          >
            <Tier1Card
              product={product}
              isFlipped={flippedIndex === i}
              onFlip={() => handleFlip(i)}
              onChatOpen={onChatOpen}
            />
          </div>
        ))}
      </div>
    </>
  )
}

/* ---- Reduced motion fallback: original flex column ---- */
function StaticStack({ products, flippedIndex, handleFlip, onChatOpen, isMobile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.5rem' }}>
      {products.map((product, i) => (
        <Tier1Card
          key={product.num}
          product={product}
          isFlipped={flippedIndex === i}
          onFlip={() => handleFlip(i)}
          onChatOpen={onChatOpen}
        />
      ))}
    </div>
  )
}

/* ---- Tier 2 secondary block ---- */
const MORE_PILLS = [
  { Icon: LockKey,   label: 'Soluciones en local' },
  { Icon: Target,    label: 'Clasificación de leads' },
  { Icon: Lightning, label: 'Automatizaciones' },
  { Icon: Monitor,   label: 'Software a medida' },
  { Icon: Globe,     label: 'Webs y landing pages' },
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
          color: 'rgba(26,24,20,0.55)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '1.1rem',
        }}
      >
        Más soluciones
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
        {MORE_PILLS.map(({ Icon, label }) => (
          <div
            key={label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: '#FFFFFF',
              border: '1px solid rgba(26,24,20,0.08)',
              borderRadius: 999,
              padding: '8px 16px',
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.72rem',
              color: 'rgba(26,24,20,0.85)',
              boxShadow: '0 1px 2px rgba(26,24,20,0.04)',
            }}
          >
            <Icon size={14} weight="light" style={{ flexShrink: 0, opacity: 0.7 }} />
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
        background: '#FFFFFF',
        border: '1px solid rgba(26,24,20,0.08)',
        borderRadius: 16,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: '0.9rem', color: 'rgba(26,24,20,0.8)', margin: 0, marginBottom: '0.2rem' }}>
            ¿No ves tu caso aquí?
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.82rem', color: 'rgba(26,24,20,0.6)', margin: 0 }}>
            Si hay algo repetitivo en tu negocio que consume tiempo de tu equipo, casi seguro podemos automatizarlo.
          </p>
        </div>
        <CtaButton
          onClick={() => onChatOpen('tier2_other')}
          variant="ghost"
          arrow="right"
          size="md"
          style={{ height: 42 }}
        >
          Probar el asistente
        </CtaButton>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: '1.25rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
        {[
          { Icon: LockKey,     label: 'RGPD compliant' },
          { Icon: FileText,    label: 'NDA disponible' },
          { Icon: ShieldCheck, label: 'Datos confidenciales' },
        ].map(({ Icon, label }) => (
          <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Icon size={14} weight="light" style={{ flexShrink: 0, color: 'rgba(26,24,20,0.55)' }} />
            <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.72rem', color: 'rgba(26,24,20,0.55)', letterSpacing: '0.06em' }}>{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ---- Main section ---- */
export default function Products({ onChatOpen }) {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()
  const [flippedIndex, setFlippedIndex] = useState(null)

  const handleFlip = (index) => {
    setFlippedIndex(prev => prev === index ? null : index)
  }

  const stackProps = { products: PRODUCTS, flippedIndex, handleFlip, onChatOpen }

  const headerBlock = (
    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
      <div style={{ marginBottom: '0.85rem' }}>
        <Eyebrow variant="pill" tone="dark">Lo que hacemos</Eyebrow>
      </div>
      <h2
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
          color: '#1A1814',
          lineHeight: 1.15,
          margin: 0,
        }}
      >
        Tres sistemas. Un objetivo:
        <em style={{ fontStyle: 'italic', background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {' '}que tu negocio funcione solo.
        </em>
      </h2>
    </div>
  )

  return (
    <AuroraBackground intense variant="light">
    <section
      id="lo-que-hacemos"
      style={{ padding: isMobile ? '5rem 1.25rem' : '6rem 2rem' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Tier 1 — 3 cards. Desktop: scroll-driven depth stack with sticky header. Mobile: snap carousel. */}
        {prefersReducedMotion ? (
          <>
            <div style={{ marginBottom: '2.5rem' }}>{headerBlock}</div>
            <StaticStack {...stackProps} isMobile={isMobile} />
          </>
        ) : isMobile ? (
          <>
            <div style={{ marginBottom: '2rem' }}>{headerBlock}</div>
            <MobileCarousel {...stackProps} />
          </>
        ) : (
          <ScrollStack {...stackProps} header={headerBlock} />
        )}

        {/* Tier 2 */}
        <Tier2Block onChatOpen={onChatOpen} />
      </div>
    </section>
    </AuroraBackground>
  )
}
