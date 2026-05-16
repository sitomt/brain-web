import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CometCard from './CometCard'
import useIsMobile from '../hooks/useIsMobile'

/* --- Typewriter chat visual --- */
const chatLines = [
  { from: 'user', text: '¿Tenéis mesa para esta noche?' },
  { from: 'bot',  text: 'Sí, ¿para cuántas personas?' },
  { from: 'user', text: 'Para 2, a las 9.' },
  { from: 'bot',  text: '¡Listo! Mesa reservada. 🎉' },
]

function ChatVisual() {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => (v >= chatLines.length ? 0 : v + 1)), 1400)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 12, minHeight: 160 }}>
      {chatLines.slice(0, visible).map((msg, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
          <div style={{ padding: '6px 12px', borderRadius: 12, background: msg.from === 'user' ? 'linear-gradient(135deg,#4361EE,#F72585)' : 'rgba(255,255,255,0.12)', color: '#fff', fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', maxWidth: '80%' }}>
            {msg.text}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* --- Data visual --- */
const rows = ['García, J. — Sedan 2021', 'Martínez, A. — SUV 2023', 'López, R. — Coupé 2022']
function DataVisual() {
  const [q, setQ] = useState('')
  const queries = ['¿Cuántos SUV vendimos?', '2 en el último trimestre', '¿Stock disponible?']
  const [qi, setQi] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setQi((v) => (v + 1) % queries.length), 2500)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <div key={i} style={{ padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: "'Syne Mono',monospace", fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{r}</div>
        ))}
      </div>
      <motion.div key={qi} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '8px 12px', borderRadius: 8, background: 'linear-gradient(135deg,#4361EE22,#F7258522)', border: '1px solid rgba(247,37,133,0.2)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', color: '#fff' }}>
        {queries[qi]}
      </motion.div>
    </div>
  )
}

/* --- Icons visual --- */
const icons = ['🤖', '🔗', '📊', '🌐', '⚡', '🔒', '📱', '🎯']
function IconsVisual() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
      {icons.map((icon, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
          {icon}
        </motion.div>
      ))}
    </div>
  )
}

const products = [
  {
    num: '01',
    name: 'Chatbot y Voz 24/7',
    benefit: 'Tu negocio responde solo, siempre.',
    desc: 'Un asistente inteligente atiende a tus clientes por WhatsApp, por tu web o por teléfono. Reservas, consultas, pedidos. A cualquier hora. Sin que tú hagas nada.',
    tags: ['Restaurantes', 'Clínicas', 'Hoteles', 'Parques'],
    visual: <ChatVisual />,
  },
  {
    num: '02',
    name: 'Habla con tus Datos',
    benefit: 'Pregunta. Obtén respuesta al instante.',
    desc: 'Conectamos tu stock, tus reservas o tu historial de clientes a un chat. Preguntas en español normal y obtienes la respuesta al momento.',
    tags: ['Concesionarios', 'Clínicas', 'Almacenes'],
    visual: <DataVisual />,
  },
  {
    num: '03',
    name: 'Soluciones a Medida',
    benefit: 'Si lo imaginas, lo construimos.',
    desc: 'Agentes IA, automatizaciones, webs, landing pages, sistemas de reservas, privacidad total en local. Cualquier solución. A presupuesto exacto.',
    tags: ['Cualquier sector', 'Cualquier tamaño'],
    visual: <IconsVisual />,
  },
]

export default function Products() {
  const isMobile = useIsMobile()
  return (
    <section id="lo-que-hacemos" style={{ background: '#1A1814', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
            Lo que hacemos
          </span>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#fff', lineHeight: 1.1 }}>
            Tres maneras de hacer que<br />
            tu negocio trabaje solo.
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {products.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <CometCard style={{ padding: isMobile ? '1.5rem' : '2.5rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1.5rem' : '3rem', alignItems: 'center' }}>
                {/* Left */}
                <div>
                  <div style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.8rem', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.75rem' }}>
                    {p.num}
                  </div>
                  <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: '2rem', color: '#fff', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontSize: '1.1rem', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '1rem' }}>
                    {p.benefit}
                  </p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.62rem', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right visual */}
                <div>{p.visual}</div>
              </CometCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
