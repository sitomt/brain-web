// Primary CTA — pill button with a nested circular trailing arrow icon
// ("button-in-button" pattern). Optional magnetic micro-physics that
// pulls the button slightly toward the cursor using motion values.

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from './icons/ArrowIcon'
import { EASE_PREMIUM } from '../lib/motion'


export default function CtaButton({
  onClick,
  children,
  variant = 'solid',
  arrow = 'right', // 'right' | 'down' | 'none'
  size = 'md',
  magnetic = false,
  style = {},
  ...rest
}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // Spring-smoothed translation for the magnetic pull
  const tx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.4 })
  const ty = useSpring(y, { stiffness: 250, damping: 22, mass: 0.4 })

  // Inner-icon counter-motion for kinetic tension on hover
  const innerX = useTransform(tx, (v) => v * 0.35)
  const innerY = useTransform(ty, (v) => v * 0.35)

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) * 0.25
    const dy = (e.clientY - cy) * 0.25
    // Clamp pull distance so it never feels jumpy
    const max = 12
    x.set(Math.max(-max, Math.min(max, dx)))
    y.set(Math.max(-max, Math.min(max, dy)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const isDark = variant === 'solid' // solid dark CTA over light bg
  const isLight = variant === 'light' // light CTA over dark bg

  const heightPx = size === 'lg' ? 56 : 48
  const padX = size === 'lg' ? 24 : 18
  const fontSize = size === 'lg' ? '1rem' : '0.92rem'
  const iconBoxSize = size === 'lg' ? 36 : 30

  const baseBg = isDark
    ? '#0A0A0B'
    : isLight
    ? 'rgba(255,255,255,0.05)'
    : 'transparent'
  const baseColor = isDark ? '#fff' : isLight ? '#fff' : '#1A1814'
  const baseBorder = isDark
    ? '1px solid transparent'
    : isLight
    ? '1px solid rgba(255,255,255,0.18)'
    : '1px solid rgba(26,24,20,0.18)'

  const innerBg = isDark
    ? 'rgba(255,255,255,0.12)'
    : isLight
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(26,24,20,0.06)'
  const innerColor = baseColor

  const ArrowIcon = arrow === 'down' ? ArrowDown : ArrowRight

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        paddingLeft: padX,
        paddingRight: 4,
        height: heightPx,
        borderRadius: 999,
        background: baseBg,
        color: baseColor,
        border: baseBorder,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize,
        letterSpacing: '0.01em',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: isDark ? '0 12px 32px -16px rgba(10,10,11,0.6)' : 'none',
        transition: 'box-shadow 0.2s ease',
        x: magnetic ? tx : 0,
        y: magnetic ? ty : 0,
        ...style,
      }}
      {...rest}
    >
      <span style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>
        {children}
      </span>
      {arrow !== 'none' && (
        <motion.span
          style={{
            position: 'relative',
            zIndex: 1,
            width: iconBoxSize,
            height: iconBoxSize,
            borderRadius: 999,
            background: innerBg,
            color: innerColor,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            x: magnetic ? innerX : 0,
            y: magnetic ? innerY : 0,
          }}
        >
          <ArrowIcon size={size === 'lg' ? 15 : 13} />
        </motion.span>
      )}

    </motion.button>
  )
}
