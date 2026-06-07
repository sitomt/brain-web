import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import { ArrowRight } from './icons/ArrowIcon'
import { BRAND } from '../lib/tokens'
import { EASE_SOFT } from '../lib/motion'
import { FOUNDERS, FOUNDERS_BAR_H } from '../lib/founders'

// Barra superior fina del Programa Fundadores. No se abre sola: al hacer clic
// llama onOpen() para mostrar el modal con la historia completa.
export default function FoundersBar({ onOpen, onDismiss }) {
  const isMobile = useIsMobile()

  const counter = isMobile
    ? `${FOUNDERS.spotsLeft}/${FOUNDERS.spotsTotal} plazas`
    : `Quedan ${FOUNDERS.spotsLeft} de ${FOUNDERS.spotsTotal} plazas con precio fundador`

  return (
    <motion.div
      initial={{ y: -FOUNDERS_BAR_H, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE_SOFT, delay: 0.15 }}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: FOUNDERS_BAR_H,
        zIndex: 150,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? 8 : 14,
        padding: isMobile ? '0 44px 0 12px' : '0 16px',
        background: 'rgba(13,13,16,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        paddingTop: 'env(safe-area-inset-top)',
        boxSizing: 'content-box',
      }}
    >
      {/* línea de gradiente superior */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: BRAND.gradient,
          opacity: 0.9,
        }}
      />

      {/* punto live pulsante */}
      <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: BRAND.colors.magenta,
            animation: 'brainPulse 2.4s ease-out infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: BRAND.colors.magenta,
          }}
        />
      </span>

      {!isMobile && (
        <span
          style={{
            fontFamily: "'Syne Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          Programa Fundadores
        </span>
      )}

      {!isMobile && (
        <span aria-hidden style={{ color: 'rgba(255,255,255,0.3)' }}>
          ·
        </span>
      )}

      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: isMobile ? '0.82rem' : '0.85rem',
          color: 'rgba(255,255,255,0.82)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {counter}
      </span>

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          flexShrink: 0,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: isMobile ? '0.82rem' : '0.85rem',
          background: BRAND.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {isMobile ? '' : 'Saber más'}
        <ArrowRight size={12} />
      </span>

      {/* botón cerrar */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDismiss()
        }}
        aria-label="Cerrar"
        style={{
          position: 'absolute',
          top: '50%',
          right: isMobile ? 10 : 14,
          transform: 'translateY(-50%)',
          width: 26,
          height: 26,
          borderRadius: 999,
          border: 'none',
          background: 'transparent',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.85rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s, background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#fff'
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          e.currentTarget.style.background = 'transparent'
        }}
      >
        ✕
      </button>
    </motion.div>
  )
}
