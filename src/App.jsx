import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import IntroAnimation from './components/IntroAnimation'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Products from './components/Products'
import Cases from './components/Cases'
import TrustBar from './components/TrustBar'
import HowItWorks from './components/HowItWorks'
import CtaFinal from './components/CtaFinal'
import SectionBridge from './components/SectionBridge'
import ChatWidget from './components/ChatWidget'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import LegalModal from './components/LegalModal'
import Nosotros from './pages/Nosotros'

function AppContent() {
  const [introComplete, setIntroComplete] = useState(false)
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
    localStorage.removeItem('brain_cookie_consent')
    setCookieBannerKey(k => k + 1)
  }

  return (
    <>
      <CustomCursor />

      {/* Intro splash only on home, only once */}
      {isHome && !introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
      )}

      {/* Navigation lives at app level — visible on all routes */}
      <Navigation
        visible={isHome ? introComplete : true}
        onChatOpen={() => openChat('navbar')}
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
                <section id="hero">
                  <Hero onChatOpen={() => openChat('hero')} />
                </section>
                <TrustBar />
                <section id="problem">
                  <Problem />
                </section>
                <HowItWorks />
                <SectionBridge direction="darkToLight" darkColor="#0D0D10" lightColor="#FAF8F3" />
                <section id="products">
                  <Products onChatOpen={openChat} />
                </section>
                <SectionBridge direction="lightToDark" lightColor="#FAF8F3" darkColor="#020203" />
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
          element={<Nosotros onChatOpen={() => openChat('nosotros')} />}
        />
      </Routes>

      <ChatWidget
        isOpen={chatOpen}
        context={chatContext}
        onOpen={() => openChat(null)}
        onClose={() => setChatOpen(false)}
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
