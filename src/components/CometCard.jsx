import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CometCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null)
  const canvasRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const isAnimatingRef = useRef(false)
  const animationRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: -dy * 8, y: dx * 8 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
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
    const card = cardRef.current
    if (!canvas || !card) return

    const { width, height } = card.getBoundingClientRect()

    // Size canvas to cover the card border (1px extra on each side)
    canvas.width = width + 2
    canvas.height = height + 2

    const ctx = canvas.getContext('2d')
    const cometLength = 130
    const duration = 900
    const perimeter = 2 * (width + height)
    const startTime = performance.now()

    isAnimatingRef.current = true

    const animate = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const dist = progress * perimeter

      // Center point of the comet along the perimeter (offset 1px inward for the border)
      let cx, cy, angle

      if (dist <= width) {
        // Top border — left to right
        cx = dist + 1
        cy = 1
        angle = 0
      } else if (dist <= width + height) {
        // Right border — top to bottom
        cx = width + 1
        cy = dist - width + 1
        angle = Math.PI / 2
      } else if (dist <= 2 * width + height) {
        // Bottom border — right to left
        cx = width - (dist - width - height) + 1
        cy = height + 1
        angle = Math.PI
      } else {
        // Left border — bottom to top
        cx = 1
        cy = height - (dist - 2 * width - height) + 1
        angle = -Math.PI / 2
      }

      // Draw comet as a line with gradient
      const halfLen = cometLength / 2
      const startX = cx - Math.cos(angle) * halfLen
      const startY = cy - Math.sin(angle) * halfLen
      const endX = cx + Math.cos(angle) * halfLen
      const endY = cy + Math.sin(angle) * halfLen

      const grad = ctx.createLinearGradient(startX, startY, endX, endY)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.25, '#4361EE')
      grad.addColorStop(0.55, '#7209B7')
      grad.addColorStop(0.75, '#F72585')
      grad.addColorStop(0.9, '#FB5607')
      grad.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.strokeStyle = grad
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
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
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 16,
        ...style,
      }}
      className={className}
    >
      {/* Canvas for the comet — sits outside the content clip */}
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
          borderRadius: 16,
        }}
      />

      {/* Content — clipped to rounded corners */}
      <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', borderRadius: 16 }}>
        {children}
      </div>
    </motion.div>
  )
}
