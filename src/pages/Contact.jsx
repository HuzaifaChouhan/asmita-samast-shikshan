import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, MessageCircle, ExternalLink } from 'lucide-react'

const WHATSAPP_URL =
  "https://wa.me/919869911317?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Asmita's%20Samast%20Shikshan%20programs."

const MAPS_URL =
  'https://maps.google.com/?q=302+Samoa+Building+Pacific+Enclave+Powai+Mumbai'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Asmita's Samast Shikshan"
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="page-hero"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="contact-heading"
      >
        <div className="container-custom">
          <div className="max-w-xl">
            <div className="badge badge-gold mb-6">Get in Touch</div>
            <h1
              id="contact-heading"
              className="text-white font-extrabold mb-4"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              We'd Love to Hear from You
            </h1>
            <p className="text-white/60" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
              Reach out for inquiries about tuition or Zumba classes — we're happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CARDS ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="contact-info"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Contact Panel */}
            <motion.div
              {...fadeUp}
              className="lg:col-span-7"
            >
              <h2
                id="contact-info"
                className="font-extrabold mb-8"
                style={{ color: '#0F172A', fontSize: 'clamp(1.4rem, 2.8vw, 2rem)' }}
              >
                Contact Information
              </h2>

              <div className="flex flex-col gap-5">
                {/* Address */}
                <div
                  className="flex items-start gap-5 rounded-xl p-6"
                  style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#FEF3C7' }}
                  >
                    <MapPin size={22} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: '#0F172A' }}>Address</p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      302, Samoa Building, Pacific Enclave,<br />
                      Opp. Dr. L H Hiranandani Hospital,<br />
                      Powai, Mumbai — 400076
                    </p>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors"
                    >
                      Get Directions <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Primary Phone */}
                <div
                  className="flex items-start gap-5 rounded-xl p-6"
                  style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#F0FDF4' }}
                  >
                    <Phone size={22} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: '#0F172A' }}>Phone</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <a
                          href="tel:+919869911317"
                          className="text-slate-600 text-sm font-medium hover:text-amber-600 transition-colors"
                        >
                          +91 98699 11317
                        </a>
                        <a
                          href="tel:+919869911317"
                          className="btn-primary"
                          style={{ padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
                        >
                          Call Now
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href="tel:+918452019912"
                          className="text-slate-600 text-sm font-medium hover:text-amber-600 transition-colors"
                        >
                          +91 84520 19912
                        </a>
                        <a
                          href="tel:+918452019912"
                          className="btn-primary"
                          style={{ padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
                        >
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div
                  className="flex items-start gap-5 rounded-xl p-6"
                  style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#F0FDF4' }}
                  >
                    <MessageCircle size={22} style={{ color: '#25D366' }} />
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: '#0F172A' }}>WhatsApp</p>
                    <p className="text-slate-500 text-sm mb-3">
                      Send us a message on WhatsApp for quick responses.
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ backgroundColor: '#25D366', fontSize: '0.85rem', padding: '0.55rem 1.25rem' }}
                    >
                      <MessageCircle size={15} /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map / Location Panel */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="lg:col-span-5 flex flex-col gap-5"
            >
              {/* Location Image */}
              <div className="rounded-2xl overflow-hidden" style={{ height: '240px' }}>
                <img
                  src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=700&q=80"
                  alt="Powai Mumbai area representing the centre location"
                  className="img-cover"
                  loading="lazy"
                />
              </div>

              {/* Location Info */}
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: '#0F172A' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-amber-400" />
                  <p className="text-amber-400 font-semibold text-sm">Powai, Mumbai</p>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Located in the heart of Powai, directly opposite Dr. L.H. Hiranandani Hospital — easily accessible by road.
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                  style={{ fontSize: '0.85rem' }}
                >
                  <ExternalLink size={15} /> Open in Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
