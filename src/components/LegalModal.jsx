import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GRADIENT = 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)'

const TABS = [
  { id: 'privacidad', label: 'Privacidad' },
  { id: 'cookies',    label: 'Cookies' },
  { id: 'aviso',      label: 'Aviso legal' },
]

const CONTENT = {
  privacidad: {
    title: 'Política de Privacidad',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        body: 'BrAIn Agencia de Inteligencia Artificial · ginesmunuera@gmail.com · España. El tratamiento de tus datos se rige por el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).',
      },
      {
        heading: 'Datos que recogemos',
        body: 'Únicamente los que tú nos facilitas de forma voluntaria a través del formulario de contacto o chat: nombre, correo electrónico y el contenido del mensaje. No recogemos datos de pago ni datos especialmente sensibles.',
      },
      {
        heading: 'Finalidad y base legal',
        body: 'Atender tu consulta (interés legítimo / ejecución de contrato) y, si nos das consentimiento explícito, enviarte información sobre nuestros servicios. Nunca cedemos tus datos a terceros salvo obligación legal o prestadores de servicios bajo acuerdo de encargado.',
      },
      {
        heading: 'Plazo de conservación',
        body: 'Conservamos tus datos el tiempo necesario para gestionar tu solicitud y, posteriormente, durante los plazos de prescripción legal aplicables (máx. 6 años).',
      },
      {
        heading: 'Tus derechos',
        body: 'Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación escribiendo a ginesmunuera@gmail.com. Si consideras que el tratamiento no es conforme, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).',
      },
    ],
  },
  cookies: {
    title: 'Política de Cookies',
    sections: [
      {
        heading: '¿Qué es una cookie?',
        body: 'Una cookie es un pequeño fichero de texto que se almacena en tu dispositivo cuando visitas una web. Su fin es recordar tus preferencias o ayudarnos a entender cómo se usa el sitio.',
      },
      {
        heading: 'Cookies esenciales',
        body: 'Son imprescindibles para que la web funcione correctamente. No requieren consentimiento y no pueden desactivarse. Incluyen la cookie que guarda tus preferencias de consentimiento (brain_cookie_consent).',
      },
      {
        heading: 'Cookies analíticas',
        body: 'Utilizamos herramientas de analítica web (p. ej. estadísticas agregadas) para entender cómo los usuarios interactúan con el sitio y mejorar la experiencia. Solo se activan con tu consentimiento.',
      },
      {
        heading: 'Cookies de marketing',
        body: 'Permiten medir la efectividad de campañas publicitarias y personalizar anuncios. Solo se activan con tu consentimiento explícito.',
      },
      {
        heading: 'Cómo gestionar o eliminar cookies',
        body: 'Puedes cambiar tus preferencias en cualquier momento desde el panel de cookies (botón en el pie de página) o bien configurando tu navegador para rechazarlas. Ten en cuenta que desactivar todas las cookies puede afectar al funcionamiento del sitio.',
      },
    ],
  },
  aviso: {
    title: 'Aviso Legal',
    sections: [
      {
        heading: 'Titular del sitio web',
        body: 'BrAIn — Agencia de Inteligencia Artificial. Correo de contacto: ginesmunuera@gmail.com. País de establecimiento: España.',
      },
      {
        heading: 'Objeto y condiciones de uso',
        body: 'Este sitio web tiene carácter meramente informativo. El acceso y uso implica la aceptación de las presentes condiciones. BrAIn se reserva el derecho a modificar el contenido del sitio sin previo aviso.',
      },
      {
        heading: 'Propiedad intelectual',
        body: 'Todos los contenidos de este sitio (textos, imágenes, animaciones, código) son propiedad de BrAIn o de sus licenciantes y están protegidos por las leyes de propiedad intelectual e industrial. Queda prohibida su reproducción total o parcial sin autorización expresa.',
      },
      {
        heading: 'Limitación de responsabilidad',
        body: 'BrAIn no se responsabiliza de los daños derivados del uso del sitio, de la imposibilidad de acceso, ni de los contenidos de terceros enlazados. La información publicada es orientativa y no constituye asesoramiento profesional.',
      },
      {
        heading: 'Legislación aplicable',
        body: 'Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso de este sitio, las partes se someten a los Juzgados y Tribunales de España, con renuncia expresa a cualquier otro fuero.',
      },
    ],
  },
}

export default function LegalModal({ open, tab, onTabChange, onClose }) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const current = CONTENT[tab] || CONTENT.privacidad

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9500,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 'min(680px, calc(100vw - 32px))',
              maxHeight: 'min(78vh, 680px)',
              zIndex: 9600,
              background: '#0D0D10',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Gradient top line */}
            <div style={{ height: 2, background: GRADIENT, flexShrink: 0 }} />

            {/* Header */}
            <div style={{
              padding: '1.5rem 1.75rem 0',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
            }}>
              <div>
                <p style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                  INFORMACIÓN LEGAL
                </p>
                <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 'clamp(1.25rem,3vw,1.6rem)', color: '#fff', lineHeight: 1.1 }}>
                  {current.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: 36, height: 36,
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                  marginTop: 4,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: 4,
              padding: '1rem 1.75rem 0',
              flexShrink: 0,
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => onTabChange(t.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Syne Mono',monospace",
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '8px 8px 0 0',
                    color: tab === t.id ? '#fff' : 'rgba(255,255,255,0.35)',
                    borderBottom: tab === t.id ? '2px solid transparent' : '2px solid transparent',
                    backgroundImage: tab === t.id ? GRADIENT : 'none',
                    backgroundClip: tab === t.id ? 'text' : 'unset',
                    WebkitBackgroundClip: tab === t.id ? 'text' : 'unset',
                    WebkitTextFillColor: tab === t.id ? 'transparent' : 'inherit',
                    position: 'relative',
                    transition: 'color 0.2s',
                  }}
                >
                  {t.label}
                  {tab === t.id && (
                    <span style={{
                      position: 'absolute',
                      bottom: -1,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: GRADIENT,
                      borderRadius: '2px 2px 0 0',
                    }} />
                  )}
                </button>
              ))}
            </div>

            {/* Scrollable content */}
            <div style={{
              overflowY: 'auto',
              padding: '1.75rem',
              flex: 1,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.12) transparent',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {current.sections.map((s, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: "'Syne Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.08em', background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>
                      {s.heading.toUpperCase()}
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.88rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.75 }}>
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                Última actualización: mayo 2025
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
