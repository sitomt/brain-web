import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Enfoque from './components/Enfoque'
import Herramientas from './components/Herramientas'
import ParticularesForm from './components/ParticularesForm'
import HowItWorks from './components/HowItWorks'
import Faq from './components/Faq'
import CtaFinal from './components/CtaFinal'
import FoundersOffer from './components/FoundersOffer'
import ChatWidget from './components/ChatWidget'
import Footer from './components/Footer'
import CookieBanner, { STORAGE_KEY as COOKIE_STORAGE_KEY } from './components/CookieBanner'
import LegalModal from './components/LegalModal'
import BookingModal from './components/BookingModal'
import { openBooking } from './lib/booking'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import { FOUNDERS } from './lib/founders'

// Lazy-loaded route — keeps the /nosotros page out of the initial bundle.
const Nosotros = lazy(() => import('./pages/Nosotros'))
// Vista previa aislada de las alternativas de animación (no se usa en producción).
const PreviewAnimaciones = lazy(() => import('./pages/PreviewAnimaciones'))


function AppContent() {
  // Sin splash de intro: la web entra directa (más rápida y más simple).
  const introComplete = true
  const [chatOpen, setChatOpen] = useState(false)
  const [chatContext, setChatContext] = useState(null)
  const [legalOpen, setLegalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('privacidad')
  const [cookieBannerKey, setCookieBannerKey] = useState(0)

  const location = useLocation()
  const isHome = location.pathname === '/'

  const openChat = (context = null) => { setChatContext(context); setChatOpen(true) }
  const openLegal = (tab) => { setLegalTab(tab); setLegalOpen(true) }
  const reopenCookies = () => {
    localStorage.removeItem(COOKIE_STORAGE_KEY)
    setCookieBannerKey(k => k + 1)
  }

  return (
    <>
      {/* Cursor glow trail (#09) — desktop only, behind content */}
      <CursorGlow />

      {/* Scroll progress bar (#04) — hidden during the home intro splash */}
      {(!isHome || introComplete) && <ScrollProgress />}

      {/* Navigation lives at app level — visible on all routes */}
      <Navigation
        visible={isHome ? introComplete : true}
        onChatOpen={() => openBooking('navbar')}
      />

      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              // Solo hacemos el fade de revelado la PRIMERA vez (tras la intro).
              // Al volver desde otra ruta la home ya está revelada: initial=false
              // la monta directamente a opacidad plena y evita el parpadeo en blanco.
              initial={introComplete ? false : { opacity: 0 }}
              animate={{ opacity: introComplete ? 1 : 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <main>
                <section id="hero" style={{ position: 'relative' }}>
                  <Hero introComplete={introComplete} />
                </section>
                {/* Prueba: somos empresarios + lo usamos en casa + quién te atiende */}
                <section id="enfoque">
                  <Enfoque />
                </section>
                {/* Mecanismo: qué pasa en la llamada y después */}
                <HowItWorks />
                {/* Oferta: Programa Fundadores */}
                {FOUNDERS.active && <FoundersOffer />}
                {/* Confianza técnica: se conecta con lo que ya usas */}
                <section id="integraciones">
                  <Herramientas />
                </section>
                {/* Objeciones: lo que NO hacemos + FAQ */}
                <section id="faq">
                  <Faq />
                </section>
                <section id="cta">
                  <CtaFinal />
                </section>
              </main>
              <Footer onOpenLegal={openLegal} onOpenCookies={reopenCookies} />
            </motion.div>
          }
        />

        <Route
          path="/nosotros"
          element={
            <Suspense fallback={<div style={{ minHeight: '100dvh', background: '#0A0A0B' }} />}>
              <Nosotros
                onOpenLegal={openLegal}
                onOpenCookies={reopenCookies}
              />
            </Suspense>
          }
        />

        <Route
          path="/preview-animaciones"
          element={
            <Suspense fallback={<div style={{ minHeight: '100dvh', background: '#08080A' }} />}>
              <PreviewAnimaciones />
            </Suspense>
          }
        />
      </Routes>

      <ChatWidget
        isOpen={chatOpen}
        context={chatContext}
        onOpen={() => openChat(null)}
        onClose={() => setChatOpen(false)}
      />

      <BookingModal />
      <ParticularesForm />

      <CookieBanner key={cookieBannerKey} onOpenLegal={openLegal} />

      <LegalModal
        open={legalOpen}
        tab={legalTab}
        onTabChange={setLegalTab}
        onClose={() => setLegalOpen(false)}
      />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
