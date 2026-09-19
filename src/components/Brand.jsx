import { BRAND, SURFACE } from '../lib/tokens'

// Marca Sito Labs («La firma»): icono «s.» en cuadrado + wordmark «sitolabs.»
// en Instrument Serif. «labs» lleva el degradado de la casa; el punto, magenta.
// `size` es la altura del icono en px; el wordmark se escala en proporción.

const MAG = BRAND.colors.magenta

export function BrandIcon({ size = 28, tone = 'ink', style = {} }) {
  // tone: 'ink' (cuadrado tinta, s crema) · 'cream' (cuadrado crema, s tinta) · 'mag'
  const bg = tone === 'cream' ? SURFACE.cream : tone === 'mag' ? MAG : SURFACE.ink
  const fg = tone === 'cream' ? SURFACE.ink : SURFACE.cream
  const dot = tone === 'mag' ? SURFACE.cream : MAG
  return (
    <span
      aria-hidden="true"
      style={{
        width: size, height: size, borderRadius: size * 0.22, background: bg, color: fg,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', lineHeight: 1,
        ...style,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'baseline', gap: size * 0.035, transform: 'translate(-2%,-6%)', fontSize: size * 0.93 }}>
        <span>s</span>
        <span style={{ width: size * 0.12, height: size * 0.12, borderRadius: '50%', background: dot, marginBottom: size * 0.015 }} />
      </span>
    </span>
  )
}

export function BrandWordmark({ size = '1.25rem', color = SURFACE.ink }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: "'Instrument Serif', serif", fontSize: size, letterSpacing: '-0.01em', lineHeight: 1, whiteSpace: 'nowrap' }}>
      <span style={{ color, transition: 'color 0.3s' }}>sito</span>
      <span data-gradient-text style={{ background: BRAND.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>labs</span>
      <span style={{ color: MAG }}>.</span>
    </span>
  )
}

export default function BrandLockup({ icon = 28, size = '1.35rem', color = SURFACE.ink, tone, gap = 10 }) {
  // Sin `tone`, el icono contrasta con el color del texto: texto claro → cuadrado crema.
  const iconTone = tone ?? (isLight(color) ? 'cream' : 'ink')
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <BrandIcon size={icon} tone={iconTone} />
      <BrandWordmark size={size} color={color} />
    </span>
  )
}

function isLight(c) {
  return /^#(f|e)/i.test(c) || /255\s*,\s*255/.test(c) || c === 'white'
}
