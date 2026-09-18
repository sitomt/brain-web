import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { EASE_SOFT } from '../lib/motion'

// Palabra rotatoria del H1. La primera palabra se monta ESTÁTICA y visible
// desde el primer frame (sin blur ni retardo): el titular nunca depende de la
// animación. Las siguientes entran con una máscara vertical (solo transform).
//
// El degradado con background-clip:text solo pinta dentro de la caja; las
// itálicas la desbordan. El padding amplía el área pintada y el margen
// negativo lo compensa para que la línea no se mueva.
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

export default function RotatingWord({ words = [], interval = 2600, startDelay = 1200, style = {} }) {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [hasAdvanced, setHasAdvanced] = useState(false)

  useEffect(() => {
    if (reduce || words.length < 2) return
    let intervalId
    const advance = () => { setHasAdvanced(true); setIdx((i) => (i + 1) % words.length) }
    const startId = setTimeout(() => { advance(); intervalId = setInterval(advance, interval) }, startDelay + interval)
    return () => { clearTimeout(startId); clearInterval(intervalId) }
  }, [reduce, words.length, interval, startDelay])

  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  if (reduce) return <span style={{ ...style, ...COVER }}>{words[0]}</span>

  return (
    <span style={{ display: 'inline-grid', verticalAlign: 'baseline' }}>
      {/* Texto accesible estático: los lectores de pantalla leen una sola palabra. */}
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{words[0]}</span>
      {/* Sizer invisible: fija el ancho a la palabra más larga para que la línea no reflujya. */}
      <span aria-hidden style={{ gridArea: '1 / 1', visibility: 'hidden', whiteSpace: 'nowrap', ...style, ...COVER }}>{widest}</span>
      <span aria-hidden style={{ gridArea: '1 / 1', overflow: 'hidden', display: 'block', ...COVER, padding: 0, margin: 0 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={idx}
            initial={hasAdvanced ? { opacity: 0, y: '0.55em' } : false}
            animate={{ opacity: 1, y: '0em' }}
            exit={{ opacity: 0, y: '-0.55em' }}
            transition={{ duration: 0.4, ease: EASE_SOFT }}
            style={{ display: 'inline-block', whiteSpace: 'nowrap', ...style, ...COVER }}
          >
            {words[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
