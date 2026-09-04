import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#0F172A', paddingTop: '5rem' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center px-6"
      >
        <p
          className="font-extrabold text-amber-400 mb-4"
          style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', lineHeight: 1, opacity: 0.25 }}
        >
          404
        </p>
        <h1
          className="text-white font-extrabold mb-4"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
        >
          Page Not Found
        </h1>
        <p className="text-white/50 mb-8 max-w-xs mx-auto" style={{ fontSize: '0.95rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>
    </main>
  )
}
