import useIsMobile from '../hooks/useIsMobile'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

export default function Footer({ onOpenLegal, onOpenCookies }) {
  const isMobile = useIsMobile()

  return (
    <footer style={{
      background: '#07070A',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: isMobile ? '2rem 1.25rem' : '2.5rem 2rem',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem',
        textAlign: isMobile ? 'center' : 'left',
      }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '1rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>br</span>
            <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '1rem', letterSpacing: '0.05em', background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>[AI]</span>
            <span style={{ fontFamily: "'Syne Mono',monospace", fontSize: '1rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>n.</span>
          </span>
          <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.75rem' }}>·</span>
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 300,
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.25)',
          }}>
            © {new Date().getFullYear()} Todos los derechos reservados
          </span>
        </div>

        {/* Legal links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '1rem' : '1.5rem',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Aviso legal',        action: () => onOpenLegal('aviso') },
            { label: 'Privacidad', action: () => onOpenLegal('privacidad') },
            { label: 'Cookies',    action: () => onOpenLegal('cookies') },
            { label: 'Gestionar cookies',      action: onOpenCookies },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 300,
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.3)',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
            >
              {label}
            </button>
          ))}
        </nav>

      </div>
    </footer>
  )
}
