// SpotlightCard — premium "double-bezel" container (outer shell + inner core
// with concentric radii) plus a soft spotlight that follows the cursor.
// Uses Framer motion values (no React state) so the hover effect never
// triggers re-renders. Reusable across dark and light sections.

import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

export default function SpotlightCard({
  children,
  tone = 'dark',
  radius = 24,
  padding = '2rem',
  spotlight = true,
  className,
  style = {},
  ...rest
}) {
  const ref = useRef(null)
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)

  const isDark = tone === 'dark'
  const spotColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(67,97,238,0.06)'
  const spotBg = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, ${spotColor}, transparent 65%)`

  const handleMove = (e) => {
    if (!spotlight || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }
  const handleLeave = () => { mx.set(-400); my.set(-400) }

  const shellBg = isDark ? 'rgba(255,255,255,0.025)' : 'rgba(26,24,20,0.02)'
  const shellBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(26,24,20,0.07)'
  const coreBg = isDark ? '#0E0E12' : '#FEFCF7'
  const inset = isDark ? 'inset 0 1px 0 rgba(255,255,255,0.05)' : 'inset 0 1px 0 rgba(255,255,255,0.85)'

  return (
    <div
      style={{
        background: shellBg,
        border: `1px solid ${shellBorder}`,
        borderRadius: radius + 6,
        padding: 5,
        height: '100%',
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={className}
        style={{
          position: 'relative',
          height: '100%',
          background: coreBg,
          borderRadius: radius,
          padding,
          boxShadow: inset,
          overflow: 'hidden',
          ...style,
        }}
        {...rest}
      >
        {spotlight && (
          <motion.div
            aria-hidden
            style={{ position: 'absolute', inset: 0, background: spotBg, pointerEvents: 'none', zIndex: 0 }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
      </motion.div>
    </div>
  )
}
