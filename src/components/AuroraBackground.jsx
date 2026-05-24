import { motion } from 'framer-motion'

const blobs = [
  { color: '#4361EE', size: 1100, x: '10%', y: '20%', duration: 28 },
  { color: '#7209B7', size: 950,  x: '60%', y: '10%', duration: 34 },
  { color: '#F72585', size: 1050, x: '30%', y: '60%', duration: 22 },
  { color: '#FB5607', size: 800,  x: '75%', y: '55%', duration: 38 },
  { color: '#4361EE', size: 700,  x: '5%',  y: '70%', duration: 30 },
]

// Convert hex to rgba string with given alpha
function rgba(hex, a) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

export default function AuroraBackground({ children, className = '', intense = false, variant = 'dark', id, style = {} }) {
  const isLight = variant === 'light'
  const baseBg = isLight ? '#FAF8F3' : '#0A0A0A'
  // Peak alpha at the center of each blob's radial gradient
  const peakAlpha = isLight ? (intense ? 0.18 : 0.08) : (intense ? 0.28 : 0.1)

  return (
    <div id={id} className={`relative ${className}`} style={{ background: baseBg, ...style }}>
      {/* Blobs live in their own clipping layer so children can use position: sticky */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: blob.size,
              height: blob.size,
              left: blob.x,
              top: blob.y,
              // Soft radial gradient — smooth alpha falloff, no rectangular
              // bounding box, no banding from filter:blur.
              background: `radial-gradient(circle at center, ${rgba(blob.color, peakAlpha)} 0%, ${rgba(blob.color, peakAlpha * 0.78)} 12%, ${rgba(blob.color, peakAlpha * 0.55)} 24%, ${rgba(blob.color, peakAlpha * 0.36)} 36%, ${rgba(blob.color, peakAlpha * 0.21)} 48%, ${rgba(blob.color, peakAlpha * 0.10)} 60%, ${rgba(blob.color, peakAlpha * 0.03)} 70%, ${rgba(blob.color, 0)} 80%)`,
              transform: 'translate(-50%, -50%)',
              mixBlendMode: isLight ? 'multiply' : 'screen',
              willChange: 'transform',
            }}
            animate={{
              x: [0, 60, -40, 30, 0],
              y: [0, -50, 40, -20, 0],
              scale: [1, 1.08, 0.96, 1.04, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
