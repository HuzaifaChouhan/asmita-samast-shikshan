import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Focus, Lightbulb, UserCheck, Activity, Heart } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const values = [
  {
    icon: <Focus size={20} className="text-amber-600" />,
    title: 'Focus',
    desc: 'Helping students develop concentration through dedicated, structured study sessions that build productive learning habits.',
    span: 'md:col-span-2',
  },
  {
    icon: <Lightbulb size={20} className="text-amber-600" />,
    title: 'Understanding',
    desc: 'Prioritizing concepts and clarity over rote memorization — so students truly grasp what they are learning.',
    span: '',
  },
  {
    icon: <UserCheck size={20} className="text-amber-600" />,
    title: 'Personal Attention',
    desc: 'Small batch sizes allow teachers to interact closely with each student, ensuring no one is left behind.',
    span: '',
  },
  {
    icon: <Activity size={20} className="text-amber-600" />,
    title: 'Wellbeing',
    desc: 'Fitness through Zumba — encouraging women to stay active, strong, and energetic.',
    span: '',
  },
  {
    icon: <Heart size={20} className="text-amber-600" />,
    title: 'Community',
    desc: 'A welcoming environment where students and participants feel safe, supported, and encouraged to grow.',
    span: 'md:col-span-2',
  },
]

export default function About() {
  useEffect(() => {
    document.title = "About | Asmita's Samast Shikshan"
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="page-hero"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="about-heading"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="badge badge-gold mb-6">
                About the Centre
              </div>
              <h1
                id="about-heading"
                className="text-white font-extrabold mb-5"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', lineHeight: 1.1 }}
              >
                Education for Growth
              </h1>
              <p className="text-white/65 max-w-md" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                Asmita's Samast Shikshan is a dedicated education and wellness centre in Powai, Mumbai — built around academic clarity, personal attention, and community wellbeing.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ height: '300px' }}>
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80"
                alt="Teacher engaging with students in a focused classroom setting"
                className="img-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="what-heading"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <motion.div {...fadeUp}>
              <div className="gold-line mb-4" />
              <h2
                id="what-heading"
                className="font-extrabold mb-5"
                style={{ color: '#0F172A', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
              >
                What We Stand For
              </h2>
              <div className="flex flex-col gap-5 text-slate-600" style={{ fontSize: '0.96rem', lineHeight: '1.85' }}>
                <p>
                  At Asmita's Samast Shikshan, we believe that education is most effective when it is personal, clear, and built on genuine understanding rather than surface-level memorization.
                </p>
                <p>
                  Our tuition classes for 1st–10th grade students across MSC, CBSE, IC, and ICSE boards are designed with small batch sizes — so every student receives the attention and support they need to truly grasp their subjects.
                </p>
                <p>
                  Beyond academics, we recognize that physical wellbeing is equally important. Our Zumba classes for women offer a vibrant, energetic, and welcoming space to stay active and build confidence through movement.
                </p>
                <p>
                  We are committed to discipline, focus, and creating a safe environment where both students and participants can thrive.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="col-span-2 rounded-xl overflow-hidden" style={{ height: '200px' }}>
                <img
                  src="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?w=700&q=80"
                  alt="Students working together on academic exercises"
                  className="img-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden" style={{ height: '160px' }}>
                <img
                  src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80"
                  alt="Active women in a group fitness session"
                  className="img-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden" style={{ height: '160px' }}>
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80"
                  alt="Open books representing academic study"
                  className="img-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#0F172A' }}
        aria-labelledby="values-heading"
      >
        <div className="container-custom">
          <motion.div {...fadeUp} className="mb-12">
            <div className="gold-line mb-4" />
            <h2
              id="values-heading"
              className="text-white font-extrabold"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)' }}
            >
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`rounded-xl p-7 ${v.span}`}
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(217,119,6,0.15)' }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-white font-bold" style={{ fontSize: '1rem' }}>{v.title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section-padding"
        style={{ backgroundColor: '#F8FAFC' }}
        aria-labelledby="about-cta"
      >
        <div className="container-custom text-center">
          <motion.div {...fadeUp}>
            <h2
              id="about-cta"
              className="font-extrabold mb-4"
              style={{ color: '#0F172A', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
            >
              Come Visit Us in Powai
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              We'd love to show you what Asmita's Samast Shikshan is all about.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="btn-primary">
                Get in Touch <ArrowRight size={16} />
              </Link>
              <Link to="/admissions" className="btn-outline">
                Enroll Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
