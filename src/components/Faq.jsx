import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react'
import useIsMobile from '../hooks/useIsMobile'
import Eyebrow from './Eyebrow'
import { REVEAL, EASE } from '../lib/motion'
import { h2, h3, body, label } from '../lib/typography'
import { openParticulares } from '../lib/booking'

// Objeciones: título sticky + "no hacemos" a la izquierda, 5 preguntas a la derecha.
const NO_HACEMOS = [
  'No vendemos un chatbot genérico de frases hechas.',
  'No sustituimos a tu equipo: le quitamos lo repetitivo.',
  'No decimos que sí a todo. Si no encaja, te lo decimos.',
]

const FAQS = [
  { q: '¿Funciona de verdad?', a: 'Lo usamos cada día en cinco negocios nuestros (arriba los tienes). En la llamada te enseñamos qué haría en el tuyo antes de pagar nada.' },
  { q: 'Ya probé un chatbot y fue un desastre.', a: 'Los genéricos contestan frases hechas. El nuestro trabaja con tus datos (agenda, precios, stock) y lo probamos contigo antes de ponerlo delante de clientes.' },
  { q: '¿Y si se equivoca o sustituye a mi equipo?', a: 'Solo responde con tu información; lo delicado lo pasa a una persona. Quita lo repetitivo al equipo, no al equipo.' },
  { q: '¿Cuánto cuesta?', a: 'Cada negocio se presupuesta a medida. Lo tienes cerrado y por escrito antes de empezar. Las empresas fundadoras tienen precio especial.', particular: true },
  { q: '¿Y mis datos? ¿Y si no sé de tecnología?', a: 'Cumplimos el RGPD y firmamos confidencialidad si la pides. Nos lo cuentas como a un socio: lo dejamos funcionando y te enseñamos.' },
]

const HAIR = '1px solid rgba(26,24,20,0.12)'

function Item({ item, isOpen, onToggle, isMobile }) {
  const Icon = isOpen ? Minus : Plus
  return (
    <div style={isMobile ? { borderRadius: 18, background: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.55)', border: '1px solid rgba(26,24,20,0.08)', padding: '0 1.25rem', boxShadow: isOpen ? '0 18px 40px -26px rgba(26,24,20,0.25)' : 'none', transition: 'background 0.25s, box-shadow 0.25s' } : { borderBottom: HAIR }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem', padding: isMobile ? '1.15rem 0' : '1.35rem 0', textAlign: 'left', color: '#1A1814' }}
      >
        <span style={{ ...h3, fontSize: isMobile ? '1.15rem' : h3.fontSize }}>{item.q}</span>
        <span aria-hidden style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 999, border: '1px solid rgba(26,24,20,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1814', background: isOpen ? 'rgba(26,24,20,0.05)' : 'transparent' }}>
          <Icon size={14} weight="regular" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} style={{ overflow: 'hidden' }}>
            <p style={{ ...body, color: 'rgba(26,24,20,0.72)', padding: isMobile ? '0 0 1.3rem' : '0 3rem 1.4rem 0', fontSize: isMobile ? '0.98rem' : body.fontSize }}>
              {item.a}
              {item.particular && (
                <>
                  {' '}¿Eres particular?{' '}
                  <button type="button" onClick={openParticulares} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#1A1814', font: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>Cuéntanos tu idea →</button>
                </>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const isMobile = useIsMobile()
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" style={{ background: '#FAF8F3', padding: isMobile ? '5.5rem 1.5rem 5rem' : '8rem 2rem' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '4fr 8fr', gap: isMobile ? '2.5rem' : '4rem', alignItems: 'start' }}>
        <motion.div {...REVEAL} style={{ position: isMobile ? 'static' : 'sticky', top: 120, textAlign: isMobile ? 'center' : 'left', display: isMobile ? 'flex' : 'block', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '1.25rem' }}><Eyebrow variant="pill" tone="dark">Sin letra pequeña</Eyebrow></div>
          <h2 style={{ ...h2, fontSize: isMobile ? '2.1rem' : h2.fontSize, maxWidth: isMobile ? '13ch' : h2.maxWidth, color: '#1A1814' }}>Lo que querrías <em style={{ fontStyle: 'italic' }}>preguntarnos.</em></h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: isMobile ? 'center' : 'stretch' }}>
            {NO_HACEMOS.map((t) => (
              <li key={t} style={{ ...body, fontSize: '0.95rem', color: 'rgba(26,24,20,0.6)', display: 'flex', gap: 10 }}>
                {!isMobile && <span aria-hidden style={{ flexShrink: 0, marginTop: 11, width: 12, height: 1, background: 'rgba(26,24,20,0.4)' }} />}
                {t}
              </li>
            ))}
          </ul>
          <span style={{ ...label, color: 'rgba(26,24,20,0.45)', display: 'block', marginTop: '1.25rem', textTransform: 'none', letterSpacing: '0.04em' }}>
            El resto lo resolvemos en la llamada.
          </span>
        </motion.div>

        <motion.div {...REVEAL} style={isMobile ? { display: 'flex', flexDirection: 'column', gap: '0.6rem' } : { borderTop: HAIR }}>
          {FAQS.map((item, i) => (
            <Item key={item.q} item={item} isOpen={openIdx === i} onToggle={() => setOpenIdx((p) => (p === i ? -1 : i))} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
