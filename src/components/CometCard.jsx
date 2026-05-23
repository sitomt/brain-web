import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const R = 16 // border-radius of the card

// Perimeter of a rounded rectangle
function roundedPerimeter(W, H, r) {
  return 2 * (W - 2 * r) + 2 * (H - 2 * r) + 2 * Math.PI * r
}

// Returns {x, y} at distance `dist` clockwise along the rounded rectangle border.
// Path starts at the beginning of the top straight segment (x=r, y=0).
// Corners follow circular arcs of radius r.
function pointOnBorder(dist, W, H, r) {
  const topLen    = W - 2 * r
  const rightLen  = H - 2 * r
  const bottomLen = W - 2 * r
  const leftLen   = H - 2 * r
  const arc       = (Math.PI * r) / 2

  let d = dist

  // 1. Top straight — left → right
  if (d <= topLen) return { x: r + d, y: 0 }
  d -= topLen

  // 2. Top-right arc — center (W-r, r), angle: -π/2 → 0
  if (d <= arc) {
    const a = -Math.PI / 2 + (d / arc) * (Math.PI / 2)
    return { x: W - r + r * Math.cos(a), y: r + r * Math.sin(a) }
  }
  d -= arc

  // 3. Right straight — top → bottom
  if (d <= rightLen) return { x: W, y: r + d }
  d -= rightLen

  // 4. Bottom-right arc — center (W-r, H-r), angle: 0 → π/2
  if (d <= arc) {
    const a = (d / arc) * (Math.PI / 2)
    return { x: W - r + r * Math.cos(a), y: H - r + r * Math.sin(a) }
  }
  d -= arc

  // 5. Bottom straight — right → left
  if (d <= bottomLen) return { x: W - r - d, y: H }
  d -= bottomLen

  // 6. Bottom-left arc — center (r, H-r), angle: π/2 → π
  if (d <= arc) {
    const a = Math.PI / 2 + (d / arc) * (Math.PI / 2)
    return { x: r + r * Math.cos(a), y: H - r + r * Math.sin(a) }
  }
  d -= arc

  // 7. Left straight — bottom → top
  if (d <= leftLen) return { x: 0, y: H - r - d }
  d -= leftLen

  // 8. Top-left arc — center (r, r), angle: π → 3π/2
  if (d <= arc) {
    const a = Math.PI + (d / arc) * (Math.PI / 2)
    return { x: r + r * Math.cos(a), y: r + r * Math.sin(a) }
  }

  // Back to start (floating-point overshoot)
  return { x: r, y: 0 }
}

export default function CometCard({ children, className = '', style = {} }) {
  const cardRef       = useRef(null)
  const canvasRef     = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const isAnimatingRef  = useRef(false)
  const animationRef    = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width  / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: -dy * 8, y: dx * 8 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    isAnimatingRef.current = false
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const handleMouseEnter = () => {
    if (isAnimatingRef.current) return
    runCometAnimation()
  }

  const runCometAnimation = () => {
    const canvas = canvasRef.current
    const card   = cardRef.current
    if (!canvas || !card) return

    const { width: W, height: H } = card.getBoundingClientRect()

    // Canvas is 1px larger on each side so it sits exactly on the border
    canvas.width  = W + 2
    canvas.height = H + 2

    const ctx        = canvas.getContext('2d')
    const perimeter  = roundedPerimeter(W, H, R)
    const cometLen   = 170    // px along the border
    const duration   = 650    // ms
    const SAMPLES    = 48     // points sampled from tail → head
    const startTime  = performance.now()

    isAnimatingRef.current = true

    const animate = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const elapsed   = now - startTime
      const progress  = Math.min(elapsed / duration, 1)
      const headDist  = progress * perimeter
      const tailDist  = Math.max(0, headDist - cometLen)

      // Need at least a couple of px of comet to draw
      if (headDist - tailDist < 2) {
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          isAnimatingRef.current = false
        }
        return
      }

      // Sample the rounded-border path from tail to head
      // +1 offset because the canvas origin is 1px above/left of the card
      const pts = []
      for (let i = 0; i <= SAMPLES; i++) {
        const d = tailDist + (i / SAMPLES) * (headDist - tailDist)
        const p = pointOnBorder(Math.min(d, perimeter), W, H, R)
        pts.push({ x: p.x + 1, y: p.y + 1 })
      }

      // Gradient runs from tail to head in screen-space.
      // This is a linear approximation that holds well even through corners
      // because the gradient direction tracks the comet's average travel direction.
      const tail = pts[0]
      const head = pts[pts.length - 1]
      const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y)
      grad.addColorStop(0,    'transparent')
      grad.addColorStop(0.12, 'rgba(67,97,238,0.28)')
      grad.addColorStop(0.42, 'rgba(114,9,183,0.52)')
      grad.addColorStop(0.70, 'rgba(247,37,133,0.52)')
      grad.addColorStop(0.88, 'rgba(251,86,7,0.32)')
      grad.addColorStop(1,    'transparent')

      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y)
      }
      ctx.strokeStyle = grad
      ctx.lineWidth   = 1.5
      ctx.lineCap     = 'round'
      ctx.lineJoin    = 'round'
      ctx.stroke()

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        isAnimatingRef.current = false
      }
    }

    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: R,
        ...style,
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: -1,
          left: -1,
          width: 'calc(100% + 2px)',
          height: 'calc(100% + 2px)',
          pointerEvents: 'none',
          zIndex: 10,
          borderRadius: R,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', borderRadius: R }}>
        {children}
      </div>
    </motion.div>
  )
}
