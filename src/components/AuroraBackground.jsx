import { motion } from 'framer-motion'

const blobs = [
  { color: '#4361EE', size: 600, x: '10%', y: '20%', duration: 28 },
  { color: '#7209B7', size: 500, x: '60%', y: '10%', duration: 34 },
  { color: '#F72585', size: 550, x: '30%', y: '60%', duration: 22 },
  { color: '#FB5607', size: 400, x: '75%', y: '55%', duration: 38 },
  { color: '#4361EE', size: 350, x: '5%',  y: '70%', duration: 30 },
]

export default function AuroraBackground({ children, className = '', intense = false, variant = 'dark', id, style = {} }) {
  const isLight = variant === 'light'
  // Light variant uses Hero cream tone + lower-opacity blobs so colors don't get fluorescent on light
  const baseBg = isLight ? '#FAF8F3' : '#0A0A0A'
  const opacity = isLight ? (intense ? 0.22 : 0.1) : (intense ? 0.35 : 0.12)

  return (
    <div id={id} className={`relative overflow-hidden ${className}`} style={{ background: baseBg, ...style }}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            borderRadius: '50%',
            background: blob.color,
            filter: 'blur(120px)',
            opacity,
            mixBlendMode: isLight ? 'multiply' : 'normal',
            left: blob.x,
            top: blob.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
          animate={{
            x: [0, 60, -40, 30, 0],
            y: [0, -50, 40, -20, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
