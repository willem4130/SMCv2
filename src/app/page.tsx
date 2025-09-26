'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Facebook } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import VideoBackground from '@/components/VideoBackground'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Gallery images - add your image filenames here
  const galleryImages = [
    'soft-mad-children-band-1.jpg',
    'soft-mad-children-band-2.jpg',
    'soft-mad-children-band-3.jpg',
    'soft-mad-children-band-4.jpg',
    'soft-mad-children-band-5.jpg',
    'soft-mad-children-band-6.jpg',
    'soft-mad-children-band-7.jpg',
    'soft-mad-children-band-8.jpg',
  ]

  return (
    <div className="bg-black">
      {/* Hero Section with Forest Background */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        {/* Background layers for parallax effect */}
        <div className="absolute inset-0">
          {/* Main forest background - slowly zooming */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-back"
            style={{
              backgroundImage: 'url(/forest-scene.jpg)',
              backgroundSize: '120%',
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Fog overlay layers with movement */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 animate-fog" />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent animate-fog" 
            style={{ animationDelay: '30s', animationDuration: '120s' }}
          />
          
          {/* Subtle dark teal glow from bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[150%] h-[70%]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E3A]/30 via-transparent to-transparent" />
          </div>
          
          {/* Enhanced mystical fog layers - larger, smoother waves */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 800px 400px at 50% 50%, rgba(51, 65, 85, 0.4) 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
            initial={{ x: "-50%", scale: 1 }}
            animate={{ 
              x: ["50%", "-50%"],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 90, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 1000px 500px at 30% 60%, rgba(67, 56, 202, 0.3) 0%, transparent 60%)`,
              filter: 'blur(60px)',
            }}
            initial={{ x: "60%", y: "10%" }}
            animate={{ 
              x: ["-60%", "60%"],
              y: ["10%", "-10%", "10%"],
            }}
            transition={{ 
              duration: 120, 
              ease: [0.43, 0.13, 0.23, 0.96],
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 900px 450px at 70% 40%, rgba(88, 28, 135, 0.25) 0%, transparent 65%)`,
              filter: 'blur(50px)',
            }}
            initial={{ x: "-70%", y: "-5%" }}
            animate={{ 
              x: ["70%", "-70%"],
              y: ["-5%", "5%", "-5%"],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{ 
              duration: 100, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Mystic fire effects at bottom */}
          <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
            {/* Base fire glow */}
            <motion.div
              className="absolute bottom-0 left-1/4 w-24 h-20 bg-gradient-to-t from-blue-600/60 via-purple-500/40 to-transparent rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-1/3 w-20 h-16 bg-gradient-to-t from-indigo-600/50 via-blue-500/30 to-transparent rounded-full blur-sm"
              animate={{ 
                scale: [1.1, 0.9, 1.1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute bottom-0 left-2/3 w-16 h-14 bg-gradient-to-t from-purple-600/40 via-indigo-400/25 to-transparent rounded-full blur-sm"
              animate={{ 
                scale: [0.8, 1.3, 0.8],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 2 }}
            />
          </div>
          
          {/* Simulated figure movement layers */}
          {/* Since we can\'t separate the figures from the image, we\'ll create subtle overlay effects */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3">
            {/* Left figures subtle movement */}
            <div className="absolute left-[15%] bottom-0 w-32 h-48 animate-walk-left" />
            <div className="absolute left-[30%] bottom-0 w-32 h-56 animate-walk-center" style={{ animationDelay: '5s' }} />
            
            {/* Center figure */}
            <div className="absolute left-[50%] transform -translate-x-1/2 bottom-0 w-32 h-60 animate-sway" />
            
            {/* Right figures subtle movement */}
            <div className="absolute right-[30%] bottom-0 w-32 h-56 animate-walk-center" style={{ animationDelay: '8s' }} />
            <div className="absolute right-[15%] bottom-0 w-32 h-48 animate-walk-right" />
          </div>
          
          {/* Glowing embers rising from fires */}
          {[...Array(8)].map((_, i) => {
            const baseX = [25, 33, 66][Math.floor(i / 3)] || 50; // Cluster near fire sources
            const offsetX = (i % 3) * 10 - 10; // Slight offset within cluster
            
            return (
              <motion.div
                key={`ember-${i}`}
                className="absolute rounded-full"
                style={{
                  width: '3px',
                  height: '3px',
                  left: `${baseX + offsetX}%`,
                  bottom: '5%',
                  background: `radial-gradient(circle, rgba(147, 197, 253, 0.9) 0%, rgba(165, 180, 252, 0.6) 40%, transparent 70%)`,
                  boxShadow: '0 0 6px rgba(147, 197, 253, 0.8), 0 0 12px rgba(165, 180, 252, 0.4)',
                }}
                animate={{
                  y: [0, -400, -800],
                  x: [
                    0,
                    Math.sin(i) * 30,
                    Math.sin(i) * 50,
                  ],
                  opacity: [0, 0.9, 0.7, 0.3, 0],
                  scale: [0.8, 1.2, 1, 0.6],
                }}
                transition={{
                  duration: 15 + i * 2,
                  ease: [0.25, 0.1, 0.25, 1],
                  repeat: Infinity,
                  delay: i * 1.5,
                  times: [0, 0.3, 0.6, 0.85, 1],
                }}
              />
            );
          })}
          
          {/* Heat shimmer effect */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-48"
            style={{
              background: `linear-gradient(to top, rgba(99, 102, 241, 0.1) 0%, transparent 100%)`,
              filter: 'blur(2px)',
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scaleY: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          
          {/* Atmospheric depth layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-800/30" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-950/10 via-transparent to-purple-950/10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Hero content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{
              duration: 2.5,
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
              scale: { duration: 1.2, ease: "easeInOut" }
            }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold tracking-widest text-white uppercase mb-8" 
              style={{ 
                textShadow: '0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 0, 0, 0.8)',
                WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.2)'
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 2, 
                delay: 1,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              Soft Mad Children
            </motion.h1>
            <motion.p 
              className="text-white text-lg font-medium tracking-wider uppercase" 
              style={{ 
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.95), 0 4px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)',
                letterSpacing: '0.1em'
              }}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ 
                duration: 2.5, 
                delay: 2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                Lost
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                in the
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.9 }}
              >
                Forest
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 3.1 }}
              >
                of Sound
              </motion.span>
            </motion.p>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.button
            onClick={() => scrollToSection('about')}
            className="absolute bottom-8 text-white/60 hover:text-white/90 transition-all duration-500 p-2 rounded-full hover:bg-amber-900/20 hover:shadow-lg hover:shadow-amber-900/30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 drop-shadow-lg" />
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        {/* Video Background */}
        <VideoBackground 
          videos={[
            '/videos/about-bg-1.mp4',
            // Add more video paths here as you add them
            // '/videos/about-bg-2.mp4',
            // '/videos/about-bg-3.mp4',
          ]}
          fallbackColor="#2C3E3A"
          overlayOpacity={0.5}
        />
        
        {/* Animated color shift overlay */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, #2C3E3A 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #5D3A1A 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, #2C3E3A 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, #5D3A1A 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, #2C3E3A 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-widest text-white uppercase mb-12" style={{ 
              textShadow: '0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)',
              WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)'
            }}>
              About
            </h2>
            <div className="space-y-8 text-white leading-relaxed font-light" style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7)'
            }}>
              <p>
                Soft Mad Children unlocks a gateway into the timeless realm of The Doors. We don&apos;t just perform their music: we craft a living ceremony where sound, visuals and Jim Morrison&apos;s poetic spirit come together.
              </p>
              <p>
                Each show is an immersive ritual: blending raw energy, cinematic projections and a charismatic frontman who channels the band&apos;s mystique. Backed by a lineup of musicians who mirror The Doors&apos; original synergy, capturing the subtle interplay, tension and release that defined their sound, Soft Mad Children offers more than a tribute. We deliver an experience that feels both authentically vintage and vibrantly alive.
              </p>
              <p>
                Here, you aren&apos;t just watching: you&apos;re part of the experience, transcending the ordinary and stepping into a world where The Doors&apos; legacy is reborn with every note.
              </p>
              <p className="italic text-xl">
                The ceremony awaits…. Is everybody in?
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shows Section - Misty Morning */}
      <section id="shows" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        {/* Video Background */}
        <VideoBackground 
          videos={[
            '/videos/shows-bg-1.mp4',
            // Add more video paths here as you add them
            // '/videos/shows-bg-2.mp4',
            // '/videos/shows-bg-3.mp4',
          ]}
          fallbackColor="#5D3A1A"
          overlayOpacity={0.6}
        />
        
        {/* Theatrical spotlight effect overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(184, 92, 44, 0.2) 0%, transparent 70%)',
              filter: 'blur(40px)',
              left: '10%',
              top: '20%'
            }}
            animate={{
              x: [0, 200, 0],
              y: [0, 100, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Subtle mist animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-900/10 to-transparent animate-fog pointer-events-none" style={{ animationDuration: '90s' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-widest text-white uppercase mb-12" style={{ 
              textShadow: '0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)',
              WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)'
            }}>
              Shows
            </h2>
            <div className="space-y-6 text-white">
              <motion.div
                className="border border-white/20 p-8 cursor-pointer backdrop-blur-sm relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-teal-900/0 via-teal-800/20 to-teal-900/0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="relative z-10">
                  <div className="text-3xl font-light mb-2 transition-all duration-500 group-hover:text-teal-300" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.7)' }}>NOV 15, 2025</div>
                  <div className="text-lg uppercase tracking-wider mb-1 font-medium" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.6)' }}>Astrant</div>
                  <div className="text-sm" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 3px 6px rgba(0, 0, 0, 0.6)' }}>Ede, NL</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative overflow-hidden">
        {/* Much darker, more atmospheric background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#2D1810] to-[#0F0F0F]"></div>

        {/* Enhanced dark fog layers */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 1400px 700px at 50% 50%, rgba(45, 24, 16, 0.6) 0%, transparent 70%)`,
            filter: 'blur(100px)',
          }}
          animate={{
            x: ["-30%", "30%", "-30%"],
            y: ["0%", "-15%", "0%"],
          }}
          transition={{ duration: 80, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Additional dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/30 via-transparent to-slate-950/40"></div>

        {/* Enhanced atmospheric particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-gallery-${i}`}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              left: `${15 + i * 10}%`,
              bottom: '8%',
              background: `radial-gradient(circle, rgba(200, 200, 200, 0.6) 0%, rgba(150, 150, 150, 0.3) 40%, transparent 70%)`,
              boxShadow: '0 0 4px rgba(200, 200, 200, 0.5), 0 0 8px rgba(150, 150, 150, 0.2)',
            }}
            animate={{
              y: [0, -700],
              x: [0, Math.sin(i + 1) * 50],
              opacity: [0, 0.6, 0.4, 0],
              scale: [0.7, 1.1, 0.7],
            }}
            transition={{
              duration: 25 + i * 4,
              ease: "easeOut",
              repeat: Infinity,
              delay: i * 2.5,
            }}
          />
        ))}

        <div className="relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-widest text-white uppercase mb-16 text-center" style={{
              textShadow: '0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)',
              WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)'
            }}>
              Gallery
            </h2>

            {/* 8 image grid layout - 4x2 for desktop, responsive for mobile */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {galleryImages.map((image, i) => (
                  <motion.div
                    key={i}
                    className="relative overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{
                      scale: 1.05,
                      rotateX: 2,
                      rotateY: 2,
                      z: 50
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedImage(`/gallery/${image}`)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Enhanced glow effect on hover */}
                    <motion.div
                      className="absolute -inset-4 rounded-xl -z-10"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(200, 200, 200, 0.3) 0%, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.2,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />

                    {/* 16:9 aspect ratio for desktop, 4:3 for mobile */}
                    <motion.div
                      className="relative aspect-[4/3] md:aspect-video overflow-hidden rounded-lg"
                      whileHover={{
                        borderRadius: "16px",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          rotate: [-0.5, 0.5, -0.3],
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            rotate: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                          }
                        }}
                      >
                        <Image
                          src={`/gallery/${image}`}
                          alt={`Gallery image ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </motion.div>

                      {/* Animated shimmer effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{
                          x: "100%",
                          opacity: 1,
                          transition: { duration: 0.6, ease: "easeInOut" }
                        }}
                      />

                      {/* Dark gradient overlay on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{
                          opacity: 1,
                          transition: { duration: 0.3 }
                        }}
                      />

                      {/* View indicator on hover */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileHover={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: { duration: 0.3, delay: 0.1 }
                        }}
                      >
                        <motion.div
                          className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            borderColor: "rgba(255, 255, 255, 0.4)"
                          }}
                        >
                          <p className="text-white text-sm font-light tracking-wider">View</p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      
      {/* Lightbox Modal */}
      <AnimatePresence>
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Blurred backdrop with gradient overlay */}
          <div className="absolute inset-0 backdrop-blur-xl bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-orange-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
          
          {/* Image container with glow effect */}
          <motion.div
            className="relative max-w-6xl max-h-[85vh] w-full h-full z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect behind image */}
            <div className="absolute inset-0 -inset-8 bg-gradient-to-br from-amber-600/20 to-orange-600/20 blur-3xl opacity-50" />
            
            {/* Image with shadow only, no border */}
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            
            {/* Close button with hover effect */}
            <motion.button
              className="absolute -top-12 right-0 text-white/60 hover:text-white/90 transition-all duration-300 p-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}