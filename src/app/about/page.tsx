'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-black">
      <section className="relative py-20">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-black to-black"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-thin tracking-widest text-white/80 uppercase mb-8">
              About
            </h1>
          </motion.div>

          <motion.div 
            className="space-y-8 text-white/60 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p>
              Soft Mad Children unlocks a gateway into the timeless realm of The Doors. We don&apos;t just perform their music: we craft a living ceremony where sound, visuals and Jim Morrison&apos;s poetic spirit come together.
            </p>

            <p>
              Each show is an immersive ritual: blending raw energy, cinematic projections and a charismatic frontman who channels the band&apos;s mystique. Backed by a lineup of musicians who mirror The Doors&apos; original synergy, capturing the subtle interplay, tension and release that defined their sound, Soft Mad Children offers more than a tribute. We deliver an experience that feels both authentically vintage and vibrantly alive.
            </p>

            <p>
              Here, you aren&apos;t just watching: you&apos;re part of the experience, transcending the ordinary and stepping into a world where The Doors&apos; legacy is reborn with every note.
            </p>

            <p className="italic text-xl mt-8">
              The ceremony awaits…. Is everybody in?
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}