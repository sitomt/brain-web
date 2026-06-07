import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EASE_SOFT } from '../lib/motion'

// With background-clip:text + transparent fill, the gradient only paints inside
// the span's box. Italic glyphs overhang that box — the descender of "g"/"j"
// drops below it and the left side-bearing of a leading italic "g" sits left of
// it — so those parts get no gradient and render transparent (the "cut" look).
// Padding enlarges the gradient's painting area to cover the overhang; equal
// negative margin cancels it so the surrounding line never reflows.
const COVER = {
  paddingTop: '0.06em',
  paddingRight: '0.12em',
  paddingBottom: '0.32em',
  paddingLeft: '0.2em',
  marginTop: '-0.06em',
  marginRight: '-0.12em',
  marginBottom: '-0.32em',
  marginLeft: '-0.2em',
}

export default function RotatingWord({
  words = [],
  interval = 2400,
  startDelay = 0,
  start = true,
  style = {},
}) {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)

  // The first word (index 0) mounts statically — no entrance animation — so on
  // page load it's crisp and fully visible for its entire turn. Every word after
  // that animates normally. Flips off the moment the rotation first advances.
  const firstRef = useRef(true)
  useEffect(() => {
    if (idx !== 0) firstRef.current = false
  }, [idx])

  // The timer only begins once `start` is true (e.g. after the intro splash),
  // so the first word isn't consumed while the hero is still hidden. startDelay
  // then holds it through the hero's reveal. First turn = startDelay + interval;
  // every turn after that = interval.
  useEffect(() => {
    if (reduce || words.length < 2 || !start) return
    let intervalId
    const advance = () => setIdx((i) => (i + 1) % words.length)
    const startId = setTimeout(() => {
      advance()
      intervalId = setInterval(advance, interval)
    }, startDelay + interval)
    return () => { clearTimeout(startId); clearInterval(intervalId) }
  }, [reduce, words.length, interval, startDelay, start])

  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  if (reduce) {
    return <span style={{ ...style, ...COVER }}>{words[0]}</span>
  }

  return (
    // No overflow clipping anywhere. Words cross-fade with a small em slide.
    // mode="wait" keeps a single word in the shared grid cell at any moment.
    <span style={{ display: 'inline-grid', verticalAlign: 'baseline' }}>
      {/* Invisible sizer locks the cell to the widest word so the line never reflows. */}
      <span style={{ gridArea: '1 / 1', visibility: 'hidden', whiteSpace: 'nowrap', ...style, ...COVER }}>
        {widest}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={firstRef.current ? false : { opacity: 0, y: '0.4em', filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-0.4em', filter: 'blur(5px)' }}
          transition={{ duration: 0.4, ease: EASE_SOFT }}
          style={{ gridArea: '1 / 1', whiteSpace: 'nowrap', ...style, ...COVER }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
