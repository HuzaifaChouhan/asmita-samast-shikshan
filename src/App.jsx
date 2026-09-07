import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Tuition from './pages/Tuition'
import SeniorSecondary from './pages/SeniorSecondary'
import Zumba from './pages/Zumba'
import Admissions from './pages/Admissions'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppContent() {
  const location = useLocation()
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/tuition" element={<Tuition />} />
          <Route path="/tuition/senior-secondary" element={<SeniorSecondary />} />
          <Route path="/zumba" element={<Zumba />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
      <WhatsAppButton />
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
