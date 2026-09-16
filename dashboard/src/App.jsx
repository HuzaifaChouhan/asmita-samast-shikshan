import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastContainer } from './components/Toast'
import Layout from './components/Layout'
import Login from './pages/Login'
import DashboardPage from './pages/Dashboard'
import InquiriesPage from './pages/Inquiries'
import TeachersPage from './pages/Teachers'
import TestimonialsPage from './pages/Testimonials'

const TITLES = {
  '/': 'Dashboard',
  '/inquiries': 'Inquiries',
  '/teachers': 'Teachers',
  '/testimonials': 'Testimonials',
}

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

  if (!user) return <Navigate to="/login" replace />

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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  )
}

function LoginRoute() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/" replace />
  return <Login />
}
