import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import Eyebrow from './Eyebrow'
import CtaButton from './CtaButton'
import { BRAND, ACCENT, gradientText } from '../lib/tokens'
import { EASE_PREMIUM } from '../lib/motion'
import { FOUNDERS, spotsTaken } from '../lib/founders'

// Banda de OFERTA del Programa Fundadores — la mitad transaccional (precio,
// plazas, CTA). La HISTORIA vive arriba, en Enfoque; aquí, cerca de la
// conversión, va la llamada a la acción. Banda crema entre dos secciones
// oscuras (Clientes y CtaFinal). Se apaga con FOUNDERS.active = false.

const VENTAJAS = [
  { label: 'Precio fundador', line: `El más bajo que existirá. Cuando se cierren las ${FOUNDERS.spotsTotal} plazas, sube y no vuelve.` },
  { label: 'Trato directo', line: 'Hablas con el equipo que construye, no con un comercial. Acceso directo, siempre.' },
  { label: 'Prioridad', line: 'Eres de los primeros: vas por delante en tiempo, en cola y en atención.' },
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay, ease: EASE_PREMIUM },
})

export default function FoundersOffer({ onChatOpen }) {
  const isMobile = useIsMobile()
  if (!FOUNDERS.active) return null

  const pct = Math.round((spotsTaken() / FOUNDERS.spotsTotal) * 100)

  const handleClaim = () => {
    onChatOpen()
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('chat:send', { detail: { message: FOUNDERS.chatPrefill } })
      )
    }, 450)
  }

  return (
    <section
      id="fundadores"
      style={{
        background: '#FAF8F3',
        padding: isMobile ? '4.5rem 1.25rem' : '7rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '6rem',
      }}
    >
      {/* aura cálida muy sutil */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 760,
          height: 760,
          background: 'radial-gradient(circle at center, rgba(247,37,133,0.05), transparent 62%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
        <motion.div {...reveal(0)}>
          <Eyebrow variant="pill" tone="dark">Programa Fundadores</Eyebrow>
        </motion.div>

        <motion.h2
          {...reveal(0.05)}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(1.9rem, 4vw, 2.9rem)',
            color: '#1A1814',
            lineHeight: 1.12,
            margin: '1.1rem 0 0',
          }}
        >
          Acompáñanos desde el principio.{' '}
          <em style={{ ...gradientText, fontStyle: 'italic' }}>Entra como fundador.</em>
        </motion.h2>

        <motion.p
          {...reveal(0.12)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: isMobile ? '1.02rem' : '1.1rem',
            color: 'rgba(26,24,20,0.72)',
            lineHeight: 1.65,
            margin: '1.5rem 0 0',
          }}
        >
          Quedan pocas plazas de las {FOUNDERS.spotsTotal} primeras. Por ser de los
          primeros te tratamos como tal — y cuando se cierren, el precio sube y no vuelve.
        </motion.p>

        {/* Las tres ventajas */}
        <motion.div
          {...reveal(0.18)}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '1.1rem' : '1.75rem',
            margin: '2.25rem 0 0',
          }}
        >
          {VENTAJAS.map((v) => (
            <div key={v.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1A1814' }}>
                  {v.label}
                </span>
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.92rem', color: 'rgba(26,24,20,0.62)', lineHeight: 1.55 }}>
                {v.line}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Contador + barra de progreso */}
        <motion.div {...reveal(0.24)} style={{ margin: '2.5rem 0 0', maxWidth: 420 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9, gap: 12 }}>
            <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.74rem', letterSpacing: '0.1em', color: 'rgba(26,24,20,0.6)' }}>
              Quedan {FOUNDERS.spotsLeft} de {FOUNDERS.spotsTotal} plazas
            </span>
            <span style={{ ...gradientText, fontFamily: "'Syne Mono', monospace", fontSize: '0.74rem', letterSpacing: '0.1em' }}>
              {FOUNDERS.discountLabel} dto.
            </span>
          </div>
          <div style={{ position: 'relative', height: 6, borderRadius: 999, background: 'rgba(26,24,20,0.08)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.2 }}
              style={{ position: 'absolute', inset: 0, width: `${pct}%`, borderRadius: 999, background: BRAND.gradient }}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...reveal(0.3)} style={{ margin: '2rem 0 0', display: 'flex', alignItems: 'center', gap: '1.1rem', flexWrap: 'wrap' }}>
          <CtaButton onClick={handleClaim} variant="solid" arrow="right" size="lg">
            Quiero mi plaza fundador
          </CtaButton>
          <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.05em', color: 'rgba(26,24,20,0.5)' }}>
            Sin permanencia · el precio solo sube desde aquí
          </span>
        </motion.div>
      </div>
    </section>
  )
}
