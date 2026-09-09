import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, ArrowRight, Trophy, Users, ShieldCheck, MessageCircle, BookOpen, Dumbbell, GraduationCap, Monitor } from 'lucide-react'
import anime from 'animejs'

const BG_VIDEO_SRC = '/videos/coverr-temp-8i3tgen-3-alpha-2290351142-a-title-screen-with-nuzu9694acolorful-mp4-7090-1080p.mp4'

const WHATSAPP_URL =
  "https://wa.me/919869911317?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Asmita's%20Samast%20Shikshan%20programs."

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: 'easeOut' },
}

export default function Home() {
  const heroHeadRef = useRef(null)
  const videoRef = useRef(null)

  // Word-by-word heading animation
  useEffect(() => {
    if (heroHeadRef.current) {
      const text = heroHeadRef.current.innerText
      heroHeadRef.current.innerHTML = text
        .split(' ')
        .map((w) => `<span style="display:inline-block;overflow:hidden;"><span style="display:inline-block;transform:translateY(100%)">${w}</span></span>`)
        .join(' ')

      anime({
        targets: heroHeadRef.current.querySelectorAll('span > span'),
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(80, { start: 300 }),
        easing: 'easeOutExpo',
      })
    }
  }, [])

  // Ensure video plays (handles browser autoplay policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { })
    }
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: '#0F172A', paddingTop: '5rem' }}
        aria-label="Hero section"
      >
        {/* ── Looping background video ── */}
        <video
          ref={videoRef}
          src={BG_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* ── Dark gradient overlay — keeps text readable ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(135deg, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.60) 60%, rgba(15,23,42,0.40) 100%)',
          }}
        />

        {/* ── Hero content ── */}
        <div className="container-custom w-full py-24 relative" style={{ zIndex: 2 }}>
          <div className="max-w-2xl">

            {/* Admissions badge */}
            <div className="badge badge-gold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Admissions Open for New Session
            </div>

            <h1
              ref={heroHeadRef}
              className="text-white mb-6"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', lineHeight: '1.1', fontWeight: 800 }}
            >
              Unleash the Power of Focus &amp; Excellence in Your Child.
            </h1>

            <p
              className="text-white/75 mb-10 max-w-lg"
              style={{ fontSize: '1.1rem', lineHeight: '1.85' }}
            >
              Academic tuition for 1st–12th standard — including 11th &amp; 12th across Science, Commerce, and Arts — alongside Zumba fitness programs for women. Available offline and online.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link to="/tuition" className="btn-primary" id="hero-btn-tuition">
                Explore Tuition <ArrowRight size={16} />
              </Link>
              <Link to="/zumba" className="btn-outline-white" id="hero-btn-zumba">
                Explore Zumba
              </Link>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-white/45 text-sm">
              <MapPin size={14} className="text-amber-400" />
              <span>302 Samoa Building, Pacific Enclave, Powai, Mumbai</span>
            </div>

          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            opacity: 0.5,
          }}
        >
          <span style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: '2.5rem',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
              animation: 'scrollPulse 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="services-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-14">
            <div className="gold-line mb-4" />
            <h2
              id="services-heading"
              className="text-navy-900 font-extrabold"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)' }}
            >
              Two Programs, One Centre
            </h2>
            <p className="text-slate-500 mt-2 max-w-md" style={{ fontSize: '1rem' }}>
              Academic excellence and active wellness — everything under one roof in Powai.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tuition Service Card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-2xl"
              style={{ backgroundColor: '#0F172A', minHeight: '400px' }}
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&q=75"
                  alt="Books and academic learning environment"
                  className="img-cover opacity-20"
                  loading="lazy"
                />
              </div>
              <div className="relative p-8 md:p-10 h-full flex flex-col justify-between" style={{ minHeight: '400px' }}>
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="board-badge" style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#F59E0B' }}>SSC</span>
                    <span className="board-badge" style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#F59E0B' }}>CBSE</span>
                    <span className="board-badge" style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#F59E0B' }}>IC</span>
                    <span className="board-badge" style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#F59E0B' }}>ICSE</span>
                  </div>
                  <h3
                    className="font-extrabold text-white mb-2"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                  >
                    Asmita Tuition Classes
                  </h3>
                  <p className="text-amber-400 font-semibold mb-1 text-sm tracking-wide uppercase">
                    1st to 12th Standard
                  </p>
                  <p className="text-white/45 text-xs mb-4">Science · Commerce · Arts for 11th &amp; 12th · Offline &amp; Online</p>
                  <ul className="flex flex-col gap-2 mb-8">
                    {['Concept-Based Learning', 'Small Batches', 'Personalized Attention', 'Regular Assessments'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/tuition"
                  className="btn-primary self-start"
                  style={{ backgroundColor: '#D97706' }}
                >
                  Explore Tuition <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Zumba Service Card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-2xl"
              style={{ minHeight: '400px' }}
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=75"
                  alt="Women in an energetic Zumba fitness class"
                  className="img-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(159, 18, 57, 0.72)' }} />
              </div>
              <div className="relative p-8 md:p-10 h-full flex flex-col justify-between" style={{ minHeight: '400px' }}>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="badge badge-white">Special Ladies Batch</div>
                    <div
                      className="badge"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.75)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      Offline &amp; Online
                    </div>
                  </div>
                  <h3
                    className="font-extrabold text-white mb-3"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                  >
                    Asmita Zumba Academy
                  </h3>
                  <p className="text-white/80 leading-relaxed max-w-xs" style={{ fontSize: '0.95rem' }}>
                    Energetic fitness sessions designed to build strength and endurance in a supportive community.
                  </p>
                </div>
                <Link
                  to="/zumba"
                  className="self-start mt-8"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    padding: '0.75rem 1.75rem',
                    borderRadius: '0.375rem',
                    border: '2px solid rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  Explore Zumba <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── LEARN YOUR WAY ─── */}
      <section
        id="learn-your-way"
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="learn-your-way-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{
                backgroundColor: '#FEF3C7',
                border: '1px solid #FDE68A',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#92400E' }}>Choose How You Learn</span>
            </div>
            <h2
              id="learn-your-way-heading"
              className="font-extrabold"
              style={{ color: '#0F172A', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', lineHeight: 1.1 }}
            >
              Learn Your Way —
              <br />
              <span style={{ color: '#D97706' }}>Online</span> or <span style={{ color: '#0F172A' }}>Offline</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
              All academic tuition and Zumba classes are available in two modes. Pick what fits your life.
            </p>
          </motion.div>

          {/* Two panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Offline panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative rounded-2xl overflow-hidden group"
              style={{ minHeight: '340px' }}
            >
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80"
                alt="Students attending offline tuition classes in person"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.55s ease',
                }}
                className="group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.35) 60%, transparent 100%)',
              }} />
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8" style={{ minHeight: '340px' }}>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 self-start"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <MapPin size={12} className="text-amber-400" />
                  <span className="text-xs font-semibold text-white/80">In-Person</span>
                </div>
                <h3 className="text-white font-extrabold mb-2" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>
                  Offline Classes
                </h3>
                <p className="text-white/65 text-sm mb-5 max-w-xs">
                  Attend in person at our centre in Powai. A focused, structured environment with direct teacher interaction.
                </p>
                <Link to="/tuition" className="inline-flex items-center gap-1.5 font-semibold text-sm text-amber-400">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Online panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="relative rounded-2xl overflow-hidden group"
              style={{ minHeight: '340px' }}
            >
              {/* Image */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJBelutSN5QZ6lmM_YejmvevlXakd5KN6BAcrWiHK8yQ&s=10"
                alt="Student attending online class from home on a laptop"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.55s ease',
                }}
                className="group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.90) 0%, rgba(15,23,42,0.35) 60%, transparent 100%)',
              }} />
              {/* Amber glow accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, #D97706, #F59E0B, #D97706)',
              }} />
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8" style={{ minHeight: '340px' }}>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 self-start"
                  style={{ backgroundColor: 'rgba(217,119,6,0.2)', border: '1px solid rgba(217,119,6,0.4)' }}
                >
                  <Monitor size={12} className="text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">Now Available Online</span>
                </div>
                <h3 className="text-white font-extrabold mb-2" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>
                  Online Classes
                </h3>
                <p className="text-white/65 text-sm mb-5 max-w-xs">
                  Learn from wherever you are. Tuition and Zumba both available online — quality support beyond the classroom.
                </p>
                <Link to="/admissions" className="inline-flex items-center gap-1.5 font-semibold text-sm text-amber-400">
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ACADEMIC EXPANSION SECTION ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="academic-expansion-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-14">
            <div className="gold-line mb-4" />
            <h2
              id="academic-expansion-heading"
              className="font-extrabold text-white"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)' }}
            >
              From School Years to Senior Secondary
            </h2>
            <p className="text-white/50 mt-3 max-w-lg" style={{ fontSize: '1rem' }}>
              A complete academic pathway — from 1st standard through 12th, with support at every stage.
              Available offline and online.
            </p>
          </motion.div>

          {/* Two-column layout: progression + online badge */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Left: Progression */}
            <div className="flex flex-col gap-0">
              {[
                { range: '1st – 5th', label: 'Primary', delay: 0 },
                { range: '6th – 8th', label: 'Middle School', delay: 0.08 },
                { range: '9th – 10th', label: 'Secondary', delay: 0.16 },
                { range: '11th – 12th', label: 'Arts · Commerce · Science', delay: 0.24, highlight: true },
              ].map((step, i, arr) => (
                <motion.div
                  key={step.range}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: step.delay }}
                  className="flex items-stretch gap-5"
                >
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full shrink-0 mt-1.5"
                      style={{ backgroundColor: step.highlight ? '#F59E0B' : 'rgba(255,255,255,0.25)' }}
                    />
                    {i < arr.length - 1 && (
                      <div
                        className="flex-1 w-px my-1"
                        style={{ backgroundColor: 'rgba(255,255,255,0.08)', minHeight: '2rem' }}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div
                    className="pb-6"
                    style={{
                      // paddingLeft: '0.25rem',
                      borderLeft: step.highlight ? '1px solid rgba(245,158,11,0.2)' : 'none',
                      paddingLeft: step.highlight ? '0.75rem' : '0',
                    }}
                  >
                    <p
                      className="font-extrabold"
                      style={{
                        color: step.highlight ? '#F59E0B' : 'rgba(255,255,255,0.85)',
                        fontSize: '1.05rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {step.range}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: step.highlight ? 'rgba(245,158,11,0.65)' : 'rgba(255,255,255,0.35)' }}
                    >
                      {step.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Cards */}
            <div className="flex flex-col gap-4">
              {/* School Tuition card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="rounded-xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(217,119,6,0.15)' }}
                  >
                    <BookOpen size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">School Tuition</p>
                    <p className="text-white/40 text-xs">1st to 10th Standard</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Comprehensive academic support for all grades and subjects — concept-based learning with personal attention.
                </p>
                <Link to="/tuition" className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-semibold mt-4">
                  Learn More <ArrowRight size={13} />
                </Link>
              </motion.div>

              {/* Senior Secondary card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="rounded-xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(217,119,6,0.12) 0%, rgba(217,119,6,0.04) 100%)',
                  border: '1px solid rgba(217,119,6,0.25)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(217,119,6,0.2)' }}
                  >
                    <GraduationCap size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Senior Secondary</p>
                    <p className="text-amber-400/70 text-xs">11th &amp; 12th Standard — New</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Arts, Commerce, and Science — academic support for 11th and 12th students preparing for their future.
                </p>
                <Link to="/tuition/senior-secondary" className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-semibold mt-4">
                  Explore Streams <ArrowRight size={13} />
                </Link>
              </motion.div>

              {/* Online classes note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="rounded-xl p-5 flex items-center gap-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <Monitor size={17} className="text-white/60" />
                </div>
                <div>
                  <p className="text-white/75 font-semibold text-sm">Online &amp; Offline Learning</p>
                  <p className="text-white/35 text-xs mt-0.5">Learn from wherever you are — academic support accessible beyond the classroom.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="why-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2
              id="why-heading"
              className="font-extrabold text-white"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)' }}
            >
              A Place to Learn, Focus &amp; Grow
            </h2>
            <p className="text-white/50 mt-3 max-w-lg" style={{ fontSize: '1rem' }}>
              Everything about Asmita's Samast Shikshan is built around clarity, personal attention, and a safe space to thrive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1rem', overflow: 'hidden' }}>
            {[
              {
                icon: <Trophy size={22} className="text-amber-400" />,
                title: 'Concept-Based Learning',
                desc: 'Focus on foundational clarity rather than rote memorization — helping students truly understand what they study.',
              },
              {
                icon: <Users size={22} className="text-amber-400" />,
                title: 'Small Batch Size',
                desc: 'Designed to provide personalized attention, ensuring no student is left behind.',
              },
              {
                icon: <ShieldCheck size={22} className="text-amber-400" />,
                title: 'Safe Environment',
                desc: 'CCTV surveillance and clean, hygienic facilities provide a secure learning space.',
              },
              {
                icon: <MapPin size={22} className="text-amber-400" />,
                title: 'Prime Location',
                desc: 'Located opposite Dr. L.H. Hiranandani Hospital in Powai — easily accessible.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                className="p-8"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-white font-bold mb-2" style={{ fontSize: '1rem' }}>
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="how-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2
              id="how-heading"
              className="font-extrabold text-navy-900"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', color: '#0F172A' }}
            >
              How It Works
            </h2>
            <p className="text-slate-500 mt-3 max-w-md" style={{ fontSize: '1rem' }}>
              Getting started is straightforward — three simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                num: '01',
                title: 'Choose Your Program',
                desc: 'Decide between Tuition Classes for your child (1st–10th) or Zumba sessions for women.',
                icon: <BookOpen size={20} className="text-amber-600" />,
              },
              {
                num: '02',
                title: 'Send an Inquiry',
                desc: 'Use the admissions form, call us, or reach out via WhatsApp — tell us what you are looking for.',
                icon: <MessageCircle size={20} className="text-amber-600" />,
              },
              {
                num: '03',
                title: 'Visit &amp; Enroll',
                desc: 'Connect with the center, visit us in Powai, and proceed with enrollment.',
                icon: <Dumbbell size={20} className="text-amber-600" />,
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="relative"
              >
                <div className="step-number mb-2">{step.num}</div>
                <div
                  className="absolute top-3 left-0 w-px"
                  style={{ height: 'calc(100% - 3rem)', backgroundColor: '#e2e8f0' }}
                />
                <div className="pl-5">
                  <div className="flex items-center gap-2 mb-2">
                    {step.icon}
                    <h3 className="font-bold text-navy-900" style={{ color: '#0F172A', fontSize: '1.05rem' }}
                      dangerouslySetInnerHTML={{ __html: step.title }}
                    />
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATION ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="location-heading"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <div className="gold-line mb-4" />
              <h2
                id="location-heading"
                className="font-extrabold text-white mb-4"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)' }}
              >
                Find Us in Powai
              </h2>
              <p className="text-white/60 leading-relaxed mb-6" style={{ fontSize: '0.95rem' }}>
                302, Samoa Building, Pacific Enclave,<br />
                Opp. Dr. L H Hiranandani Hospital,<br />
                Powai, Mumbai — 400076
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+919869911317"
                  className="btn-primary"
                >
                  <Phone size={16} /> Call Us
                </a>
                <a
                  href="https://maps.google.com/?q=302+Samoa+Building+Pacific+Enclave+Powai+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-white"
                >
                  <MapPin size={16} /> Get Directions
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-white"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="rounded-2xl overflow-hidden"
              style={{ height: '280px' }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TujiGtBBpZDNFv9e4xisBID4nh3D3jwEvkp5ncQUUQ&s=10"
                alt="Mumbai cityscape representing Powai location"
                className="img-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="cta-heading"
      >
        <div className="container-custom text-center">
          <motion.div {...fadeUp}>
            <h2
              id="cta-heading"
              className="font-extrabold mb-4"
              style={{ color: '#0F172A', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
            >
              Ready to Take the First Step?
            </h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8" style={{ fontSize: '1rem' }}>
              Whether it's tuition for your child or Zumba for yourself — we'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/admissions" className="btn-primary">
                Enquire Now <ArrowRight size={16} />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
