import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CometCard from './CometCard'
import useIsMobile from '../hooks/useIsMobile'
import baktunLogo from '../assets/baktun13-logo.png'
import clesolLogo from '../assets/clesol-logo.png'

const cases = [
  {
    type: 'Centro deportivo',
    name: 'Baktun 13',
    logo: baktunLogo,
    logoWhite: false,
    alt: 'Baktun 13 — centro deportivo que automatizó su gestión operativa con IA de BrAIn',
    result: 'Gestión operativa 100% digital. Fichaje, incidencias, limpieza y comunicación del equipo en una sola app construida con IA.',
  },
  {
    type: 'Instalación y mantenimiento de paneles solares',
    name: 'Clesol',
    logo: clesolLogo,
    logoWhite: true,
    alt: 'Clesol — empresa de paneles solares que automatizó su CRM y clasificación de leads con BrAIn',
    result: 'Clasificación de leads y CRM automatizados. El equipo se enfoca en instalar, no en gestionar.',
  },
]

export default function Cases() {
  const isMobile = useIsMobile()

  return (
    <AuroraBackground id="casos" style={{ padding: isMobile ? '4rem 1.25rem' : '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
            Clientes
          </span>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', lineHeight: 1.1 }}>
            Resultados reales. Negocios reales.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
          {cases.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>
              <CometCard style={{ padding: isMobile ? '1.75rem 1.5rem' : '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Logo */}
                <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <img
                    src={c.logo}
                    alt={c.alt}
                    style={{
                      height: 48,
                      width: 'auto',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      filter: c.logoWhite ? 'brightness(0) invert(1)' : 'none',
                    }}
                  />
                </div>

                {/* Tipo */}
                <div style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.65rem', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.1em' }}>
                  {c.type}
                </div>

                {/* Resultado */}
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, margin: 0, flexGrow: 1 }}>
                  {c.result}
                </p>

              </CometCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'Instrument Serif',serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem,2vw,1.25rem)',
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          "Primera reunión gratuita. Te decimos exactamente qué podemos hacer por tu negocio y cuánto cuesta."
        </motion.p>
      </div>
    </AuroraBackground>
  )
}
