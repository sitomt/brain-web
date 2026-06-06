// WipeReveal (#08) — editorial clip-path wipe. Children are "uncovered" left to
// right as they enter the viewport. Only animates clipPath (no opacity/blur), so
// it composes cleanly on top of a parent fade. Ideal for gradient-clipped
// emphasis words in section titles. Reduced motion → renders plain.

import { motion, useReducedMotion } from 'framer-motion'
import { EASE_PREMIUM } from '../lib/motion'

export default function WipeReveal({
  children,
  as = 'span',
  delay = 0,
  duration = 0.9,
  amount = 0.6,
  display = 'inline-block',
  style = {},
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.span

  if (reduce) {
    const Tag = as
    return <Tag style={{ display, ...style }}>{children}</Tag>
  }

  return (
    <MotionTag
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 -2% 0 0)' }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE_PREMIUM, delay }}
      style={{ display, willChange: 'clip-path', ...style }}
    >
      {children}
    </MotionTag>
  )
}
