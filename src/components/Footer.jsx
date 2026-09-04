import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'

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
      style={{ backgroundColor: '#0F172A' }}
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
                className="font-medium text-amber-400 mt-1"
                style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
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
                <MapPin size={15} className="mt-0.5 shrink-0 text-amber-400" />
                <span>
                  302, Samoa Building, Pacific Enclave,<br />
                  Opp. Dr. L H Hiranandani Hospital,<br />
                  Powai, Mumbai — 400076
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-white/60 text-sm">
                <Phone size={15} className="shrink-0 text-amber-400" />
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
                    className="text-white/65 text-sm hover:text-amber-400 transition-colors duration-200"
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
                  className="text-white/65 text-sm hover:text-amber-400 transition-colors duration-200"
                >
                  Tuition Classes
                </Link>
              </li>
              <li>
                <p className="text-white/40 text-xs mt-1">1st – 10th Class</p>
              </li>
              <li>
                <p className="text-white/40 text-xs">MSC · CBSE · IC · ICSE</p>
              </li>
              <li className="mt-3">
                <Link
                  to="/zumba"
                  className="text-white/65 text-sm hover:text-amber-400 transition-colors duration-200"
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
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
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
