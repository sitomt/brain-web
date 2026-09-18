import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react'
import useIsMobile from '../hooks/useIsMobile'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import CtaButton from './CtaButton'
import { EASE_PREMIUM } from '../lib/motion'
import { ACCENT, gradientText } from '../lib/tokens'
import { h2, bodyLg } from '../lib/typography'
import { openBooking, openParticulares } from '../lib/booking'
import { CTA_LABEL } from '../lib/cta'


// Preguntas frecuentes — resuelven las objeciones del comprador en el momento
// de decidir (justo antes del CTA final). Tono "sin letra pequeña": directo,
// honesto, en el idioma del cliente.
const FAQS = [
  {
    q: '¿Esto funciona de verdad o es otra moda de la IA?',
    a: 'Lo usamos en los negocios que dirigimos y con los que trabajamos: Baktun 13, Clesol, Foodmatica, Playgame Italia y Venta Alegría. En la llamada te enseñamos qué haría en el tuyo antes de que pagues nada. Y si no lo vemos claro, te lo decimos.',
  },
  {
    q: 'Ya probé un chatbot y fue un desastre. ¿Qué cambia?',
    a: 'Los chatbots genéricos contestan con frases hechas. Nosotros conectamos la IA a tus datos reales (agenda, precios, stock, reservas) y la probamos contigo antes de ponerla delante de tus clientes. Y el presupuesto va cerrado desde el principio.',
  },
  {
    q: '¿Y si la IA se equivoca con un cliente?',
    a: 'Solo responde con la información de tu negocio. Lo que no sabe, o lo que es delicado, lo pasa a una persona de tu equipo. Tú decides qué hace sola y qué necesita tu visto bueno.',
  },
  {
    q: '¿Va a sustituir a mi equipo?',
    a: 'No. Se encarga de lo repetitivo, lo que nadie quiere hacer: contestar lo mismo cincuenta veces, meter facturas, perseguir recordatorios. Tu gente queda libre para lo que importa.',
  },
  {
    q: '¿Qué pasa con mis datos?',
    a: 'Tus datos son tuyos. Cumplimos el RGPD y, si lo necesitas, firmamos confidencialidad. Y lo que nos cuentes en la llamada se queda en la llamada.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'No publicamos tarifas porque cada negocio se presupuesta a medida. Lo que sí te garantizamos: precio cerrado y por escrito antes de empezar, sin costes que aparezcan después. Las empresas fundadoras tienen un precio especial.',
  },
  {
    q: '¿Funciona con lo que ya uso? ¿Y si no sé nada de tecnología?',
    a: 'Casi siempre sí: trabajamos sobre WhatsApp, Gmail, tu agenda, tu tienda online o tu programa de gestión. Si usas algo raro, lo integramos. Y no necesitas saber de tecnología: nos lo cuentas como se lo contarías a un socio, lo dejamos funcionando y te enseñamos.',
  },
]

// Lo que NO hacemos — desactiva al escéptico antes de las preguntas.
const NO_HACEMOS = [
  'No te vendemos un chatbot genérico que responde frases hechas. La IA trabaja con los datos de tu negocio.',
  'No sustituimos a tu equipo. Le quitamos lo repetitivo.',
  'No te decimos que sí a todo. Si no encaja, te lo decimos en la primera llamada.',
  'No publicamos precios porque cada negocio es distinto, pero el tuyo lo tendrás cerrado y por escrito antes de empezar.',
  'No te dejamos solo cuando está instalado: lo seguimos afinando contigo.',
]

function FaqItem({ item, isOpen, onToggle, isMobile }) {
  const Icon = isOpen ? Minus : Plus
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE_PREMIUM } },
      }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          padding: isMobile ? '1.35rem 0' : '1.6rem 0',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: isMobile ? '1.2rem' : 'clamp(1.25rem, 2.2vw, 1.5rem)',
            color: isOpen ? '#fff' : 'rgba(255,255,255,0.86)',
            lineHeight: 1.25,
            transition: 'color 0.3s ease',
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: isMobile ? 30 : 34,
            height: isMobile ? 30 : 34,
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isOpen ? '#fff' : 'rgba(255,255,255,0.6)',
            background: isOpen ? 'rgba(255,255,255,0.06)' : 'transparent',
            transition: 'color 0.3s ease, background 0.3s ease',
          }}
        >
          <Icon size={15} weight="bold" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                margin: 0,
                padding: isMobile ? '0 0 1.4rem' : '0 3rem 1.7rem 0',
                maxWidth: '62ch',
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  const isMobile = useIsMobile()
  // Una sola pregunta abierta a la vez (-1 = ninguna; la primera abierta por defecto).
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div id="faq" style={{ background: '#0A0A0B', padding: isMobile ? '5rem 1.25rem' : '7.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>

        {/* Lo que NO hacemos */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ marginBottom: isMobile ? '4rem' : '5.5rem', textAlign: isMobile ? 'center' : 'left' }}
        >
          <div style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            <Eyebrow variant="pill" tone="light">Sin letra pequeña</Eyebrow>
          </div>
          <h2 style={{ ...h2 }}>
            <span style={{ color: '#fff' }}>Lo que </span>
            <WipeReveal delay={0.2}>
              <em style={{ fontStyle: 'italic', ...gradientText }}>no hacemos.</em>
            </WipeReveal>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: isMobile ? '1.75rem auto 0' : '1.75rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.9rem', maxWidth: 640, textAlign: 'left' }}>
            {NO_HACEMOS.map((line) => (
              <li key={line} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                <span aria-hidden style={{ flexShrink: 0, marginTop: 9, width: 14, height: 1.5, background: ACCENT }} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ marginBottom: isMobile ? '2.5rem' : '3.5rem', textAlign: isMobile ? 'center' : 'left' }}
        >
          <div style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            <Eyebrow variant="pill" tone="light">Preguntas frecuentes</Eyebrow>
          </div>
          <h2 style={{ ...h2 }}>
            <span style={{ color: '#fff' }}>Lo que querrías </span>
            <WipeReveal delay={0.2}>
              <em style={{ fontStyle: 'italic', ...gradientText }}>preguntarnos.</em>
            </WipeReveal>
          </h2>
          <p style={{ ...bodyLg, color: 'rgba(255,255,255,0.62)', margin: isMobile ? '1.25rem auto 0' : '1.25rem 0 0' }}>
            Si te queda alguna fuera de la lista, la resolvemos en la llamada.
          </p>
        </motion.div>

        {/* Acordeón */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx((prev) => (prev === i ? -1 : i))}
              isMobile={isMobile}
            />
          ))}
        </motion.div>

        {/* Cierre — micro-CTA hacia el chat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          style={{
            marginTop: isMobile ? '2.5rem' : '3rem',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            ¿Otra duda?
          </span>
          <CtaButton variant="light" onClick={() => openBooking('faq')}>
            {CTA_LABEL}
          </CtaButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.1 }}
          style={{ marginTop: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', textAlign: isMobile ? 'center' : 'left' }}
        >
          ¿Eres particular con una idea propia?{' '}
          <button type="button" onClick={openParticulares} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255,255,255,0.75)', font: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Cuéntanosla en este formulario
          </button>{' '}
          y te respondemos por email.
        </motion.p>

      </div>
    </div>
  )
}
