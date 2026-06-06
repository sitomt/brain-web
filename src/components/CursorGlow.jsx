// CursorGlow (#09) — soft halo of light that trails the cursor with spring lag.
// Does not replace the real cursor. Desktop + fine-pointer only; disabled for
// touch devices and reduced-motion users. Sits behind content, pointer-events
// none, so it never intercepts clicks.

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Decide eligibility synchronously (fine pointer + motion allowed) so we never
// setState inside an effect.
const isEligible = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CursorGlow({
  size = 460,
  color = 'rgba(67,97,238,0.10)',
}) {
  const [enabled] = useState(isEligible)

  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      x.set(e.clientX - size / 2)
      y.set(e.clientY - size / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, size, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        x: sx,
        y: sy,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        pointerEvents: 'none',
        zIndex: 5,
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  )
}
