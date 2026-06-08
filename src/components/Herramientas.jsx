// Integraciones — "se conecta con lo que ya usas". Muestra solo herramientas del
// mundo del cliente (no el stack técnico interno), agrupadas por categoría.
//
// Se conserva la mecánica de chips del componente original:
//   Desktop: hover sobre una chip → se ilumina y revela el nombre; el resto se atenúan.
//   Móvil / sin hover: el resaltado auto-cicla de una en una a través de TODAS las chips.
//   Reduced motion: todos los nombres visibles, sin movimiento.

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import useIsMobile from '../hooks/useIsMobile'
import { EASE_PREMIUM, STAGGER, STAGGER_CHILD } from '../lib/motion'
import { SURFACE, gradientText } from '../lib/tokens'
import { h2 } from '../lib/typography'
import {
  WhatsApp, Instagram, Telegram, Gmail, Messenger,
  GoogleCalendar, Calendly, GoogleMeet, Zoom,
  GoogleSheets, Excel, Notion, Airtable, HubSpot, Trello, GoogleDrive,
  Shopify, WooCommerce, Prestashop, Amazon, Etsy,
} from './icons/brands'

const GROUPS = [
  {
    label: 'Mensajería y atención',
    tools: [
      { name: 'WhatsApp',  Icon: WhatsApp },
      { name: 'Instagram', Icon: Instagram },
      { name: 'Telegram',  Icon: Telegram },
      { name: 'Messenger', Icon: Messenger },
      { name: 'Gmail',     Icon: Gmail },
    ],
  },
  {
    label: 'Calendario y reuniones',
    tools: [
      { name: 'Google Calendar', Icon: GoogleCalendar },
      { name: 'Calendly',        Icon: Calendly },
      { name: 'Google Meet',     Icon: GoogleMeet },
      { name: 'Zoom',            Icon: Zoom },
    ],
  },
  {
    label: 'Datos y gestión',
    tools: [
      { name: 'Google Sheets', Icon: GoogleSheets },
      { name: 'Excel',         Icon: Excel },
      { name: 'Notion',        Icon: Notion },
      { name: 'Airtable',      Icon: Airtable },
      { name: 'HubSpot',       Icon: HubSpot },
      { name: 'Trello',        Icon: Trello },
      { name: 'Google Drive',  Icon: GoogleDrive },
    ],
  },
  {
    label: 'E-commerce',
    tools: [
      { name: 'Shopify',     Icon: Shopify },
      { name: 'WooCommerce', Icon: WooCommerce },
      { name: 'Prestashop',  Icon: Prestashop },
      { name: 'Amazon',      Icon: Amazon },
      { name: 'Etsy',        Icon: Etsy },
    ],
  },
]

// Índice global (plano) por chip → permite que el auto-cycle recorra todas las
// herramientas de todos los grupos, una a una.
let _gi = 0
const GROUPS_IDX = GROUPS.map((g) => ({
  ...g,
  tools: g.tools.map((t) => ({ ...t, gi: _gi++ })),
}))
const TOTAL = _gi

const CYCLE_MS = 1800
const CHIP_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] }

function ToolChip({ tool, active, interactive, onActivate, onDeactivate }) {
  const { name, Icon } = tool
  return (
    <motion.div
      layout
      transition={CHIP_TRANSITION}
      onMouseEnter={interactive ? onActivate : undefined}
      onMouseLeave={interactive ? onDeactivate : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 14px',
        borderRadius: 999,
        border: `1px solid ${active ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
        background: active ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)',
        opacity: active ? 1 : 0.5,
        filter: active ? 'grayscale(0)' : 'grayscale(1)',
        transition: active
          ? 'opacity 0.3s ease, filter 0.3s ease, background 0.3s ease, border-color 0.3s ease'
          : 'opacity 0.3s ease, filter 0.3s ease, background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <motion.span layout="position" style={{ display: 'flex', flexShrink: 0 }}>
        <Icon size={26} />
      </motion.span>
      <AnimatePresence initial={false}>
        {active && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              whiteSpace: 'nowrap',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: '0.95rem',
              color: '#fff',
              letterSpacing: '0.01em',
            }}
          >
            {name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CategoryRow({ group, isActive, interactive, isMobile, onActivate, onDeactivate }) {
  return (
    <motion.div
      {...STAGGER(0.06, 0.04)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem' }}
    >
      <motion.span
        variants={STAGGER_CHILD}
        style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        {group.label}
      </motion.span>
      <div
        style={{
          display: 'flex',
          flexWrap: interactive ? 'nowrap' : 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? 10 : 12,
        }}
      >
        {group.tools.map((tool) => (
          <motion.div key={tool.name} variants={STAGGER_CHILD}>
            <ToolChip
              tool={tool}
              active={isActive(tool.gi)}
              interactive={interactive}
              onActivate={() => onActivate(tool.gi)}
              onDeactivate={onDeactivate}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Herramientas() {
  const isMobile = useIsMobile()
  // Las chips solo caben "nowrap" cómodamente en pantallas anchas. Por debajo de
  // 960px usamos el modo auto-cycle (como el original) y flex-wrap.
  const compact = useIsMobile(960)
  const reduce = useReducedMotion()

  const autoplay = compact && !reduce
  const interactive = !compact && !reduce
  const [active, setActive] = useState(autoplay ? 0 : null)

  useEffect(() => {
    if (!autoplay) return
    const t = setInterval(() => setActive((i) => ((i ?? -1) + 1) % TOTAL), CYCLE_MS)
    return () => clearInterval(t)
  }, [autoplay])

  const isActive = (gi) => reduce || active === gi

  return (
    <section
      style={{
        background: SURFACE.darkAlt,
        padding: isMobile ? '4.5rem 1.25rem' : '6.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem', marginBottom: isMobile ? '2.75rem' : '3.5rem' }}
        >
          <Eyebrow variant="minimal" tone="light">Integraciones</Eyebrow>
          <h2 style={{ ...h2, textAlign: 'center', margin: 0 }}>
            <span style={{ color: '#fff' }}>Se conecta con lo que </span>
            <WipeReveal delay={0.2}>
              <em style={{ fontStyle: 'italic', ...gradientText }}>ya usas.</em>
            </WipeReveal>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65,
              maxWidth: 540,
              margin: 0,
            }}
          >
            Tu IA no vive aislada. Trabaja con las herramientas que tu negocio ya
            tiene en marcha.
          </p>
        </motion.div>

        {/* Cuadrícula por categorías */}
        <LayoutGroup id="tools">
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '2.25rem' : '2.75rem' }}>
            {GROUPS_IDX.map((group) => (
              <CategoryRow
                key={group.label}
                group={group}
                isActive={isActive}
                interactive={interactive}
                isMobile={isMobile}
                onActivate={setActive}
                onDeactivate={() => setActive(null)}
              />
            ))}
          </div>
        </LayoutGroup>

        {/* Nota de pie */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.1 }}
          style={{
            marginTop: isMobile ? '2.5rem' : '3rem',
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          ¿Usas otra herramienta? La integramos.
        </motion.p>
      </div>
    </section>
  )
}
