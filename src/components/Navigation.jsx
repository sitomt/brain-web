import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { ArrowRight } from './icons/ArrowIcon'

const SCROLL_LINKS = [
  { label: 'Soluciones', target: 'products' },
  { label: 'Casos',      target: 'cases' },
]

const THEMES = {
  hero: {
    bg: 'rgba(250,248,243,0.85)',
    logoColor: '#1A1814',
    linkColor: '#1A1814',
    btnBorder: '#1A1814',
    btnText: '#1A1814',
    border: 'rgba(0,0,0,0.06)',
  },
  problem: {
    bg: 'rgba(10,10,10,0.7)',
    logoColor: '#ffffff',
    linkColor: 'rgba(255,255,255,0.8)',
    btnBorder: 'rgba(255,255,255,0.8)',
    btnText: '#ffffff',
    border: 'rgba(255,255,255,0.06)',
  },
  products: {
    bg: 'rgba(10,10,10,0.7)',
    logoColor: '#ffffff',
    linkColor: 'rgba(255,255,255,0.8)',
    btnBorder: 'rgba(255,255,255,0.8)',
    btnText: '#ffffff',
    border: 'rgba(255,255,255,0.06)',
  },
  cases: {
    bg: 'rgba(10,10,10,0.7)',
    logoColor: '#ffffff',
    linkColor: 'rgba(255,255,255,0.8)',
    btnBorder: 'rgba(255,255,255,0.8)',
    btnText: '#ffffff',
    border: 'rgba(255,255,255,0.06)',
  },
  cta: {
    bg: 'rgba(0,0,0,0.3)',
    logoColor: '#ffffff',
    linkColor: '#ffffff',
    btnBorder: '#ffffff',
    btnText: '#ffffff',
    border: 'rgba(255,255,255,0.06)',
  },
}

export default function Navigation({ visible, onChatOpen }) {
  const [activeSection, setActiveSection] = useState('hero')
  const [btnHovered, setBtnHovered] = useState(false)
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleScrollLink = (target) => {
    if (isHome) {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${target}`
    }
  }

  useEffect(() => {
    const sectionIds = ['hero', 'problem', 'products', 'cases', 'cta']
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const theme = isHome ? (THEMES[activeSection] ?? THEMES.hero) : THEMES.problem

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isMobile ? '0 1rem' : '0 2rem',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        background: theme.bg,
        borderBottom: `1px solid ${theme.border}`,
        transition: 'all 0.6s ease',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); window.location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : window.location.href = '/' }}
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 0 }}
      >
        <span style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '1.05rem',
          letterSpacing: '0.05em',
          color: theme.logoColor,
          transition: 'color 0.6s ease',
        }}>
          br
        </span>
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '1.05rem',
            letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          [AI]
        </span>
        <span style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '1.05rem',
          letterSpacing: '0.05em',
          color: theme.logoColor,
          transition: 'color 0.6s ease',
        }}>
          n.
        </span>
      </a>

      {/* Links + CTA */}
      <div style={{ display: 'flex', gap: isMobile ? '0.75rem' : '2rem', alignItems: 'center' }}>
        {!isMobile && SCROLL_LINKS.map(({ label, target }) => (
          <button
            key={label}
            onClick={() => handleScrollLink(target)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: theme.linkColor,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity 0.2s, color 0.6s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
          >
            {label}
          </button>
        ))}
        {!isMobile && (
          <button
            onClick={() => navigate('/nosotros')}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: location.pathname === '/nosotros' ? '#fff' : theme.linkColor,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: location.pathname === '/nosotros' ? 1 : 0.7,
              transition: 'opacity 0.2s, color 0.6s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = location.pathname === '/nosotros' ? 1 : 0.7)}
          >
            Nosotros
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0 : 12 }}>
          <button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            onClick={onChatOpen}
            style={{
              position: 'relative',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              paddingLeft: isMobile ? 14 : 18,
              paddingRight: 4,
              height: isMobile ? 38 : 44,
              borderRadius: 999,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1.5px solid',
              borderColor: btnHovered ? 'transparent' : theme.btnBorder,
              background: 'transparent',
              color: btnHovered ? '#ffffff' : theme.btnText,
              overflow: 'hidden',
              transition: 'color 0.3s cubic-bezier(0.32,0.72,0,1), border-color 0.3s cubic-bezier(0.32,0.72,0,1)',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 999,
                background: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
                opacity: btnHovered ? 1 : 0,
                transition: 'opacity 0.35s cubic-bezier(0.32,0.72,0,1)',
                zIndex: 0,
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>Probar el asistente</span>
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                width: isMobile ? 28 : 32,
                height: isMobile ? 28 : 32,
                borderRadius: 999,
                background: btnHovered ? 'rgba(255,255,255,0.18)' : theme.btnBorder.includes('255') ? 'rgba(255,255,255,0.08)' : 'rgba(26,24,20,0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'currentColor',
                flexShrink: 0,
                transition: 'background 0.3s cubic-bezier(0.32,0.72,0,1)',
              }}
            >
              <ArrowRight size={isMobile ? 12 : 13} />
            </span>
          </button>
        </div>

      </div>
    </motion.nav>
  )
}
