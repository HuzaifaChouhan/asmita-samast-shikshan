import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, Quote, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

// ── Star display ──────────────────────────────────────────────────────────────
function StarRating({ rating, size = 14, color = '#c9a84c' }) {
  if (!rating) return null
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={size}
          fill={n <= rating ? color : 'none'}
          stroke={n <= rating ? color : 'rgba(201,168,76,0.3)'}
        />
      ))}
    </div>
  )
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ testimonial, size = 56 }) {
  const photoUrl = testimonial.photo
    ? testimonial.photo.startsWith('http')
      ? testimonial.photo
      : `${API_BASE}${testimonial.photo}`
    : null

  const initials = testimonial.name
    .split(' ')
    .slice(0, 2)
    .map(w => w.charAt(0).toUpperCase())
    .join('')

  const colors = [
    ['#1e2d6b', '#2d3e8f'],
    ['#065F46', '#047857'],
    ['#6D28D9', '#7C3AED'],
    ['#9D174D', '#BE185D'],
    ['#92400E', '#B45309'],
  ]
  const idx = testimonial.name.charCodeAt(0) % colors.length
  const [from, to] = colors[idx]

  return (
    <div
      className="rounded-full overflow-hidden shrink-0"
      style={{ width: size, height: size }}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={testimonial.name}
          className="img-cover"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
        >
          <span
            className="font-bold text-white"
            style={{ fontSize: size * 0.36 }}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  )
}

// ── Card (dark grid) ──────────────────────────────────────────────────────────
function TestimonialCard({ testimonial, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl p-7 flex flex-col gap-5 relative"
      style={{
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Quote icon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.5rem',
          color: 'rgba(201,168,76,0.12)',
        }}
      >
        <Quote size={40} />
      </div>

      {/* Rating */}
      {testimonial.rating && (
        <StarRating rating={testimonial.rating} />
      )}

      {/* Message */}
      <p
        className="leading-relaxed flex-1"
        style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: '1.85' }}
      >
        "{testimonial.message}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <Avatar testimonial={testimonial} size={44} />
        <div>
          <p className="text-white font-bold" style={{ fontSize: '0.9rem' }}>{testimonial.name}</p>
          <p style={{ color: '#c9a84c', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {testimonial.role}
          </p>
        </div>
        {testimonial.is_featured && (
          <div
            className="ml-auto"
            style={{
              backgroundColor: 'rgba(201,168,76,0.14)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '2rem',
              padding: '0.25rem 0.6rem',
            }}
          >
            <p style={{ color: '#e2c97e', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Featured
            </p>
          </div>
        )}
      </div>
    </motion.article>
  )
}

// ── Featured carousel card ────────────────────────────────────────────────────
function FeaturedCard({ testimonial }) {
  return (
    <div
      className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)',
        border: '1px solid rgba(201,168,76,0.25)',
      }}
    >
      {/* Background quote */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', top: '1rem', right: '1.5rem', color: 'rgba(201,168,76,0.06)' }}
      >
        <Quote size={80} />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <Avatar testimonial={testimonial} size={72} />
        <div className="flex-1">
          {testimonial.rating && (
            <div className="mb-4">
              <StarRating rating={testimonial.rating} size={18} />
            </div>
          )}
          <blockquote
            className="leading-relaxed mb-5"
            style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', lineHeight: '1.9' }}
          >
            "{testimonial.message}"
          </blockquote>
          <div>
            <p className="text-white font-bold" style={{ fontSize: '1rem' }}>{testimonial.name}</p>
            <p style={{ color: '#c9a84c', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function TestimonialSkeleton() {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-4"
      style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-sm animate-pulse" style={{ backgroundColor: 'rgba(201,168,76,0.15)' }} />
        ))}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 rounded animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.06)', width: '100%' }} />
        <div className="h-3 rounded animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.06)', width: '90%' }} />
        <div className="h-3 rounded animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.06)', width: '75%' }} />
      </div>
      <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="w-11 h-11 rounded-full animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-24 rounded animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <div className="h-2 w-16 rounded animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [featuredIdx, setFeaturedIdx] = useState(0)

  useEffect(() => {
    document.title = "Testimonials | Asmita's Samast Shikshan"
  }, [])

  const fetchTestimonials = () => {
    setLoading(true)
    setError(null)
    fetch(`${API_BASE}/api/testimonials/`)
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`)
        return res.json()
      })
      .then(data => {
        setTestimonials(Array.isArray(data) ? data : data.results ?? [])
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load testimonials. Please try again later.')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const featured = testimonials.filter(t => t.is_featured)
  const all = testimonials

  // Auto-advance featured carousel
  useEffect(() => {
    if (featured.length <= 1) return
    const timer = setInterval(() => {
      setFeaturedIdx(i => (i + 1) % featured.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [featured.length])

  const prevFeatured = () => setFeaturedIdx(i => (i - 1 + featured.length) % featured.length)
  const nextFeatured = () => setFeaturedIdx(i => (i + 1) % featured.length)

  // Average rating
  const avgRating = all.length > 0
    ? (all.reduce((sum, t) => sum + (t.rating || 0), 0) / all.filter(t => t.rating).length || 0).toFixed(1)
    : null

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="page-hero" aria-labelledby="testimonials-heading">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="badge badge-gold mb-6">What Our Students Say</div>
            <h1
              id="testimonials-heading"
              className="text-white font-extrabold mb-5"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
            >
              Real Stories, Real Results
            </h1>
            <p className="text-white/65 max-w-lg" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
              Hear from parents and students who have experienced the Asmita's Samast Shikshan difference — genuine care, personal attention, and meaningful academic growth.
            </p>

            {/* Stats row */}
            {!loading && !error && all.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-6"
              >
                <div>
                  <p className="text-white font-extrabold" style={{ fontSize: '2rem' }}>{all.length}+</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>Happy Families</p>
                </div>
                {avgRating && parseFloat(avgRating) > 0 && (
                  <div>
                    <div className="flex items-end gap-2">
                      <p className="text-white font-extrabold" style={{ fontSize: '2rem' }}>{avgRating}</p>
                      <div className="mb-2">
                        <StarRating rating={Math.round(parseFloat(avgRating))} size={16} />
                      </div>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>Average Rating</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CAROUSEL ─── */}
      {!loading && !error && featured.length > 0 && (
        <section
          className="section-padding"
          style={{ backgroundColor: '#0F172A' }}
          aria-labelledby="featured-heading"
        >
          <div className="container-custom">
            <motion.div {...fadeUp} className="mb-10">
              <div className="gold-line mb-4" />
              <h2
                id="featured-heading"
                className="text-white font-extrabold"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
              >
                Featured Stories
              </h2>
            </motion.div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredIdx}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <FeaturedCard testimonial={featured[featuredIdx]} />
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              {featured.length > 1 && (
                <div className="flex items-center justify-between mt-6">
                  {/* Dots */}
                  <div className="flex gap-2">
                    {featured.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setFeaturedIdx(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        style={{
                          width: i === featuredIdx ? '1.75rem' : '0.5rem',
                          height: '0.5rem',
                          borderRadius: '1rem',
                          backgroundColor: i === featuredIdx ? '#c9a84c' : 'rgba(201,168,76,0.25)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>

                  {/* Arrows */}
                  <div className="flex gap-2">
                    <button
                      onClick={prevFeatured}
                      aria-label="Previous testimonial"
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.15)' }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)' }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextFeatured}
                      aria-label="Next testimonial"
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.15)' }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)' }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── ALL TESTIMONIALS ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: featured.length > 0 && !loading && !error ? '#F8FAFC' : '#0F172A' }}
        aria-labelledby="all-testimonials-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            {(featured.length > 0 && !loading && !error) ? (
              <>
                <div className="gold-line mb-4" />
                <h2
                  id="all-testimonials-heading"
                  className="font-extrabold"
                  style={{ color: '#0F172A', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
                >
                  All Testimonials
                </h2>
                {!loading && !error && all.length > 0 && (
                  <p className="text-slate-500 mt-2" style={{ fontSize: '0.9rem' }}>
                    {all.length} review{all.length !== 1 ? 's' : ''} from our students and parents
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="gold-line mb-4" />
                <h2
                  id="all-testimonials-heading"
                  className="text-white font-extrabold"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}
                >
                  What People Say
                </h2>
                {!loading && !error && all.length > 0 && (
                  <p className="text-white/50 mt-2" style={{ fontSize: '0.9rem' }}>
                    {all.length} review{all.length !== 1 ? 's' : ''} from our students and parents
                  </p>
                )}
              </>
            )}
          </motion.div>

          {/* Loading */}
          {loading && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ '--grid-bg': '#0F172A' }}
            >
              {[...Array(6)].map((_, i) => <TestimonialSkeleton key={i} />)}
            </div>
          )}

          {/* Error */}
          {error && (
            <motion.div {...fadeUp} className="flex flex-col items-center gap-4 py-16 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}
              >
                <AlertCircle size={28} className="text-red-400" />
              </div>
              <p style={{ color: (featured.length > 0 && !loading) ? '#64748b' : 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                {error}
              </p>
              <button
                onClick={fetchTestimonials}
                className={featured.length > 0 && !loading ? 'btn-outline' : 'btn-outline-white'}
                style={{ fontSize: '0.85rem', padding: '0.55rem 1.35rem' }}
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* Empty */}
          {!loading && !error && all.length === 0 && (
            <motion.div {...fadeUp} className="text-center py-16">
              <p
                style={{
                  color: (featured.length > 0) ? '#94a3b8' : 'rgba(255,255,255,0.4)',
                  fontSize: '0.95rem'
                }}
              >
                Testimonials will appear here once approved.
              </p>
            </motion.div>
          )}

          {/* Grid */}
          {!loading && !error && all.length > 0 && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={
                featured.length > 0
                  ? {}  // light bg — override card color
                  : {}
              }
            >
              {all.map((t, i) => {
                // On light background, render light-theme cards
                if (featured.length > 0) {
                  return (
                    <motion.article
                      key={t.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{ duration: 0.5, delay: i * 0.07 }}
                      className="rounded-2xl p-7 flex flex-col gap-4 relative"
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(30,45,107,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.borderColor = '#e2e8f0'
                      }}
                    >
                      <div aria-hidden="true" style={{ position: 'absolute', top: '1rem', right: '1.25rem', color: 'rgba(30,45,107,0.05)' }}>
                        <Quote size={36} />
                      </div>

                      {t.rating && <StarRating rating={t.rating} />}

                      <p
                        className="leading-relaxed flex-1"
                        style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.85' }}
                      >
                        "{t.message}"
                      </p>

                      <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
                        <Avatar testimonial={t} size={42} />
                        <div>
                          <p className="font-bold" style={{ color: '#0F172A', fontSize: '0.88rem' }}>{t.name}</p>
                          <p style={{ color: '#a07c28', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {t.role}
                          </p>
                        </div>
                        {t.is_featured && (
                          <div
                            className="ml-auto"
                            style={{
                              backgroundColor: 'rgba(201,168,76,0.1)',
                              border: '1px solid rgba(201,168,76,0.3)',
                              borderRadius: '2rem',
                              padding: '0.2rem 0.55rem',
                            }}
                          >
                            <p style={{ color: '#a07c28', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                              Featured
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  )
                }

                return <TestimonialCard key={t.id} testimonial={t} index={i} />
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── SHARE YOUR STORY CTA ─── */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, #1e2d6b 0%, #131c47 100%)' }}
        aria-labelledby="testimonials-cta"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeUp}>
              <div className="gold-line mb-4" />
              <h2
                id="testimonials-cta"
                className="text-white font-extrabold mb-4"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
              >
                Join Our Growing Community
              </h2>
              <p className="text-white/60 mb-6 max-w-md" style={{ fontSize: '0.96rem', lineHeight: '1.8' }}>
                Hundreds of students and families have trusted Asmita's Samast Shikshan for their academic journey. Be part of the story.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/admissions" className="btn-primary">
                  Enroll Now <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-outline-white">
                  Ask a Question
                </Link>
              </div>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="flex flex-col gap-3"
            >
              {[
                { label: 'Parent', quote: 'My child improved dramatically within just two months.' },
                { label: 'Student', quote: 'The teachers here actually explain concepts until you understand them.' },
                { label: 'Alumni', quote: 'The foundation built here helped me throughout my college years.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="rounded-xl p-4 flex items-start gap-3"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Quote size={16} style={{ color: '#c9a84c', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p className="text-white/70 text-sm leading-relaxed italic">"{item.quote}"</p>
                    <p style={{ color: '#c9a84c', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', marginTop: '0.35rem', textTransform: 'uppercase' }}>
                      — {item.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
