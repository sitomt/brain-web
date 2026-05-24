import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@remotion/player'
import AuroraBackground from './AuroraBackground'
import Eyebrow from './Eyebrow'
import useIsMobile from '../hooks/useIsMobile'
import Problem1_Clock from '../remotion/Problem1_Clock'
import Problem2_Calls from '../remotion/Problem2_Calls'
import Problem3_Flow from '../remotion/Problem3_Flow'
import Problem4_Data from '../remotion/Problem4_Data'
import { EASE_PREMIUM } from '../lib/motion'

const GRADIENT = 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)'

const COMP_W = 600
const COMP_H = 340

const problems = [
  {
    num: '01',
    figure: '23%',
    figureLabel: 'de las consultas llegan fuera de horario',
    title: 'Reservas que se van en silencio.',
    body: 'Son las 23:47. Un cliente quiere reservar.\nNadie responde. Cierra la pestaña.',
    realCost: 'Mañana lo hará en otro sitio. Tú nunca lo sabrás.',
    component: Problem1_Clock,
    accent: 'rgba(67,97,238,0.18)',
  },
  {
    num: '02',
    figure: '11h',
    figureLabel: 'a la semana respondiendo lo mismo',
    title: 'Tiempo que no vuelve.',
    body: 'Horarios. Precios. Disponibilidad.\nLa misma conversación, repetida cada día.',
    realCost: 'No es trabajo. Es desgaste que tu equipo nunca recupera.',
    component: Problem2_Calls,
    accent: 'rgba(114,9,183,0.18)',
  },
  {
    num: '03',
    figure: '0%',
    figureLabel: 'de tus datos se convierten en decisiones',
    title: 'Sabes que las respuestas están ahí.',
    body: 'Ventas, clientes, márgenes, repetición.\nNadie tiene tiempo de mirarlo.',
    realCost: 'Decides por intuición lo que podrías decidir con evidencia.',
    component: Problem4_Data,
    accent: 'rgba(251,86,7,0.18)',
  },
  {
    num: '04',
    figure: '1',
    figureLabel: 'persona sabe cómo funciona todo. Tú.',
    title: 'Si te pasa algo, se para todo.',
    body: 'Los contactos, los proveedores, las contraseñas, las excepciones.\nTodo vive dentro de tu cabeza.',
    realCost: 'No tienes un negocio. Tienes un trabajo que no te puedes permitir dejar.',
    component: Problem3_Flow,
    accent: 'rgba(247,37,133,0.22)',
    highlight: true,
  },
]

function LazyVideoColumn({ component, compact = false }) {
  const [isVisible, setIsVisible] = useState(false)
  const [coverScale, setCoverScale] = useState(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
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
          setIsVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)

    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const showPlayer = isVisible && coverScale !== null
  const minH = compact ? 260 : 360

  const innerStyle = {
    position: 'relative',
    minHeight: minH,
    overflow: 'hidden',
    borderRadius: 19,
    border: '1px solid rgba(255,255,255,0.08)',
    background: '#0A0A0C',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
  }

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 24,
        padding: 5,
      }}
    >
      <div ref={wrapRef} style={innerStyle}>
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
              durationInFrames={270}
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
          <div style={{ position: 'absolute', inset: 0, background: '#0A0A0C' }} />
        )}
      </div>
    </div>
  )
}

function Figure({ value, label, size = 'lg', highlight = false }) {
  const fontSize =
    size === 'xl'
      ? 'clamp(8rem, 22vw, 18rem)'
      : size === 'lg+'
        ? 'clamp(6rem, 14vw, 13rem)'
        : 'clamp(5rem, 12vw, 11rem)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize,
          lineHeight: 0.9,
          color: highlight ? 'transparent' : '#fff',
          background: highlight ? GRADIENT : 'none',
          WebkitBackgroundClip: highlight ? 'text' : 'initial',
          WebkitTextFillColor: highlight ? 'transparent' : '#fff',
          backgroundClip: highlight ? 'text' : 'initial',
          letterSpacing: '-0.04em',
          fontStyle: 'italic',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: '0.92rem',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.01em',
          maxWidth: 360,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function Title({ children, size = 'md' }) {
  const fontSize =
    size === 'lg'
      ? 'clamp(2.4rem, 4.5vw, 3.6rem)'
      : 'clamp(1.6rem, 2.6vw, 2.2rem)'
  return (
    <h3
      style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize,
        color: '#fff',
        lineHeight: 1.15,
        margin: 0,
      }}
    >
      {children}
    </h3>
  )
}

function Body({ children }) {
  return (
    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        fontSize: '1.02rem',
        color: 'rgba(255,255,255,0.78)',
        lineHeight: 1.65,
        margin: 0,
        whiteSpace: 'pre-line',
      }}
    >
      {children}
    </p>
  )
}

function RealCost({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        paddingTop: '0.85rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.66rem',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          paddingTop: 4,
          whiteSpace: 'nowrap',
        }}
      >
        El coste real
      </span>
      <span
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.5,
        }}
      >
        {children}
      </span>
    </div>
  )
}

function ProblemBlock({ p, layout, isMobile }) {
  // layout: 'text-video' | 'video-text-stack' | 'hero' | 'video-text'
  const blockReveal = {
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.85, ease: EASE_PREMIUM },
  }

  // HERO layout — problem 04, no video, big cifra + statement
  if (layout === 'hero') {
    return (
      <motion.div
        {...blockReveal}
        style={{
          position: 'relative',
          borderRadius: isMobile ? 22 : 28,
          padding: isMobile ? '2.25rem 1.5rem' : '3.5rem 3rem',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `0 0 0 1px ${p.accent} inset, 0 30px 80px -40px ${p.accent}`,
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(120% 80% at 80% 20%, ${p.accent}, transparent 60%)`,
            opacity: 0.9,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: isMobile ? 'flex-start' : 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <Eyebrow variant="pill" tone="light">Punto crítico</Eyebrow>
            <Figure value={p.figure} label={p.figureLabel} size="xl" highlight />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Title size="lg">{p.title}</Title>
            <Body>{p.body}</Body>
            <RealCost>{p.realCost}</RealCost>
          </div>
        </div>
      </motion.div>
    )
  }

  // Default — text+video grid
  const textBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Figure value={p.figure} label={p.figureLabel} size="lg" />
      <Title>{p.title}</Title>
      <Body>{p.body}</Body>
      <RealCost>{p.realCost}</RealCost>
    </div>
  )

  const videoBlock = <LazyVideoColumn component={p.component} compact />

  const reversed = layout === 'video-text'

  if (isMobile) {
    return (
      <motion.div
        {...blockReveal}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
      >
        {videoBlock}
        {textBlock}
      </motion.div>
    )
  }

  return (
    <motion.div
      {...blockReveal}
      style={{
        display: 'grid',
        gridTemplateColumns: reversed ? '0.95fr 1.05fr' : '1.05fr 0.95fr',
        gap: reversed ? '4.5rem' : '3rem',
        alignItems: reversed ? 'center' : 'start',
      }}
    >
      {reversed ? videoBlock : textBlock}
      {reversed ? textBlock : videoBlock}
    </motion.div>
  )
}

function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.06,
        mixBlendMode: 'overlay',
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: '160px 160px',
      }}
    />
  )
}

export default function Problem() {
  const isMobile = useIsMobile()

  // Asymmetric layout map — breaks pattern fatigue, peak at block 03.
  const layouts = ['text-video', 'video-text', 'text-video', 'hero']

  return (
    <AuroraBackground
      id="servicios"
      style={{
        padding: isMobile ? '3rem 1.25rem' : '4.5rem 2rem',
        position: 'relative',
      }}
    >
      <GrainOverlay />
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>

        {/* Header — diagnóstico, no observación */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{
            marginBottom: isMobile ? '3.5rem' : '5.5rem',
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: 920,
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <Eyebrow variant="pill" tone="light">El coste invisible</Eyebrow>
          </div>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            <span style={{ color: '#fff', display: 'block' }}>
              Mientras lees esto,
            </span>
            <em
              style={{
                fontStyle: 'italic',
                display: 'block',
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              tu negocio está perdiendo dinero.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              margin: isMobile ? '1.5rem auto 0' : '1.75rem 0 0',
              maxWidth: 620,
            }}
          >
            No por mala gestión.
            <br />
            Por procesos invisibles que nadie ha medido nunca.
          </p>
        </motion.div>

        {/* Problems — ritmo asimétrico */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '4rem' : '6.5rem',
          }}
        >
          {problems.map((p, i) => (
            <div key={i}>
              <ProblemBlock p={p} layout={layouts[i]} isMobile={isMobile} />

              {/* Micro-commitment después del problema 03 — antesala al más duro */}
              {i === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.2 }}
                  style={{
                    marginTop: isMobile ? '3rem' : '7rem',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
                      color: 'rgba(255,255,255,0.62)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    ¿Reconoces alguno hasta aquí?
                    <br />
                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                      El siguiente es el que de verdad duele.
                    </span>
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Remate — puente al siguiente bloque */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
          style={{
            marginTop: isMobile ? '5rem' : '7rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <Eyebrow variant="pill" tone="light">Lo que sigue</Eyebrow>

          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
              color: '#fff',
              margin: 0,
              lineHeight: 1.25,
              maxWidth: 760,
            }}
          >
            No necesitas trabajar más.
            <br />
            <em
              style={{
                fontStyle: 'italic',
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Necesitas que el trabajo no dependa de ti.
            </em>
          </p>

          <a
            href="#lo-que-hacemos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '0.85rem 1.5rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.92)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              textDecoration: 'none',
              transition: 'background 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
            }}
          >
            Ver cómo lo resolvemos
            <span aria-hidden style={{ fontSize: '1.1rem', lineHeight: 1 }}>↓</span>
          </a>
        </motion.div>

      </div>
    </AuroraBackground>
  )
}
