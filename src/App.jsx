import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
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
import Teachers from './pages/Teachers'
import Testimonials from './pages/Testimonials'

// Admin dashboard (formerly a separate React app). Lazy-loaded so the public
// site's bundle does not include any dashboard code.
const DashboardApp = lazy(() => import('./dashboard/DashboardApp'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // The dashboard never scrolled to top on navigation; keep it that way.
    if (pathname.startsWith('/dashboard')) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function PublicSite() {
  const location = useLocation()
  return (
    <>
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
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Dashboard: no public Navbar/Footer/WhatsApp button around it */}
        <Route
          path="/dashboard/*"
          element={
            <Suspense fallback={null}>
              <DashboardApp />
            </Suspense>
          }
        />
        {/* Everything else is the public website, exactly as before */}
        <Route path="*" element={<PublicSite />} />
      </Routes>
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
