// Escala tipográfica: 5 tamaños, cero fontSize inline en componentes.
// Instrument Serif (display) + DM Sans (body) + Syne Mono (label).

const SERIF = "'Instrument Serif', serif"
const SANS = "'DM Sans', sans-serif"
const MONO = "'Syne Mono', monospace"

export const FONT = { serif: SERIF, sans: SANS, mono: MONO }

// Solo H1 del hero y titular del cierre.
export const display = {
  fontFamily: SERIF,
  fontSize: 'clamp(2.75rem, 5.2vw, 4.5rem)',
  lineHeight: 1.02,
  letterSpacing: '-0.015em',
  margin: 0,
}

// Título de sección.
export const h2 = {
  fontFamily: SERIF,
  fontSize: 'clamp(2rem, 3.4vw, 3rem)',
  lineHeight: 1.06,
  letterSpacing: '-0.01em',
  margin: 0,
  maxWidth: '18ch',
}

// Pasos, preguntas, nombres de negocio.
export const h3 = {
  fontFamily: SERIF,
  fontSize: '1.375rem',
  lineHeight: 1.2,
  margin: 0,
}

// Texto corrido. Peso 400: el 300 solo funciona por encima de 18 px.
export const body = {
  fontFamily: SANS,
  fontWeight: 400,
  fontSize: '1.0625rem',
  lineHeight: 1.6,
  margin: 0,
  maxWidth: '60ch',
}

// Subtítulo del hero (única excepción con peso 300, porque supera los 18 px).
export const bodyLg = {
  fontFamily: SANS,
  fontWeight: 300,
  fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
  lineHeight: 1.55,
  margin: 0,
  maxWidth: '44ch',
}

// Eyebrows, notas, números, metadatos. Nunca por debajo de 12 px.
export const label = {
  fontFamily: MONO,
  fontSize: '0.75rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
}

// Alias para compatibilidad con componentes existentes.
export const monoLabel = label
export const bodySm = { ...body, fontSize: '0.95rem' }
