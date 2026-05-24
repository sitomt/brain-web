import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'
const STORAGE_KEY = 'brain_cookie_consent'

export default function CookieBanner({ onOpenLegal }) {
  const [visible, setVisible] = useState(false)
  const [managing, setManaging] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false })
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 10000)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = (type) => {
    const consent = {
      essential: true,
      analytics: type === 'all' ? true : prefs.analytics,
      marketing: type === 'all' ? true : prefs.marketing,
      date: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: isMobile ? 16 : 24,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(680px, calc(100vw - 24px))',
            zIndex: 9000,
            background: 'rgba(13,13,16,0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            overflow: 'hidden',
          }}
        >
          {/* Gradient top line */}
          <div style={{ height: 2, background: GRADIENT, width: '100%' }} />

          <div style={{ padding: isMobile ? '1.25rem' : '1.5rem 1.75rem' }}>
            {!managing ? (
              /* ── Default view ── */
              <>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '1.25rem', lineHeight: 1, marginTop: 2 }}>🍪</span>
                  <div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: '0.95rem', color: '#fff', marginBottom: '0.4rem' }}>
                      Usamos cookies
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      Las esenciales son necesarias para el funcionamiento de la web. Las analíticas nos ayudan a mejorar.{' '}
                      <button
                        onClick={() => onOpenLegal('cookies')}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                      >
                        Política de cookies
                      </button>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-end' }}>
                  <button
                    onClick={() => setManaging(true)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 999,
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontFamily: "'Syne Mono',monospace",
                      fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.45)',
                      letterSpacing: '0.05em',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.color = 'rgba(255,255,255,0.7)' }}
                    onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = 'rgba(255,255,255,0.45)' }}
                  >
                    Gestionar
                  </button>

                  <button
                    onClick={() => accept('essential')}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 999,
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontFamily: "'Syne Mono',monospace",
                      fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.65)',
                      letterSpacing: '0.05em',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.color = '#fff' }}
                    onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.color = 'rgba(255,255,255,0.65)' }}
                  >
                    Solo esenciales
                  </button>

                  <button
                    onClick={() => accept('all')}
                    style={{
                      background: GRADIENT,
                      border: 'none',
                      borderRadius: 999,
                      padding: '9px 20px',
                      cursor: 'pointer',
                      fontFamily: "'Syne Mono',monospace",
                      fontSize: '0.68rem',
                      color: '#fff',
                      letterSpacing: '0.05em',
                      fontWeight: 600,
                    }}
                  >
                    Aceptar todo
                  </button>
                </div>
              </>
            ) : (
              /* ── Manage view ── */
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: '0.95rem', color: '#fff' }}>
                    Personaliza las cookies
                  </p>
                  <button
                    onClick={() => setManaging(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', lineHeight: 1 }}
                  >
                    ←
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  {[
                    { key: 'essential', label: 'Esenciales', desc: 'Necesarias para el funcionamiento básico. No se pueden desactivar.', forced: true },
                    { key: 'analytics', label: 'Analíticas', desc: 'Nos ayudan a entender cómo se usa la web para mejorarla.', forced: false },
                    { key: 'marketing', label: 'Marketing', desc: 'Permiten personalizar anuncios y medir campañas.', forced: false },
                  ].map(({ key, label, desc, forced }) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '0.875rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div>
                        <p style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.7rem', color: forced ? 'rgba(255,255,255,0.5)' : '#fff', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{label}</p>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{desc}</p>
                      </div>
                      <Toggle
                        checked={forced || prefs[key]}
                        disabled={forced}
                        onChange={v => !forced && setPrefs(p => ({ ...p, [key]: v }))}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => accept('custom')}
                    style={{
                      background: GRADIENT,
                      border: 'none',
                      borderRadius: 999,
                      padding: '9px 22px',
                      cursor: 'pointer',
                      fontFamily: "'Syne Mono',monospace",
                      fontSize: '0.68rem',
                      color: '#fff',
                      letterSpacing: '0.05em',
                      fontWeight: 600,
                    }}
                  >
                    Guardar preferencias
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Toggle({ checked, disabled, onChange }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      style={{
        flexShrink: 0,
        width: 40,
        height: 22,
        borderRadius: 999,
        background: checked
          ? 'linear-gradient(135deg,#4361EE,#7209B7)'
          : 'rgba(255,255,255,0.1)',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        position: 'relative',
        transition: 'background 0.25s',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{
        position: 'absolute',
        top: 3,
        left: checked ? 21 : 3,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.25s',
        display: 'block',
      }} />
    </button>
  )
}
