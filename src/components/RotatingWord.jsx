// RotatingWord (#06) — cycles a single word through a list, one at a time,
// to compress multiple audiences/benefits into one line. Reserves the width of
// the longest word so surrounding text never reflows. Reduced motion → static
// first word.

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EASE_SOFT } from '../lib/motion'

export default function RotatingWord({
  words = [],
  interval = 2200,
  style = {},
}) {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (reduce || words.length < 2) return
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [reduce, words.length, interval])

  // Reserve space for the widest word to keep the line stable.
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  if (reduce) {
    return <span style={style}>{words[0]}</span>
  }

  return (
    // Layout-only wrapper. The gradient/emphasis style lives on the text spans
    // (grid items) — applying background-clip:text to the grid container itself
    // would paint nothing and the word would be invisible.
    <span style={{ display: 'inline-grid', verticalAlign: 'bottom' }}>
      {/* Invisible sizer locks the box to the longest word. */}
      <span style={{ gridArea: '1 / 1', visibility: 'hidden', whiteSpace: 'nowrap', ...style }}>
        {widest}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: EASE_SOFT }}
          style={{ gridArea: '1 / 1', whiteSpace: 'nowrap', ...style }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
