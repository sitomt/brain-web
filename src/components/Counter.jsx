// Counter (#02) — animated number that counts up from 0 when scrolled into view.
// Parses a single numeric run out of a label, keeps any prefix/suffix static
// ("<30 días" → "<", 30, " días"; "100%" → 100, "%"). Values with no single
// number (e.g. "24/7") render as-is, untouched.

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { EASE_SOFT } from '../lib/motion'

export default function Counter({ value, duration = 1.6, style, ...rest }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  // Match exactly one integer surrounded by optional non-digit prefix/suffix.
  const match = String(value).match(/^(\D*)(\d+)(\D*)$/)
  const animatable = !!match && !reduce
  const prefix = match?.[1] ?? ''
  const target = match ? parseInt(match[2], 10) : 0
  const suffix = match?.[3] ?? ''

  const [n, setN] = useState(0)

  useEffect(() => {
    if (!animatable || !inView) return
    const controls = animate(0, target, {
      duration,
      ease: EASE_SOFT,
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [animatable, inView, target, duration])

  if (!animatable) {
    return (
      <span ref={ref} style={style} {...rest}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} style={style} {...rest}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}
