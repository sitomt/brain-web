import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react'
import useIsMobile from '../hooks/useIsMobile'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import CtaButton from './CtaButton'
import { EASE_PREMIUM } from '../lib/motion'
import { gradientText } from '../lib/tokens'
import { h2, bodyLg } from '../lib/typography'
import { openBooking, openParticulares } from '../lib/booking'

const inlineLink = { background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff', fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }

// Preguntas frecuentes — resuelven las objeciones del comprador en el momento
// de decidir (justo antes del CTA final). Tono "sin letra pequeña": directo,
// honesto, en el idioma del cliente.
const FAQS = [
  {
    q: '¿Esto funciona de verdad o es otra moda de la IA?',
    a: 'Lo probamos primero en los negocios que dirigimos (salones de juego, hostelería, gimnasios, placas solares). Y antes de que pagues nada, en la llamada te enseñamos qué haría en el tuyo.',
  },
  {
    q: '¿La IA va a sustituir a mi equipo?',
    a: 'No. Se encarga del trabajo repetitivo que a nadie le gusta hacer —contestar lo mismo cincuenta veces, meter facturas, perseguir recordatorios— para que tu gente dedique su tiempo a lo que de verdad importa.',
  },
  {
    q: '¿Cuánto tarda en estar funcionando?',
    a: 'En dos o tres semanas lo tienes operativo en tu negocio. Empezamos por lo que más te duele y ampliamos desde ahí.',
  },
  {
    q: '¿Qué pasa con mis datos? ¿Son seguros?',
    a: 'Tus datos son tuyos. Trabajamos sobre las herramientas que ya usas y, si lo necesitas, desplegamos tu IA en tu propia infraestructura para que no salgan de tu casa. Cumplimos RGPD y firmamos un acuerdo de confidencialidad si lo pides.',
  },
  {
    q: '¿Y si mi caso no encaja en lo que ofrecéis?',
    a: 'Construimos a medida. Cuéntanoslo en la llamada gratuita y te decimos con sinceridad si podemos ayudarte; y si no es lo nuestro, también te lo decimos.',
  },
  {
    q: '¿Hay permanencia o letra pequeña?',
    a: 'No. Te damos un presupuesto cerrado antes de empezar, sin costes que aparecen después. La cuota mensual mantiene tu IA al día y puedes parar cuando quieras.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Cada empleado de IA tiene un precio de construcción y una cuota mensual (desde 97€/mes — menos que cualquier nómina). Las empresas fundadoras tienen precio especial. En la llamada gratuita te damos el presupuesto exacto para tu caso.',
  },
  {
    q: '¿Qué es una plaza fundador?',
    a: 'Estamos construyendo nuestras soluciones junto a un grupo reducido de empresas. Las fundadoras tienen precio especial, prioridad y trabajamos con ellas codo a codo. Por eso son pocas plazas: cuando se llenen, se cierran.',
  },
  {
    q: '¿Soy particular, podéis ayudarme?',
    a: (
      <>
        Sí. Trabajamos sobre todo con empresas, pero también creamos soluciones de IA a medida para proyectos personales.{' '}
        <button type="button" onClick={openParticulares} style={inlineLink}>Cuéntanos tu idea en este formulario</button>{' '}
        y te respondemos por email.
      </>
    ),
  },
  {
    q: '¿Tengo que saber de tecnología?',
    a: 'Para nada. Nos lo cuentas como se lo contarías a un socio y de toda la parte técnica nos encargamos nosotros.',
  },
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
            Sin letra pequeña. Si te queda alguna duda fuera de esta lista, resolvámosla en una llamada.
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
            Agendar llamada
          </CtaButton>
        </motion.div>

      </div>
    </div>
  )
}
