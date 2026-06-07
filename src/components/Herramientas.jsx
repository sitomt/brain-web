// Herramientas — "hover-brand-logo" effect adapted to our stack (the 21st.dev
// component is TS + react-icons + shadcn; here it's reimplemented natively with
// Framer Motion + local brand SVGs to match the project's JSX/inline-style
// conventions).
//
// Desktop: hover a logo → it lights up and its name slides out; the rest dim.
// Mobile / no-hover: the highlight auto-cycles through the tools.
// Reduced motion: all names shown, no movement.

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion'
import Eyebrow from './Eyebrow'
import WipeReveal from './WipeReveal'
import useIsMobile from '../hooks/useIsMobile'
import { EASE_PREMIUM, EASE_SOFT } from '../lib/motion'
import { SURFACE, gradientText } from '../lib/tokens'
import { h2 } from '../lib/typography'
import {
  Claude, OpenAI, Gemini, N8n, Make, Zapier,
  WhatsApp, Telegram, Instagram, Supabase, Notion, GoogleSheets,
} from './icons/brands'

const TOOLS = [
  { name: 'Claude',        Icon: Claude },
  { name: 'OpenAI',        Icon: OpenAI },
  { name: 'Gemini',        Icon: Gemini },
  { name: 'n8n',           Icon: N8n },
  { name: 'Make',          Icon: Make },
  { name: 'Zapier',        Icon: Zapier },
  { name: 'WhatsApp',      Icon: WhatsApp },
  { name: 'Telegram',      Icon: Telegram },
  { name: 'Instagram',     Icon: Instagram },
  { name: 'Supabase',      Icon: Supabase },
  { name: 'Notion',        Icon: Notion },
  { name: 'Google Sheets', Icon: GoogleSheets },
]

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
        opacity: active ? 1 : 0.45,
        filter: active ? 'none' : 'grayscale(0.6)',
        transition: active
          ? 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s cubic-bezier(0.22,1,0.36,1), background 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.5s cubic-bezier(0.22,1,0.36,1)'
          : 'opacity 0.18s ease, filter 0.18s ease, background 0.18s ease, border-color 0.18s ease',
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

export default function Herramientas() {
  const isMobile = useIsMobile()
  // Single-row hover layout only kicks in when the 12 chips actually fit on one
  // line (≥960px). Below that we fall back to the auto-cycling layout so we never
  // force an overflowing nowrap row.
  const compact = useIsMobile(960)
  const reduce = useReducedMotion()

  // Auto-cycle on touch/no-hover/narrow; static (all names) on reduced motion.
  const autoplay = compact && !reduce
  const interactive = !compact && !reduce
  const [active, setActive] = useState(autoplay ? 0 : null)

  useEffect(() => {
    if (!autoplay) return
    const t = setInterval(() => setActive((i) => (i + 1) % TOOLS.length), CYCLE_MS)
    return () => clearInterval(t)
  }, [autoplay])

  const isActive = (i) => reduce || active === i

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
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem', marginBottom: isMobile ? '2.5rem' : '3.25rem' }}
        >
          <Eyebrow variant="pill" tone="light">Stack tecnológico</Eyebrow>
          <h2 style={{ ...h2, textAlign: 'center', margin: 0 }}>
            <span style={{ color: '#fff' }}>Las herramientas que ya usas, </span>
            <WipeReveal delay={0.2}>
              <em style={{ fontStyle: 'italic', ...gradientText }}>potenciadas con IA.</em>
            </WipeReveal>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.65,
              maxWidth: 540,
              margin: 0,
            }}
          >
            Modelos de IA punteros y las plataformas que tu negocio ya usa,
            integrados en una única solución a medida.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.1 }}
        >
          <LayoutGroup id="tools-row">
            {interactive ? (
              // Escritorio: TODAS las chips en una sola fila, dentro de un bloque de
              // ancho fijo y centrado.
              // - flexWrap:'nowrap' → ninguna chip salta nunca de línea, que era la
              //   causa del movimiento descontrolado al pasar el cursor rápido.
              // - Bloque de ancho fijo centrado → el borde izquierdo no se mueve al
              //   expandir una chip; solo se desplazan sus vecinas de la derecha,
              //   ocupando la holgura reservada a la derecha de la fila.
              <div style={{ width: 'min(940px, 100%)', margin: '0 auto' }}>
                <motion.div
                  layout
                  transition={CHIP_TRANSITION}
                  style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-start', gap: 12 }}
                >
                  {TOOLS.map((tool, i) => (
                    <ToolChip
                      key={tool.name}
                      tool={tool}
                      active={isActive(i)}
                      interactive={interactive}
                      onActivate={() => setActive(i)}
                      onDeactivate={() => setActive(null)}
                    />
                  ))}
                </motion.div>
              </div>
            ) : (
              <motion.div
                layout
                transition={CHIP_TRANSITION}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: isMobile ? 10 : 12,
                }}
              >
                {TOOLS.map((tool, i) => (
                  <ToolChip
                    key={tool.name}
                    tool={tool}
                    active={isActive(i)}
                    interactive={interactive}
                    onActivate={() => setActive(i)}
                    onDeactivate={() => setActive(null)}
                  />
                ))}
              </motion.div>
            )}
          </LayoutGroup>
        </motion.div>
      </div>
    </section>
  )
}
