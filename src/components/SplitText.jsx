// SplitText (#01) — word-by-word reveal for headlines.
// Splits text into words and animates each with a staggered fade + rise + blur,
// matching the site's EASE_PREMIUM cadence. Accepts `segments` so a single
// heading can mix plain text, line breaks and gradient-clipped emphasis while
// every word still animates individually.
//
// Usage:
//   <SplitText as="h1" style={display} delay={0.2}
//     segments={[
//       { text: 'Tecnología con criterio', style: { color: '#1A1814' } },
//       { break: true },
//       { text: 'de empresario.', style: { ...gradientText, fontStyle: 'italic' } },
//     ]}
//   />

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { EASE_PREMIUM } from '../lib/motion'

export default function SplitText({
  as = 'span',
  text,
  segments,
  style = {},
  delay = 0,
  stagger = 0.055,
  duration = 0.6,
  amount = 0.4,
  ...rest
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })

  const Tag = as
  const segs = segments ?? [{ text }]

  // Reduced motion → render plain, no per-word animation.
  if (reduce) {
    return (
      <Tag ref={ref} style={style} {...rest}>
        {segs.map((seg, i) =>
          seg.break ? (
            <br key={i} />
          ) : (
            <span key={i} style={seg.style}>
              {seg.text}
            </span>
          )
        )}
      </Tag>
    )
  }

  // Global word index so the stagger flows across segments continuously.
  let wordIndex = 0

  return (
    <Tag ref={ref} style={style} {...rest}>
      {segs.map((seg, si) => {
        if (seg.break) return <br key={`br-${si}`} />
        const words = seg.text.split(' ')
        // The gradient/emphasis style lives on a wrapper so background-clip:text
        // spans the whole phrase; inner word spans only carry the transform.
        return (
          <span key={`seg-${si}`} style={seg.style}>
            {words.map((word, wi) => {
              const i = wordIndex++
              return (
                <span key={wi} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                  <motion.span
                    initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                    animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration, ease: EASE_PREMIUM, delay: delay + i * stagger }}
                    style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                  >
                    {word}
                  </motion.span>
                  {wi < words.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </span>
        )
      })}
    </Tag>
  )
}
