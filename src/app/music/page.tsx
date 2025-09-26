'use client'

import { motion } from 'framer-motion'

const releases = [
  { title: 'Forest Echoes', year: '2024', type: 'Album' },
  { title: 'Amber Nights', year: '2023', type: 'EP' },
  { title: 'Shadow Walker', year: '2021', type: 'Album' },
]

export default function MusicPage() {
  return (
    <div className="pt-16 min-h-screen bg-black">
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-black"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-thin tracking-widest text-white/80 uppercase mb-8">
              Music
            </h1>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {releases.map((release) => (
              <div 
                key={release.title} 
                className="border-b border-white/10 pb-8 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-thin text-white/80 uppercase tracking-wider mb-2">
                      {release.title}
                    </h3>
                    <p className="text-white/40 text-sm uppercase tracking-wider">
                      {release.type}
                    </p>
                  </div>
                  <span className="text-white/40 text-sm">
                    {release.year}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p className="text-white/40 text-sm uppercase tracking-wider">
              Available on all streaming platforms
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}