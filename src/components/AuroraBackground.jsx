// Fondo de sección con dos radiales de marca ESTÁTICOS (cero JS, cero capas
// animadas). Antes eran 5 blobs de 1.000 px animados a perpetuidad.
const LIGHT = [
  'radial-gradient(760px 760px at 8% -12%, rgba(67,97,238,0.18), transparent 62%)',
  'radial-gradient(880px 880px at 90% 110%, rgba(247,37,133,0.14), transparent 62%)',
]
const DARK = [
  'radial-gradient(900px 700px at 12% 0%, rgba(67,97,238,0.16), transparent 62%)',
  'radial-gradient(900px 700px at 88% 100%, rgba(247,37,133,0.14), transparent 62%)',
]
const DARK_INTENSE = [
  'radial-gradient(900px 800px at 15% 10%, rgba(67,97,238,0.28), transparent 60%)',
  'radial-gradient(900px 800px at 85% 90%, rgba(247,37,133,0.24), transparent 60%)',
  'radial-gradient(700px 600px at 50% 110%, rgba(251,86,7,0.16), transparent 60%)',
]

export default function AuroraBackground({ children, className = '', intense = false, variant = 'dark', id, style = {} }) {
  const isLight = variant === 'light'
  const baseBg = isLight ? '#FAF8F3' : '#0A0A0B'
  const layers = isLight ? LIGHT : intense ? DARK_INTENSE : DARK

  return (
    <div id={id} className={`relative ${className}`} style={{ background: baseBg, ...style }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: isLight ? 'multiply' : 'normal',
          background: layers.join(','),
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
