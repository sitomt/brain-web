import { motion } from 'framer-motion'
import AuroraBackground from './AuroraBackground'
import CometCard from './CometCard'

const problems = [
  {
    num: '01',
    title: 'El teléfono no para',
    desc: 'El 70% de tus llamadas son siempre las mismas preguntas.',
  },
  {
    num: '02',
    title: 'Cerrado por la noche',
    desc: 'Clientes que quieren reservar a las 11pm y no encuentran respuesta.',
  },
  {
    num: '03',
    title: 'Datos que no usas',
    desc: 'Tienes información valiosa pero consultarla lleva demasiado tiempo.',
  },
  {
    num: '04',
    title: 'Todo a mano',
    desc: 'Reservas, pedidos, seguimiento. Procesos lentos con margen de error humano.',
  },
]

export default function Problem() {
  return (
    <AuroraBackground id="servicios" style={{ padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
            El problema
          </span>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#fff', lineHeight: 1.1 }}>
            Tu equipo dedica horas a tareas
            <br />
            que{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>no necesitan humanos.</em>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <CometCard style={{ padding: '2rem', height: '100%' }}>
                <div
                  style={{
                    fontFamily: "'Syne Mono', monospace",
                    fontSize: '4rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #4361EE40, #7209B740, #F7258540, #FB560740)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '1rem',
                    userSelect: 'none',
                  }}
                >
                  {p.num}
                </div>
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </CometCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  )
}
