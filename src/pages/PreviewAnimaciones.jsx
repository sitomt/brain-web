import { Player } from '@remotion/player'
import AltHeroLedger from '../remotion/alt/AltHeroLedger'
import AltRecepcionistaOmnicanal from '../remotion/alt/AltRecepcionistaOmnicanal'
import AltAdministrativoBandeja from '../remotion/alt/AltAdministrativoBandeja'
import AltAnalistaDashboard from '../remotion/alt/AltAnalistaDashboard'
import AltCaseHosteleria from '../remotion/alt/AltCaseHosteleria'
import AltCaseRetail from '../remotion/alt/AltCaseRetail'
import AltCaseGimnasio from '../remotion/alt/AltCaseGimnasio'
import AltCaseLeads from '../remotion/alt/AltCaseLeads'
import AltCaseTurnos from '../remotion/alt/AltCaseTurnos'
import AltCaseReputacion from '../remotion/alt/AltCaseReputacion'

/**
 * Página aislada para revisar las animaciones alternativas SIN tocar las demos
 * en producción. Ruta: /preview-animaciones
 */

// Las 4 alternativas iniciales (una por demo actual).
const ITEMS = [
  { n: '01', title: 'Hero — "El contador que no duerme"', sub: 'Sustituye a HeroChatDemo · "la IA que hace funcionar tu negocio · 24/7"', component: AltHeroLedger, w: 640, h: 440, dur: 900 },
  { n: '02', title: 'Recepcionista — "Tres canales a la vez"', sub: 'Sustituye a ChatbotDemo · "ni un cliente sin atender · lo registra en tu CRM"', component: AltRecepcionistaOmnicanal, w: 640, h: 460, dur: 300 },
  { n: '03', title: 'Administrativo — "La bandeja que se vacía sola"', sub: 'Sustituye a AgentDemo · "hecho sin que lo pidas · te avisa si algo se sale"', component: AltAdministrativoBandeja, w: 640, h: 460, dur: 300 },
  { n: '04', title: 'Analista — "Lenguaje claro + alerta proactiva"', sub: 'Sustituye a DataQueryDemo · "pregúntale en español · detecta desviaciones antes"', component: AltAnalistaDashboard, w: 640, h: 460, dur: 300 },
]

// 6 casos de uso nuevos en el formato del #4 (pregunta → dato grande → visual → alerta → insight).
const CASES = [
  { n: '05', title: 'Hostelería — ocupación del finde', sub: '"¿Cómo viene el finde?" · barras por día + lista de espera', component: AltCaseHosteleria, w: 640, h: 460, dur: 300 },
  { n: '06', title: 'Retail — cierre de caja + stock', sub: '"¿Cómo ha ido el día?" · ranking de productos + aviso de stock', component: AltCaseRetail, w: 640, h: 460, dur: 300 },
  { n: '07', title: 'Gimnasio — socios y recibos', sub: '"¿Cómo vamos de socios?" · altas/bajas + recibos devueltos', component: AltCaseGimnasio, w: 640, h: 460, dur: 300 },
  { n: '08', title: 'Placas solares — pipeline de leads', sub: '"¿Cómo va el pipeline?" · embudo + leads sin seguimiento', component: AltCaseLeads, w: 640, h: 460, dur: 300 },
  { n: '09', title: 'Salón de juego — turnos 24/7', sub: '"¿Están todos los turnos cubiertos?" · timeline 24 h + hueco', component: AltCaseTurnos, w: 640, h: 460, dur: 300 },
  { n: '10', title: 'Reputación — reseñas y sentimiento', sub: '"¿Qué dicen los clientes?" · estrellas + respuesta redactada', component: AltCaseReputacion, w: 640, h: 460, dur: 300 },
]

function Card({ item }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
        <span style={{ fontFamily: "'Syne Mono', monospace", fontSize: 13, color: '#4361EE' }}>{item.n}</span>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, margin: 0 }}>{item.title}</h2>
      </div>
      <p style={{ fontFamily: "'Syne Mono', monospace", fontSize: 10.5, color: 'rgba(255,255,255,0.42)', margin: '0 0 14px', lineHeight: 1.5 }}>{item.sub}</p>
      <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#0D0D10', aspectRatio: `${item.w} / ${item.h}` }}>
        <Player
          component={item.component}
          durationInFrames={item.dur}
          fps={30}
          compositionWidth={item.w}
          compositionHeight={item.h}
          style={{ width: '100%', height: '100%', display: 'block' }}
          autoPlay
          loop
          initiallyMuted
          controls
          clickToPlay={false}
          acknowledgeRemotionLicense
        />
      </div>
    </div>
  )
}

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 32, marginTop: 28 }

export default function PreviewAnimaciones() {
  return (
    <div style={{ minHeight: '100dvh', background: '#08080A', color: '#fff', fontFamily: "'DM Sans', sans-serif", padding: '48px 24px 80px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>
          Vista previa · alternativas de animación
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2rem,5vw,3.4rem)', fontWeight: 400, margin: 0, lineHeight: 1.05 }}>
          Demos Remotion, <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>repensadas</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 580, marginTop: 14, fontSize: 15, lineHeight: 1.6 }}>
          Cada animación se previsualiza aislada. No están integradas en el sitio — las demos actuales siguen intactas.
        </p>

        {/* Bloque 1 — las 4 alternativas iniciales */}
        <div style={{ marginTop: 44, paddingTop: 4 }}>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Alternativas a las 4 demos actuales</div>
          <div style={gridStyle}>
            {ITEMS.map((item) => <Card key={item.n} item={item} />)}
          </div>
        </div>

        {/* Bloque 2 — 6 casos de uso en el formato del #4 (Analista) */}
        <div style={{ marginTop: 72, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontFamily: "'Syne Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Casos de uso · formato directo (a partir del #4)</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 400, margin: '8px 0 0', lineHeight: 1.1 }}>
            6 casos reales, <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4361EE,#7209B7,#F72585,#FB5607)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>pregunta y respuesta</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 580, marginTop: 10, fontSize: 14, lineHeight: 1.6 }}>
            Misma fórmula que el #4 (letra grande, fácil de leer) con un visual distinto cada uno. Pensados para encadenarse en un hero que muestre casos de uso seguidos.
          </p>
          <div style={gridStyle}>
            {CASES.map((item) => <Card key={item.n} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
