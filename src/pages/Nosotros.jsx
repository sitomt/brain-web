import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import CtaFinal from '../components/CtaFinal'
import AuroraBackground from '../components/AuroraBackground'
import SpotlightCard from '../components/SpotlightCard'
import WipeReveal from '../components/WipeReveal'
import { ArrowLeft } from '../components/icons/ArrowIcon'
import useIsMobile from '../hooks/useIsMobile'
import { ACCENT, BRAND, gradientText } from '../lib/tokens'
import { FOUNDERS } from '../lib/founders'
import { SITE_URL } from '../lib/site'

const GRADIENT = BRAND.gradient
const G_TEXT = gradientText

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

/* ── Iconos de sector — línea monocroma, stroke uniforme (más premium que emoji) ── */
function SectorIcon({ name }) {
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'juego': // salones de juego — dado
      return (
        <svg {...p}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" /></svg>
      )
    case 'fitness': // gimnasios — mancuerna
      return (
        <svg {...p}><path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" /></svg>
      )
    case 'hosteleria': // bares — vaso
      return (
        <svg {...p}><path d="M7 4h10l-1.4 15.2a1 1 0 0 1-1 .8H9.4a1 1 0 0 1-1-.8L7 4Z" /><path d="M7.4 8.5h9.2" /></svg>
      )
    case 'solar': // placas solares — sol
      return (
        <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4" /></svg>
      )
    case 'inversion': // inversión — tendencia al alza
      return (
        <svg {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" /></svg>
      )
    default:
      return null
  }
}

/* Prueba de operador — sectores reales del grupo */
const NEGOCIOS = [
  { icon: 'juego', label: 'Salones de juego' },
  { icon: 'fitness', label: 'Fitness' },
  { icon: 'hosteleria', label: 'Hostelería' },
  { icon: 'solar', label: 'Placas solares' },
  { icon: 'inversion', label: 'Inversión' },
]

/* Qué significa el alivio */
const ALIVIO = [
  'Tu negocio funciona aunque tú no estés.',
  'Los procesos no dependen de si alguien tiene un mal día.',
  'Tu cabeza, libre para lo que de verdad importa.',
]

/* Garantías de la primera reunión */
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

/* Syne Mono label — h2 semántico con estilo de label, con número opcional (espina narrativa) */
function Label({ children, num }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', margin: '0 0 1.25rem' }}>
      {num && (
        <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.72rem', color: ACCENT, letterSpacing: '0.1em' }}>
          {num}
        </span>
      )}
      <h2
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          margin: 0,
          fontWeight: 400,
        }}
      >
        {children}
      </h2>
    </div>
  )
}

function SitoPhoto() {
  return (
    <div
      style={{
        aspectRatio: '3/4',
        maxWidth: 380,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
      }}
    >
      <img
        src="/sito2.jpg"
        alt="Ginés Munuera, fundador de BrAIn — agencia de IA en Murcia"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />
      {/* Gradient overlay at bottom for text legibility */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to top, rgba(10,10,12,0.85) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.25rem',
        }}
      >
        <p style={{ fontFamily: "'Instrument Serif',serif", fontSize: '1.1rem', color: '#fff', margin: '0 0 0.15rem', lineHeight: 1.1 }}>
          Ginés Munuera
        </p>
        <p style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', margin: 0 }}>
          Fundador · BrAIn
        </p>
      </div>
    </div>
  )
}

const NOSOTROS_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/nosotros`,
      url: `${SITE_URL}/nosotros`,
      name: 'Nosotros · BrAIn — Agencia de IA en Murcia',
      description: 'Somos un grupo de inversores que automatiza sus propios negocios antes de ayudar a otros. Conoce la historia y al equipo detrás de BrAIn, agencia de IA en Murcia.',
      isPartOf: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Nosotros', item: `${SITE_URL}/nosotros` },
        ],
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#ginesmunuera`,
      name: 'Ginés Munuera',
      jobTitle: 'Fundador',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      address: { '@type': 'PostalAddress', addressLocality: 'Murcia', addressCountry: 'ES' },
      knowsAbout: ['Inteligencia Artificial', 'Automatización empresarial', 'Chatbots', 'Agentes IA'],
    },
  ],
}

export default function Nosotros({ onChatOpen }) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const px = isMobile ? '1.25rem' : '2rem'
  const sectionPy = isMobile ? '4rem' : '5.5rem'

  // "Volver": si hay historial interno, regresa al punto exacto donde estaba el
  // visitante en la home; si entró directo a /nosotros, lo lleva a la home.
  const handleBack = () => {
    if (location.key !== 'default') navigate(-1)
    else navigate('/')
  }

  useEffect(() => {
    const prevTitle = document.title
    const descEl = document.querySelector('meta[name="description"]')
    const prevDesc = descEl?.getAttribute('content') ?? ''

    document.title = 'Nosotros · BrAIn | Agencia de IA en Murcia — Quiénes somos'
    descEl?.setAttribute('content', 'Somos un grupo de inversores que automatiza sus propios negocios antes de ayudar a otros. Conoce la historia de BrAIn, agencia de IA en Murcia. Primera reunión gratuita.')

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'nosotros-schema'
    script.textContent = JSON.stringify(NOSOTROS_SCHEMA)
    document.head.appendChild(script)

    return () => {
      document.title = prevTitle
      descEl?.setAttribute('content', prevDesc)
      document.getElementById('nosotros-schema')?.remove()
    }
  }, [])

  return (
    <div style={{ background: '#0A0A0C', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <AuroraBackground variant="dark" style={{ padding: isMobile ? `6.5rem ${px} 4rem` : `9rem ${px} 5rem`, position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '3rem' : '5rem',
            alignItems: 'center',
          }}
        >
          <motion.div {...fade(0)}>
            <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.7rem', color: ACCENT, letterSpacing: '0.1em', display: 'block', marginBottom: '1.5rem' }}>
              — Nosotros
            </span>
            <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(2.5rem,4vw,3.5rem)', color: '#fff', lineHeight: 1.1, margin: 0 }}>
              Somos <em style={{ fontStyle: 'italic' }}>empresarios.</em>
              <br />Por eso sabemos
              <br />lo que necesitas.
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '1.75rem 0 0', maxWidth: '46ch' }}>
              Un grupo de inversores que gestiona negocios reales en varios
              sectores. Lo que automatizamos para ti, lo probamos antes en lo nuestro.
            </p>
          </motion.div>

          <motion.div {...fade(0.12)} style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end' }}>
            <SitoPhoto />
          </motion.div>
        </div>
      </AuroraBackground>

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

          {/* ── 01 · Quiénes somos — autoridad de operador ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0' : '4rem 0' }}>
            <Label num="01">Quiénes somos</Label>

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
                BrAIn no nace de un despacho de programadores. Nace de un grupo de
                inversores que lleva años levantando y dirigiendo empresas en
                sectores <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>muy distintos</strong>.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.92rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                Salones de juego. Gimnasios. Hostelería gestionada con sistema
                —sin que nadie tenga que estar detrás de la barra—. Y una empresa de
                limpieza y mantenimiento de placas solares que ejecuta proyectos por
                toda España.
              </p>
            </div>

            {/* Business proof grid */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '2rem' }}>
              {NEGOCIOS.map(({ icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
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
                  <span style={{ color: 'rgba(255,255,255,0.5)', display: 'inline-flex' }}><SectorIcon name={icon} /></span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>
              Negocios distintos, un mismo problema de fondo:{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                cuando todo depende de personas, nada es estable.
              </strong>
            </p>
          </motion.div>

          <Divider />

          {/* ── 02 · Lo que aprendimos equivocándonos — efecto pratfall ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0' : '4rem 0' }}>
            <Label num="02">Lo que aprendimos equivocándonos</Label>

            <p
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.5rem,3vw,2.1rem)',
                color: '#fff',
                lineHeight: 1.2,
                margin: '0 0 1.5rem',
              }}
            >
              También hemos perdido dinero.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>
                Un restaurante. Una lavandería a domicilio. Proyectos en los que nos
                equivocamos y que terminamos cerrando. No los escondemos, porque nos
                enseñaron lo más valioso que tenemos hoy: decidir con criterio, probar
                antes de escalar y no enamorarnos de una idea, sino de los resultados.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>
                Y hay algo que cuesta admitir: si entonces hubiéramos tenido los
                números delante —en tiempo real, sin esperar al cierre de mes—{' '}
                <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                  habríamos visto las señales a tiempo
                </strong>. Hoy esa tecnología existe. Por eso la construimos.
              </p>
            </div>

            {/* Callout */}
            <SpotlightCard tone="dark" radius={12} padding={isMobile ? '1.25rem' : '1.5rem 1.75rem'}>
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
                Cuando te decimos que algo funciona, es porque ya hemos pagado por aprenderlo.
              </p>
            </SpotlightCard>
          </motion.div>

          <Divider />

          {/* ── 03 · Por qué existe BrAIn — el giro, voz de Ginés ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0' : '4rem 0' }}>
            <Label num="03">Por qué existe BrAIn</Label>

            <div
              style={{
                borderLeft: '2px solid rgba(67,97,238,0.45)',
                paddingLeft: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>
                Soy Ginés. Dentro del grupo, fui yo quien —por interés y por
                pasión— decidió empezar a digitalizarlo todo con inteligencia
                artificial. Empecé por casa: la atención al cliente, las
                operaciones, los datos que nadie llegaba a mirar.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>
                Cuando vi lo que cambiaba, lo saqué fuera. Y lo validamos con
                clientes reales, ajenos al grupo.
              </p>
            </div>

            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>
              Eso es BrAIn:{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                soluciones que ya funcionan en negocios de verdad
              </strong>, no demos de laboratorio.
            </p>
          </motion.div>

          <Divider />

          {/* ── 04 · Cómo trabajamos — gran cita + puntos ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0' : '4rem 0' }}>
            <Label num="04">Cómo trabajamos</Label>

            {/* La frase más poderosa: patrón interrumpido, grande — único momento gradiente */}
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
              <WipeReveal
                display="block"
                style={{
                  fontFamily: "'Instrument Serif',serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.6rem,3.5vw,2.4rem)',
                  lineHeight: 1.2,
                  ...G_TEXT,
                }}
              >
                Resolvemos problemas de negocio.
              </WipeReveal>
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
                      background: ACCENT,
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

          {/* ── Fundadores (suave, sin precio ni urgencia) ── */}
          {FOUNDERS.active && (
            <>
              <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0' : '4rem 0' }}>
                <Label>Por qué llegas en buen momento</Label>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: '0 0 1rem' }}>
                  Estás conociendo BrAIn pronto. Los primeros {FOUNDERS.spotsTotal} negocios
                  que entran con nosotros lo hacen como clientes fundadores: con un{' '}
                  <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                    descuento de hasta el {FOUNDERS.discountLabel}
                  </strong>{' '}
                  por confiar antes que nadie y por construir, juntos, los casos que
                  enseñaremos mañana.
                </p>
                <p style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: 0 }}>
                  Sin contador y sin prisa. Cuando hablemos, te lo contamos con calma.
                </p>
              </motion.div>

              <Divider />
            </>
          )}

          {/* ── El primer paso — tarjeta de baja fricción ── */}
          <motion.div {...fade(0)} style={{ padding: isMobile ? '3.5rem 0 1rem' : '4rem 0 1rem' }}>
            <Label>El primer paso</Label>

            <SpotlightCard tone="dark" radius={20} padding={0}>
              {/* Gradient top line */}
              <div style={{ height: 2, background: GRADIENT, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />

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
            </SpotlightCard>
          </motion.div>

        </div>
      </section>

      {/* ── CTA primario ── */}
      <CtaFinal onChatOpen={onChatOpen} />

      {/* ── Volver — CTA secundario, regresa al punto de la home donde estaba ── */}
      <div style={{ background: '#0A0A0C', padding: `0 ${px} 3rem`, display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0.85rem 1.5rem',
            borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.92)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem',
            letterSpacing: '0.02em', cursor: 'pointer', transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
        >
          <ArrowLeft size={14} />
          Volver
        </button>
      </div>

      {/* ── Footer simple ── */}
      <footer style={{ background: '#0A0A0C', padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
          br<span style={G_TEXT}>[AI]</span>n · Murcia, España · {new Date().getFullYear()}
        </span>
      </footer>

    </div>
  )
}
