import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { ArrowRight } from './icons/ArrowIcon'
import { BRAND } from '../lib/tokens'
import { EASE_PREMIUM } from '../lib/motion'

const SCROLL_LINKS = [
  { label: 'Enfoque', target: 'enfoque' },
  { label: 'Soluciones', target: 'products' },
  { label: 'Casos', target: 'cases' },
]

// Sections are either light (cream) or dark — the floating pill adapts contrast.
const DARK_SECTIONS = new Set(['enfoque', 'herramientas', 'proceso', 'cases', 'cta'])

const LIGHT_THEME = {
  pillBg: 'rgba(250,248,243,0.72)',
  text: '#1A1814',
  hairline: 'rgba(26,24,20,0.10)',
  innerBg: 'rgba(26,24,20,0.05)',
}
const DARK_THEME = {
  pillBg: 'rgba(18,18,20,0.55)',
  text: '#ffffff',
  hairline: 'rgba(255,255,255,0.12)',
  innerBg: 'rgba(255,255,255,0.10)',
}

function Logo({ color }) {
  return (
    <span style={{ display: 'flex', alignItems: 'baseline', gap: 0, transition: 'color 0.08s' }}>
      <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '1.05rem', letterSpacing: '0.04em', color }}>br</span>
      <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '1.05rem', letterSpacing: '0.04em', background: BRAND.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>[AI]</span>
      <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: '1.05rem', letterSpacing: '0.04em', color }}>n.</span>
    </span>
  )
}

export default function Navigation({ visible, onChatOpen }) {
  const [isDark, setIsDark] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleScrollLink = (target) => {
    setMenuOpen(false)
    if (isHome) {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.assign(`/#${target}`)
    }
  }

  // Lock body scroll while the mobile menu overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Pixel-perfect theme: check if any dark section physically overlaps the navbar.
  useEffect(() => {
    if (!isHome) return
    const DARK_IDS = [...DARK_SECTIONS]
    const navTop = isMobile ? 12 : 16
    const navBottom = navTop + (isMobile ? 54 : 60)

    let rafId = null
    const check = () => {
      const dark = DARK_IDS.some((id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const { top, bottom } = el.getBoundingClientRect()
        return top < navBottom && bottom > navTop
      })
      setIsDark(dark)
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(check)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    check()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', check)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isHome, isMobile])

  const theme = isHome ? (isDark ? DARK_THEME : LIGHT_THEME) : DARK_THEME

  const goHome = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
    else window.location.assign('/')
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        style={{
          position: 'fixed',
          top: isMobile ? 'calc(12px + env(safe-area-inset-top))' : 16,
          left: isMobile ? 12 : 20,
          right: isMobile ? 12 : 20,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'auto',
          maxWidth: 1080,
          zIndex: 100,
          height: isMobile ? 54 : 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 8px 0 18px' : '0 8px 0 24px',
          borderRadius: 999,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: theme.pillBg,
          border: `1px solid ${theme.hairline}`,
          boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 18px 40px -24px rgba(0,0,0,0.45)',
          transition: 'background 0.08s, border-color 0.08s',
        }}
      >
        {/* Logo */}
        <a href="/" onClick={goHome} style={{ textDecoration: 'none' }} aria-label="BrAIn — inicio">
          <Logo color={theme.text} />
        </a>

        {/* Desktop links + CTA */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {SCROLL_LINKS.map(({ label, target }) => (
              <button
                key={label}
                onClick={() => handleScrollLink(target)}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.8rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: theme.text,
                  background: 'none', border: 'none', cursor: 'pointer', opacity: 0.72,
                  transition: 'opacity 0.2s, color 0.08s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.72)}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); navigate('/nosotros') }}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.8rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: theme.text, background: 'none', border: 'none', cursor: 'pointer',
                opacity: location.pathname === '/nosotros' ? 1 : 0.72,
                transition: 'opacity 0.2s, color 0.08s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = location.pathname === '/nosotros' ? 1 : 0.72)}
            >
              Nosotros
            </button>

            <button
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              onClick={onChatOpen}
              style={{
                position: 'relative', fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                fontSize: '0.9rem', paddingLeft: 18, paddingRight: 4, height: 44, borderRadius: 999,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                border: `1.5px solid ${btnHovered ? 'transparent' : theme.hairline}`,
                background: 'transparent', color: theme.text, overflow: 'hidden',
                transition: 'color 0.3s, border-color 0.3s', whiteSpace: 'nowrap',
              }}
            >
              <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: BRAND.gradient, opacity: btnHovered ? 1 : 0, transition: 'opacity 0.35s cubic-bezier(0.32,0.72,0,1)', zIndex: 0 }} />
              <span style={{ position: 'relative', zIndex: 1, color: btnHovered ? '#fff' : theme.text, transition: 'color 0.3s' }}>Habla con nuestra IA</span>
              <span style={{ position: 'relative', zIndex: 1, width: 32, height: 32, borderRadius: 999, background: btnHovered ? 'rgba(255,255,255,0.2)' : theme.innerBg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: btnHovered ? '#fff' : theme.text, flexShrink: 0, transition: 'background 0.3s, color 0.3s' }}>
                <ArrowRight size={13} />
              </span>
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            style={{
              width: 44, height: 44, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: theme.innerBg, display: 'inline-flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 5, flexShrink: 0,
              transition: 'background 0.08s',
            }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_PREMIUM }}
              style={{ width: 17, height: 1.5, background: menuOpen ? '#fff' : theme.text, borderRadius: 2, display: 'block', transition: 'background 0.08s' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_PREMIUM }}
              style={{ width: 17, height: 1.5, background: menuOpen ? '#fff' : theme.text, borderRadius: 2, display: 'block', transition: 'background 0.08s' }}
            />
          </button>
        )}
      </motion.nav>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(10,10,11,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '6rem 2rem 3rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[...SCROLL_LINKS, { label: 'Nosotros', target: '__nosotros' }].map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: EASE_PREMIUM }}
                  onClick={() => item.target === '__nosotros' ? (setMenuOpen(false), navigate('/nosotros')) : handleScrollLink(item.target)}
                  style={{
                    textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Instrument Serif', serif", fontSize: '2.4rem', color: '#fff',
                    padding: '0.4rem 0', lineHeight: 1.1,
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE_PREMIUM }}
              onClick={() => { setMenuOpen(false); onChatOpen() }}
              style={{
                marginTop: '2.5rem', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 10,
                height: 52, paddingLeft: 24, paddingRight: 6, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: BRAND.gradient, color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '1rem',
              }}
            >
              Habla con nuestra IA
              <span style={{ width: 38, height: 38, borderRadius: 999, background: 'rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight size={15} />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
