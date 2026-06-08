// Integraciones — "se conecta con lo que ya usas". Lista plana de herramientas
// del mundo del cliente (no el stack técnico interno) con el efecto "hover-brand".
//
// El sistema es el mismo a cualquier tamaño: SIEMPRE dos líneas, y ninguna chip
// cambia nunca de línea (las filas son arrays fijos con flex-wrap:nowrap).
//
//   Escritorio (motion, ≥960px): las dos filas se centran en un bloque más ancho
//     que las chips; hover sobre una → se ilumina y revela su nombre, el resto se
//     atenúan. La holgura centrada (margen a ambos lados) absorbe la expansión sin
//     que ninguna chip desborde ni cambie de fila.
//   Móvil / tablet (<960px): las dos filas se vuelven carruseles que se deslizan
//     en horizontal (swipe). Cada chip muestra ya su nombre; no hay movimiento
//     automático ni reflujo, solo dos líneas que el dedo recorre.
//   Reduced motion: todos los nombres visibles, rejilla estática.

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import useIsMobile from '../hooks/useIsMobile'
import { EASE_PREMIUM } from '../lib/motion'
import { SURFACE, gradientText } from '../lib/tokens'
import { h2 } from '../lib/typography'
import {
  WhatsApp, Instagram, Telegram, Gmail, Messenger,
  GoogleCalendar, Calendly, GoogleMeet, Zoom,
  GoogleSheets, Excel, Notion, Airtable, HubSpot, Trello, GoogleDrive,
  Shopify, WooCommerce, Prestashop, Amazon, Etsy,
} from './icons/brands'

// Lista plana, en orden temático (mensajería → agenda → datos → e-commerce).
const TOOLS = [
  { name: 'WhatsApp',        Icon: WhatsApp },
  { name: 'Instagram',       Icon: Instagram },
  { name: 'Telegram',        Icon: Telegram },
  { name: 'Messenger',       Icon: Messenger },
  { name: 'Gmail',           Icon: Gmail },
  { name: 'Google Calendar', Icon: GoogleCalendar },
  { name: 'Calendly',        Icon: Calendly },
  { name: 'Google Meet',     Icon: GoogleMeet },
  { name: 'Zoom',            Icon: Zoom },
  { name: 'Google Sheets',   Icon: GoogleSheets },
  { name: 'Excel',           Icon: Excel },
  { name: 'Notion',          Icon: Notion },
  { name: 'Airtable',        Icon: Airtable },
  { name: 'HubSpot',         Icon: HubSpot },
  { name: 'Trello',          Icon: Trello },
  { name: 'Google Drive',    Icon: GoogleDrive },
  { name: 'Shopify',         Icon: Shopify },
  { name: 'WooCommerce',     Icon: WooCommerce },
  { name: 'Prestashop',      Icon: Prestashop },
  { name: 'Amazon',          Icon: Amazon },
  { name: 'Etsy',            Icon: Etsy },
].map((t, i) => ({ ...t, gi: i }))

// Dos filas fijas: la primera lleva la mitad (redondeando hacia arriba) y la
// segunda el resto. Al ser arrays fijos, ninguna chip puede cambiar de fila.
const SPLIT = Math.ceil(TOOLS.length / 2)
const ROWS = [TOOLS.slice(0, SPLIT), TOOLS.slice(SPLIT)]

// Ancho del bloque de cada fila en escritorio. Deliberadamente más ancho que las
// chips colapsadas: esa holgura centrada es el margen izq/dcha que absorbe la
// expansión de cualquier chip sin que la fila desborde ni envuelva.
const ROW_BLOCK = 'min(980px, 100%)'

// Máscara de desvanecido en los bordes de los carruseles móviles: insinúa que
// hay más contenido para deslizar y evita el corte seco.
const EDGE_FADE = 'linear-gradient(to right, transparent, #000 22px, #000 calc(100% - 22px), transparent)'

const CHIP_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] }

function ToolChip({ tool, active, interactive, onActivate, onDeactivate }) {
  const { name, Icon } = tool
  return (
    <motion.div
      layout={interactive}
      transition={CHIP_TRANSITION}
      onMouseEnter={interactive ? onActivate : undefined}
      onMouseLeave={interactive ? onDeactivate : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 14px',
        borderRadius: 999,
        flexShrink: 0,
        border: `1px solid ${active ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
        background: active ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)',
        opacity: active ? 1 : 0.5,
        filter: active ? 'grayscale(0)' : 'grayscale(1)',
        transition:
          'opacity 0.3s ease, filter 0.3s ease, background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <motion.span layout={interactive ? 'position' : false} style={{ display: 'flex', flexShrink: 0 }}>
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

export default function Herramientas() {
  const isMobile = useIsMobile()
  // El layout de dos filas centradas con hover-expand solo cabe con holgura en
  // pantallas anchas. Por debajo de 960px, las dos filas se vuelven carruseles.
  const compact = useIsMobile(960)
  const reduce = useReducedMotion()

  const interactive = !compact && !reduce
  const [active, setActive] = useState(null)

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

        {/* Chips — siempre dos filas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.1 }}
        >
          {interactive ? (
            // Escritorio: dos filas fijas centradas con holgura → hover-expand.
            <LayoutGroup id="tools">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                {ROWS.map((row, ri) => (
                  <div key={ri} style={{ width: ROW_BLOCK, margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                      {row.map((tool) => (
                        <ToolChip
                          key={tool.name}
                          tool={tool}
                          active={active === tool.gi}
                          interactive
                          onActivate={() => setActive(tool.gi)}
                          onDeactivate={() => setActive(null)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </LayoutGroup>
          ) : (
            // Compacto / reduced motion: dos filas en carrusel horizontal (swipe).
            // Cada chip muestra ya su nombre; sin movimiento automático ni reflujo.
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ROWS.map((row, ri) => (
                <div
                  key={ri}
                  className="hide-scrollbar"
                  style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    gap: 10,
                    overflowX: 'auto',
                    padding: '2px 0',
                    WebkitOverflowScrolling: 'touch',
                    WebkitMaskImage: EDGE_FADE,
                    maskImage: EDGE_FADE,
                  }}
                >
                  {row.map((tool) => (
                    <ToolChip key={tool.name} tool={tool} active interactive={false} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </motion.div>

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
