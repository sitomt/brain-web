import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CometCard from './CometCard'
import useIsMobile from '../hooks/useIsMobile'

const GRADIENT = 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)'

const problems = [
  {
    num: '01',
    title: 'Son las 23:47.',
    desc: 'Un cliente intenta reservar. Nadie responde.\nCierra la pestaña. Mañana lo hará en otro sitio.\nTú no lo sabrás nunca.',
  },
  {
    num: '02',
    title: 'Siempre hay alguien al teléfono.',
    desc: 'Respondiendo lo mismo. Una y otra vez.\nHorarios, precios, disponibilidad.\nTiempo de tu equipo que no vuelve.',
  },
  {
    num: '03',
    title: 'Todo depende de alguien.',
    desc: 'Si falla esa persona, falla el proceso.\nTu negocio es tan sólido como el eslabón\nmás débil de tu equipo.',
  },
  {
    num: '04',
    title: 'Los datos están ahí.',
    desc: 'Sabes que tienes respuestas en tus números.\nPero nadie tiene tiempo de buscarlas.\nAsí que nadie decide con información real.',
  },
]

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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <CometCard
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: isMobile ? '1.5rem' : '2rem',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne Mono', monospace",
                    fontSize: '0.75rem',
                    background: GRADIENT,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '1rem',
                  }}
                >
                  {p.num}
                </div>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: '1.3rem',
                    color: '#fff',
                    marginBottom: '0.75rem',
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.88rem',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.75,
                    whiteSpace: 'pre-line',
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </CometCard>
            </motion.div>
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
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              marginTop: '0.75rem',
              fontFamily: "'Syne Mono', monospace",
              fontSize: '0.75rem',
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'inline-block',
              letterSpacing: '0.04em',
            }}
          >
            Para eso estamos nosotros. →
          </button>
        </motion.div>

      </div>
    </AuroraBackground>
  )
}
