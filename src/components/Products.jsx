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
import baktun13Logo from '../assets/baktun13-logo.png'
import clesolLogo from '../assets/clesol-logo.png'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const EASE = [0.22, 1, 0.36, 1]

/* ────────────────────────────── DATA ────────────────────────────── */

const PRODUCTS = [
  {
    num: '01',
    contextId: 'contact_center',
    name: 'Contact Center IA',
    promise: 'Atiende por ti, 24/7',
    // Outcomes deliberadamente sector-agnósticos: enumeran canales e
    // integraciones para que cualquier negocio se auto-reconozca.
    outcomes: [
      'No se te escapa ni un mensaje: WhatsApp, web, email, Instagram, llamadas — todo respondido al instante.',
      'Conectado por detrás a tu CRM, a tu sistema de reservas, a tu captación de leads — la conversación termina en acción.',
      'Responde 24/7 en menos de 4 segundos. Escala a una persona cuando hace falta.',
    ],
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
    price: { from: '1.200€', maintenance: '97€/mes' },
    ctaLabel: 'Probar cómo atendería tu negocio',
    // Multi-caso → rotación que comunica "para cualquier sector"
    cases: [
      { logo: 'baktun13',      tag: 'Baktun 13',     sector: 'Gimnasio',    quote: '3 semanas. De cero a operativo.' },
      { logo: 'venta-alegria', tag: 'Venta Alegría', sector: 'Restaurante', quote: '100% digitalizado, hasta los albaranes por foto.' },
      { logo: 'clesol',        tag: 'Clesol',        sector: 'Servicios',   quote: 'Leads clasificados sin que nadie levante el dedo.' },
    ],
    component: ChatbotDemo,
  },
  {
    num: '02',
    contextId: 'back_office',
    name: 'Back Office IA',
    promise: 'Resuelve lo repetitivo, solo',
    outcomes: [
      'Libera horas a la semana de tu equipo en tareas repetitivas.',
      'Emails, facturas, informes, recordatorios — hechos sin pedir.',
      'Te avisa solo cuando algo no cuadra. Tú decides.',
    ],
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
    price: { from: '2.000€', maintenance: '200€/mes' },
    ctaLabel: 'Ver qué automatizaríamos en tu caso',
    cases: [
      { logo: 'clesol', tag: 'Clesol', sector: 'Servicios', quote: 'Clasificación automática de leads operativa en 2 semanas.' },
    ],
    component: AgentDemo,
  },
  {
    num: '03',
    contextId: 'asistente',
    name: 'Asistente IA',
    promise: 'Pregúntale a tu negocio',
    outcomes: [
      'Pregunta en español a tus datos. Responde en segundos.',
      'Stock, ventas, costes, reservas, albaranes — todo conectado.',
      'Detecta lo que se te escapa antes de que sea un problema.',
    ],
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
    price: { from: '1.500€', maintenance: '150€/mes' },
    ctaLabel: 'Hazle una pregunta a un negocio real',
    cases: [
      { logo: 'baktun13', tag: 'Baktun 13', sector: 'Gimnasio', quote: 'App de gestión con IA en 3 semanas.' },
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
              fontSize: '0.92rem',
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
              fontSize: '0.6rem',
              color: 'rgba(26,24,20,0.5)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              margin: '3px 0 0',
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

/* ──────────────────── PRODUCT CARD ──────────────────── */

function ProductCard({ product, isMobile, onChatOpen, highlighted }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      id={`producto-${product.num}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FEFCF7',
        border: `1px solid ${
          highlighted ? 'rgba(114,9,183,0.4)' : 'rgba(26,24,20,0.06)'
        }`,
        borderRadius: 24,
        padding: isMobile ? '1.75rem' : '2.75rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '0.95fr 1.05fr',
        gap: isMobile ? '1.5rem' : '3rem',
        position: 'relative',
        transform: hovered && !isMobile ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered && !isMobile
          ? 'inset 0 1px 0 rgba(255,255,255,0.85), 0 18px 44px -24px rgba(26,24,20,0.18), 0 2px 0 rgba(26,24,20,0.02)'
          : 'inset 0 1px 0 rgba(255,255,255,0.85), 0 10px 28px -22px rgba(26,24,20,0.12), 0 1px 0 rgba(26,24,20,0.02)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s, border-color 0.3s',
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

      {/* VIDEO */}
      <div style={{ order: isMobile ? 1 : 0, alignSelf: 'flex-start' }}>
        <LazyVideoColumn component={product.component} />
      </div>

      {/* CONTENT */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.4rem',
          order: isMobile ? 2 : 0,
          minWidth: 0,
        }}
      >
        {/* Header: num + name + promise (Option C) */}
        <header style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <span
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: 'clamp(2.2rem, 4.5vw, 2.8rem)',
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 0.9,
              flexShrink: 0,
              letterSpacing: '0.02em',
            }}
          >
            {product.num}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingTop: 6, minWidth: 0 }}>
            <h3
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(1.5rem, 3vw, 1.95rem)',
                color: '#1A1814',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: '0.88rem',
                color: 'rgba(26,24,20,0.58)',
                margin: 0,
                letterSpacing: '-0.005em',
              }}
            >
              {product.promise}
            </p>
          </div>
        </header>

        {/* Outcome principal — solo el más impactante en estado colapsado */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem',
          }}
        >
          <li
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: '0.92rem',
              color: '#1A1814',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                marginTop: 11,
                width: 16,
                height: 1,
                background: 'rgba(26,24,20,0.45)',
                flexShrink: 0,
              }}
            />
            <span>{product.outcomes[0]}</span>
          </li>
        </ul>

        {/* Acordeón "ver todo lo que incluye" */}
        <div>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'rgba(26,24,20,0.55)',
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '0.95rem',
              cursor: 'pointer',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(26,24,20,0.85)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(26,24,20,0.55)')}
          >
            {expanded ? <Minus size={12} /> : <Plus size={12} />}
            {expanded ? 'Ocultar detalle' : 'Ver todo lo que incluye'}
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
                    gap: '1.4rem',
                    paddingTop: '1.4rem',
                    marginTop: '0.4rem',
                    borderTop: '1px solid rgba(26,24,20,0.06)',
                  }}
                >
                  {/* Outcomes restantes (2 y 3) */}
                  {product.outcomes.length > 1 && (
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.7rem',
                      }}
                    >
                      {product.outcomes.slice(1).map((o, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            gap: 14,
                            alignItems: 'flex-start',
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: '0.92rem',
                            color: '#1A1814',
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              marginTop: 11,
                              width: 16,
                              height: 1,
                              background: 'rgba(26,24,20,0.45)',
                              flexShrink: 0,
                            }}
                          />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Bullets detallados */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '0.5rem 1.5rem',
                    }}
                  >
                    {product.bullets.map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            background: 'rgba(26,24,20,0.4)',
                            marginTop: 8,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: '0.82rem',
                            color: 'rgba(26,24,20,0.65)',
                            lineHeight: 1.55,
                          }}
                        >
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Mantenimiento + risk pills */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <span
                      style={{
                        fontFamily: "'Syne Mono', monospace",
                        fontSize: '0.78rem',
                        color: 'rgba(26,24,20,0.55)',
                      }}
                    >
                      + mantenimiento desde {product.price.maintenance}
                    </span>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                      {[
                        { Icon: ShieldCheck, label: 'RGPD compliant' },
                        { Icon: FileText,    label: 'NDA disponible' },
                        { Icon: LockKey,     label: 'Datos en tu infra' },
                      ].map(({ Icon, label }) => (
                        <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <Icon size={12} weight="regular" style={{ color: '#22C55E', flexShrink: 0 }} />
                          <span
                            style={{
                              fontFamily: "'Syne Mono', monospace",
                              fontSize: '0.65rem',
                              color: 'rgba(26,24,20,0.55)',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {label}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social proof — rotating for 01, static for 02/03 */}
                  <CasesStrip cases={product.cases} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PRICE — minimalista: solo "Desde X€" */}
        <div>
          <p
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.62rem',
              color: 'rgba(26,24,20,0.5)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              margin: '0 0 4px',
            }}
          >
            Desde
          </p>
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              color: '#1A1814',
              lineHeight: 1,
            }}
          >
            {product.price.from}
          </span>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto', paddingTop: '0.25rem' }}>
          <CtaButton
            onClick={() => onChatOpen(product.contextId)}
            variant="solid"
            arrow="right"
            size="md"
          >
            {product.ctaLabel}
          </CtaButton>
        </div>
      </div>
    </motion.article>
  )
}

/* ──────────────────── MICRO-QUIZ (P0.3.B) ──────────────────── */

const QUIZ = [
  { q: '¿Atender mensajes, llamadas o emails te consume horas cada día?', product: 0 },
  { q: '¿Tu equipo pierde tiempo en tareas repetitivas (emails, facturas, informes)?', product: 1 },
  { q: '¿Te cuesta saber qué pasa en tu negocio sin pedir reportes?', product: 2 },
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
        padding: isMobile ? '1.5rem 1.25rem' : '1.75rem 2rem',
        background: '#FEFCF7',
        border: '1px solid rgba(26,24,20,0.06)',
        borderRadius: 18,
        marginBottom: '2.5rem',
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
            fontSize: '0.65rem',
            color: 'rgba(26,24,20,0.55)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          ¿Cuál necesitas? · {step + 1}/{QUIZ.length}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {QUIZ.map((_, i) => (
            <span
              key={i}
              style={{
                width: 20,
                height: 2,
                background: i <= step ? GRADIENT : 'rgba(26,24,20,0.1)',
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
              fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
              color: '#1A1814',
              margin: '0 0 1rem',
              lineHeight: 1.3,
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
                  height: 46,
                  border: '1px solid rgba(26,24,20,0.12)',
                  background: '#FAF8F3',
                  borderRadius: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.95rem',
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

function QuizResult({ recommendedIdx, onReset }) {
  const rec = recommendedIdx >= 0 ? PRODUCTS[recommendedIdx] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '1rem 1.5rem',
        background: '#FEFCF7',
        border: '1px solid rgba(26,24,20,0.06)',
        borderRadius: 18,
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        flexWrap: 'wrap',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.85), 0 10px 28px -22px rgba(26,24,20,0.12), 0 1px 0 rgba(26,24,20,0.02)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.72rem',
          color: 'rgba(26,24,20,0.7)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {rec
          ? <>Tu sistema más probable →{' '}
              <a
                href={`#producto-${rec.num}`}
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textDecoration: 'none',
                }}
              >
                {rec.name}
              </a>
            </>
          : 'Mira los tres — cualquiera puede encajar.'}
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
              fontSize: '0.7rem',
              color: 'rgba(26,24,20,0.55)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: '0 0 0.55rem',
            }}
          >
            ¿Tu caso no encaja en los tres?
          </p>
          <h3
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              color: '#1A1814',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Casi seguro encaja en una conversación de 15 minutos.
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
                padding: '6px 12px',
                fontFamily: "'Syne Mono', monospace",
                fontSize: '0.68rem',
                color: 'rgba(26,24,20,0.72)',
              }}
            >
              <Icon size={12} weight="light" style={{ opacity: 0.7 }} />
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
            onClick={() => onChatOpen('tier2_other')}
            variant="solid"
            arrow="right"
            size="md"
          >
            Reservar 15 minutos
          </CtaButton>
          <span
            style={{
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.7rem',
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

export default function Products({ onChatOpen }) {
  const isMobile = useIsMobile()
  // null = quiz pendiente; -1 = sin recomendación; 0/1/2 = índice recomendado
  const [recommendedIdx, setRecommendedIdx] = useState(null)

  const handleQuizResult = (idx) => {
    setRecommendedIdx(idx)
    if (idx >= 0) {
      // Esperar a que el QuizResult reemplace al ProductsQuiz (evita salto
      // de layout) y luego scroll RAF muy lento y cinematográfico.
      setTimeout(() => {
        const el = document.getElementById(`producto-${PRODUCTS[idx].num}`)
        if (!el) return
        const navOffset = 96 // ~scrollMarginTop de las cards
        const targetY = window.scrollY + el.getBoundingClientRect().top - navOffset
        const startY = window.scrollY
        const dist = targetY - startY
        if (Math.abs(dist) < 2) return
        // Duración proporcional a la distancia, con techo: viajes largos
        // duran más sin volverse infinitos.
        const duration = Math.min(2600, Math.max(1400, Math.abs(dist) * 1.6))
        const t0 = performance.now()
        // ease-in-out-quint — entrada y salida muy suaves
        const ease = (t) =>
          t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
        const step = (now) => {
          const t = Math.min(1, (now - t0) / duration)
          window.scrollTo(0, startY + dist * ease(t))
          if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }, 500)
    }
  }

  return (
    <AuroraBackground variant="light">
      <section
        id="lo-que-hacemos"
        style={{ padding: isMobile ? '4.5rem 1.25rem' : '6rem 2rem' }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* HEADER */}
          <div
            style={{
              textAlign: isMobile ? 'center' : 'left',
              marginBottom: '3.25rem',
            }}
          >
            <div style={{ marginBottom: '0.85rem' }}>
              <Eyebrow variant="pill" tone="dark">
                Lo que ya funciona en otros negocios
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
              Tres sistemas. Un objetivo:
              <em
                style={{
                  fontStyle: 'italic',
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {' '}que tu negocio funcione solo.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '1rem',
                color: 'rgba(26,24,20,0.65)',
                lineHeight: 1.55,
                margin: 0,
                maxWidth: 560,
                marginLeft: isMobile ? 'auto' : 0,
                marginRight: isMobile ? 'auto' : 0,
              }}
            >
              Elige el que más te aprieta hoy. Operativo en 2 o 3 semanas.
            </p>
          </div>

          {/* QUIZ */}
          {recommendedIdx === null ? (
            <ProductsQuiz onResult={handleQuizResult} isMobile={isMobile} />
          ) : (
            <QuizResult
              recommendedIdx={recommendedIdx}
              onReset={() => setRecommendedIdx(null)}
            />
          )}

          {/* PRODUCT CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {PRODUCTS.map((product, i) => (
              <ProductCard
                key={product.num}
                product={product}
                isMobile={isMobile}
                onChatOpen={onChatOpen}
                highlighted={recommendedIdx === i}
              />
            ))}
          </div>

          {/* TIER 2 */}
          <Tier2Block onChatOpen={onChatOpen} isMobile={isMobile} />
        </div>
      </section>
    </AuroraBackground>
  )
}
