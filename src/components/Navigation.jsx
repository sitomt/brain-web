import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import CtaButton from './CtaButton'
import BrandLockup from './Brand'
import { EASE } from '../lib/motion'
import { openBooking } from '../lib/booking'
import { CTA_LABEL } from '../lib/cta'

// Navegación: 2 enlaces + CTA único. En móvil: logo + CTA compacto, sin hamburguesa.
const LINKS = [
  { label: 'Cómo trabajamos', target: 'proceso' },
  { label: 'Fundadores', target: 'fundadores' },
]

// Secciones oscuras: la píldora adapta el contraste.
const DARK_SECTIONS = ['proceso', 'fundadores', 'cta']

const LIGHT_THEME = { pillBg: 'rgba(250,248,243,0.75)', text: '#1A1814', hairline: 'rgba(26,24,20,0.10)' }
const DARK_THEME = { pillBg: 'rgba(18,18,20,0.6)', text: '#ffffff', hairline: 'rgba(255,255,255,0.12)' }


export default function Navigation() {
  const [isDark, setIsDark] = useState(false)
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const goTo = (e, target) => {
    e.preventDefault()
    const el = document.getElementById(target)
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', `#${target}`); return }
    navigate('/')
    let n = 0
    const tryScroll = () => {
      const t = document.getElementById(target)
      if (t) t.scrollIntoView({ behavior: 'smooth' })
      else if (n++ < 30) requestAnimationFrame(tryScroll)
    }
    tryScroll()
  }

  useEffect(() => {
    if (!isHome) { requestAnimationFrame(() => setIsDark(true)); return }
    const navTop = isMobile ? 12 : 16
    const navBottom = navTop + (isMobile ? 52 : 60)
    let raf = null
    const check = () => {
      const dark = DARK_SECTIONS.some((id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const { top, bottom } = el.getBoundingClientRect()
        return top < navBottom && bottom > navTop
      })
      setIsDark(dark)
    }
    const onScroll = () => { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(check) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    raf = requestAnimationFrame(check)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', check); if (raf) cancelAnimationFrame(raf) }
  }, [isHome, isMobile])

  const theme = isDark ? DARK_THEME : LIGHT_THEME

  const goHome = (e) => {
    e.preventDefault()
    if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
    else { navigate('/'); window.scrollTo({ top: 0 }) }
  }

  return (
    <header>
      <a href="#main" className="skip-link">Saltar al contenido</a>
      <motion.nav
        aria-label="Principal"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: 'fixed',
          top: isMobile ? 'calc(12px + env(safe-area-inset-top))' : 16,
          left: isMobile ? 12 : 20, right: isMobile ? 12 : 20,
          marginLeft: 'auto', marginRight: 'auto', maxWidth: 1080, zIndex: 100,
          height: isMobile ? 52 : 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '0 6px 0 16px' : '0 8px 0 24px',
          borderRadius: 999,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          background: theme.pillBg, border: `1px solid ${theme.hairline}`,
          boxShadow: '0 18px 40px -24px rgba(0,0,0,0.45)',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <a href="/" onClick={goHome} style={{ textDecoration: 'none' }} aria-label="Sito Labs — inicio">
          <BrandLockup icon={isMobile ? 26 : 28} size={isMobile ? '1.3rem' : '1.45rem'} color={theme.text} />
        </a>

        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '2rem', alignItems: 'center' }}>
          {!isMobile && LINKS.map(({ label, target }) => (
            <a
              key={target}
              href={`#${target}`}
              onClick={(e) => goTo(e, target)}
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: theme.text, opacity: 0.75, textDecoration: 'none', transition: 'opacity 0.2s, color 0.3s', padding: '8px 0' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.75)}
            >
              {label}
            </a>
          ))}
          <CtaButton onClick={() => openBooking('navbar')} variant={isDark ? 'light' : 'ghost'} size="md" arrow={isMobile ? 'none' : 'right'} style={isMobile ? { height: 40, paddingLeft: 14, paddingRight: 14, fontSize: '0.88rem' } : undefined}>
            {isMobile ? 'Agendar llamada' : CTA_LABEL}
          </CtaButton>
        </div>
      </motion.nav>
    </header>
  )
}
