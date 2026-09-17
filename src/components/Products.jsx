import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Player } from '@remotion/player'
import {
  LockKey,
  Target,
  Lightning,
  Monitor,
  Globe,
  FileText,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ArrowClockwise,
} from '@phosphor-icons/react'
import useIsMobile from '../hooks/useIsMobile'
import ChatbotDemo from '../remotion/ChatbotDemo'
import DataQueryDemo from '../remotion/DataQueryDemo'
import AgentDemo from '../remotion/AgentDemo'
import AuroraBackground from './AuroraBackground'
import CtaButton from './CtaButton'
import Eyebrow from './Eyebrow'
import SpotlightCard from './SpotlightCard'
import baktun13Logo from '../assets/baktun13-logo.png'
import clesolLogo from '../assets/clesol-logo.png'
import { ACCENT, gradientText } from '../lib/tokens'
import { FOUNDERS } from '../lib/founders'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const EASE = [0.22, 1, 0.36, 1]

/* ────────────────────────────── DATA ────────────────────────────── */

const PRODUCTS = [
  {
    num: '01',
    contextId: 'contact_center',
    name: 'Tu Recepcionista',
    tag: 'Atención al cliente, 24/7',
    promise: 'Ni un cliente sin atender, a cualquier hora',
    outcomes: [
      'Te contesta a los clientes al instante en WhatsApp, web, email, Instagram y teléfono.',
      'Cada conversación acaba en cita, pedido o lead, y la registra en tu CRM.',
      'No descansa: atiende 24/7 y avisa a tu equipo cuando hace falta una persona.',
    ],
    bullets: [
      'Atiende reservas y pedidos en cualquier canal',
      'Cualifica y registra cada lead automáticamente',
      'Avisa a una persona del equipo cuando hace falta',
      'Se integra con tu CRM y tus herramientas actuales',
      'Disponible en WhatsApp, Instagram, Telegram y web',
      'Atiende llamadas con voz natural',
    ],
    price: { from: '1.200€', normal: '2.400€', maintenance: '97€/mes' },
    ctaLabel: 'Ver cómo te atendería',
    cases: [
      { logo: 'baktun13',      tag: 'Baktun 13',     sector: 'Gimnasio',    quote: 'Operativo de cero en tres semanas.' },
      { logo: 'venta-alegria', tag: 'Venta Alegría', sector: 'Restaurante', quote: 'Operación 100% digital, hasta los albaranes por foto.' },
      { logo: 'clesol',        tag: 'Clesol',        sector: 'Servicios',   quote: 'Leads clasificados de forma automática.' },
    ],
    component: ChatbotDemo,
  },
  {
    num: '02',
    contextId: 'back_office',
    name: 'Tu Administrativo',
    tag: 'El papeleo, resuelto solo',
    promise: 'El trabajo que odias, hecho sin que lo pidas',
    outcomes: [
      'Se encarga del papeleo que te roba horas: emails, facturas, informes y recordatorios.',
      'Lo hace cada día sin que nadie se lo pida, con el tono y los criterios de tu empresa.',
      'Te avisa solo cuando algo se sale de lo previsto.',
    ],
    bullets: [
      'Redacta y responde emails con el tono de tu empresa',
      'Procesa y registra facturas automáticamente',
      'Genera informes periódicos sin intervención',
      'Detecta y avisa cuando algo no cuadra',
      'Resume reuniones y deja las acciones por escrito',
      'Envía recordatorios y seguimientos a tiempo',
    ],
    price: { from: '2.000€', normal: '4.000€', maintenance: '200€/mes' },
    ctaLabel: 'Ver qué automatizaríamos',
    cases: [
      { logo: 'clesol', tag: 'Clesol', sector: 'Servicios', quote: 'Clasificación automática de leads en dos semanas.' },
    ],
    component: AgentDemo,
  },
  {
    num: '03',
    contextId: 'asistente',
    name: 'Tu Analista',
    tag: 'Tus datos, en lenguaje claro',
    promise: 'Pregúntale cómo va el negocio y te responde',
    outcomes: [
      'Le preguntas en español cómo va el negocio y te contesta en segundos.',
      'Tiene a mano ventas, costes, stock, reservas y albaranes, todo en un sitio.',
      'Detecta desviaciones antes de que se conviertan en un problema.',
    ],
    bullets: [
      'Pregunta en español, sin SQL ni hojas de cálculo',
      'Conoce ventas, márgenes y costes en tiempo real',
      'Digitaliza albaranes a partir de una foto',
      'Alerta cuando un gasto se desvía de lo normal',
      'Se conecta a cualquier base de datos del negocio',
      'Accesible para todo el equipo, sin conocimientos técnicos',
    ],
    price: { from: '1.500€', normal: '3.000€', maintenance: '150€/mes' },
    ctaLabel: 'Probarlo con tus datos',
    cases: [
      { logo: 'baktun13', tag: 'Baktun 13', sector: 'Gimnasio', quote: 'App de gestión con IA en tres semanas.' },
    ],
    component: DataQueryDemo,
  },
]

/* ──────────────────── LAZY VIDEO (mount lazy + pausa fuera de viewport) ──────────────────── */

function LazyVideoColumn({ component, flush = false }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          playerRef.current?.play?.()
        } else {
          playerRef.current?.pause?.()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        background: '#0D0D10',
        borderRadius: flush ? 0 : 14,
        overflow: 'hidden',
        aspectRatio: '4 / 3',
        width: '100%',
        border: flush ? 'none' : '1px solid rgba(26,24,20,0.06)',
        boxShadow: flush ? 'none' : 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {visible ? (
        <Player
          ref={playerRef}
          component={component}
          durationInFrames={330}
          fps={30}
          compositionWidth={640}
          compositionHeight={480}
          style={{ width: '100%', height: '100%', display: 'block' }}
          autoPlay
          loop
          initiallyMuted
          controls={false}
          clickToPlay={false}
          acknowledgeRemotionLicense
        />
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

/* ──────────────────── CASE LOGO ──────────────────── */

function CaseLogo({ logo, tag }) {
  if (logo === 'baktun13') {
    return (
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 9,
          background: '#1A1814',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          flexShrink: 0,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <img src={baktun13Logo} alt={tag} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    )
  }

  if (logo === 'clesol') {
    return <img src={clesolLogo} alt={tag} style={{ height: 24, width: 'auto', flexShrink: 0, display: 'block' }} />
  }

  // venta-alegria — wordmark editorial
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 6,
        fontFamily: "'Instrument Serif', serif",
        fontStyle: 'italic',
        fontSize: '1.15rem',
        color: '#1A1814',
        letterSpacing: '0.005em',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        lineHeight: 1,
      }}
    >
      <span style={{ fontSize: '0.7em', opacity: 0.55, transform: 'translateY(-1px)' }}>✦</span>
      Venta Alegría
    </span>
  )
}

/* ──────────────────── ROTATING CASES (social proof) ──────────────────── */

function CasesStrip({ cases }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (cases.length < 2) return
    const t = setInterval(() => setIdx((i) => (i + 1) % cases.length), 4200)
    return () => clearInterval(t)
  }, [cases.length])

  const c = cases[idx]

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        minHeight: 52,
        padding: '12px 14px',
        background: 'rgba(26,24,20,0.025)',
        border: '1px solid rgba(26,24,20,0.06)',
        borderRadius: 12,
      }}
    >
      <CaseLogo logo={c.logo} tag={c.tag} />

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4 }}
          style={{ flex: 1, minWidth: 0 }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: '#1A1814',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            “{c.quote}”
          </p>
          <p
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.68rem',
              color: 'rgba(26,24,20,0.5)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              margin: '4px 0 0',
            }}
          >
            {c.sector}
          </p>
        </motion.div>
      </AnimatePresence>
      {cases.length > 1 && (
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {cases.map((_, i) => (
            <span
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: i === idx ? '#1A1814' : 'rgba(26,24,20,0.18)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ──────────────────── PRICE (con ancla de precio fundador) ──────────────────── */

function PriceBlock({ price, onFoundersOpen }) {
  return (
    <div style={{ borderTop: '1px solid rgba(26,24,20,0.08)', paddingTop: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.66rem',
            color: 'rgba(26,24,20,0.5)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          Desde
        </span>
        {FOUNDERS.active && price.normal && (
          <span
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.95rem',
              color: 'rgba(26,24,20,0.4)',
              textDecoration: 'line-through',
            }}
          >
            {price.normal}
          </span>
        )}
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
            color: '#1A1814',
            lineHeight: 1,
          }}
        >
          {price.from}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: '0.85rem',
            color: 'rgba(26,24,20,0.55)',
          }}
        >
          + {price.maintenance}
        </span>
      </div>

      {FOUNDERS.active && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onFoundersOpen?.()
          }}
          style={{
            marginTop: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ ...gradientText }}>Precio fundador</span>
          <span style={{ color: 'rgba(26,24,20,0.5)' }}>· de las {FOUNDERS.spotsTotal} primeras · quedan {FOUNDERS.spotsLeft}</span>
        </button>
      )}
    </div>
  )
}

/* ──────────────────── GARANTÍAS + CUERPO (para el acordeón móvil) ──────────────────── */

function GuaranteesLine() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: "'Syne Mono', monospace",
        fontSize: '0.7rem',
        letterSpacing: '0.04em',
        color: 'rgba(26,24,20,0.55)',
      }}
    >
      <ShieldCheck size={14} weight="regular" style={{ color: '#22C55E', flexShrink: 0 }} />
      RGPD · NDA · Datos en tu infra
    </div>
  )
}

function ProductCopy({ product, onChatOpen, onFoundersOpen, showHead = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', minWidth: 0 }}>
      {showHead && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '1.3rem', color: ACCENT, lineHeight: 1 }}>{product.num}</span>
            <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.66rem', color: 'rgba(26,24,20,0.45)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              {product.tag}
            </span>
          </div>
          <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem, 2.4vw, 2rem)', color: '#1A1814', margin: 0, lineHeight: 1.05 }}>
            {product.name}
          </h3>
        </>
      )}

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '1rem', color: 'rgba(26,24,20,0.62)', margin: 0 }}>
        {product.promise}
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {product.outcomes.map((o, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: '0.92rem',
              color: '#1A1814',
              lineHeight: 1.45,
            }}
          >
            <Check size={16} weight="bold" style={{ color: ACCENT, flexShrink: 0, marginTop: 2 }} />
            <span>{o}</span>
          </li>
        ))}
      </ul>

      <GuaranteesLine />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', paddingTop: '0.3rem' }}>
        <PriceBlock price={product.price} onFoundersOpen={onFoundersOpen} />
        <CtaButton
          onClick={() => onChatOpen(product.contextId)}
          variant="solid"
          arrow="right"
          size="lg"
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          {product.ctaLabel}
        </CtaButton>
      </div>
    </div>
  )
}

/* ──────────────────── ACORDEÓN (móvil) ──────────────────── */

function MobileAccordion({ activeIdx, recommendedIdx, onToggle, onChatOpen, onFoundersOpen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {PRODUCTS.map((product, i) => {
        const open = activeIdx === i
        const recommended = recommendedIdx === i
        return (
          <div
            key={product.num}
            id={`producto-${product.num}`}
            style={{
              borderRadius: 24,
              padding: recommended ? 1.5 : 1,
              background: recommended ? GRADIENT : 'rgba(26,24,20,0.02)',
              border: recommended ? 'none' : '1px solid rgba(26,24,20,0.07)',
              scrollMarginTop: '6rem',
            }}
          >
            <div style={{ background: '#FEFCF7', borderRadius: 22, overflow: 'hidden', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85)' }}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => onToggle(i)}
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '1.1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '1rem', color: ACCENT, flexShrink: 0 }}>{product.num}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: "'Instrument Serif', serif", fontSize: '1.3rem', color: '#1A1814', lineHeight: 1.1 }}>
                    {product.name}
                  </span>
                  <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.6rem', color: 'rgba(26,24,20,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    {product.tag}
                  </span>
                </span>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.25rem', color: '#1A1814', flexShrink: 0 }}>{product.price.from}</span>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    background: 'rgba(26,24,20,0.05)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(26,24,20,0.6)',
                    flexShrink: 0,
                  }}
                >
                  {open ? <Minus size={13} weight="bold" /> : <Plus size={13} weight="bold" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                      <LazyVideoColumn component={product.component} />
                      <ProductCopy product={product} onChatOpen={onChatOpen} onFoundersOpen={onFoundersOpen} showHead={false} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ──────────────────── SHOWCASE CARD (vitrina autocontenida — desktop) ──────────────────── */

function ProductShowcaseCard({ product, isMobile, onChatOpen, onFoundersOpen, highlighted, expanded, onToggleExpand }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      id={`producto-${product.num}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{
        position: 'relative',
        height: '100%',
        borderRadius: 32,
        padding: highlighted ? 1.5 : 0,
        background: highlighted ? GRADIENT : 'transparent',
        scrollMarginTop: '6rem',
      }}
    >
      {highlighted && (
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: isMobile ? '50%' : 24,
            transform: isMobile ? 'translateX(-50%)' : 'none',
            zIndex: 3,
            background: GRADIENT,
            color: '#fff',
            padding: '4px 12px',
            borderRadius: 999,
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          Recomendado para ti
        </div>
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: '100%',
          transform: hovered && !isMobile ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <SpotlightCard tone="light" radius={24} padding={isMobile ? '1.1rem' : '1.25rem'}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', height: '100%' }}>
            {/* VÍDEO — ancla visual, a ras de los bordes superiores de la card */}
            <div style={{ margin: '-1.25rem -1.25rem 0', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
              <LazyVideoColumn component={product.component} flush />
            </div>

            {/* Cabecera nº · tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: '0.15rem' }}>
              <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '1.3rem', color: ACCENT, lineHeight: 1, letterSpacing: '0.02em' }}>
                {product.num}
              </span>
              <span
                style={{
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: '0.66rem',
                  color: 'rgba(26,24,20,0.45)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {product.tag}
              </span>
            </div>

            {/* Nombre + promesa */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <h3
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(1.55rem, 2.4vw, 1.9rem)',
                  color: '#1A1814',
                  margin: 0,
                  lineHeight: 1.06,
                  minHeight: '2.12em', // reserva 2 líneas → títulos alineados entre cards
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '1rem',
                  color: 'rgba(26,24,20,0.62)',
                  margin: 0,
                  letterSpacing: '-0.005em',
                }}
              >
                {product.promise}
              </p>
            </div>

            {/* 3 beneficios — siempre visibles */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {product.outcomes.map((o, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 11,
                    alignItems: 'flex-start',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.95rem',
                    color: '#1A1814',
                    lineHeight: 1.5,
                  }}
                >
                  <Check size={17} weight="bold" style={{ color: ACCENT, flexShrink: 0, marginTop: 3 }} />
                  <span>{o}</span>
                </li>
              ))}
            </ul>

            {/* Acordeón "ver todo lo que incluye" */}
            <div>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={onToggleExpand}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'rgba(26,24,20,0.6)',
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(26,24,20,0.9)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(26,24,20,0.6)')}
              >
                {expanded ? <Minus size={14} /> : <Plus size={14} />}
                {expanded ? 'Ocultar opciones' : 'Ver opciones'}
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        paddingTop: '1.4rem',
                        marginTop: '0.4rem',
                        borderTop: '1px solid rgba(26,24,20,0.08)',
                      }}
                    >
                      {/* Opciones — capacidades que se pueden activar según el caso */}
                      <div>
                        <p
                          style={{
                            fontFamily: "'Syne Mono', monospace",
                            fontSize: '0.7rem',
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: 'rgba(26,24,20,0.45)',
                            margin: '0 0 0.5rem',
                          }}
                        >
                          Opciones disponibles
                        </p>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: '0.88rem',
                            color: 'rgba(26,24,20,0.6)',
                            lineHeight: 1.5,
                            margin: '0 0 1rem',
                          }}
                        >
                          Eliges lo que necesitas y lo montamos a tu medida. El alcance y el precio
                          se ajustan a las opciones que combines.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                          {product.bullets.map((b, i) => (
                            <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                              <Check size={15} weight="bold" style={{ color: 'rgba(67,97,238,0.7)', marginTop: 3, flexShrink: 0 }} />
                              <span
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: 300,
                                  fontSize: '0.92rem',
                                  color: 'rgba(26,24,20,0.74)',
                                  lineHeight: 1.5,
                                }}
                              >
                                {b}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Garantías */}
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {[
                          { Icon: ShieldCheck, label: 'RGPD compliant' },
                          { Icon: FileText,    label: 'NDA disponible' },
                          { Icon: LockKey,     label: 'Datos en tu infra' },
                        ].map(({ Icon, label }) => (
                          <span
                            key={label}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              background: '#FAF8F3',
                              border: '1px solid rgba(26,24,20,0.07)',
                              borderRadius: 999,
                              padding: '6px 12px',
                            }}
                          >
                            <Icon size={13} weight="regular" style={{ color: '#22C55E', flexShrink: 0 }} />
                            <span
                              style={{
                                fontFamily: "'Syne Mono', monospace",
                                fontSize: '0.72rem',
                                color: 'rgba(26,24,20,0.6)',
                                letterSpacing: '0.04em',
                              }}
                            >
                              {label}
                            </span>
                          </span>
                        ))}
                      </div>

                      {/* Caso real */}
                      <CasesStrip cases={product.cases} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Precio + CTA, anclados al fondo */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.1rem', paddingTop: '0.4rem' }}>
              <PriceBlock price={product.price} onFoundersOpen={onFoundersOpen} />
              <CtaButton
                onClick={() => onChatOpen(product.contextId)}
                variant="solid"
                arrow="right"
                size="lg"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                {product.ctaLabel}
              </CtaButton>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </motion.div>
  )
}

/* ──────────────────── AUDITORÍA IA → PUERTA DE ENTRADA ──────────────────── */

// Bloque destacado encima de las tres cards. Sustituye al antiguo quiz "¿por
// dónde empezar?": en vez de obligar a elegir, regala un diagnóstico. Una sola
// promesa, un solo CTA → abre el chat en modo auditoría (contexto 'audit'), que
// recomienda qué "empleado" fichar primero y resalta su card.
function AuditEntryBlock({ onChatOpen, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ maxWidth: 720, margin: '0 auto 3.25rem' }}
    >
      <SpotlightCard tone="light" radius={20} padding={isMobile ? '1.75rem 1.5rem' : '2.25rem 2.5rem'}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', gap: '1.1rem', textAlign: isMobile ? 'center' : 'left' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: GRADIENT, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.74rem',
                color: 'rgba(26,24,20,0.55)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Auditoría IA gratuita
            </span>
          </span>

          <h3
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.65rem, 3.2vw, 2.3rem)',
              color: '#1A1814',
              margin: 0,
              lineHeight: 1.16,
            }}
          >
            ¿No sabes por dónde empezar?{' '}
            <em style={{ fontStyle: 'italic', ...gradientText }}>Nosotros sí.</em>
          </h3>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '1.08rem',
              color: 'rgba(26,24,20,0.65)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 560,
            }}
          >
            Analizamos tu negocio y te decimos las 3 cosas que puedes automatizar ya — y cuál de tus
            empleados de IA te conviene fichar primero. Sin coste y sin compromiso.
          </p>

          <div style={{ marginTop: '0.35rem' }}>
            <CtaButton onClick={() => onChatOpen('audit')}>
              Pedir mi auditoría gratis
            </CtaButton>
          </div>

          {FOUNDERS.active && (
            <p
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.66rem',
                color: 'rgba(26,24,20,0.5)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Gratis para los primeros negocios del Programa Fundadores
            </p>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

// Chip de recomendación: aparece cuando el chat (auditoría) ha identificado el
// "empleado" que encaja. Resalta cuál y deja quitar el resaltado.
function RecommendationChip({ recommendedIdx, onReset }) {
  const rec = recommendedIdx >= 0 ? PRODUCTS[recommendedIdx] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 560,
        margin: '0 auto 3rem',
        padding: '0.85rem 1.4rem',
        background: '#FEFCF7',
        border: '1px solid rgba(26,24,20,0.06)',
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        flexWrap: 'wrap',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85), 0 10px 28px -22px rgba(26,24,20,0.12)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.76rem',
          color: 'rgba(26,24,20,0.7)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {rec ? (
          <>
            Te recomendamos →{' '}
            <span style={{ ...gradientText }}>{rec.name}</span>
          </>
        ) : (
          'Revisa los tres — cualquiera puede encajar.'
        )}
      </p>
      <button
        type="button"
        onClick={onReset}
        style={{
          border: 'none',
          background: 'transparent',
          color: 'rgba(26,24,20,0.55)',
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: 0,
        }}
      >
        <ArrowClockwise size={11} />
        Quitar
      </button>
    </motion.div>
  )
}

/* ──────────────────── TIER 2 ──────────────────── */

const MORE_PILLS = [
  { Icon: LockKey,   label: 'Soluciones en local' },
  { Icon: Target,    label: 'Clasificación de leads' },
  { Icon: Lightning, label: 'Automatizaciones' },
  { Icon: Monitor,   label: 'Software a medida' },
  { Icon: Globe,     label: 'Webs y landing pages' },
]

function Tier2Block({ onChatOpen, isMobile }) {
  const handleCustom = () => {
    onChatOpen('tier2_other')
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('chat:send', {
          detail: {
            message:
              'Hola. Lo que necesito no encaja en los tres productos. ¿Podéis decirme si me lo podéis hacer a medida?',
          },
        })
      )
    }, 450)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: '4rem' }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(26,24,20,0.08)',
          borderRadius: 18,
          padding: isMobile ? '1.75rem' : '2.25rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.78rem',
              color: 'rgba(26,24,20,0.55)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: '0 0 0.65rem',
            }}
          >
            ¿Tu caso necesita algo a medida?
          </p>
          <h3
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
              color: '#1A1814',
              margin: 0,
              lineHeight: 1.18,
            }}
          >
            La auditoría también lo cubre.
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '1rem',
              color: 'rgba(26,24,20,0.6)',
              lineHeight: 1.6,
              margin: '0.7rem 0 0',
              maxWidth: 580,
              marginLeft: isMobile ? 'auto' : 0,
              marginRight: isMobile ? 'auto' : 0,
            }}
          >
            Si lo tuyo va más allá de los tres empleados, cuéntanoslo en la auditoría: lo concretamos y te decimos con sinceridad si podemos construirlo.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          {MORE_PILLS.map(({ Icon, label }) => (
            <span
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#FAF8F3',
                border: '1px solid rgba(26,24,20,0.06)',
                borderRadius: 999,
                padding: '8px 14px',
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.78rem',
                color: 'rgba(26,24,20,0.72)',
              }}
            >
              <Icon size={13} weight="light" style={{ opacity: 0.7 }} />
              {label}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'center' }}>
          <CtaButton onClick={handleCustom} variant="solid" arrow="right" size="lg">
            Cuéntaselo a nuestra IA
          </CtaButton>
          <span
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.8rem',
              color: 'rgba(26,24,20,0.55)',
              letterSpacing: '0.06em',
            }}
          >
            Sin compromiso · te decimos si encaja
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ──────────────────── MAIN SECTION ──────────────────── */

export default function Products({ onChatOpen, onFoundersOpen }) {
  const isMobile = useIsMobile()
  // -1 = sin recomendación (estado inicial); 0/1/2 = índice recomendado por el chat
  const [recommendedIdx, setRecommendedIdx] = useState(-1)
  // Acordeón móvil: fila abierta (-1 = ninguna). Default: la primera.
  const [mobileOpenIdx, setMobileOpenIdx] = useState(0)
  // Desktop: card con el detalle desplegado (null = ninguna, solo una a la vez).
  const [expandedIdx, setExpandedIdx] = useState(null)

  const scrollToProduct = (idx) => {
    const el = document.getElementById(`producto-${PRODUCTS[idx].num}`)
    if (!el) return
    const navOffset = 96
    const targetY = window.scrollY + el.getBoundingClientRect().top - navOffset
    const startY = window.scrollY
    const dist = targetY - startY
    if (Math.abs(dist) < 2) return
    const duration = Math.min(2600, Math.max(1400, Math.abs(dist) * 1.6))
    const t0 = performance.now()
    const ease = (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2)
    const step = (now) => {
      const t = Math.min(1, (now - t0) / duration)
      window.scrollTo(0, startY + dist * ease(t))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const handleRecommendation = (idx) => {
    setRecommendedIdx(idx)
    if (idx >= 0) {
      setMobileOpenIdx(idx) // abre la fila recomendada en el acordeón móvil
      setTimeout(() => scrollToProduct(idx), 500)
    }
  }

  // El chatbot (auditoría) ha identificado el empleado que encaja: resaltamos su
  // card y hacemos scroll hasta ella.
  useEffect(() => {
    const handler = (e) => {
      const idx = e.detail?.idx
      if (typeof idx === 'number') handleRecommendation(idx)
    }
    window.addEventListener('chat:recommend-product', handler)
    return () => window.removeEventListener('chat:recommend-product', handler)
    // Suscripción única al montar: handleRecommendation solo dispara setters estables.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuroraBackground variant="light">
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isMobile ? 240 : 380,
          pointerEvents: 'none',
          zIndex: 2,
          background:
            'radial-gradient(140% 120% at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.45) 28%, rgba(250,248,243,0) 68%)',
        }}
      />
      <section id="lo-que-hacemos" style={{ padding: isMobile ? '5rem 1.25rem' : '7.5rem 2rem', position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: isMobile ? 1180 : 1280, margin: '0 auto' }}>
          {/* HEADER */}
          <div style={{ textAlign: isMobile ? 'center' : 'left', marginBottom: '3.25rem' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <Eyebrow variant="pill" tone="dark">Soluciones</Eyebrow>
            </div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
                color: '#1A1814',
                lineHeight: 1.1,
                margin: '0 0 0.85rem',
              }}
            >
              Tres empleados que no se van.
              <em
                style={{
                  fontStyle: 'italic',
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {' '}Trabajan a todas horas y no cobran nómina.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '1.15rem',
                color: 'rgba(26,24,20,0.65)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 600,
                marginLeft: isMobile ? 'auto' : 0,
                marginRight: isMobile ? 'auto' : 0,
              }}
            >
              ¿No sabes a cuál fichar primero? Empieza por la auditoría gratuita y te lo decimos. En producción en dos o tres semanas.
            </p>
          </div>

          {/* PUERTA DE ENTRADA: auditoría gratuita (sustituye al quiz) */}
          <AuditEntryBlock onChatOpen={onChatOpen} isMobile={isMobile} />

          {/* Cuando el chat (auditoría) recomienda un empleado, lo resaltamos */}
          {recommendedIdx >= 0 && (
            <RecommendationChip recommendedIdx={recommendedIdx} onReset={() => setRecommendedIdx(-1)} />
          )}

          {/* MÓVIL: acordeón vertical · DESKTOP: tríptico de cards-vitrina */}
          {isMobile ? (
            <MobileAccordion
              activeIdx={mobileOpenIdx}
              recommendedIdx={recommendedIdx}
              onToggle={(i) => setMobileOpenIdx((prev) => (prev === i ? -1 : i))}
              onChatOpen={onChatOpen}
              onFoundersOpen={onFoundersOpen}
            />
          ) : (
            <div
              style={{
                display: 'grid',
                // minmax(0,1fr) → las 3 columnas son EXACTAMENTE iguales (sin
                // minmax, el CTA largo ensancha su columna y agranda su vídeo).
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '1.5rem',
                // Sin nada desplegado: misma altura en las 3 (uniforme/cuadrado).
                // Con una desplegada: solo crece esa, las otras no se estiran.
                alignItems: expandedIdx === null ? 'stretch' : 'start',
              }}
            >
              {PRODUCTS.map((product, i) => (
                <ProductShowcaseCard
                  key={product.num}
                  product={product}
                  isMobile={false}
                  onChatOpen={onChatOpen}
                  onFoundersOpen={onFoundersOpen}
                  highlighted={recommendedIdx === i}
                  expanded={expandedIdx === i}
                  onToggleExpand={() => setExpandedIdx((prev) => (prev === i ? null : i))}
                />
              ))}
            </div>
          )}

          {/* TIER 2 */}
          <Tier2Block onChatOpen={onChatOpen} isMobile={isMobile} />
        </div>
      </section>
    </AuroraBackground>
  )
}
