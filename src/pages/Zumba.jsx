import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap, Heart, Users, Star, MapPin, Monitor } from 'lucide-react'
import anime from 'animejs'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const programExperience = [
  {
    icon: <Zap size={22} className="text-rose-500" />,
    title: 'Energy',
    desc: 'Movement-based fitness sessions that keep you active and engaged throughout.',
  },
  {
    icon: <Heart size={22} className="text-rose-500" />,
    title: 'Strength',
    desc: 'Build strength and endurance through regular, consistent activity in a structured environment.',
  },
  {
    icon: <Users size={22} className="text-rose-500" />,
    title: 'Community',
    desc: 'A welcoming group environment where every woman feels supported and included.',
  },
  {
    icon: <Star size={22} className="text-rose-500" />,
    title: 'Confidence',
    desc: 'Encouraging an active lifestyle that helps you feel your best every day.',
  },
]

const classFlow = ['Warm Up', 'Dance Fitness', 'High-Energy Movement', 'Cool Down']

const learningModes = [
  { value: 'Offline', label: 'Offline', sub: 'In-person at our centre in Powai' },
  { value: 'Online', label: 'Online', sub: 'Join from wherever you are' },
]

function LearningModeToggle() {
  const [mode, setMode] = useState('offline')
  const offlineRef = useRef(null)
  const onlineRef = useRef(null)
  const [pillStyle, setPillStyle] = useState({})

  useEffect(() => {
    const btn = mode === 'offline' ? offlineRef.current : onlineRef.current
    if (btn) setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [mode])

  return (
    <div>
      {/* Toggle pill */}
      <div className="flex justify-center mb-10">
        <div className="learning-toggle" role="group" aria-label="Select Zumba mode">
          <div className="learning-toggle-pill" style={{ ...pillStyle, backgroundColor: '#e11d48' }} />
          <button
            ref={offlineRef}
            id="zumba-toggle-offline"
            className={`learning-toggle-btn ${mode === 'offline' ? 'active' : 'inactive'}`}
            onClick={() => setMode('offline')}
            aria-pressed={mode === 'offline'}
          >
            Offline
          </button>
          <button
            ref={onlineRef}
            id="zumba-toggle-online"
            className={`learning-toggle-btn ${mode === 'online' ? 'active' : 'inactive'}`}
            onClick={() => setMode('online')}
            aria-pressed={mode === 'online'}
          >
            Online
          </button>
        </div>
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{
                backgroundColor: 'rgba(225,29,72,0.12)',
                color: '#e11d48',
                border: '1px solid rgba(225,29,72,0.25)',
              }}
            >
              {mode === 'offline' ? 'In-Person' : 'Remote'}
            </span>
            <h3
              className="font-extrabold text-white mb-3"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
            >
              {mode === 'offline' ? 'Join Us in Person' : 'Join From Anywhere'}
            </h3>
            <p className="text-white/60 leading-relaxed mb-6" style={{ fontSize: '0.97rem' }}>
              {mode === 'offline'
                ? 'Attend Zumba classes in person at our centre in Powai. A comfortable, motivating environment designed for women of all fitness levels.'
                : 'Online Zumba classes are available for women who prefer to join from home. Stay active and connected with the same energetic sessions, wherever you are.'}
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
              {mode === 'offline'
                ? <><MapPin size={14} style={{ color: '#e11d48' }} /> 302 Samoa Building, Pacific Enclave, Powai</>
                : <><Monitor size={14} style={{ color: '#e11d48' }} /> Indicate your preference when you enquire — we'll guide you through the process</>
              }
            </div>
            <Link to="/admissions" className="btn-primary" style={{ backgroundColor: '#e11d48' }}>
              Enquire Now <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ height: '280px' }}>
            {mode === 'offline' ? (
              <img
                src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=800&q=80"
                alt="Women in a group Zumba fitness session in person"
                className="img-cover"
                loading="lazy"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1588286492390-53db8f976d58?w=800&q=80"
                alt="Woman attending an online fitness class from home"
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

export default function Zumba() {
  const imgRef = useRef(null)

  useEffect(() => {
    document.title = "Zumba Classes — Online & Offline | Asmita's Samast Shikshan"
  }, [])

  // Subtle Anime.js image energy effect on hover
  useEffect(() => {
    if (!imgRef.current) return
    const el = imgRef.current
    const onEnter = () => {
      anime({
        targets: el,
        scale: [1, 1.025],
        duration: 400,
        easing: 'easeOutQuad',
      })
    }
    const onLeave = () => {
      anime({
        targets: el,
        scale: [1.025, 1],
        duration: 400,
        easing: 'easeOutQuad',
      })
    }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center"
        style={{ paddingTop: '5rem', backgroundColor: '#1a0a14' }}
        aria-labelledby="zumba-hero-heading"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=80"
            alt="Women energetically participating in a Zumba class"
            className="img-cover"
            style={{ opacity: 0.35 }}
            loading="eager"
          />
        </div>
        <div className="relative container-custom py-16">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="badge badge-rose">Special Ladies Batch</div>
              <div
                className="badge"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                Offline &amp; Online
              </div>
            </div>
            <h1
              id="zumba-hero-heading"
              className="text-white font-extrabold mb-5"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', lineHeight: 1.05 }}
            >
              Move More.<br />Feel Stronger.
            </h1>
            <p className="text-white/70 max-w-md mb-3" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
              Zumba fitness sessions designed for women in a supportive and energetic environment.
            </p>
            <p className="text-white/45 text-sm mb-8">
              Available in person at our Powai centre, or online — your choice.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/admissions" className="btn-primary" style={{ backgroundColor: '#e11d48' }}>
                Join Now <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919869911317?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Zumba%20classes."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAM EXPERIENCE ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#fff5f7' }}
        aria-labelledby="experience-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: '#e11d48' }} />
            <h2
              id="experience-heading"
              className="font-extrabold"
              style={{ color: '#1a0a14', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              The Zumba Experience
            </h2>
            <p className="mt-2 max-w-md" style={{ color: '#64748b', fontSize: '1rem' }}>
              Every session is built around movement, energy, and community — whether you join online or in person.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programExperience.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-xl p-7"
                style={{ backgroundColor: '#fff', border: '1px solid #fce7f3' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#fff1f4' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#1a0a14', fontSize: '1.05rem' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFFLINE / ONLINE TOGGLE ─── */}
      <section
        id="zumba-mode"
        className="section-padding"
        style={{ backgroundColor: '#1a0a14' }}
        aria-labelledby="zumba-mode-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: '#e11d48' }} />
            <h2
              id="zumba-mode-heading"
              className="font-extrabold text-white"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              Offline or Online — You Decide
            </h2>
            <p className="mt-2 max-w-md" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem' }}>
              Zumba classes are available in person at our Powai centre or online — choose the mode that fits your life.
            </p>
          </motion.div>
          <LearningModeToggle />
        </div>
      </section>

      {/* ─── PHOTO FEATURE ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#fff5f7' }}
        aria-label="Zumba gallery"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div ref={imgRef} className="rounded-2xl overflow-hidden cursor-pointer" style={{ height: '420px' }}>
              <img
                src="https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=800&q=80"
                alt="Women in a group fitness Zumba session"
                className="img-cover"
                loading="lazy"
              />
            </div>
            <motion.div {...fadeUp}>
              <div className="w-12 h-0.5 mb-5" style={{ backgroundColor: '#e11d48' }} />
              <h2
                className="font-extrabold mb-5"
                style={{ color: '#1a0a14', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
              >
                A Space Built for Women
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Our Special Ladies Batch creates a comfortable, motivating environment where women of all fitness levels can participate.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Based in Powai — easy to access, safe, and welcoming. And for those who prefer to join from home, online sessions are available too.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: '#64748b', fontSize: '0.95rem' }}>
                Each session is designed to keep you moving and feeling great — wherever you are.
              </p>
              <Link to="/admissions" className="btn-primary" style={{ backgroundColor: '#e11d48' }}>
                Enquire About Classes <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CLASS FLOW ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#1a0a14' }}
        aria-labelledby="class-flow-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="w-12 h-0.5 mb-4" style={{ backgroundColor: '#e11d48' }} />
            <h2
              id="class-flow-heading"
              className="font-extrabold text-white"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              A Typical Class Flow
            </h2>
            <p className="mt-2 text-sm" style={{ color: '#94a3b8' }}>
              A general example of the Zumba session experience — not a fixed schedule.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {classFlow.map((phase, i) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-xl"
                style={{
                  backgroundColor: i % 2 === 0 ? '#e11d48' : '#2d0e1e',
                  color: '#fff',
                  border: '1px solid rgba(225,29,72,0.2)',
                }}
              >
                <div
                  className="font-extrabold text-4xl mb-2 opacity-20"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="font-bold text-sm leading-snug">{phase}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#fff5f7' }}
        aria-labelledby="zumba-cta"
      >
        <div className="container-custom text-center">
          <motion.div {...fadeUp}>
            <h2
              id="zumba-cta"
              className="font-extrabold mb-4"
              style={{ color: '#1a0a14', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
            >
              Ready to Start Your Zumba Journey?
            </h2>
            <p className="mb-2 max-w-sm mx-auto" style={{ color: '#64748b' }}>
              Join the Special Ladies Batch at Asmita's Samast Shikshan.
            </p>
            <p className="mb-8 text-sm" style={{ color: '#94a3b8' }}>
              Available offline in Powai and online — your choice.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/admissions" className="btn-primary" style={{ backgroundColor: '#e11d48' }}>
                Enroll Now <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919869911317?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Zumba%20classes."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ borderColor: '#e11d48', color: '#e11d48' }}
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
