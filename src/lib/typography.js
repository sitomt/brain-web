// Typographic scale — single source of truth for type styles.
// Keeps Instrument Serif (display) + DM Sans (body) + Syne Mono (labels),
// refined into a consistent rhythm (size / weight / tracking / leading).
//
// Hierarchy is driven by weight and colour as much as size — large display
// type stays tightly tracked; body copy is capped to ~62ch for readability.

const SERIF = "'Instrument Serif', serif"
const SANS = "'DM Sans', sans-serif"
const MONO = "'Syne Mono', monospace"

export const FONT = { serif: SERIF, sans: SANS, mono: MONO }

// Display / headings (serif)
export const display = {
  fontFamily: SERIF,
  fontSize: 'clamp(2.6rem, 6vw, 5rem)',
  lineHeight: 1.04,
  letterSpacing: '-0.015em',
  margin: 0,
}

export const h1 = {
  fontFamily: SERIF,
  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
  lineHeight: 1.06,
  letterSpacing: '-0.012em',
  margin: 0,
}

export const h2 = {
  fontFamily: SERIF,
  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
  lineHeight: 1.08,
  letterSpacing: '-0.01em',
  margin: 0,
}

export const h3 = {
  fontFamily: SERIF,
  fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)',
  lineHeight: 1.15,
  letterSpacing: '-0.005em',
  margin: 0,
}

// Body (sans)
export const bodyLg = {
  fontFamily: SANS,
  fontWeight: 300,
  fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
  lineHeight: 1.65,
  letterSpacing: '0.005em',
  maxWidth: '62ch',
  margin: 0,
}

export const body = {
  fontFamily: SANS,
  fontWeight: 300,
  fontSize: '1rem',
  lineHeight: 1.7,
  letterSpacing: '0.005em',
  maxWidth: '62ch',
  margin: 0,
}

export const bodySm = {
  fontFamily: SANS,
  fontWeight: 300,
  fontSize: '0.9rem',
  lineHeight: 1.65,
  margin: 0,
}

// Small mono label (eyebrows handled by Eyebrow component)
export const monoLabel = {
  fontFamily: MONO,
  fontSize: '0.66rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
}
