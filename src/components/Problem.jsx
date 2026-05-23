import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@remotion/player'
import AuroraBackground from './AuroraBackground'
import useIsMobile from '../hooks/useIsMobile'
import Problem1_Clock from '../remotion/Problem1_Clock'
import Problem2_Calls from '../remotion/Problem2_Calls'
import Problem3_Flow from '../remotion/Problem3_Flow'
import Problem4_Data from '../remotion/Problem4_Data'

const GRADIENT = 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)'

const COMP_W = 600
const COMP_H = 340

const problems = [
  {
    num: '01',
    title: 'Son las 23:47.',
    body: 'Un cliente quiere reservar.\nNadie responde.\nCierra la pestaña.\n\nMañana lo hará en otro sitio.\nTú no lo sabrás nunca.',
    component: Problem1_Clock,
  },
  {
    num: '02',
    title: 'Siempre hay alguien al teléfono.',
    body: 'Respondiendo lo mismo.\nHorarios. Precios. Disponibilidad.\n\nTiempo de tu equipo\nque no vuelve.',
    component: Problem2_Calls,
  },
  {
    num: '03',
    title: 'Lo sabes solo tú.',
    body: 'Los contactos. Los proveedores.\nLas contraseñas. Las excepciones.\n\nSi te pasa algo,\nse para todo.',
    component: Problem3_Flow,
  },
  {
    num: '04',
    title: 'Los datos están ahí.',
    body: 'Sabes que tienen respuestas.\nPero nadie tiene tiempo de buscarlas.\n\nAsí que nadie decide\ncon información real.',
    component: Problem4_Data,
  },
]

function LazyVideoColumn({ component }) {
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

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        minHeight: 360,
        overflow: 'hidden',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0A0A0C',
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
  )
}

function ProblemRow({ p, isMobile }) {
  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        justifyContent: 'center',
        paddingRight: isMobile ? 0 : '2rem',
      }}
    >
      <span
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '1rem',
          background: GRADIENT,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.08em',
        }}
      >
        {p.num}
      </span>
      <h3
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          color: '#fff',
          lineHeight: 1.15,
          margin: 0,
        }}
      >
        {p.title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: 'pre-line',
        }}
      >
        {p.body}
      </p>
    </motion.div>
  )

  const videoBlock = (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <LazyVideoColumn component={p.component} />
    </motion.div>
  )

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '1.5rem' : '3rem',
        alignItems: 'center',
      }}
    >
      {isMobile ? (
        <>
          {videoBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {videoBlock}
        </>
      )}
    </div>
  )
}

export default function Problem() {
  const isMobile = useIsMobile()

  return (
    <AuroraBackground id="servicios" style={{ padding: isMobile ? '4rem 1.25rem' : '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: isMobile ? '3rem' : '4.5rem', textAlign: isMobile ? 'center' : 'left' }}
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
            — El coste invisible
          </span>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            <span style={{ color: '#fff', display: 'block' }}>Tu negocio funciona.</span>
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
              Pero funciona gracias a ti.
            </em>
            <span
              style={{
                color: '#fff',
                display: 'block',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                marginTop: '0.35rem',
              }}
            >
              Y eso tiene un precio.
            </span>
          </h2>
        </motion.div>

        {/* Problems */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '3.5rem' : '5rem',
          }}
        >
          {problems.map((p, i) => (
            <ProblemRow key={i} p={p} isMobile={isMobile} />
          ))}
        </div>

        {/* Remate */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'rgba(255,255,255,0.55)',
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            No es falta de esfuerzo.
            <br />
            Nunca lo fue.
            <br />
            Es falta de sistema.
          </p>
        </motion.div>

      </div>
    </AuroraBackground>
  )
}
