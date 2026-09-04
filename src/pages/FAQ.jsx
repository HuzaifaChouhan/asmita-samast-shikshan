import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What classes do you offer?',
    a: 'We offer two programs: Tuition Classes for students from 1st to 10th grade covering all subjects, and Zumba Classes for women through our Special Ladies Batch.',
  },
  {
    q: 'Which boards do you support?',
    a: 'Our tuition classes support all major education boards — MSC, CBSE, IC, and ICSE.',
  },
  {
    q: 'Which subjects are covered?',
    a: 'All subjects are covered for students from 1st to 10th class.',
  },
  {
    q: 'Do you have small batches?',
    a: 'Yes. Small batch sizes are a core part of our tuition offering — they allow teachers to give personalized attention to each student and ensure that every child gets the support they need.',
  },
  {
    q: 'Where are you located?',
    a: '302, Samoa Building, Pacific Enclave, Opp. Dr. L H Hiranandani Hospital, Powai, Mumbai — 400076.',
  },
  {
    q: 'How can I enquire about enrollment?',
    a: "You can reach out through our website's admissions form, call us at +91 98699 11317 or +91 84520 19912, or send us a WhatsApp message. We'll respond to guide you through the next steps.",
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span style={{ fontSize: '0.98rem' }}>{faq.q}</span>
        <span className="shrink-0">
          {open ? (
            <Minus size={18} className="text-amber-600" />
          ) : (
            <Plus size={18} className="text-slate-400" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="text-slate-500 pb-5 pr-8"
              style={{ fontSize: '0.93rem', lineHeight: '1.8' }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  useEffect(() => {
    document.title = "FAQ | Asmita's Samast Shikshan"
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="page-hero"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="faq-heading"
      >
        <div className="container-custom">
          <div className="max-w-xl">
            <div className="badge badge-gold mb-6">Frequently Asked Questions</div>
            <h1
              id="faq-heading"
              className="text-white font-extrabold mb-4"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              Questions &amp; Answers
            </h1>
            <p className="text-white/60" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
              Everything you need to know about our programs.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ACCORDION ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-label="FAQ list"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-8"
            >
              <div
                className="rounded-2xl p-8"
                style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
              >
                {faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col gap-5"
            >
              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: '#0F172A' }}
              >
                <h3 className="text-white font-bold mb-3" style={{ fontSize: '1rem' }}>
                  Still have questions?
                </h3>
                <p className="text-white/55 text-sm mb-4 leading-relaxed">
                  Call us or send a WhatsApp message — we're happy to help.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+919869911317"
                    className="btn-primary justify-center"
                    style={{ fontSize: '0.85rem' }}
                  >
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/919869911317?text=Hello%2C%20I%20have%20a%20question%20about%20Asmita's%20Samast%20Shikshan."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-white justify-center"
                    style={{ fontSize: '0.85rem' }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}
              >
                <p className="font-semibold text-sm mb-2" style={{ color: '#92400E' }}>📍 Our Location</p>
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
