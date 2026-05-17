import { motion } from 'framer-motion'
import CtaFinal from '../components/CtaFinal'
import useIsMobile from '../hooks/useIsMobile'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const G_TEXT = {
  background: GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

/* Business proof tags */
const NEGOCIOS = [
  { icon: '🎰', label: 'Salones de juego' },
  { icon: '🍺', label: 'Hostelería' },
  { icon: '💪', label: 'Fitness' },
  { icon: '⚙️', label: 'Servicios' },
  { icon: '📈', label: 'Inversiones' },
]

/* Three relief points */
const ALIVIO = [
  'Tu negocio funciona aunque tú no estés.',
  'Los procesos no dependen de si alguien tiene un mal día.',
  'Tu cabeza, libre para lo que realmente importa.',
]

/* Guarantees */
const GARANTIAS = [
  'Te decimos qué haríamos en tu negocio.',
  'Sin promesas vacías.',
  'Sin sorpresas en el precio.',
]

/* Divider */
function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
      }}
    />
  )
}

/* Syne Mono label */
function Label({ children }) {
  return (
    <p
      style={{
        fontFamily: "'Syne Mono', monospace",
        fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        margin: '0 0 1.25rem',
      }}
    >
      {children}
    </p>
  )
}

function PhotoPlaceholder() {
  return (
    <div
      style={{
        aspectRatio: '3/4',
        maxWidth: 380,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'linear-gradient(180deg, rgba(67,97,238,0.15) 0%, rgba(247,37,133,0.1) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.2 }}>
        <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="1.5" />
        <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.08em',
          textAlign: 'center',
          padding: '0 1rem',
        }}
      >
        Foto de Sito — próximamente
      </span>
    </div>
  )
}

/* To replace placeholder with real photo:
   <img src="/sito.jpg" alt="Sito, fundador de BrAIn"
     style={{ width:'100%', height:'100%', objectFit:'cover',
       borderRadius:16, border:'1px solid rgba(255,255,255,0.1)' }} />
*/

export default function Nosotros({ onChatOpen }) {
  const isMobile = useIsMobile()
  const px = isMobile ? '1.25rem' : '2rem'
  const sectionPy = isMobile ? '4rem' : '5.5rem'

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ padding: isMobile ? `6rem ${px} 4rem` : `8rem ${px} 5rem` }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '3rem' : '5rem',
            alignItems: 'center',
          }}
        >
          <motion.div {...fade(0)}>
            <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.7rem', ...G_TEXT, letterSpacing: '0.1em', display: 'block', marginBottom: '1.5rem' }}>
              — Nosotros
            </span>
            <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(2.5rem,4vw,3.5rem)', color: '#fff', lineHeight: 1.1, margin: 0 }}>
              Somos <em style={{ fontStyle: 'italic' }}>empresarios.</em>
              <br />Por eso sabemos
              <br />lo que necesitas.
            </h1>
          </motion.div>

          <motion.div {...fade(0.12)} style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end' }}>
            <PhotoPlaceholder />
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ background: '#0D0D10', padding: `${sectionPy} ${px}` }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>

          {/* Pull quote — anchor emocional */}
          <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: isMobile ? '4rem' : '5rem' }}>
            <p
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.5rem,3vw,2.2rem)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              "Antes de automatizar tu negocio,
              <br />
              automatizamos el nuestro."
            </p>
          </motion.div>

          <Divider />

          {/* ── BLOQUE 1: Por qué existe BrAIn ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0' : '4rem 0' }}>
            <Label>Por qué existe BrAIn</Label>

            {/* Dos párrafos cortos con acento izquierdo */}
            <div
              style={{
                borderLeft: '2px solid rgba(247,37,133,0.4)',
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>
                BrAIn nació de una frustración concreta. La de ver cómo los negocios
                —buenos negocios, con buen producto y buen equipo— pierden tiempo,
                dinero y energía en cosas que <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>no deberían depender de personas</strong>.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.92rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                Reservas que nadie contesta. Procesos que se rompen cuando alguien falla.
                Datos que nadie consulta porque llevaría demasiado tiempo.
              </p>
            </div>

            {/* Callout — la frase que conecta */}
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: isMobile ? '1.25rem' : '1.5rem 1.75rem',
              }}
            >
              <p
                style={{
                  fontFamily: "'Instrument Serif',serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem,2vw,1.3rem)',
                  color: 'rgba(255,255,255,0.85)',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                Conocemos esa sensación porque la hemos vivido.
              </p>
            </div>
          </motion.div>

          <Divider />

          {/* ── BLOQUE 2: Quién hay detrás — prueba social visual ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0' : '4rem 0' }}>
            <Label>Quién hay detrás</Label>

            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: '0 0 2rem' }}>
              Antes de construir soluciones de IA para otros, las construimos para nosotros mismos.
            </p>

            {/* Business proof grid */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2rem' }}>
              {NEGOCIOS.map(({ icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 999,
                    padding: '8px 16px',
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 300,
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Insight */}
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>
              Cuando vimos los resultados, entendimos que{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                esto no podía quedarse solo para nosotros.
              </strong>
            </p>
          </motion.div>

          <Divider />

          {/* ── BLOQUE 3: Cómo trabajamos — gran cita + puntos ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0' : '4rem 0' }}>
            <Label>Cómo trabajamos</Label>

            {/* La frase más poderosa: patrón interrumpido, grande */}
            <div style={{ marginBottom: '2.5rem' }}>
              <p
                style={{
                  fontFamily: "'Instrument Serif',serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.6rem,3.5vw,2.4rem)',
                  color: '#fff',
                  lineHeight: 1.2,
                  margin: '0 0 0.25rem',
                }}
              >
                No vendemos tecnología.
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Serif',serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.6rem,3.5vw,2.4rem)',
                  lineHeight: 1.2,
                  margin: 0,
                  ...G_TEXT,
                }}
              >
                Vendemos alivio.
              </p>
            </div>

            {/* Qué significa ese alivio — 3 puntos escaneables */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {ALIVIO.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: GRADIENT,
                      marginTop: '0.55rem',
                    }}
                  />
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* ── BLOQUE 4: Cómo empezamos — tarjeta de baja fricción ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0 1rem' : '4rem 0 1rem' }}>
            <Label>El primer paso</Label>

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                overflow: 'hidden',
              }}
            >
              {/* Gradient top line */}
              <div style={{ height: 2, background: GRADIENT }} />

              <div style={{ padding: isMobile ? '1.75rem 1.25rem' : '2.5rem' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '1.75rem' : '3rem',
                    alignItems: 'center',
                  }}
                >
                  {/* Left — tiempo */}
                  <div>
                    <p
                      style={{
                        fontFamily: "'Syne Mono',monospace",
                        fontSize: 'clamp(3rem,7vw,4.5rem)',
                        color: '#fff',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        margin: '0 0 0.5rem',
                      }}
                    >
                      30<span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>min.</span>
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>
                      Primera reunión gratuita.<br />Sin compromiso.
                    </p>
                  </div>

                  {/* Right — garantías */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {GARANTIAS.map((g, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                          <circle cx="8" cy="8" r="7.25" stroke="rgba(67,97,238,0.4)" strokeWidth="1.5" />
                          <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>
                          {g}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── CTA ── */}
      <CtaFinal onChatOpen={onChatOpen} />

      {/* ── Footer simple ── */}
      <footer style={{ background: '#0A0A0C', padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
          br<span style={G_TEXT}>[AI]</span>n · Murcia, España · 2025
        </span>
      </footer>

    </div>
  )
}
