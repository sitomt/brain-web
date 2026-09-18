import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'
import { BRAND } from '../lib/tokens'
import { EMAIL } from '../lib/site'

// Pie de una fila: logo · Murcia · email · legales · historia.
const linkBase = {
  background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer',
  fontFamily: "'DM Sans',sans-serif", fontWeight: 400, fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.6)', textDecoration: 'none', lineHeight: 1.4,
}

export function BrandMark({ size = '1.15rem', color = 'rgba(255,255,255,0.9)' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: "'Syne Mono',monospace", fontSize: size, letterSpacing: '0.05em' }}>
      <span style={{ color }}>sito</span>
      <span data-gradient-text style={{ background: BRAND.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>labs</span>
      <span style={{ color }}>.</span>
    </span>
  )
}

export default function Footer({ onOpenLegal, onOpenCookies }) {
  const isMobile = useIsMobile()
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#0A0A0B', borderTop: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? '1.75rem 1.25rem calc(1.75rem + env(safe-area-inset-bottom))' : '2.25rem 2rem' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? '0.75rem' : '2rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.9rem' : '1.25rem', flexWrap: 'wrap' }}>
          <Link to="/" aria-label="Sito Labs — inicio" style={{ textDecoration: 'none' }}><BrandMark size="1.25rem" /></Link>
          <span style={{ ...linkBase, color: 'rgba(255,255,255,0.45)' }}>Murcia · España</span>
          <a href={`mailto:${EMAIL}`} style={linkBase}>{EMAIL}</a>
        </div>
        <nav aria-label="Legal" style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.9rem' : '1.25rem', flexWrap: 'wrap', fontSize: isMobile ? '0.85rem' : undefined }}>
          <button onClick={() => onOpenLegal('aviso')} style={linkBase}>Aviso legal</button>
          <button onClick={() => onOpenLegal('privacidad')} style={linkBase}>Privacidad</button>
          <button onClick={() => onOpenLegal('cookies')} style={linkBase}>Cookies</button>
          {!isMobile && <button onClick={onOpenCookies} style={linkBase}>Gestionar cookies</button>}
          <Link to="/nosotros" style={{ ...linkBase, color: 'rgba(255,255,255,0.85)' }}>Nuestra historia →</Link>
        </nav>
      </div>
      <div style={{ maxWidth: 1180, margin: '1rem auto 0', fontFamily: "'Syne Mono',monospace", fontSize: '0.75rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)' }}>
        © {year} Sito Labs{isMobile ? '' : ' · Agencia de Inteligencia Artificial'}
      </div>
    </footer>
  )
}
