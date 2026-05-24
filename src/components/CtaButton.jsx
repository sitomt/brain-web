// Primary CTA — pill button with a nested circular trailing arrow icon
// ("button-in-button" pattern). Optional magnetic micro-physics that
// pulls the button slightly toward the cursor using motion values.

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from './icons/ArrowIcon'
import { EASE_PREMIUM } from '../lib/motion'

const GRAD = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

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
  const isGhost = variant === 'ghost'
  const isLight = variant === 'light' // light CTA over dark bg

  const heightPx = size === 'lg' ? 56 : 48
  const padX = size === 'lg' ? 24 : 18
  const fontSize = size === 'lg' ? '1rem' : '0.92rem'
  const iconBoxSize = size === 'lg' ? 36 : 30

  const baseBg = isDark
    ? '#1A1814'
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
        x: magnetic ? tx : 0,
        y: magnetic ? ty : 0,
        ...style,
      }}
      {...rest}
    >
      {/* Hover gradient overlay (solid + light variants) */}
      {(isDark || isLight) && (
        <span
          aria-hidden
          className="cta-grad"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 999,
            background: GRAD,
            opacity: 0,
            transition: 'opacity 0.35s cubic-bezier(0.32,0.72,0,1)',
            zIndex: 0,
          }}
        />
      )}
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
      <style>{`
        button:hover > .cta-grad { opacity: 1 !important; }
      `}</style>
    </motion.button>
  )
}
