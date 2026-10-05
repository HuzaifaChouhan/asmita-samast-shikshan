import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastContainer } from './components/Toast'
import Layout from './components/Layout'
import Login from './pages/Login'
import DashboardPage from './pages/Dashboard'
import InquiriesPage from './pages/Inquiries'
import TeachersPage from './pages/Teachers'
import TestimonialsPage from './pages/Testimonials'
import './dashboard.css'

// The dashboard lives inside the main app's router, mounted at /dashboard/*.
// Route paths below are relative to /dashboard (e.g. "/inquiries" => /dashboard/inquiries),
// but <Navigate>/<Link> targets are absolute, so they carry the /dashboard prefix.

function ProtectedRoutes() {
  const { user, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #131c47, #1e2d6b)'
    }}>
      <span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
    </div>
  )

  if (!user) return <Navigate to="/dashboard/login" replace />

  return (
    <Routes>
      <Route path="/" element={
        <Layout title="Dashboard" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
          <DashboardPage />
        </Layout>
      } />
      <Route path="/inquiries" element={
        <Layout title="Inquiries" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
          <InquiriesPage />
        </Layout>
      } />
      <Route path="/teachers" element={
        <Layout title="Teachers" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
          <TeachersPage />
        </Layout>
      } />
      <Route path="/testimonials" element={
        <Layout title="Testimonials" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
          <TestimonialsPage />
        </Layout>
      } />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function LoginRoute() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />
  return <Login />
}

export default function DashboardApp() {
  const location = useLocation()

  // Keep the dashboard's original browser-tab title while it is on screen.
  useEffect(() => {
    const previous = document.title
    document.title = 'Asmita Admin Dashboard'
    return () => { document.title = previous }
  }, [])

  // Canonical URLs have no trailing slash (/dashboard, not /dashboard/), so the
  // sidebar's active-link highlighting matches exactly.
  if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
    return <Navigate to={location.pathname.replace(/\/+$/, '') + location.search + location.hash} replace />
  }

  return (
    <div className="dashboard-app">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </div>
  )
}
