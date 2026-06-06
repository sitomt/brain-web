// Design tokens — single source of truth for visual constants.
//
// PALETTE POLICY ("gradient with discipline"):
// The multicolour BRAND.gradient is the brand signature but must appear at
// most 1–2 times per viewport (logo + one highlighted element / CTA hover).
// For everything else (numbers, dots, small accents) use ACCENT or INK.

export const BRAND = {
  gradient: 'linear-gradient(135deg, #4361EE, #7209B7, #F72585, #FB5607)',
  colors: {
    blue: '#4361EE',
    purple: '#7209B7',
    magenta: '#F72585',
    orange: '#FB5607',
    cyan: '#22D3EE',
  },
}

// Single restrained accent for minor uses where the gradient would be overkill.
export const ACCENT = '#4361EE'

export const SURFACE = {
  cream: '#FAF8F3',
  creamCard: '#FEFCF7',
  ink: '#1A1814',
  // Off-black, never pure black. One canonical dark used across dark sections.
  dark: '#0A0A0B',
  darkAlt: '#0D0D10',
  cardLight: '#FFFFFF',
  cardDark: '#1A1814',
  hairlineLight: 'rgba(26,24,20,0.08)',
  hairlineDark: 'rgba(255,255,255,0.08)',
}

export const RADIUS = {
  pill: 999,
  control: 12,
  cardInner: 20,
  card: 24,
  cardOuter: 32,
}

// Diffusion shadows — wide, soft, tinted to the surface (no harsh dark drops).
export const SHADOW = {
  cardLight: '0 1px 2px rgba(26,24,20,0.03), 0 20px 40px -24px rgba(26,24,20,0.10)',
  cardLightHover: '0 1px 2px rgba(26,24,20,0.04), 0 28px 56px -28px rgba(26,24,20,0.16)',
  cardDark: '0 1px 2px rgba(0,0,0,0.4), 0 24px 56px -28px rgba(0,0,0,0.6)',
  insetHighlight: 'inset 0 1px 0 rgba(255,255,255,0.85)',
  insetHighlightDark: 'inset 0 1px 0 rgba(255,255,255,0.05)',
}

export const SPACING = {
  sectionPyDesktop: '7.5rem',
  sectionPyMobile: '4.5rem',
  sectionPx: '2rem',
  sectionPxMobile: '1.25rem',
  maxWidth: 1180,
}

// Reusable gradient-text style — use sparingly (the one "gradient moment").
export const gradientText = {
  background: BRAND.gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}
