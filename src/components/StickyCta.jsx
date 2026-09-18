import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import CtaButton from './CtaButton'
import { WhatsApp } from './icons/brands'
import { EASE } from '../lib/motion'
import { openBooking } from '../lib/booking'
import { WHATSAPP_URL } from '../lib/site'
import { CTA_LABEL } from '../lib/cta'

// Barra fija inferior en móvil: aparece cuando el botón del hero sale del
// viewport y desaparece cuando entra el cierre. Sustituye a la burbuja del chat.
export default function StickyCta() {
  const isMobile = useIsMobile()
  const [heroGone, setHeroGone] = useState(false)
  const [finalVisible, setFinalVisible] = useState(false)

  useEffect(() => {
    if (!isMobile) return
    const hero = document.querySelector('[data-hero-cta]')
    const fin = document.getElementById('cta-final-button')
    if (!hero) return
    const o1 = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 })
    o1.observe(hero)
    let o2
    if (fin) { o2 = new IntersectionObserver(([e]) => setFinalVisible(e.isIntersecting), { threshold: 0.2 }); o2.observe(fin) }
    return () => { o1.disconnect(); o2?.disconnect() }
  }, [isMobile])

  const show = isMobile && heroGone && !finalVisible

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ duration: 0.35, ease: EASE }}
          style={{
            position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 150,
            padding: '10px 12px calc(10px + env(safe-area-inset-bottom))',
            background: 'rgba(10,10,11,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', gap: 8, alignItems: 'center',
          }}
        >
          <CtaButton onClick={() => openBooking('sticky')} variant="light" arrow="right" size="md" style={{ flex: 1, justifyContent: 'space-between', background: '#FAF8F3', color: '#1A1814', border: 'none' }}>
            {CTA_LABEL}
          </CtaButton>
          <a
            href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"
            style={{ width: 48, height: 48, borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <WhatsApp size={22} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
