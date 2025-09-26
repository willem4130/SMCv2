'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-400 mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition-colors"
        >
          Try again
        </button>
      </motion.div>
    </div>
  )
}