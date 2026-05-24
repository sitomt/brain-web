// Eyebrow tag — a small, uppercase, wide-tracked label that precedes
// section headlines. Two visual variants: pill (with hairline border)
// and minimal (text-only with optional leading dash).

export default function Eyebrow({
  children,
  variant = 'minimal',
  tone = 'dark',
  style = {},
}) {
  const isLight = tone === 'light'

  if (variant === 'pill') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 12px',
          borderRadius: 999,
          border: `1px solid ${isLight ? 'rgba(255,255,255,0.12)' : 'rgba(26,24,20,0.12)'}`,
          background: isLight ? 'rgba(255,255,255,0.04)' : 'rgba(26,24,20,0.03)',
          fontFamily: "'Syne Mono', monospace",
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(26,24,20,0.55)',
          whiteSpace: 'nowrap',
          ...style,
        }}
      >
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: 999,
            background: 'linear-gradient(135deg,#4361EE,#F72585)',
            flexShrink: 0,
          }}
        />
        {children}
      </span>
    )
  }

  // minimal variant — flat text with leading dash
  return (
    <span
      style={{
        fontFamily: "'Syne Mono', monospace",
        fontSize: '0.72rem',
        color: isLight ? 'rgba(255,255,255,0.4)' : 'rgba(26,24,20,0.4)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        display: 'inline-block',
        ...style,
      }}
    >
      <span style={{ opacity: 0.6, marginRight: '0.5em' }}>—</span>
      {children}
    </span>
  )
}
