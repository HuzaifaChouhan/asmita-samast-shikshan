import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, BookOpen, GraduationCap, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ord } from '../utils/ordinal'

const WHATSAPP_URL =
  "https://wa.me/919869911317?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Asmita's%20Samast%20Shikshan%20programs."

const tuitionItems = [
  {
    to: '/tuition',
    label: 'School Tuition',
    sub: <><Ord>1st</Ord>–<Ord>10th</Ord> · All Subjects</>,
    icon: <BookOpen size={15} />,
  },
  {
    to: '/tuition/senior-secondary',
    label: 'Senior Secondary',
    sub: <><Ord>11th</Ord>–<Ord>12th</Ord> · Science, Commerce, Arts</>,
    icon: <GraduationCap size={15} />,
  },
  {
    to: '/tuition#online',
    label: 'Online Classes',
    sub: 'Learn from anywhere',
    icon: <Monitor size={15} />,
  },
]

const otherLinks = [
  { to: '/zumba', label: 'Zumba' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tuitionOpen, setTuitionOpen] = useState(false)
  const [mobileAcadOpen, setMobileAcadOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setTuitionOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTuitionOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    setTuitionOpen(false)
  }

  const isTuitionActive =
    location.pathname === '/tuition' ||
    location.pathname.startsWith('/tuition/')

  return (
    <header
      className={`navbar ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center group"
            aria-label="Asmita's Samast Shikshan — Home"
          >
            <img
              src="/logo.jpg"
              alt="Asmita's Samast Shikshan Logo"
              className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {/* Tuition Dropdown */}
            <div
              className="nav-dropdown-wrap"
              ref={dropdownRef}
              onMouseEnter={() => setTuitionOpen(true)}
              onMouseLeave={() => setTuitionOpen(false)}
            >
              <button
                onClick={() => setTuitionOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={tuitionOpen}
                className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded border-0 bg-transparent cursor-pointer`}
                style={{ color: isTuitionActive ? '#e2c97e' : undefined }}
                onMouseEnter={e => { if (!isTuitionActive) e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { if (!isTuitionActive) e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
              >
                Tuition
                <ChevronDown
                  size={13}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: tuitionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <AnimatePresence>
                {tuitionOpen && (
                  <motion.div
                    className="nav-dropdown-menu"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                  >
                    {tuitionItems.map((item, i) => (
                      <div key={item.to}>
                        {i === 2 && <div className="nav-dropdown-divider" />}
                        <Link
                          to={item.to}
                          className={`nav-dropdown-item ${location.pathname === item.to ? 'active-item' : ''
                            }`}
                          onClick={() => setTuitionOpen(false)}
                        >
                          <span className="flex items-center gap-2">
                            <span style={{ color: '#e2c97e', opacity: 0.85 }}>{item.icon}</span>
                            <span className="nav-dropdown-item-label">{item.label}</span>
                          </span>
                          <span className="nav-dropdown-item-sub pl-6">{item.sub}</span>
                        </Link>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other links */}
            {otherLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded ${isActive
                    ? ''
                    : 'text-white/75 hover:text-white'
                  }`
                }
                style={({ isActive }) => isActive ? { color: '#e2c97e' } : {}}
              >
                {label}
              </NavLink>
            ))}

            <Link
              to="/admissions"
              className="ml-3 btn-primary"
              style={{ padding: '0.55rem 1.35rem', fontSize: '0.85rem' }}
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white rounded focus:outline-none focus-visible:ring-2" style={{ '--tw-ring-color': '#c9a84c' }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden"
            style={{ backgroundColor: '#1e2d6b' }}
          >
            <nav
              className="flex flex-col px-5 pb-6 pt-2 gap-1"
              aria-label="Mobile navigation"
            >
              {/* Tuition sub-menu expandable */}
              <button
                onClick={() => setMobileAcadOpen((v) => !v)}
                className={`flex items-center justify-between py-3 px-4 text-base font-medium rounded bg-transparent border-0 cursor-pointer text-white/80`}
                style={{
                  color: isTuitionActive ? '#e2c97e' : undefined,
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span>Tuition</span>
                <ChevronDown
                  size={15}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: mobileAcadOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              <AnimatePresence>
                {mobileAcadOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {tuitionItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeMenu}
                        className="flex flex-col py-2.5 px-6 border-b text-sm"
                        style={{
                          borderBottom: '1px solid rgba(201,168,76,0.1)',
                          color: location.pathname === item.to ? '#e2c97e' : 'rgba(255,255,255,0.7)',
                          textDecoration: 'none',
                        }}
                      >
                        <span className="font-semibold">{item.label}</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '1px' }}>{item.sub}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {otherLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block py-3 px-4 text-base font-medium border-b border-white/10 transition-colors duration-200 rounded ${isActive
                      ? ''
                      : 'text-white/80 hover:text-white'
                    }`
                  }
                  style={({ isActive }) => isActive ? { color: '#e2c97e' } : {}}
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/admissions"
                onClick={closeMenu}
                className="btn-primary mt-3 justify-center"
              >
                Enroll Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}