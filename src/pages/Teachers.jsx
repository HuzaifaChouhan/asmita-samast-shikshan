import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Award, Users, AlertCircle } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const stats = [
  { icon: <Users size={22} className="text-amber-500" />, value: '20+', label: 'Years Experience' },
  { icon: <BookOpen size={22} className="text-amber-500" />, value: '500+', label: 'Students Taught' },
  { icon: <Award size={22} className="text-amber-500" />, value: '100%', label: 'Dedicated Faculty' },
]

function TeacherSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="w-full animate-pulse"
        style={{ height: '280px', backgroundColor: 'rgba(255,255,255,0.06)' }}
      />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-5 w-3/4 rounded animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
        <div className="h-3 w-1/2 rounded animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
        <div className="h-3 w-2/3 rounded animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
      </div>
    </div>
  )
}

function TeacherCard({ teacher, index }) {
  const photoUrl = teacher.photo
    ? teacher.photo.startsWith('http')
      ? teacher.photo
      : `${API_BASE}${teacher.photo}`
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden group"
      style={{
        backgroundColor: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: '280px' }}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${teacher.name} — ${teacher.designation}`}
            className="img-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1e2d6b 0%, #2d3e8f 100%)' }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(201,168,76,0.2)', border: '2px solid rgba(201,168,76,0.3)' }}
            >
              <span className="font-extrabold text-amber-400" style={{ fontSize: '2.5rem' }}>
                {teacher.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0) 55%)' }}
        />
        {/* Experience badge */}
        {teacher.experience_years && (
          <div
            className="absolute bottom-3 right-3"
            style={{
              backgroundColor: 'rgba(15,23,42,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(201,168,76,0.35)',
              borderRadius: '2rem',
              padding: '0.3rem 0.75rem',
            }}
          >
            <p style={{ color: '#e2c97e', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em' }}>
              {teacher.experience_years}+ yrs
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white font-bold mb-1" style={{ fontSize: '1.05rem', lineHeight: 1.3 }}>
          {teacher.name}
        </h3>
        <p
          className="font-semibold mb-2"
          style={{ color: '#c9a84c', fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}
        >
          {teacher.designation}
        </p>
        {teacher.subject && (
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>{teacher.subject}</p>
        )}
        {teacher.bio && (
          <p
            className="mt-3 leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.83rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {teacher.bio}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = "Our Teachers | Asmita's Samast Shikshan"
  }, [])

  const fetchTeachers = () => {
    setLoading(true)
    setError(null)
    fetch(`${API_BASE}/api/teachers/`)
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`)
        return res.json()
      })
      .then(data => {
        setTeachers(Array.isArray(data) ? data : data.results ?? [])
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load teacher profiles. Please try again later.')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="page-hero" aria-labelledby="teachers-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="badge badge-gold mb-6">Our Faculty</div>
              <h1
                id="teachers-heading"
                className="text-white font-extrabold mb-5"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
              >
                Meet Our Dedicated Teachers
              </h1>
              <p className="text-white/65 max-w-md" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                Our faculty brings years of experience, genuine care, and a passion for helping every student reach their full potential.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/admissions" className="btn-primary">
                  Enroll Now <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-outline-white">
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="rounded-xl p-5 text-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="flex justify-center mb-3">{s.icon}</div>
                  <p className="text-white font-extrabold" style={{ fontSize: '1.5rem' }}>{s.value}</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginTop: '0.25rem' }}>
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEACHERS GRID ─── */}
      <section className="section-padding" style={{ backgroundColor: '#0F172A' }} aria-labelledby="faculty-heading">
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2 id="faculty-heading" className="text-white font-extrabold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}>
              Our Faculty
            </h2>
            {!loading && !error && teachers.length > 0 && (
              <p className="text-white/50 mt-2" style={{ fontSize: '0.9rem' }}>
                {teachers.length} dedicated educator{teachers.length !== 1 ? 's' : ''} committed to your growth
              </p>
            )}
          </motion.div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <TeacherSkeleton key={i} />)}
            </div>
          )}

          {error && (
            <motion.div {...fadeUp} className="flex flex-col items-center gap-4 py-16 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(239,68,68,0.15)' }}
              >
                <AlertCircle size={28} className="text-red-400" />
              </div>
              <p className="text-white/60" style={{ fontSize: '0.95rem' }}>{error}</p>
              <button
                onClick={fetchTeachers}
                className="btn-outline-white"
                style={{ fontSize: '0.85rem', padding: '0.55rem 1.35rem' }}
              >
                Retry
              </button>
            </motion.div>
          )}

          {!loading && !error && teachers.length === 0 && (
            <motion.div {...fadeUp} className="text-center py-16">
              <p className="text-white/40" style={{ fontSize: '0.95rem' }}>
                Teacher profiles will be available soon. Please check back later.
              </p>
            </motion.div>
          )}

          {!loading && !error && teachers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher, i) => (
                <TeacherCard key={teacher.id} teacher={teacher} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }} aria-labelledby="philosophy-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fadeUp}>
              <div className="gold-line mb-4" />
              <h2
                id="philosophy-heading"
                className="font-extrabold mb-5"
                style={{ color: '#0F172A', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              >
                Our Teaching Philosophy
              </h2>
              <div className="flex flex-col gap-4 text-slate-600" style={{ fontSize: '0.96rem', lineHeight: '1.85' }}>
                <p>
                  At Asmita's Samast Shikshan, every teacher is chosen not only for their academic expertise but for their ability to connect with students and nurture genuine curiosity.
                </p>
                <p>
                  We maintain small batch sizes so our educators can focus on each student individually — identifying their strengths, addressing their challenges, and building confidence that lasts beyond the classroom.
                </p>
                <p>
                  Our approach is rooted in understanding over memorization, ensuring students don't just pass their exams — they truly learn.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Small Batches', desc: 'Every student gets individual attention and guidance.' },
                { label: 'Concept-First', desc: 'Understanding over rote — building lasting academic skills.' },
                { label: 'Supportive', desc: 'A safe environment where questions are always welcome.' },
                { label: 'Experienced', desc: 'Faculty with years of hands-on classroom experience.' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="rounded-xl p-5"
                  style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                >
                  <div className="gold-line mb-3" style={{ width: '1.5rem' }} />
                  <p className="font-bold mb-1" style={{ color: '#0F172A', fontSize: '0.9rem' }}>{item.label}</p>
                  <p className="text-slate-500" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(135deg, #1e2d6b 0%, #131c47 100%)' }}
        aria-labelledby="teachers-cta"
      >
        <div className="container-custom text-center">
          <motion.div {...fadeUp}>
            <div className="gold-line mx-auto mb-6" />
            <h2
              id="teachers-cta"
              className="text-white font-extrabold mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
            >
              Learn from the Best
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto" style={{ fontSize: '0.96rem' }}>
              Join Asmita's Samast Shikshan and experience the difference that dedicated, experienced teachers make.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/admissions" className="btn-primary">
                Apply for Admission <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-white">
                Talk to Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
