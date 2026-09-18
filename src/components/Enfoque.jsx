import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Eyebrow from './Eyebrow'
import { ArrowRight } from './icons/ArrowIcon'
import useIsMobile from '../hooks/useIsMobile'
import { REVEAL, STAGGER, STAGGER_CHILD } from '../lib/motion'
import { h2, h3, body, label } from '../lib/typography'
import { openBooking } from '../lib/booking'

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
      <div style={{ borderTop: HAIR, borderBottom: HAIR, padding: '1.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
          <img
            src="/sito2-400.jpg"
            alt="Ginés Munuera, fundador de Sito Labs"
            width={400} height={553} loading="lazy" decoding="async"
            style={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'center top', borderRadius: 999, display: 'block', flexShrink: 0 }}
          />
          <div>
            <span style={{ ...h3, fontSize: '1.2rem', color: '#1A1814', display: 'block' }}>Ginés Munuera</span>
            <span style={{ ...label, color: 'rgba(26,24,20,0.5)' }}>Fundador · Murcia</span>
          </div>
        </div>
        <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1.2rem', color: '#1A1814', lineHeight: 1.35, margin: 0 }}>
          «La llamada la hago yo. Dirijo negocios con mis socios y fui quien metió la IA en ellos. Si en el tuyo no tiene sentido, te lo diré.»
        </p>
        <button
          type="button"
          onClick={() => openBooking('gines')}
          style={{ marginTop: '0.9rem', background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.95rem', color: '#1A1814', textDecoration: 'underline', textUnderlineOffset: 3, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          Hablar con Ginés · 30 min gratis <ArrowRight size={12} />
        </button>
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
        <p style={{ ...label, color: 'rgba(26,24,20,0.5)', margin: '0.8rem 0 0' }}>Fundador · Sito Labs · Murcia</p>
        <button
          type="button"
          onClick={() => openBooking('gines')}
          style={{ marginTop: '0.7rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.95rem', color: '#1A1814', textDecoration: 'underline', textUnderlineOffset: 3, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          Hablar con Ginés · 30 min gratis <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}

export default function Enfoque() {
  const isMobile = useIsMobile()

  return (
    <section id="enfoque" style={{ background: '#FAF8F3', padding: isMobile ? '3.5rem 1.25rem 3rem' : '8rem 2rem', borderTop: HAIR }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div {...REVEAL} style={{ marginBottom: isMobile ? '1.75rem' : '3.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}><Eyebrow variant="pill" tone="dark">Lo usamos en casa</Eyebrow></div>
          <h2 style={{ ...h2, color: '#1A1814' }}>Antes que especialistas en IA, <em style={{ fontStyle: 'italic' }}>somos empresarios.</em></h2>
          <p style={{ ...body, color: 'rgba(26,24,20,0.7)', marginTop: '1.25rem' }}>
            Lo primero que automatizamos fue lo nuestro. Esto es lo que hace hoy la IA en cada negocio.
          </p>
        </motion.div>

        {/* En móvil, Ginés va primero: es la cara de la web */}
        {isMobile && (
          <motion.div {...REVEAL} style={{ marginBottom: '2rem' }}><Gines isMobile /></motion.div>
        )}

        {/* Ledger */}
        <motion.div {...STAGGER()} style={{ borderTop: HAIR }}>
          {NEGOCIOS.map((n) => (
            <motion.div
              key={n.name}
              variants={STAGGER_CHILD}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '200px 150px 1fr',
                gap: isMobile ? '0.25rem' : '1.5rem',
                alignItems: 'baseline',
                padding: isMobile ? '0.9rem 0' : '1.25rem 0',
                borderBottom: HAIR,
              }}
            >
              {isMobile ? (
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ ...h3, fontSize: '1.25rem', color: '#1A1814' }}>{n.name}</span>
                  <span style={{ ...label, color: 'rgba(26,24,20,0.5)' }}>{n.sector}</span>
                </span>
              ) : (
                <>
                  <span style={{ ...h3, color: '#1A1814' }}>{n.name}</span>
                  <span style={{ ...label, color: 'rgba(26,24,20,0.5)' }}>{n.sector}</span>
                </>
              )}
              <span style={{ ...body, fontSize: isMobile ? '0.98rem' : body.fontSize, color: 'rgba(26,24,20,0.72)', maxWidth: 'none' }}>{n.line}</span>
            </motion.div>
          ))}
        </motion.div>

        {!isMobile && (
          <motion.div {...REVEAL} style={{ marginTop: '3.5rem', maxWidth: 780 }}><Gines /></motion.div>
        )}

        <motion.div {...REVEAL} style={{ marginTop: isMobile ? '1.5rem' : '2.5rem' }}>
          <Link
            to="/nosotros"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(26,24,20,0.65)', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.95rem', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Nuestra historia, con los errores incluidos <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
