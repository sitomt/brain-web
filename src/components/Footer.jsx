import { Link, useNavigate, useLocation } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { BRAND, ACCENT } from '../lib/tokens'
import { openBooking } from '../lib/booking'
import { EMAIL, PHONE, PHONE_TEL } from '../lib/site'
import { CTA_LABEL } from '../lib/cta'
import CtaButton from './CtaButton'

const GRADIENT = BRAND.gradient

// Section anchors live on the home route.
const NAV_LINKS = [
  { label: 'Enfoque',             id: 'enfoque' },
  { label: 'Cómo trabajamos',     id: 'proceso' },
  { label: 'Programa Fundadores', id: 'fundadores' },
  { label: 'Integraciones',       id: 'integraciones' },
  { label: 'Preguntas',           id: 'faq' },
]

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const linkBase = {
  background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left',
  fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease',
  width: 'fit-content', lineHeight: 1.5,
}
const onEnter = (e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.92)')
const onLeave = (e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')

const colTitle = {
  fontFamily: "'Syne Mono',monospace", fontSize: '0.7rem', letterSpacing: '0.18em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.1rem',
}

function BrandMark({ size = '1.15rem' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: size, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.85)' }}>sito</span>
      <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: size, letterSpacing: '0.05em', background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>labs</span>
      <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: size, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.85)' }}>.</span>
    </span>
  )
}

export default function Footer({ onOpenLegal, onOpenCookies }) {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const year = new Date().getFullYear()

  // The section anchors only exist on the home route. From any other route we
  // navigate home first and then scroll once it has mounted, so the footer nav
  // behaves identically everywhere on the site.
  const goToSection = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 350)
    }
  }

  const legalLinks = [
    { label: 'Aviso legal',       action: () => onOpenLegal('aviso') },
    { label: 'Privacidad',        action: () => onOpenLegal('privacidad') },
    { label: 'Cookies',           action: () => onOpenLegal('cookies') },
    { label: 'Gestionar cookies', action: onOpenCookies },
  ]

  return (
    <footer style={{ background: '#07070A', position: 'relative' }}>
      {/* Gradient hairline crowning the footer */}
      <div aria-hidden style={{ height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT}66, transparent)` }} />

      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: isMobile ? '3.25rem 1.25rem 2rem' : '4.5rem 2rem 2rem',
        }}
      >
        {/* Top grid: brand + link columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.7fr 1fr 1fr 1.2fr',
            gap: isMobile ? '2.75rem' : '3rem',
          }}
        >
          {/* Brand block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', maxWidth: 360 }}>
            <Link to="/" onClick={toTop} style={{ textDecoration: 'none', width: 'fit-content' }} aria-label="Sito Labs — inicio">
              <BrandMark size="1.3rem" />
            </Link>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              La IA que ya usamos en nuestros negocios, puesta a trabajar en el tuyo. Sito Labs, Murcia.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: ACCENT, boxShadow: `0 0 10px ${ACCENT}`, flexShrink: 0 }} />
              Murcia · España
            </span>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del sitio" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={colTitle}>Navega</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {NAV_LINKS.map(({ label, id }) => (
                <button key={id} onClick={() => goToSection(id)} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                  {label}
                </button>
              ))}
              <Link to="/nosotros" style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                Nuestra historia
              </Link>
            </div>
          </nav>

          {/* Legal */}
          <nav aria-label="Enlaces legales" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={colTitle}>Legal</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {legalLinks.map(({ label, action }) => (
                <button key={label} onClick={action} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                  {label}
                </button>
              ))}
            </div>
          </nav>

          {/* Contacto */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={colTitle}>Contacto</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'flex-start' }}>
              <a href={`mailto:${EMAIL}`} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                {EMAIL}
              </a>
              <a href={`tel:${PHONE_TEL}`} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>
                {PHONE}
              </a>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
                Respondemos en menos de 24 h
              </span>
              <div style={{ marginTop: '0.4rem' }}>
                <CtaButton variant="light" size="md" onClick={() => openBooking('footer')}>{CTA_LABEL}</CtaButton>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: isMobile ? '2.5rem 0 1.5rem' : '3.5rem 0 1.75rem' }} />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '1rem' : '1rem',
            textAlign: 'center',
          }}
        >
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.32)' }}>
            © {year} Sito Labs · Agencia de Inteligencia Artificial. Todos los derechos reservados.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1.25rem' : '1.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.32)' }}>
              Hecho en Murcia
              <span style={{ width: 6, height: 6, borderRadius: 999, background: GRADIENT, flexShrink: 0 }} />
            </span>
            <button
              onClick={toTop}
              aria-label="Volver arriba"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Syne Mono',monospace", fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', padding: 0, transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              Arriba ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
