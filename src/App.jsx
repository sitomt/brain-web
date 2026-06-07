import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import IntroAnimation from './components/IntroAnimation'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Enfoque from './components/Enfoque'
import Herramientas from './components/Herramientas'
import Products from './components/Products'
import Cases from './components/Cases'
import TrustBar from './components/TrustBar'
import HowItWorks from './components/HowItWorks'
import CtaFinal from './components/CtaFinal'
import ChatWidget from './components/ChatWidget'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import LegalModal from './components/LegalModal'
import ExitIntentModal from './components/ExitIntentModal'
import FoundersBar from './components/FoundersBar'
import FoundersModal from './components/FoundersModal'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import { FOUNDERS, FOUNDERS_BAR_H } from './lib/founders'

// Lazy-loaded route — keeps the /nosotros page out of the initial bundle.
const Nosotros = lazy(() => import('./pages/Nosotros'))

function AppContent() {
  const [introComplete, setIntroComplete] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatContext, setChatContext] = useState(null)
  const [legalOpen, setLegalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('privacidad')
  const [cookieBannerKey, setCookieBannerKey] = useState(0)
  const [foundersBarOpen, setFoundersBarOpen] = useState(
    () => FOUNDERS.active && localStorage.getItem('brain_founders_bar_dismissed') !== '1'
  )
  const [foundersModalOpen, setFoundersModalOpen] = useState(false)

  const location = useLocation()
  const isHome = location.pathname === '/'

  const openChat = (context = null) => { setChatContext(context); setChatOpen(true) }
  const openLegal = (tab) => { setLegalTab(tab); setLegalOpen(true) }
  const reopenCookies = () => {
    localStorage.removeItem('brain_cookie_consent')
    setCookieBannerKey(k => k + 1)
  }
  const dismissFoundersBar = () => {
    localStorage.setItem('brain_founders_bar_dismissed', '1')
    setFoundersBarOpen(false)
  }
  const showFoundersBar = FOUNDERS.active && isHome && introComplete && foundersBarOpen

  return (
    <>
      {/* Cursor glow trail (#09) — desktop only, behind content */}
      <CursorGlow />

      {/* Scroll progress bar (#04) — hidden during the home intro splash */}
      {(!isHome || introComplete) && <ScrollProgress />}

      {/* Intro splash only on home, only once */}
      {isHome && !introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {showFoundersBar && (
        <FoundersBar
          onOpen={() => setFoundersModalOpen(true)}
          onDismiss={dismissFoundersBar}
        />
      )}

      {/* Navigation lives at app level — visible on all routes */}
      <Navigation
        visible={isHome ? introComplete : true}
        onChatOpen={() => openChat('navbar')}
        topOffset={showFoundersBar ? FOUNDERS_BAR_H : 0}
      />

      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: introComplete ? 1 : 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <main>
                <section id="hero" style={{ position: 'relative' }}>
                  <Hero onChatOpen={() => openChat('hero')} introComplete={introComplete} />
                </section>
                <TrustBar />
                <section id="enfoque">
                  <Enfoque />
                </section>
                <section id="herramientas">
                  <Herramientas />
                </section>
                <HowItWorks />
                {/* Products = panel claro elevado flotando sobre fondo oscuro continuo */}
                <section id="products">
                  <Products onChatOpen={openChat} onFoundersOpen={() => setFoundersModalOpen(true)} />
                </section>
                <section id="cases">
                  <Cases />
                </section>
                <section id="cta">
                  <CtaFinal onChatOpen={() => openChat('cta_final')} />
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
              <Nosotros onChatOpen={() => openChat('nosotros')} />
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

      {isHome && introComplete && (
        <ExitIntentModal onChatOpen={() => openChat('exit_intent')} />
      )}

      <FoundersModal
        open={foundersModalOpen}
        onClose={() => setFoundersModalOpen(false)}
        onChatOpen={() => openChat(FOUNDERS.chatContext)}
      />

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
