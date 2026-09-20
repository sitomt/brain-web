import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Eyebrow from './Eyebrow'
import { ArrowRight } from './icons/ArrowIcon'
import useIsMobile from '../hooks/useIsMobile'
import { REVEAL, STAGGER, STAGGER_CHILD } from '../lib/motion'
import { h2, h3, body, bodySm, label } from '../lib/typography'
import { SURFACE, RADIUS, SHADOW } from '../lib/tokens'

// Prueba: somos empresarios + "lo usamos en casa" (ledger, sin tarjetas) + quién te atiende.
const NEGOCIOS = [
  { name: 'Baktun 13', sector: 'Gimnasio', line: 'Toda la operativa del equipo en una sola app.' },
  { name: 'Clesol', sector: 'Energía solar', line: 'CRM que clasifica leads y dice a quién llamar primero.' },
  { name: 'Foodmatica', sector: 'Bares', line: 'Stock en tiempo real desde los albaranes; facturación y asesoría solas.' },
  { name: 'Playgame Italia', sector: 'Salones de juego', line: 'Datos de todas las plataformas en un solo informe.' },
  { name: 'Venta Alegría', sector: 'Restaurante', line: 'Asistente de reservas, en construcción. Te lo enseñamos tal cual está.' },
]

const HAIR = '1px solid rgba(26,24,20,0.1)'

function Gines({ isMobile }) {
  if (isMobile) {
    return (
      <div style={{ background: SURFACE.creamCard, borderRadius: RADIUS.cardInner, boxShadow: SHADOW.cardLight, border: HAIR, padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '1.4rem' }}>
          <img
            src="/sito2-400.jpg"
            alt="Ginés Munuera, fundador de Sito Labs"
            width={400} height={553} loading="lazy" decoding="async"
            style={{ width: 84, height: 84, objectFit: 'cover', objectPosition: 'center top', borderRadius: 999, display: 'block', flexShrink: 0, boxShadow: '0 0 0 4px #FEFCF7, 0 0 0 5px rgba(67,97,238,0.25)' }}
          />
          <div>
            <span style={{ ...h3, fontSize: '1.3rem', color: '#1A1814', display: 'block', marginBottom: 4 }}>Ginés Munuera</span>
            <span style={{ ...label, color: 'rgba(26,24,20,0.5)' }}>Fundador · Murcia · Roma</span>
          </div>
        </div>
        <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1.2rem', color: '#1A1814', lineHeight: 1.42, margin: '0 auto', maxWidth: '28ch' }}>
          «La llamada la hago yo. Dirijo negocios con mis socios y fui quien metió la IA en ellos. Si en el tuyo no tiene sentido, te lo diré.»
        </p>
        <Link
          to="/nosotros"
          style={{ ...label, marginTop: '1.5rem', padding: '10px 16px', borderRadius: 999, border: '1px solid rgba(26,24,20,0.12)', display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(26,24,20,0.55)', textDecoration: 'none' }}
        >
          Nuestra historia <ArrowRight size={11} />
        </Link>
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '2.25rem', alignItems: 'center' }}>
      <img
        src="/sito2-400.jpg" srcSet="/sito2-400.jpg 400w, /sito2-800.jpg 800w" sizes="(max-width: 768px) 88px, 160px"
        alt="Ginés Munuera, fundador de Sito Labs"
        width={768}
        height={1061}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center top', borderRadius: 12, display: 'block' }}
      />
      <div>
        <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: isMobile ? '1.15rem' : 'clamp(1.25rem, 1.8vw, 1.5rem)', color: '#1A1814', lineHeight: 1.35, margin: 0 }}>
          «Soy Ginés Munuera. La llamada la hago yo. Dirijo negocios con mis socios y fui quien
          metió la IA en ellos. Si en el tuyo no tiene sentido, te lo diré.»
        </p>
        <p style={{ ...label, color: 'rgba(26,24,20,0.5)', margin: '1rem 0 0' }}>Fundador · Sito Labs · Murcia · Roma</p>
        <Link
          to="/nosotros"
          style={{ ...label, marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(26,24,20,0.55)', textDecoration: 'none' }}
        >
          Nuestra historia <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  )
}

export default function Enfoque() {
  const isMobile = useIsMobile()

  return (
    <section id="enfoque" style={{ background: '#FAF8F3', padding: isMobile ? '5.5rem 1.5rem 5.5rem' : '8rem 2rem 8.5rem', borderTop: HAIR }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div {...REVEAL} style={{ marginBottom: isMobile ? '3rem' : '4rem', textAlign: isMobile ? 'center' : 'left', display: isMobile ? 'flex' : 'block', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '1.25rem' }}><Eyebrow variant="pill" tone="dark">Lo usamos en casa</Eyebrow></div>
          <h2 style={{ ...h2, fontSize: isMobile ? '2.1rem' : h2.fontSize, color: '#1A1814', maxWidth: isMobile ? '14ch' : h2.maxWidth }}>Antes que especialistas en IA, <em style={{ fontStyle: 'italic' }}>somos empresarios.</em></h2>
          <p style={{ ...(isMobile ? bodySm : body), color: 'rgba(26,24,20,0.7)', marginTop: isMobile ? '1.25rem' : '1.5rem', maxWidth: isMobile ? '34ch' : body.maxWidth }}>
            Lo primero que automatizamos fue lo nuestro. Esto es lo que hace hoy la IA en cada negocio.
          </p>
        </motion.div>

        {/* En móvil, Ginés va primero: es la cara de la web */}
        {isMobile && (
          <motion.div {...REVEAL} style={{ marginBottom: '3.5rem' }}><Gines isMobile /></motion.div>
        )}

        {/* Ledger */}
        <motion.div {...STAGGER()} style={isMobile ? { display: 'flex', flexDirection: 'column', gap: '0.75rem' } : { borderTop: HAIR }}>
          {NEGOCIOS.map((n) => (
            <motion.div
              key={n.name}
              variants={STAGGER_CHILD}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '200px 150px 1fr',
                gap: isMobile ? '0.4rem' : '1.5rem',
                alignItems: 'baseline',
                ...(isMobile
                  ? { padding: '1.25rem 1.35rem', borderRadius: 18, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(26,24,20,0.07)' }
                  : { padding: '1.5rem 0', borderBottom: HAIR }),
              }}
            >
              {isMobile ? (
                <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 2 }}>
                  <span style={{ ...h3, fontSize: '1.25rem', color: '#1A1814' }}>{n.name}</span>
                  <span style={{ ...label, color: '#4361EE', fontSize: '0.7rem' }}>{n.sector}</span>
                </span>
              ) : (
                <>
                  <span style={{ ...h3, color: '#1A1814' }}>{n.name}</span>
                  <span style={{ ...label, color: 'rgba(26,24,20,0.5)' }}>{n.sector}</span>
                </>
              )}
              <span style={{ ...(isMobile ? bodySm : body), color: isMobile ? 'rgba(26,24,20,0.65)' : 'rgba(26,24,20,0.72)', maxWidth: 'none' }}>{n.line}</span>
            </motion.div>
          ))}
        </motion.div>

        {!isMobile && (
          <motion.div {...REVEAL} style={{ marginTop: '5rem', maxWidth: 780 }}><Gines /></motion.div>
        )}

      </div>
    </section>
  )
}
