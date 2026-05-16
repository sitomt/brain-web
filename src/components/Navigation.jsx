import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const links = ['Servicios', 'Casos', 'Nosotros', 'Contacto']

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
  const isMobile = useIsMobile()

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
        // Trigger when the section crosses the vertical center of the viewport
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const theme = THEMES[activeSection] ?? THEMES.hero

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
        padding: '0 2rem',
        height: 64,
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
      <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 0 }}>
        <span style={{
          fontFamily: "'Syne Mono', monospace",
          fontSize: '1.25rem',
          color: theme.logoColor,
          transition: 'color 0.6s ease',
        }}>
          br
        </span>
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '1.25rem',
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
          fontSize: '1.25rem',
          color: theme.logoColor,
          transition: 'color 0.6s ease',
        }}>
          n
        </span>
      </a>

      {/* Links + CTA */}
      <div style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', alignItems: 'center' }}>
        {!isMobile && links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: theme.linkColor,
              textDecoration: 'none',
              opacity: 0.7,
              transition: 'opacity 0.2s, color 0.6s ease',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            {link}
          </a>
        ))}

        <motion.button
          onClick={onChatOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: '0.85rem',
            padding: '8px 20px',
            borderRadius: 999,
            border: `1.5px solid ${theme.btnBorder}`,
            background: 'transparent',
            color: theme.btnText,
            cursor: 'none',
            transition: 'all 0.6s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.border = '1.5px solid transparent'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = theme.btnText
            e.currentTarget.style.border = `1.5px solid ${theme.btnBorder}`
          }}
        >
          Hablamos →
        </motion.button>
      </div>
    </motion.nav>
  )
}
