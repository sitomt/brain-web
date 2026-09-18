import { motion } from 'framer-motion'
import Eyebrow from './Eyebrow'
import useIsMobile from '../hooks/useIsMobile'
import { REVEAL, STAGGER, STAGGER_CHILD } from '../lib/motion'
import { ACCENT } from '../lib/tokens'
import { h2, h3, body, label } from '../lib/typography'
import {
  WhatsApp, Gmail, GoogleCalendar, GoogleSheets, Notion, Shopify, WooCommerce, HubSpot, Excel, Instagram,
} from './icons/brands'

// Mecanismo: tres pasos de una frase + cinta de 10 logos (sustituye a la
// antigua sección Integraciones).
const STEPS = [
  { num: '01', title: 'Llamada de 30 min con Ginés', desc: 'Le cuentas tu negocio y te dice qué automatizaría y qué no.', note: 'No hace falta preparar nada' },
  { num: '02', title: 'Plan con precio cerrado, por escrito', desc: 'Qué haremos, cuándo y cuánto. Sin costes que aparezcan después.', note: 'Decides tú' },
  { num: '03', title: 'Lo construimos sobre lo que ya usas', desc: 'WhatsApp, Gmail, tu agenda o tu programa de gestión. Funcionando en pocas semanas.', note: 'La fecha concreta va en el plan' },
]

const TOOLS = [
  { name: 'WhatsApp', Icon: WhatsApp }, { name: 'Gmail', Icon: Gmail }, { name: 'Google Calendar', Icon: GoogleCalendar },
  { name: 'Google Sheets', Icon: GoogleSheets }, { name: 'Excel', Icon: Excel }, { name: 'Notion', Icon: Notion },
  { name: 'HubSpot', Icon: HubSpot }, { name: 'Shopify', Icon: Shopify }, { name: 'WooCommerce', Icon: WooCommerce }, { name: 'Instagram', Icon: Instagram },
]

const EDGE_FADE = 'linear-gradient(to right, transparent, #000 40px, #000 calc(100% - 40px), transparent)'

function Logos() {
  const items = [...TOOLS, ...TOOLS]
  return (
    <div style={{ overflow: 'hidden', WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }} aria-label="Herramientas con las que nos integramos">
      <div className="marquee-track" style={{ display: 'flex', width: 'max-content', animation: 'marqueeLeft 60s linear infinite' }}>
        {items.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= TOOLS.length}
            className="logo-chip"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginRight: 40, color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.95rem', whiteSpace: 'nowrap', opacity: 0.55, transition: 'opacity 0.2s' }}
          >
            <t.Icon size={22} />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const isMobile = useIsMobile()

  return (
    <section id="proceso" style={{ background: '#0A0A0B', padding: isMobile ? '5rem 0 3rem' : '8rem 0 4rem' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '0 1.25rem' : '0 2rem' }}>
        <motion.div {...REVEAL} style={{ marginBottom: isMobile ? '2.5rem' : '3.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}><Eyebrow variant="pill" tone="light">Cómo trabajamos</Eyebrow></div>
          <h2 style={{ ...h2, color: '#fff' }}>Tres pasos. <em style={{ fontStyle: 'italic' }}>El primero es gratis.</em></h2>
        </motion.div>

        <motion.div
          {...STAGGER()}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 0 : '2.5rem',
          }}
        >
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              variants={STAGGER_CHILD}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '40px 1fr' : '1fr',
                gap: isMobile ? '1rem' : 0,
                padding: isMobile ? '1.25rem 0' : '0 0 0 1.5rem',
                borderTop: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
                borderLeft: !isMobile ? '1px solid rgba(255,255,255,0.12)' : 'none',
                borderBottom: isMobile && i === STEPS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            >
              <span style={{ ...label, color: ACCENT, display: 'block', marginBottom: isMobile ? 0 : '1rem', paddingTop: 4 }}>{s.num}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <h3 style={{ ...h3, color: '#fff' }}>{s.title}</h3>
                <p style={{ ...body, color: 'rgba(255,255,255,0.65)' }}>{s.desc}</p>
                <span style={{ ...label, color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>— {s.note}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div style={{ marginTop: isMobile ? '3rem' : '4.5rem', padding: isMobile ? '1.25rem 0' : '1.5rem 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Logos />
      </div>
    </section>
  )
}
