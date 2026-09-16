import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Users, Star, LogOut, Menu, X
} from 'lucide-react'
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
      {/* Sidebar overlay on mobile */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 49 }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-title">Asmita's Samast Shikshan</div>
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
          <button className="nav-item" onClick={handleLogout} style={{ color: 'rgba(255,255,255,0.5)' }}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="main">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className="btn btn-ghost"
              style={{ display: 'none', padding: '0.3rem' }}
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="topbar-title">{title}</span>
          </div>
          <span className="topbar-user">{user?.username}</span>
        </header>

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  )
}
