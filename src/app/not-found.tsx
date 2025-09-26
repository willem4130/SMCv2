'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-thin text-white/20 mb-8">
            404
          </h1>
          
          <p className="text-white/60 mb-8 uppercase tracking-wider">
            Page not found
          </p>
          
          <Link
            href="/"
            className="inline-block minimal-button"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}