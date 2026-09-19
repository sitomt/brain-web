import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Enfoque from './components/Enfoque'
import HowItWorks from './components/HowItWorks'
import FoundersOffer from './components/FoundersOffer'
import Faq from './components/Faq'
import CtaFinal from './components/CtaFinal'
import Footer from './components/Footer'
import CookieBanner, { STORAGE_KEY as COOKIE_STORAGE_KEY } from './components/CookieBanner'
import { FOUNDERS } from './lib/founders'
import useIsMobile from './hooks/useIsMobile'

// Todo lo que no se ve al cargar entra en diferido.
const Nosotros = lazy(() => import('./pages/Nosotros'))
const BookingModal = lazy(() => import('./components/BookingModal'))
const ParticularesForm = lazy(() => import('./components/ParticularesForm'))
const LegalModal = lazy(() => import('./components/LegalModal'))
const ChatWidget = lazy(() => import('./components/ChatWidget'))

function AppContent() {
  const [chatOpen, setChatOpen] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('privacidad')
  const [cookieBannerKey, setCookieBannerKey] = useState(0)

  const location = useLocation()
  const isHome = location.pathname === '/'
  const isMobile = useIsMobile()

  const openLegal = (tab) => { setLegalTab(tab); setLegalOpen(true) }
  const reopenCookies = () => {
    localStorage.removeItem(COOKIE_STORAGE_KEY)
    setCookieBannerKey((k) => k + 1)
  }

  return (
    <MotionConfig reducedMotion="user">
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <main id="main">
                <Hero />
                {/* Prueba → mecanismo → oferta → objeciones → cierre */}
                <Enfoque />
                <HowItWorks />
                {FOUNDERS.active && <FoundersOffer />}
                <Faq />
                <CtaFinal />
              </main>
              <Footer onOpenLegal={openLegal} onOpenCookies={reopenCookies} />
            </>
          }
        />

        <Route
          path="/nosotros"
          element={
            <Suspense fallback={<div style={{ minHeight: '100dvh', background: '#0A0A0B' }} />}>
              <main id="main">
                <Nosotros onOpenLegal={openLegal} onOpenCookies={reopenCookies} />
              </main>
            </Suspense>
          }
        />
      </Routes>

      {/* En escritorio el chat de la home vive en la portada; en móvil y en /nosotros, burbuja flotante */}
      {(!isHome || isMobile) && (
        <Suspense fallback={null}>
          <ChatWidget isOpen={chatOpen} context={isHome ? 'hero' : 'nosotros'} onOpen={() => setChatOpen(true)} onClose={() => setChatOpen(false)} />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <BookingModal />
        <ParticularesForm />
        {legalOpen && (
          <LegalModal open={legalOpen} tab={legalTab} onTabChange={setLegalTab} onClose={() => setLegalOpen(false)} />
        )}
      </Suspense>

      <CookieBanner key={cookieBannerKey} onOpenLegal={openLegal} />
    </MotionConfig>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
