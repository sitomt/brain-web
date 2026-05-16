import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CometCard from './CometCard'

const cases = [
  {
    type: 'Centro deportivo',
    name: 'Baktun 13',
    result: 'Gestión operativa 100% digital. Fichaje, incidencias, limpieza y comunicación del equipo en una sola app construida con IA.',
  },
  {
    type: 'Empresa de servicios',
    name: 'Clesol',
    result: 'Procesos internos automatizados. El equipo dedica su tiempo a lo que importa.',
  },
]

export default function Cases() {
  return (
    <AuroraBackground id="casos" style={{ padding: '6rem 2rem' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {cases.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>
              <CometCard style={{ padding: '2.5rem', height: '100%' }}>
                <div style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.65rem', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                  {c.type}
                </div>
                <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: '2.25rem', color: '#fff', marginBottom: '1rem', lineHeight: 1 }}>
                  {c.name}
                </h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
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
