import { useState, useEffect, useRef, Fragment } from 'react'
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
import { ArrowRight } from './icons/ArrowIcon'
import baktun13Logo from '../assets/baktun13-logo.png'
import clesolLogo from '../assets/clesol-logo.png'
import { ACCENT, gradientText } from '../lib/tokens'
import { EASE_PREMIUM } from '../lib/motion'
import { FOUNDERS } from '../lib/founders'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const EASE = [0.22, 1, 0.36, 1]

/* ────────────────────────────── DATA ────────────────────────────── */

const PRODUCTS = [
  {
    num: '01',
    contextId: 'contact_center',
    name: 'Atención al Cliente',
    tag: 'Contact Center IA',
    promise: 'Cada conversación, atendida al instante',
    outcomes: [
      'Responde cada mensaje al momento en WhatsApp, web, email, Instagram y teléfono. Ninguna oportunidad se queda sin atender.',
      'Conectado a tu CRM y a tu sistema de reservas: la conversación termina en una cita, un pedido o un lead cualificado.',
      'Disponible 24/7 y deriva a tu equipo cuando una conversación lo requiere.',
    ],
    bullets: [
      'Atiende reservas y pedidos en cualquier canal',
      'Cualifica y registra cada lead automáticamente',
      'Deriva a una persona del equipo cuando hace falta',
      'Se integra con tu CRM y tus herramientas actuales',
      'Disponible en WhatsApp, Instagram, Telegram y web',
      'Atiende llamadas con voz natural',
    ],
    price: { from: '1.200€', normal: '2.400€', maintenance: '97€/mes' },
    ctaLabel: 'Ver cómo atendería a tus clientes',
    // Multi-caso → rotación que comunica "para cualquier sector"
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
    name: 'Operaciones',
    tag: 'Back Office IA',
    promise: 'El trabajo repetitivo, resuelto',
    outcomes: [
      'Recupera horas de tu equipo automatizando las tareas administrativas que se repiten cada día.',
      'Emails, facturas, informes y recordatorios, gestionados sin que nadie tenga que pedirlo.',
      'Te avisa solo cuando algo se sale de lo previsto. La decisión sigue siendo tuya.',
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
    ctaLabel: 'Ver qué automatizaríamos en tu operación',
    cases: [
      { logo: 'clesol', tag: 'Clesol', sector: 'Servicios', quote: 'Clasificación automática de leads en dos semanas.' },
    ],
    component: AgentDemo,
  },
  {
    num: '03',
    contextId: 'asistente',
    name: 'Inteligencia de Negocio',
    tag: 'Asistente IA',
    promise: 'Tus datos, listos para decidir',
    outcomes: [
      'Pregunta en lenguaje natural a tus datos y obtén la respuesta en segundos.',
      'Ventas, costes, stock, reservas y albaranes, conectados en un único lugar.',
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
    ctaLabel: 'Probarlo con datos de un negocio real',
    cases: [
      { logo: 'baktun13', tag: 'Baktun 13', sector: 'Gimnasio', quote: 'App de gestión con IA en tres semanas.' },
    ],
    component: DataQueryDemo,
  },
]

/* ──────────────────── LAZY VIDEO (aspect-ratio fijo) ──────────────────── */

function LazyVideoColumn({ component }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
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
        borderRadius: 12,
        overflow: 'hidden',
        aspectRatio: '4 / 3',
        width: '100%',
      }}
    >
      {visible ? (
        <Player
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
        <img
          src={baktun13Logo}
          alt={tag}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    )
  }

  if (logo === 'clesol') {
    return (
      <img
        src={clesolLogo}
        alt={tag}
        style={{ height: 24, width: 'auto', flexShrink: 0, display: 'block' }}
      />
    )
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
          <span style={{ color: 'rgba(26,24,20,0.5)' }}>· quedan {FOUNDERS.spotsLeft}</span>
        </button>
      )}
    </div>
  )
}

/* ──────────────────── SELECTOR CARD (tríptico) ──────────────────── */

function ProductSelectorCard({ product, active, onSelect, isMobile, onFoundersOpen }) {
  return (
    <motion.div
      id={`producto-${product.num}`}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      animate={{ y: active && !isMobile ? -3 : 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        borderRadius: 32,
        padding: active ? 1.5 : 0,
        background: active ? GRADIENT : 'transparent',
        cursor: 'pointer',
        opacity: active ? 1 : 0.92,
        transition: 'opacity 0.3s, background 0.3s',
        scrollMarginTop: '6rem',
        outline: 'none',
      }}
    >
      <SpotlightCard
        tone="light"
        radius={24}
        padding={isMobile ? '1.6rem 1.5rem' : '1.85rem 1.75rem'}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', height: '100%' }}>
          {/* Cabecera: num + tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: '1.35rem',
                color: ACCENT,
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}
            >
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
                fontSize: 'clamp(1.5rem, 2.4vw, 1.85rem)',
                color: '#1A1814',
                margin: 0,
                lineHeight: 1.06,
              }}
            >
              {product.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: '0.95rem',
                color: 'rgba(26,24,20,0.62)',
                margin: 0,
                letterSpacing: '-0.005em',
              }}
            >
              {product.promise}
            </p>
          </div>

          {/* 3 beneficios (condensados a 2 líneas) */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0.15rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
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
                  color: 'rgba(26,24,20,0.82)',
                  lineHeight: 1.45,
                }}
              >
                <Check size={16} weight="bold" style={{ color: ACCENT, flexShrink: 0, marginTop: 2 }} />
                <span
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {o}
                </span>
              </li>
            ))}
          </ul>

          {/* Precio + CTA, anclados abajo */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.4rem' }}>
            <PriceBlock price={product.price} onFoundersOpen={onFoundersOpen} />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.9rem',
                color: active ? ACCENT : '#1A1814',
              }}
            >
              {active ? 'Viéndolo en acción' : 'Ver en acción'}
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: active ? 'rgba(67,97,238,0.1)' : 'rgba(26,24,20,0.05)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s',
                }}
              >
                <ArrowRight size={12} />
              </span>
            </span>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

/* ──────────────────── DETAIL PANEL (vídeo héroe) ──────────────────── */

function ProductDetail({ product, isMobile, onChatOpen }) {
  return (
    <div
      style={{
        background: '#FEFCF7',
        border: '1px solid rgba(26,24,20,0.06)',
        borderRadius: 28,
        padding: isMobile ? '1.25rem' : '2rem',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85), 0 1px 2px rgba(26,24,20,0.03), 0 24px 56px -32px rgba(26,24,20,0.18)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '0.95fr 1.05fr',
        gap: isMobile ? '1.25rem' : '2.5rem',
        alignItems: 'start',
      }}
    >
      {/* VÍDEO — héroe del producto activo */}
      <div style={{ alignSelf: 'flex-start' }}>
        <LazyVideoColumn component={product.component} />
      </div>

      {/* DETALLE */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
        <div>
          <p
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(26,24,20,0.45)',
              margin: '0 0 1rem',
            }}
          >
            Qué incluye
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '0.8rem 1.75rem',
            }}
          >
            {product.bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <Check size={15} weight="bold" style={{ color: 'rgba(67,97,238,0.7)', marginTop: 3, flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.95rem',
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

        {/* CTA principal */}
        <div style={{ paddingTop: '0.25rem' }}>
          <CtaButton onClick={() => onChatOpen(product.contextId)} variant="solid" arrow="right" size="lg">
            {product.ctaLabel}
          </CtaButton>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────── MICRO-QUIZ → SELECTOR ──────────────────── */

const QUIZ = [
  { q: '¿La atención a clientes (mensajes, llamadas, emails) consume demasiado tiempo a tu equipo?', product: 0 },
  { q: '¿Hay tareas administrativas repetitivas (emails, facturas, informes) que ralentizan el día a día?', product: 1 },
  { q: '¿Te cuesta saber qué pasa en tu negocio sin pedir informes a alguien?', product: 2 },
]

function ProductsQuiz({ onResult, isMobile }) {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState([0, 0, 0])

  const answer = (yes) => {
    const nextScores = [...scores]
    if (yes) nextScores[QUIZ[step].product] += 1
    setScores(nextScores)

    if (step < QUIZ.length - 1) {
      setTimeout(() => setStep(step + 1), 220)
    } else {
      const max = Math.max(...nextScores)
      const winner = max === 0 ? -1 : nextScores.indexOf(max)
      setTimeout(() => onResult(winner), 320)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 560,
        margin: '0 auto 3rem',
        padding: isMobile ? '1.4rem 1.25rem' : '1.6rem 1.85rem',
        background: '#FEFCF7',
        border: '1px solid rgba(26,24,20,0.06)',
        borderRadius: 18,
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.85), 0 10px 28px -22px rgba(26,24,20,0.12), 0 1px 0 rgba(26,24,20,0.02)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.9rem',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.74rem',
            color: 'rgba(26,24,20,0.55)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          ¿Por dónde empezar? · {step + 1}/{QUIZ.length}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {QUIZ.map((_, i) => (
            <span
              key={i}
              style={{
                width: 20,
                height: 2,
                background: i <= step ? ACCENT : 'rgba(26,24,20,0.1)',
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.3rem, 2.5vw, 1.55rem)',
              color: '#1A1814',
              margin: '0 0 1.1rem',
              lineHeight: 1.25,
            }}
          >
            {QUIZ[step].q}
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: 'Sí', val: true },
              { label: 'No', val: false },
            ].map(({ label, val }) => (
              <button
                key={label}
                type="button"
                onClick={() => answer(val)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F4EFE5'
                  e.currentTarget.style.borderColor = 'rgba(26,24,20,0.35)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow =
                    'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 20px -16px rgba(26,24,20,0.18)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FAF8F3'
                  e.currentTarget.style.borderColor = 'rgba(26,24,20,0.12)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow =
                    'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 0 rgba(26,24,20,0.02)'
                }}
                style={{
                  flex: 1,
                  height: 50,
                  border: '1px solid rgba(26,24,20,0.12)',
                  background: '#FAF8F3',
                  borderRadius: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '1.05rem',
                  color: '#1A1814',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 0 rgba(26,24,20,0.02)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function QuizResultChip({ recommendedIdx, onReset }) {
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
          'Revisa las tres — cualquiera puede encajar.'
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
        Repetir
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
  // Abre el chat con un mensaje precargado: sabemos que el usuario llega
  // desde "mi caso no encaja en los tres productos" y quiere algo a medida.
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
            ¿Tu caso no encaja en los tres?
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
            Lo vemos en una conversación de 15 minutos.
          </h3>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
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

        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
            alignItems: 'center',
          }}
        >
          <CtaButton
            onClick={handleCustom}
            variant="solid"
            arrow="right"
            size="lg"
          >
            Reservar 15 minutos
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
  const [activeIndex, setActiveIndex] = useState(0)
  // null = quiz pendiente; -1 = sin recomendación; 0/1/2 = índice recomendado
  const [recommendedIdx, setRecommendedIdx] = useState(null)

  // Scroll cinematográfico (ease-in-out-quint) hacia una card concreta.
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

  const handleQuizResult = (idx) => {
    setRecommendedIdx(idx)
    if (idx >= 0) {
      setActiveIndex(idx)
      setTimeout(() => scrollToProduct(idx), 500)
    }
  }

  return (
    // Soluciones full-bleed con "amanecer": la luz emerge en el borde superior
    // al entrar desde la sección oscura "El proceso".
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
      <section
        id="lo-que-hacemos"
        style={{ padding: isMobile ? '5rem 1.25rem' : '7.5rem 2rem', position: 'relative', zIndex: 3 }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          {/* HEADER */}
          <div
            style={{
              textAlign: isMobile ? 'center' : 'left',
              marginBottom: '3.25rem',
            }}
          >
            <div style={{ marginBottom: '0.85rem' }}>
              <Eyebrow variant="pill" tone="dark">
                Soluciones
              </Eyebrow>
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
              Tres soluciones. Un objetivo:
              <em
                style={{
                  fontStyle: 'italic',
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {' '}que tu negocio funcione sin ti encima.
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
              Empieza por donde más lo necesitas. En producción en dos o tres semanas.
            </p>
          </div>

          {/* QUIZ → SELECTOR */}
          {recommendedIdx === null ? (
            <ProductsQuiz onResult={handleQuizResult} isMobile={isMobile} />
          ) : (
            <QuizResultChip
              recommendedIdx={recommendedIdx}
              onReset={() => setRecommendedIdx(null)}
            />
          )}

          {/* TRÍPTICO + DETALLE */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '1.25rem' : '1.25rem',
              alignItems: 'stretch',
            }}
          >
            {PRODUCTS.map((product, i) => (
              <Fragment key={product.num}>
                <ProductSelectorCard
                  product={product}
                  active={activeIndex === i}
                  onSelect={() => setActiveIndex(i)}
                  isMobile={isMobile}
                  onFoundersOpen={onFoundersOpen}
                />
                {/* Móvil: el detalle se expande inline bajo la card activa */}
                {isMobile && activeIndex === i && (
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={`detail-${product.num}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingTop: '1.25rem' }}>
                        <ProductDetail product={product} isMobile onChatOpen={onChatOpen} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </Fragment>
            ))}
          </div>

          {/* Desktop: un único panel de detalle debajo del tríptico */}
          {!isMobile && (
            <div style={{ marginTop: '1.75rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                >
                  <ProductDetail
                    product={PRODUCTS[activeIndex]}
                    isMobile={false}
                    onChatOpen={onChatOpen}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* TIER 2 */}
          <Tier2Block onChatOpen={onChatOpen} isMobile={isMobile} />
        </div>
      </section>
    </AuroraBackground>
  )
}
