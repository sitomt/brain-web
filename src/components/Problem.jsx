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
    desc: 'Un cliente intenta reservar. Nadie responde.\nCierra la pestaña. Mañana lo hará en otro sitio.\nTú no lo sabrás nunca.',
    component: Problem1_Clock,
  },
  {
    num: '02',
    title: 'Siempre hay alguien al teléfono.',
    desc: 'Respondiendo lo mismo. Una y otra vez.\nHorarios, precios, disponibilidad.\nTiempo de tu equipo que no vuelve.',
    component: Problem2_Calls,
  },
  {
    num: '03',
    title: 'Todo depende de alguien.',
    desc: 'Si falla esa persona, falla el proceso.\nTu negocio es tan sólido como el eslabón\nmás débil de tu equipo.',
    component: Problem3_Flow,
  },
  {
    num: '04',
    title: 'Los datos están ahí.',
    desc: 'Sabes que tienes respuestas en tus números.\nPero nadie tiene tiempo de buscarlas.\nAsí que nadie decide con información real.',
    component: Problem4_Data,
  },
]

/* ---- Lazy video that fills the card with cover scaling ---- */
function LazyProblemVideo({ component }) {
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
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
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

/* ---- Card: video fills everything, only the number floats on top ---- */
function ProblemCard({ p, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        minHeight: 320,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Layer 1 — video fills entire card */}
      <LazyProblemVideo component={p.component} />

      {/* Layer 2 — number label only */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 20,
          zIndex: 2,
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.7rem',
          background: GRADIENT,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.06em',
        }}
      >
        {p.num}
      </div>
    </motion.div>
  )
}

/* ---- Section ---- */
export default function Problem() {
  const isMobile = useIsMobile()

  return (
    <AuroraBackground id="servicios" style={{ padding: isMobile ? '4rem 1.25rem' : '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* ── Header ── */}
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
            — El problema
          </span>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            <span style={{ color: '#fff', display: 'block' }}>
              Tu negocio funciona.
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
              Imagina que funcionara solo.
            </em>
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1rem',
          }}
        >
          {problems.map((p, i) => (
            <ProblemCard key={i} p={p} index={i} />
          ))}
        </div>

        {/* ── Remate ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '3rem', textAlign: 'center' }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.55)',
              margin: 0,
            }}
          >
            No es falta de esfuerzo. Es falta de sistema.
          </p>
        </motion.div>

      </div>
    </AuroraBackground>
  )
}
