import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/tuition', label: 'Tuition' },
  { to: '/zumba', label: 'Zumba' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`navbar ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex flex-col leading-tight group"
            aria-label="Asmita's Samast Shikshan — Home"
          >
            <span
              className="font-extrabold text-white tracking-tight"
              style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}
            >
              Asmita's Samast Shikshan
            </span>
            <span
              className="font-medium text-amber-400"
              style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              Education for Growth
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-white/75 hover:text-white'
                  }`
                }
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
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
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
            style={{ backgroundColor: '#0F172A' }}
          >
            <nav
              className="flex flex-col px-5 pb-6 pt-2 gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map(({ to, label, exact }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={exact}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block py-3 px-4 text-base font-medium border-b border-white/10 transition-colors duration-200 rounded ${
                      isActive
                        ? 'text-amber-400'
                        : 'text-white/80 hover:text-white'
                    }`
                  }
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
