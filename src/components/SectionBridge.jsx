/**
 * Section transition bridge.
 *
 * Cool, neutral gradient between dark and light sections. Uses OKLab color
 * interpolation so the midpoint stays perceptually clean (no muddy warm
 * browns or yellows that you get from default sRGB interpolation across
 * very different luminances).
 *
 * A subtle blue-purple waypoint at ~35% adds a brand-cohesive tint
 * without introducing any color steps.
 */
export default function SectionBridge({
  direction = 'darkToLight',
  darkColor = '#0D0D10',
  lightColor = '#FAF8F3',
  height = 180,
}) {
  // Two waypoints — cool palette, no warm tones.
  // OKLab interpolation between them is perceptually uniform.
  const cool = '#1A2238'   // deep navy waypoint
  const neutral = '#9C9E9B' // cool desaturated gray

  const stops = direction === 'darkToLight'
    ? `${darkColor} 0%, ${cool} 28%, ${neutral} 62%, ${lightColor} 100%`
    : `${lightColor} 0%, ${neutral} 38%, ${cool} 72%, ${darkColor} 100%`

  return (
    <div
      aria-hidden
      style={{
        position: 'relative',
        height,
        // `in oklab` makes the interpolation perceptually smooth, killing
        // the muddy midpoint that sRGB produces across high-contrast stops.
        // Browsers without support fall back to sRGB.
        background: `linear-gradient(to bottom in oklab, ${stops})`,
      }}
    />
  )
}
