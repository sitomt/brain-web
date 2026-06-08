// GradientMesh (#10) — slow, liquid-morphing colour blobs for the final CTA.
// Adds a sense of "alive / now" to the closing section without colour noise:
// heavily blurred brand-hue blobs that drift and breathe. Sits behind content,
// pointer-events none. Reduced motion → static composition.

import { motion, useReducedMotion } from 'framer-motion'
import { BRAND } from '../lib/tokens'

const BLOBS = [
  { color: BRAND.colors.blue,    top: '10%', left: '12%', size: 420, dur: 16, path: { x: [0, 60, -20, 0], y: [0, -40, 30, 0] } },
  { color: BRAND.colors.purple,  top: '45%', left: '62%', size: 480, dur: 20, path: { x: [0, -50, 40, 0], y: [0, 50, -30, 0] } },
  { color: BRAND.colors.magenta, top: '60%', left: '20%', size: 360, dur: 18, path: { x: [0, 40, -30, 0], y: [0, -30, 40, 0] } },
]

export default function GradientMesh({ opacity = 0.22 }) {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        // Fade the blobs to zero before they reach the section's rectangular
        // clip boundary, so overflow:hidden never produces a hard straight edge
        // (the "box" seam). Two linear gradients intersected fade all four
        // edges — a single radial-gradient can't (its % radii are relative to
        // the full box, pushing the transparent stop off-screen).
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent), linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)',
        WebkitMaskComposite: 'source-in',
        maskImage:
          'linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent), linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)',
        maskComposite: 'intersect',
      }}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          animate={reduce ? undefined : { x: b.path.x, y: b.path.y }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            opacity,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
