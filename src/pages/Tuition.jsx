import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, ClipboardCheck, Target, Brain } from 'lucide-react'
import anime from 'animejs'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const classGroups = [
  { label: 'Primary', classes: ['1st', '2nd', '3rd', '4th', '5th'] },
  { label: 'Middle School', classes: ['6th', '7th', '8th'] },
  { label: 'Secondary', classes: ['9th', '10th'] },
]

const boards = ['MSC', 'CBSE', 'IC', 'ICSE']

const teachingApproach = [
  {
    icon: <Brain size={20} className="text-blue-600" />,
    title: 'Concept-Based Learning',
    desc: 'Students focus on understanding concepts instead of only memorization — building a strong academic foundation.',
  },
  {
    icon: <Target size={20} className="text-blue-600" />,
    title: 'Concentration Techniques',
    desc: 'Dedicated study sessions designed to encourage focus and productive learning habits.',
  },
  {
    icon: <Users size={20} className="text-blue-600" />,
    title: 'Personalized Attention',
    desc: 'Small batches allow closer interaction between students and teachers, ensuring clarity for every student.',
  },
  {
    icon: <BookOpen size={20} className="text-blue-600" />,
    title: 'Board Exam Focus',
    desc: 'Special academic attention for examination preparation across MSC, CBSE, IC, and ICSE boards.',
  },
  {
    icon: <ClipboardCheck size={20} className="text-blue-600" />,
    title: 'Regular Assessments',
    desc: 'Regular assessment and preparation to track progress and identify areas needing improvement.',
  },
]

const learningProcess = ['Understand', 'Practice', 'Assess', 'Improve', 'Prepare']

export default function Tuition() {
  const featuresRef = useRef(null)

  useEffect(() => {
    document.title = 'Tuition Classes in Powai | Asmita\'s Samast Shikshan'
  }, [])

  useEffect(() => {
    if (!featuresRef.current) return
    const items = featuresRef.current.querySelectorAll('.approach-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: featuresRef.current.querySelectorAll('.approach-item'),
              translateY: [24, 0],
              opacity: [0, 1],
              duration: 600,
              delay: anime.stagger(90),
              easing: 'easeOutExpo',
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )
    if (items.length) observer.observe(items[0])
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="page-hero"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="tuition-hero-heading"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="badge badge-gold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Tuition Classes
              </div>
              <h1
                id="tuition-hero-heading"
                className="text-white font-extrabold mb-5"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
              >
                Build Strong Foundations. Learn With Confidence.
              </h1>
              <p className="text-white/65 max-w-md mb-8" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                Asmita Tuition Classes provide academic support for students from 1st to 10th class across all subjects.
              </p>
              <Link to="/admissions" className="btn-primary">
                Enquire Now <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ height: '320px' }}>
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
                alt="Students attentively studying in a classroom"
                className="img-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLASSES ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="classes-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2
              id="classes-heading"
              className="font-extrabold"
              style={{ color: '#0F172A', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              Classes We Offer
            </h2>
            <p className="text-slate-500 mt-2">Comprehensive tuition for every stage of school education.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classGroups.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: gi * 0.1 }}
                className="rounded-xl p-6"
                style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
              >
                <h3 className="font-bold text-sm uppercase tracking-widest text-amber-600 mb-4">{group.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.classes.map((cls) => (
                    <span
                      key={cls}
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold"
                      style={{ backgroundColor: '#EFF6FF', color: '#1E40AF' }}
                    >
                      {cls} Class
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOARDS ─── */}
      <section
        className="py-14"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="boards-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="md:w-1/3">
              <div className="gold-line mb-4" />
              <h2
                id="boards-heading"
                className="text-white font-extrabold"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)' }}
              >
                Boards Supported
              </h2>
              <p className="text-white/50 mt-2 text-sm">
                All subjects covered for major education boards.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {boards.map((b) => (
                <div
                  key={b}
                  className="px-6 py-3 rounded font-bold text-lg tracking-widest"
                  style={{ border: '2px solid #D97706', color: '#D97706' }}
                >
                  {b}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TEACHING APPROACH ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="approach-heading"
        ref={featuresRef}
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2
              id="approach-heading"
              className="font-extrabold"
              style={{ color: '#0F172A', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              Our Teaching Approach
            </h2>
            <p className="text-slate-500 mt-2 max-w-md">
              Methods designed to help students genuinely learn and perform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachingApproach.map((item, i) => (
              <div
                key={item.title}
                className="approach-item rounded-xl p-7 opacity-0"
                style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#EFF6FF' }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-bold" style={{ color: '#0F172A', fontSize: '0.95rem' }}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEARNING PROCESS ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="process-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2
              id="process-heading"
              className="text-white font-extrabold"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              The Learning Process
            </h2>
            <p className="text-white/50 mt-2">A clear, structured path from understanding to readiness.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
            {learningProcess.map((step, i) => (
              <div key={step} className="flex md:flex-col items-center md:items-start flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col md:flex-row items-center"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ backgroundColor: '#D97706', color: '#fff' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < learningProcess.length - 1 && (
                    <div
                      className="hidden md:block flex-1 h-px"
                      style={{ backgroundColor: 'rgba(217,119,6,0.3)', minWidth: '2rem', marginLeft: 0 }}
                    />
                  )}
                </motion.div>
                <div className="ml-4 md:ml-0 md:mt-4 pb-6 md:pb-0">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}
                    className="font-bold text-white"
                    style={{ fontSize: '0.95rem' }}
                  >
                    {step}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="tuition-cta"
      >
        <div className="container-custom text-center">
          <motion.div {...fadeUp}>
            <h2
              id="tuition-cta"
              className="font-extrabold mb-4"
              style={{ color: '#0F172A', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
            >
              Interested in Tuition Classes?
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Reach out through our admissions form or contact us directly.
            </p>
            <Link to="/admissions" className="btn-primary">
              Send an Inquiry <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
