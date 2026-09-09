import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'

const GOLD = '#e2c97e'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/tuition', label: 'Tuition' },
  { to: '/zumba', label: 'Zumba' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      className="text-white"
      style={{ background: 'linear-gradient(180deg, #1e2d6b 0%, #131c47 100%)' }}
      role="contentinfo"
    >
      {/* Main Footer */}
      <div className="container-custom py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="mb-4">
              <p
                className="font-extrabold text-white tracking-tight leading-tight"
                style={{ fontSize: '1.15rem' }}
              >
                Asmita's Samast Shikshan
              </p>
              <p
                className="font-medium mt-1"
                style={{ color: GOLD, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                Education for Growth
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              A dedicated education and wellness center in Powai, Mumbai — offering tuition for
              1st–10th class students and Zumba fitness classes for women.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                <span>
                  302, Samoa Building, Pacific Enclave,<br />
                  Opp. Dr. L H Hiranandani Hospital,<br />
                  Powai, Mumbai — 400076
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60 text-sm">
                <Phone size={15} className="shrink-0" style={{ color: GOLD }} />
                <div className="flex flex-col gap-0.5">
                  <a
                    href="tel:+919869911317"
                    className="hover:text-white transition-colors duration-200"
                  >
                    +91 98699 11317
                  </a>
                  <a
                    href="tel:+918452019912"
                    className="hover:text-white transition-colors duration-200"
                  >
                    +91 84520 19912
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3
              className="font-semibold text-white/40 uppercase tracking-widest mb-5"
              style={{ fontSize: '0.7rem' }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/65 text-sm transition-colors duration-200"
                    onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={e => (e.currentTarget.style.color = '')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="md:col-span-3">
            <h3
              className="font-semibold text-white/40 uppercase tracking-widest mb-5"
              style={{ fontSize: '0.7rem' }}
            >
              Programs
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  to="/tuition"
                  className="text-white/65 text-sm transition-colors duration-200"
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = '')}
                >
                  Tuition Classes
                </Link>
              </li>
              <li>
                <p className="text-white/40 text-xs mt-1">1st – 10th Class</p>
              </li>
              <li>
                <p className="text-white/40 text-xs">SSC · CBSE · IC · ICSE</p>
              </li>
              <li className="mt-3">
                <Link
                  to="/zumba"
                  className="text-white/65 text-sm transition-colors duration-200"
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = '')}
                >
                  Zumba Classes
                </Link>
              </li>
              <li>
                <p className="text-white/40 text-xs mt-1">Special Ladies Batch</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © 2026 Asmita's Samast Shikshan. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Powai, Mumbai — 400076
          </p>
        </div>
      </div>
    </footer>
  )
}
