// ScrollProgress (#04) — thin gradient bar pinned to the top of the viewport
// that fills as the page is scrolled. Functional anchor: signals reading depth
// and reduces abandonment. Spring-smoothed so it never feels jumpy.

import { motion, useScroll, useSpring } from 'framer-motion'
import { BRAND } from '../lib/tokens'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: BRAND.gradient,
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 10000,
        pointerEvents: 'none',
      }}
    />
  )
}
