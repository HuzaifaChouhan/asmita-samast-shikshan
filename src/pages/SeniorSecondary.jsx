import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Monitor, MapPin, ChevronRight } from 'lucide-react'
import anime from 'animejs'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const streams = [
  {
    id: 'science',
    label: 'Science',
    tagline: 'Analytical Thinking & Problem Solving',
    desc: 'Academic support for students pursuing the Science stream in 11th and 12th standard, focused on building a strong conceptual foundation.',
    className: 'stream-science',
    accentColor: '#3B82F6',
    bgColor: '#EFF6FF',
    darkBg: '#1E3A5F',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4jI0xTRk5Npn5Z4px3THi8SB-uYlblneHjef-MSt8A&s=10',
    imgAlt: 'Science textbooks and laboratory equipment',
  },
  {
    id: 'commerce',
    label: 'Commerce',
    tagline: 'Numbers, Business & Economics',
    desc: 'Academic guidance for Commerce stream students in 11th and 12th standard, supporting clarity in business and financial concepts.',
    className: 'stream-commerce',
    accentColor: '#10B981',
    bgColor: '#ECFDF5',
    darkBg: '#0C3B2E',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    imgAlt: 'Commerce and accounting books',
  },
  {
    id: 'arts',
    label: 'Arts',
    tagline: 'Humanities, Literature & Social Sciences',
    desc: 'Academic support for Arts stream students in 11th and 12th standard, helping students engage deeply with their chosen subjects.',
    className: 'stream-arts',
    accentColor: '#8B5CF6',
    bgColor: '#F5F3FF',
    darkBg: '#2E1A47',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    imgAlt: 'Books and literature for arts students',
  },
]

const progressionSteps = [
  { label: '1st – 5th', sublabel: 'Primary', done: true },
  { label: '6th – 8th', sublabel: 'Middle School', done: true },
  { label: '9th – 10th', sublabel: 'Secondary', done: true },
  { label: '11th – 12th', sublabel: 'Arts · Commerce · Science', done: false, highlight: true },
]

function LearningToggle() {
  const [mode, setMode] = useState('offline')
  const offlineRef = useRef(null)
  const onlineRef = useRef(null)
  const [pillStyle, setPillStyle] = useState({})

  useEffect(() => {
    const btn = mode === 'offline' ? offlineRef.current : onlineRef.current
    if (btn) {
      setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth })
    }
  }, [mode])

  const content = {
    offline: {
      heading: 'Classroom Learning',
      body: 'Attend classes in person at our centre in Powai. Learn in a structured, focused classroom setting with direct teacher interaction.',
      tag: 'In-Person',
    },
    online: {
      heading: 'Learn From Anywhere',
      body: 'Online classes are available for students who prefer learning from home. Quality academic support, accessible wherever you are.',
      tag: 'Remote',
    },
  }
  const active = content[mode]

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="learning-toggle" role="group" aria-label="Learning mode selector">
          <div className="learning-toggle-pill" style={pillStyle} />
          <button
            ref={offlineRef}
            className={`learning-toggle-btn ${mode === 'offline' ? 'active' : 'inactive'}`}
            onClick={() => setMode('offline')}
            id="toggle-offline"
            aria-pressed={mode === 'offline'}
          >
            Offline
          </button>
          <button
            ref={onlineRef}
            className={`learning-toggle-btn ${mode === 'online' ? 'active' : 'inactive'}`}
            onClick={() => setMode('online')}
            id="toggle-online"
            aria-pressed={mode === 'online'}
          >
            Online
          </button>
        </div>
      </div>

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ backgroundColor: 'rgba(217,119,6,0.12)', color: '#D97706', border: '1px solid rgba(217,119,6,0.25)' }}
            >
              {active.tag}
            </span>
            <h3
              className="font-extrabold text-white mb-3"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
            >
              {active.heading}
            </h3>
            <p className="text-white/60 leading-relaxed mb-6" style={{ fontSize: '0.97rem' }}>
              {active.body}
            </p>
            <Link to="/admissions" className="btn-primary">
              Enquire Now <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ height: '260px' }}>
            {mode === 'offline' ? (
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
                alt="Students studying in a focused classroom"
                className="img-cover"
                loading="lazy"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Student studying online from home on laptop"
                className="img-cover"
                loading="lazy"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function SeniorSecondary() {
  const [selectedStream, setSelectedStream] = useState(null)
  const progressRef = useRef(null)

  useEffect(() => {
    document.title = "Senior Secondary — 11th & 12th | Asmita's Samast Shikshan"
  }, [])

  useEffect(() => {
    if (!progressRef.current) return
    const items = progressRef.current.querySelectorAll('.prog-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: items,
              opacity: [0, 1],
              translateY: [16, 0],
              duration: 500,
              delay: anime.stagger(100, { start: 100 }),
              easing: 'easeOutExpo',
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )
    if (items.length) observer.observe(items[0])
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="page-hero"
        style={{ backgroundColor: '#0A0F1E' }}
        aria-labelledby="ss-hero-heading"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="badge badge-gold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Senior Secondary
              </div>
              <h1
                id="ss-hero-heading"
                className="text-white font-extrabold mb-5"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
              >
                Your Next Academic Step.
                <br />
                <span style={{ color: '#F59E0B' }}>11th &amp; 12th Standard.</span>
              </h1>
              <p className="text-white/60 max-w-md mb-8" style={{ fontSize: '1rem', lineHeight: '1.85' }}>
                Continue your academic journey with dedicated support for 11th and 12th standard across Science, Commerce, and Arts.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/admissions" className="btn-primary">
                  Enquire Now <ArrowRight size={16} />
                </Link>
                <a
                  href="#streams"
                  className="btn-outline-white"
                  style={{ fontSize: '0.875rem' }}
                >
                  Explore Streams
                </a>
              </div>
            </div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ height: '340px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                alt="Senior secondary students studying and preparing for exams"
                className="img-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ACADEMIC PROGRESSION ─── */}
      <section
        className="py-16"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="progression-heading"
        ref={progressRef}
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-10">
            <div className="gold-line mb-4" />
            <h2
              id="progression-heading"
              className="text-white font-extrabold"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
            >
              Complete Academic Journey
            </h2>
            <p className="text-white/45 mt-2 text-sm">
              From primary school through senior secondary — all under one roof.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-0 md:gap-0 items-stretch">
            {progressionSteps.map((step, i) => (
              <div
                key={step.label}
                className="prog-item flex-1 opacity-0"
                style={{ position: 'relative' }}
              >
                <div
                  className="flex flex-row md:flex-col items-start gap-4 md:gap-3 p-5 md:p-6 h-full"
                  style={{
                    borderLeft: '1px solid rgba(255,255,255,0.06)',
                    borderBottom: i < progressionSteps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    backgroundColor: step.highlight ? 'rgba(217,119,6,0.06)' : 'transparent',
                  }}
                >
                  {/* Step number */}
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: step.highlight ? '#D97706' : 'rgba(255,255,255,0.07)',
                      color: step.highlight ? '#fff' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p
                      className="font-extrabold mb-0.5"
                      style={{
                        color: step.highlight ? '#F59E0B' : 'rgba(255,255,255,0.85)',
                        fontSize: '1.05rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: step.highlight ? 'rgba(245,158,11,0.7)' : 'rgba(255,255,255,0.35)' }}
                    >
                      {step.sublabel}
                    </p>
                  </div>
                </div>
                {/* Connector arrow */}
                {i < progressionSteps.length - 1 && (
                  <div
                    className="hidden md:flex items-center justify-center"
                    style={{
                      position: 'absolute',
                      right: '-0.8rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                    }}
                  >
                    <ChevronRight size={16} style={{ color: 'rgba(217,119,6,0.5)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STREAMS ─── */}
      <section
        id="streams"
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="streams-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2
              id="streams-heading"
              className="font-extrabold"
              style={{ color: '#0F172A', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              Choose Your Stream
            </h2>
            <p className="text-slate-500 mt-2 max-w-md">
              Three distinct pathways for 11th and 12th standard — each with dedicated academic support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {streams.map((stream, i) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`stream-card ${stream.className} ${selectedStream === stream.id ? 'selected' : ''}`}
                onClick={() => setSelectedStream(selectedStream === stream.id ? null : stream.id)}
                style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                role="button"
                aria-pressed={selectedStream === stream.id}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedStream(selectedStream === stream.id ? null : stream.id)}
              >
                {/* Image */}
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={stream.img}
                    alt={stream.imgAlt}
                    className="img-cover"
                    loading="lazy"
                    style={{ transition: 'transform 0.35s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, ${stream.darkBg}dd, transparent 60%)`,
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem' }}>
                    <h3 className="text-white font-extrabold" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                      {stream.label}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p
                    className="font-semibold text-xs uppercase tracking-widest mb-3"
                    style={{ color: stream.accentColor }}
                  >
                    {stream.tagline}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    {stream.desc}
                  </p>
                  <Link
                    to="/admissions"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: stream.accentColor }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Enquire Now <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEARNING MODE ─── */}
      <section
        id="online"
        className="section-padding"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="learning-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2
              id="learning-heading"
              className="text-white font-extrabold"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              Offline or Online — Your Choice
            </h2>
            <p className="text-white/50 mt-2 max-w-md">
              Students can attend classes in person or opt for online classes — academic support designed to fit your life.
            </p>
          </motion.div>

          <LearningToggle />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="ss-cta"
      >
        <div className="container-custom">
          <motion.div
            {...fadeUp}
            className="rounded-2xl p-10 md:p-14 text-center"
            style={{ backgroundColor: '#0F172A' }}
          >
            <div className="badge badge-gold mb-5 mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Now Enrolling
            </div>
            <h2
              id="ss-cta"
              className="text-white font-extrabold mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
            >
              Looking for Classes for 11th or 12th?
            </h2>
            <p className="text-white/55 mb-8 max-w-md mx-auto" style={{ fontSize: '0.97rem' }}>
              Reach out through our admissions form or contact us directly — we'll help you find the right fit.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="#streams" className="btn-outline-white" onClick={(e) => {
                e.preventDefault()
                document.getElementById('streams')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Explore Streams
              </Link>
              <Link to="/admissions" className="btn-primary">
                Enquire Now <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
