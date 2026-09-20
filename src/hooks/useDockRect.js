import { useEffect, useState } from 'react'

// Mide el «hueco» de la portada donde vive el chat en escritorio: rect en
// coordenadas de viewport (actualizado en scroll/resize vía rAF) y qué fracción
// del hueco está visible (IntersectionObserver). Con `enabled=false` no hace nada.
export default function useDockRect(selector, enabled = true) {
  const [rect, setRect] = useState(null)
  const [ratio, setRatio] = useState(1)

  useEffect(() => {
    if (!enabled) return
    let el = null, raf = 0, tries = 0, ro, io, cancelled = false
    const measure = () => {
      raf = 0
      if (!el) return
      const r = el.getBoundingClientRect()
      setRect((p) => (p && p.top === r.top && p.left === r.left && p.width === r.width && p.height === r.height)
        ? p : { top: r.top, left: r.left, width: r.width, height: r.height })
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure) }
    const attach = () => {
      if (cancelled) return
      el = document.querySelector(selector)
      if (!el) { if (tries++ < 60) requestAnimationFrame(attach); return }
      measure()
      // El hueco entra con un fadeUp (transform) que no dispara scroll ni resize:
      // re-medimos cada frame durante el primer segundo.
      const t0 = performance.now()
      const settle = () => { if (cancelled) return; measure(); if (performance.now() - t0 < 1200) requestAnimationFrame(settle) }
      requestAnimationFrame(settle)
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      ro = new ResizeObserver(schedule); ro.observe(el)
      io = new IntersectionObserver(([e]) => setRatio(e.intersectionRatio), { threshold: [0, 0.25, 0.5, 0.75, 1] }); io.observe(el)
    }
    attach()
    return () => {
      cancelled = true
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      ro?.disconnect(); io?.disconnect()
    }
  }, [selector, enabled])

  return { rect, ratio }
}
