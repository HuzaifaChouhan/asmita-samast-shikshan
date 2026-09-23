import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Users, Star, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inquiries', label: 'Inquiries', icon: FileText },
  { to: '/teachers', label: 'Teachers', icon: Users },
  { to: '/testimonials', label: 'Testimonials', icon: Star },
]

export default function Layout({ children, title, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <nav className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img
            src="/logo.jpg"
            alt="Asmita's Samast Shikshan"
            style={{ height: '56px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <div className="sidebar-logo-sub">Admin Panel</div>
        </div>

        <div className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="main">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Hamburger — shown on mobile via CSS */}
            <button
              id="mobile-menu-btn"
              className="btn btn-ghost"
              style={{ padding: '0.3rem', display: 'none' }}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} color="#1e2d6b" /> : <Menu size={20} color="#1e2d6b" />}
            </button>
            <span className="topbar-title">{title}</span>
          </div>
          <img
            src="/logoo.jpg"
            alt="Asmita's Samast Shikshan"
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
        </header>

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  )
}
