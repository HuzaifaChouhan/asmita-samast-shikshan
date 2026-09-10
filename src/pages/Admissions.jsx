import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle, CheckCircle } from 'lucide-react'
import { Ord } from '../utils/ordinal'

const WHATSAPP_URL =
  "https://wa.me/919869911317?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Asmita's%20Samast%20Shikshan%20programs."

const classes = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']
const standards = ['11th', '12th']
const streams = ['Science', 'Commerce', 'Arts']

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const fieldReveal = {
  initial: { opacity: 0, height: 0, marginTop: 0 },
  animate: { opacity: 1, height: 'auto', marginTop: '0px' },
  exit: { opacity: 0, height: 0, marginTop: 0 },
  transition: { duration: 0.25, ease: 'easeInOut' },
}

// Program type radio-style cards
const programTypes = [
  {
    id: 'school-tuition',
    value: 'School Tuition',
    label: 'School Tuition',
    sub: <><Ord>1st</Ord> to <Ord>10th</Ord> · All Subjects</>,
    accent: '#1E40AF',
    bg: '#EFF6FF',
    border: '#BFDBFE',
  },
  {
    id: 'senior-secondary',
    value: '11th & 12th',
    label: '11th & 12th',
    sub: 'Science · Commerce · Arts',
    accent: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
  {
    id: 'zumba',
    value: 'Zumba',
    label: 'Zumba',
    sub: 'Special Ladies Batch',
    accent: '#9F1239',
    bg: '#FFF1F5',
    border: '#FECDD3',
  },
]

const learningModes = [
  { value: 'Offline', label: 'Offline Classes', sub: 'In-person at our centre' },
  { value: 'Online', label: 'Online Classes', sub: 'Learn from anywhere' },
  { value: 'Not Sure', label: 'Not Sure Yet', sub: "I'll decide later" },
]

function AdmissionForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    programType: '',
    studentClass: '',
    standard: '',
    stream: '',
    learningMode: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const isSchoolTuition = form.programType === 'School Tuition'
  const isSeniorSecondary = form.programType === '11th & 12th'
  // Show learning mode for ALL program types once one is selected
  const showLearningMode = !!form.programType

  // Reset dependent fields when program type changes
  const handleProgramChange = (value) => {
    setForm((prev) => ({
      ...prev,
      programType: value,
      studentClass: '',
      standard: '',
      stream: '',
      learningMode: '',
    }))
    if (errors.programType) setErrors((prev) => ({ ...prev, programType: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.phone.trim()) errs.phone = 'Phone number is required.'
    if (!form.programType) errs.programType = 'Please select a program.'
    if (isSchoolTuition && !form.studentClass) errs.studentClass = 'Please select the student class.'
    if (isSeniorSecondary) {
      if (!form.standard) errs.standard = 'Please select 11th or 12th.'
      if (!form.stream) errs.stream = 'Please select a stream.'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
    setForm({
      name: '', phone: '', email: '', programType: '',
      studentClass: '', standard: '', stream: '',
      learningMode: '', message: '',
    })
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-14"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: '#ECFDF5' }}
        >
          <CheckCircle size={32} className="text-emerald-500" />
        </div>
        <h3 className="font-bold text-xl mb-2" style={{ color: '#0F172A' }}>
          Inquiry Received!
        </h3>
        <p className="text-slate-500 mb-6 max-w-xs">
          Thank you for reaching out. We'll get in touch with you shortly to discuss the next steps.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-primary"
          style={{ fontSize: '0.85rem', padding: '0.6rem 1.4rem' }}
        >
          Send Another Inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label htmlFor="adm-name" className="form-label">
          Student / Parent Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="adm-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="form-input"
          autoComplete="name"
        />
        {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="adm-phone" className="form-label">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <input
          id="adm-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
          className="form-input"
          autoComplete="tel"
        />
        {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="adm-email" className="form-label">
          Email <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <input
          id="adm-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="form-input"
          autoComplete="email"
        />
      </div>

      {/* Program Type — Step 1 */}
      <div>
        <label className="form-label">
          Program Type <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1" role="group" aria-label="Select program type">
          {programTypes.map((pt) => {
            const isSelected = form.programType === pt.value
            return (
              <button
                key={pt.id}
                type="button"
                id={`prog-${pt.id}`}
                onClick={() => handleProgramChange(pt.value)}
                aria-pressed={isSelected}
                className="text-left p-3.5 rounded-lg border-2 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isSelected ? pt.bg : '#fff',
                  borderColor: isSelected ? pt.accent : '#e2e8f0',
                  boxShadow: isSelected ? `0 0 0 2px ${pt.accent}22` : 'none',
                }}
              >
                <p
                  className="font-bold text-sm"
                  style={{ color: isSelected ? pt.accent : '#0F172A' }}
                >
                  {pt.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: isSelected ? pt.accent : '#94a3b8', opacity: isSelected ? 0.75 : 1 }}>
                  {pt.sub}
                </p>
              </button>
            )
          })}
        </div>
        {errors.programType && <p className="text-rose-500 text-xs mt-1">{errors.programType}</p>}
      </div>

      {/* Step 2a: School Tuition → Class */}
      <AnimatePresence>
        {isSchoolTuition && (
          <motion.div key="class-field" {...fieldReveal} style={{ overflow: 'hidden' }}>
            <label htmlFor="adm-class" className="form-label">
              Student Class <span className="text-rose-500">*</span>
            </label>
            <select
              id="adm-class"
              name="studentClass"
              value={form.studentClass}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls} Class</option>
              ))}
            </select>
            {errors.studentClass && (
              <p className="text-rose-500 text-xs mt-1">{errors.studentClass}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2b: 11th & 12th → Standard + Stream */}
      <AnimatePresence>
        {isSeniorSecondary && (
          <motion.div key="senior-fields" {...fieldReveal} className="flex flex-col gap-4" style={{ overflow: 'hidden' }}>
            {/* Standard */}
            <div>
              <label htmlFor="adm-standard" className="form-label">
                Standard <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-3 mt-1" role="group" aria-label="Select standard">
                {standards.map((s) => (
                  <button
                    key={s}
                    type="button"
                    id={`standard-${s}`}
                    onClick={() => {
                      setForm((prev) => ({ ...prev, standard: s }))
                      if (errors.standard) setErrors((prev) => ({ ...prev, standard: '' }))
                    }}
                    aria-pressed={form.standard === s}
                    className="flex-1 py-3 rounded-lg border-2 font-bold text-sm transition-all duration-200"
                    style={{
                      backgroundColor: form.standard === s ? '#FFFBEB' : '#fff',
                      borderColor: form.standard === s ? '#D97706' : '#e2e8f0',
                      color: form.standard === s ? '#D97706' : '#0F172A',
                    }}
                  >
                    {s} Std
                  </button>
                ))}
              </div>
              {errors.standard && <p className="text-rose-500 text-xs mt-1">{errors.standard}</p>}
            </div>

            {/* Stream */}
            <div>
              <label className="form-label">
                Stream <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2 mt-1" role="group" aria-label="Select stream">
                {streams.map((s) => {
                  const colors = {
                    Science: { accent: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE' },
                    Commerce: { accent: '#065F46', bg: '#ECFDF5', border: '#A7F3D0' },
                    Arts: { accent: '#6D28D9', bg: '#F5F3FF', border: '#DDD6FE' },
                  }[s]
                  const isSel = form.stream === s
                  return (
                    <button
                      key={s}
                      type="button"
                      id={`stream-${s.toLowerCase()}`}
                      onClick={() => {
                        setForm((prev) => ({ ...prev, stream: s }))
                        if (errors.stream) setErrors((prev) => ({ ...prev, stream: '' }))
                      }}
                      aria-pressed={isSel}
                      className="py-3 px-2 rounded-lg border-2 font-bold text-sm transition-all duration-200 text-center"
                      style={{
                        backgroundColor: isSel ? colors.bg : '#fff',
                        borderColor: isSel ? colors.accent : '#e2e8f0',
                        color: isSel ? colors.accent : '#0F172A',
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
              {errors.stream && <p className="text-rose-500 text-xs mt-1">{errors.stream}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: Learning Mode — shown for ALL program types */}
      <AnimatePresence>
        {showLearningMode && (
          <motion.div key="learning-mode" {...fieldReveal} style={{ overflow: 'hidden' }}>
            <label className="form-label">
              Preferred Learning Mode
            </label>
            <div className="flex flex-col gap-2 mt-1" role="group" aria-label="Select preferred learning mode">
              {learningModes.map((lm) => {
                const isSel = form.learningMode === lm.value
                return (
                  <button
                    key={lm.value}
                    type="button"
                    id={`mode-${lm.value.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setForm((prev) => ({ ...prev, learningMode: lm.value }))}
                    aria-pressed={isSel}
                    className="flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all duration-200"
                    style={{
                      backgroundColor: isSel ? '#FFFBEB' : '#fff',
                      borderColor: isSel ? '#D97706' : '#e2e8f0',
                    }}
                  >
                    {/* Radio indicator */}
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{ borderColor: isSel ? '#D97706' : '#cbd5e1' }}
                    >
                      {isSel && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D97706' }} />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: isSel ? '#D97706' : '#0F172A' }}>
                        {lm.label}
                      </p>
                      <p className="text-xs text-slate-400">{lm.sub}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message */}
      <div>
        <label htmlFor="adm-message" className="form-label">
          Message
        </label>
        <textarea
          id="adm-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Any specific questions or requirements..."
          className="form-input"
          rows={4}
        />
      </div>

      <button type="submit" className="btn-primary justify-center mt-2">
        Send Inquiry <ArrowRight size={16} />
      </button>
    </form>
  )
}

export default function Admissions() {
  useEffect(() => {
    document.title = "Admissions | Asmita's Samast Shikshan"
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="page-hero"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="admissions-heading"
      >
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="badge badge-gold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Enquire Today
            </div>
            <h1
              id="admissions-heading"
              className="text-white font-extrabold mb-4"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
            >
              Take the First Step
            </h1>
            <p className="text-white/65 max-w-lg" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
              Tell us what you're looking for and we'll help you understand the right program for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS OVERVIEW ─── */}
      <section
        className="py-12"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="programs-overview"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* School Tuition */}
            <motion.div
              {...fadeUp}
              className="rounded-xl p-7"
              style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
            >
              <h2
                id="programs-overview"
                className="font-bold mb-1"
                style={{ color: '#1E40AF', fontSize: '1.05rem' }}
              >
                School Tuition
              </h2>
              <p className="text-slate-500 text-sm mb-3"><Ord>1st</Ord>–<Ord>10th</Ord> Class · All Subjects</p>
              <div className="flex flex-wrap gap-2">
                {['HSC', 'SSC', 'CBSE', 'IC', 'ICSE'].map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: '#DBEAFE', color: '#1E40AF' }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Senior Secondary */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="rounded-xl p-7"
              style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}
            >
              <h3 className="font-bold mb-1" style={{ color: '#92400E', fontSize: '1.05rem' }}>
                Senior Secondary
              </h3>
              <p className="text-slate-500 text-sm mb-3">11th &amp; 12th Standard</p>
              <div className="flex flex-wrap gap-2">
                {['Science', 'Commerce', 'Arts'].map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Zumba */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="rounded-xl p-7"
              style={{ backgroundColor: '#FFF1F5', border: '1px solid #FECDD3' }}
            >
              <h3 className="font-bold mb-1" style={{ color: '#9F1239', fontSize: '1.05rem' }}>
                Zumba Classes
              </h3>
              <p className="text-slate-500 text-sm mb-2">Special Ladies Batch</p>
              <div className="flex flex-wrap gap-2">
                {['Offline', 'Online'].map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: '#FFE4E6', color: '#9F1239' }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FORM + CONTACT ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="form-heading"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Form */}
            <motion.div
              {...fadeUp}
              className="lg:col-span-7 rounded-2xl p-8"
              style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
            >
              <h2
                id="form-heading"
                className="font-extrabold mb-1"
                style={{ color: '#0F172A', fontSize: '1.5rem' }}
              >
                Send an Inquiry
              </h2>
              <p className="text-slate-500 text-sm mb-7">
                Fill in your details and we'll get back to you.
              </p>
              <AdmissionForm />
            </motion.div>

            {/* Contact Sidebar */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              <div>
                <h3 className="font-bold mb-4" style={{ color: '#0F172A', fontSize: '1.1rem' }}>
                  Prefer to reach out directly?
                </h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="tel:+919869911317"
                    className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                    style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#F0FDF4' }}
                    >
                      📞
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#0F172A' }}>Call Us</p>
                      <p className="text-slate-500 text-sm">+91 98699 11317</p>
                    </div>
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                    style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#F0FDF4' }}
                    >
                      <MessageCircle size={18} style={{ color: '#25D366' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#0F172A' }}>WhatsApp</p>
                      <p className="text-slate-500 text-sm">Chat with us directly</p>
                    </div>
                  </a>
                </div>
              </div>

              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}
              >
                <p className="font-semibold text-sm mb-1" style={{ color: '#92400E' }}>📍 Visit Us</p>
                <p className="text-sm leading-relaxed" style={{ color: '#78350F' }}>
                  302, Samoa Building, Pacific Enclave,<br />
                  Opp. Dr. L H Hiranandani Hospital,<br />
                  Powai, Mumbai — 400076
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
