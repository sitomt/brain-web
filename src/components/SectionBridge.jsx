import { motion } from 'framer-motion'

/**
 * Section transition bridge.
 *
 * Long, very gradual gradient (~400px) with many stops in a warm dusk
 * palette. The endpoint zones blend imperceptibly into the adjacent
 * sections — including a faint blob near the bright endpoint that mimics
 * the aurora tint of the next section so the boundary disappears.
 */
export default function SectionBridge({
  direction = 'darkToLight',
  darkColor = '#0D0D10',
  lightColor = '#FAF8F3',
  height = 400,
}) {
  // Warm dusk palette — minimal saturation, gradual luminance shift.
  // Many stops eliminate banding and any visible "step".
  const duskStops = [
    [0, darkColor],
    [7, '#11101A'],
    [14, '#15131F'],
    [21, '#1B1825'],
    [28, '#221E2C'],
    [35, '#2A2434'],
    [42, '#332C3B'],
    [49, '#3E3742'],
    [56, '#4D434A'],
    [63, '#605353'],
    [70, '#78685F'],
    [77, '#937F6E'],
    [83, '#B19A82'],
    [88, '#C9B89C'],
    [92, '#DCCFB7'],
    [95, '#E8DECB'],
    [97, '#F0E8D8'],
    [99, '#F7F2E6'],
    [100, lightColor],
  ]

  const stops = direction === 'darkToLight'
    ? duskStops.map(([p, c]) => `${c} ${p}%`)
    : duskStops.map(([p, c]) => `${c} ${100 - p}%`).reverse()

  return (
    <div
      aria-hidden
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${stops.join(', ')})`,
      }}
    >
      {/* Endpoint-matching aurora hint — fades the boundary into the adjacent
          section. Positioned near the bright end so the cream zone of the
          bridge picks up the same brand-tinted character that the next
          section's aurora has. Very low opacity, large blur. */}
      <motion.div
        animate={{ opacity: [0.05, 0.09, 0.05] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: '20%',
          top: direction === 'darkToLight' ? '88%' : '12%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: '#7209B7',
          filter: 'blur(200px)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: direction === 'darkToLight' ? 'multiply' : 'screen',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: -5 }}
        style={{
          position: 'absolute',
          right: '15%',
          top: direction === 'darkToLight' ? '92%' : '8%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: '#F72585',
          filter: 'blur(200px)',
          transform: 'translate(50%, -50%)',
          mixBlendMode: direction === 'darkToLight' ? 'multiply' : 'screen',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
