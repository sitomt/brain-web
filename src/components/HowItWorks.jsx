import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import { EASE_PREMIUM } from '../lib/motion'
import { BRAND, ACCENT, gradientText } from '../lib/tokens'
import { h2, bodyLg } from '../lib/typography'

const STEPS = [
  {
    num: '01',
    title: 'Agenda una llamada de 30 minutos',
    desc: 'Eliges día y hora en el calendario y te llega la invitación por email. Nos cuentas cómo funciona tu negocio y qué te quita más tiempo. Gratis y sin compromiso.',
  },
  {
    num: '02',
    title: 'Te proponemos un plan con precio cerrado',
    desc: 'Te decimos qué tiene sentido automatizar, cómo lo haríamos y cuánto cuesta. Sin letra pequeña ni costes que aparecen después. Si no podemos ayudarte, te lo decimos.',
  },
  {
    num: '03',
    title: 'Lo construimos contigo',
    desc: 'Codo a codo, sobre las herramientas que ya usas. En tres o cuatro semanas lo tienes funcionando en tu negocio, y seguimos mejorándolo contigo.',
  },
]

const RAIL = 64 // ancho de la columna del número (px)

export default function HowItWorks() {
  const isMobile = useIsMobile()
  const trackRef = useRef(null)

  // La línea se "dibuja" conforme la sección recorre el viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.8', 'end 0.6'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div id="proceso" style={{ background: '#0A0A0B', padding: isMobile ? '5rem 1.25rem' : '7.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Amanecer — luz de marca asomando en el borde inferior, hacia Soluciones */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: isMobile ? 160 : 220,
          pointerEvents: 'none',
          background:
            'linear-gradient(to top, rgba(67,97,238,0.10) 0%, rgba(114,9,183,0.045) 45%, transparent 100%)',
        }}
      />
      <div style={{ maxWidth: 880, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ marginBottom: isMobile ? '3rem' : '4rem', textAlign: isMobile ? 'center' : 'left' }}
        >
          <div style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            <Eyebrow variant="pill" tone="light">Proceso</Eyebrow>
          </div>
          <h2 style={{ ...h2 }}>
            <span style={{ color: '#fff' }}>De la primera llamada a funcionando, </span>
            <WipeReveal delay={0.2}>
              <em style={{ fontStyle: 'italic', ...gradientText }}>en tres pasos.</em>
            </WipeReveal>
          </h2>
          <p style={{ ...bodyLg, color: 'rgba(255,255,255,0.62)', margin: isMobile ? '1.25rem auto 0' : '1.25rem 0 0' }}>
            Sin formularios eternos ni letra pequeña. Tú nos cuentas el problema, nosotros nos encargamos del resto.
          </p>
        </motion.div>

        {/* Steps — secuencia vertical con rail animado */}
        <div ref={trackRef} style={{ position: 'relative' }}>
          {/* línea base */}
          {!isMobile && (
            <div style={{ position: 'absolute', left: RAIL / 2, top: 8, bottom: 40, width: 1, background: 'rgba(255,255,255,0.1)' }} />
          )}
          {/* línea de progreso */}
          {!isMobile && (
            <motion.div
              style={{
                position: 'absolute', left: RAIL / 2 - 0.5, top: 8, bottom: 40, width: 2,
                background: BRAND.gradient, transformOrigin: 'top', scaleY: lineScale, borderRadius: 2,
              }}
            />
          )}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '2.5rem' : '3.5rem' }}
          >
            {STEPS.map((step) => (
              <motion.div
                key={step.num}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_PREMIUM } },
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'auto 1fr' : `${RAIL}px 1fr`,
                  gap: isMobile ? '1rem' : '2rem',
                  alignItems: 'start',
                }}
              >
                {/* Número badge */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: isMobile ? 44 : 52, height: isMobile ? 44 : 52, borderRadius: 999,
                    background: '#0A0A0B', border: '1px solid rgba(255,255,255,0.14)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}>
                    <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.82rem', color: ACCENT, letterSpacing: '0.05em' }}>
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: isMobile ? 6 : 10 }}>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fff', lineHeight: 1.1, margin: 0 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0, maxWidth: '52ch' }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
