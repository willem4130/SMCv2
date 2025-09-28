'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import VideoBackground from '@/components/VideoBackground'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Gallery images split into two logical groups
  const featuredImages = [
    'soft-mad-children-band.jpg',
    'willem4130_a_car_driving_of_in_the_USA_sunset_style_of_the_Do_38eebbe1-559a-4582-ba99-66e24b290910_3.jpg',
    'willem4130_Abstract_picture_of_a_the_doors_tribute_band_perfo_0f9aeda4-d2fa-44ee-b72d-f46843b88ebc_2.jpg',
    'willem4130_jim_morisson_--profile_wqdhksx_--v_7_cf48b529-0bcd-4e05-93ab-0532aafdf9c8_3.jpg'
  ]

  const secondaryImages = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg'
  ]

  // Combined for lightbox navigation
  const allImages = [...featuredImages, ...secondaryImages]

  // Featured Gallery Carousel (Top Row)
  const [featuredRef, featuredApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 }
      }
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )

  // Secondary Gallery Carousel (Bottom Row)
  const [secondaryRef, secondaryApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 }
      }
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )

  // Navigation states for featured carousel
  const [featuredPrevDisabled, setFeaturedPrevDisabled] = useState(true)
  const [featuredNextDisabled, setFeaturedNextDisabled] = useState(true)

  // Navigation states for secondary carousel
  const [secondaryPrevDisabled, setSecondaryPrevDisabled] = useState(true)
  const [secondaryNextDisabled, setSecondaryNextDisabled] = useState(true)

  // Featured carousel navigation
  const scrollFeaturedPrev = useCallback(() => {
    if (featuredApi) featuredApi.scrollPrev()
  }, [featuredApi])

  const scrollFeaturedNext = useCallback(() => {
    if (featuredApi) featuredApi.scrollNext()
  }, [featuredApi])

  // Secondary carousel navigation
  const scrollSecondaryPrev = useCallback(() => {
    if (secondaryApi) secondaryApi.scrollPrev()
  }, [secondaryApi])

  const scrollSecondaryNext = useCallback(() => {
    if (secondaryApi) secondaryApi.scrollNext()
  }, [secondaryApi])

  // Featured carousel selection handler
  const onFeaturedSelect = useCallback(() => {
    if (!featuredApi) return
    setFeaturedPrevDisabled(!featuredApi.canScrollPrev())
    setFeaturedNextDisabled(!featuredApi.canScrollNext())
  }, [featuredApi])

  // Secondary carousel selection handler
  const onSecondarySelect = useCallback(() => {
    if (!secondaryApi) return
    setSecondaryPrevDisabled(!secondaryApi.canScrollPrev())
    setSecondaryNextDisabled(!secondaryApi.canScrollNext())
  }, [secondaryApi])

  // Featured carousel effect
  useEffect(() => {
    if (!featuredApi) return
    onFeaturedSelect()
    featuredApi.on('select', onFeaturedSelect)
    return () => {
      featuredApi.off('select', onFeaturedSelect)
    }
  }, [featuredApi, onFeaturedSelect])

  // Secondary carousel effect
  useEffect(() => {
    if (!secondaryApi) return
    onSecondarySelect()
    secondaryApi.on('select', onSecondarySelect)
    return () => {
      secondaryApi.off('select', onSecondarySelect)
    }
  }, [secondaryApi, onSecondarySelect])

  const handleImageClick = (image: string, imageArray: string[], arrayStartIndex: number) => {
    const localIndex = imageArray.indexOf(image)
    const globalIndex = arrayStartIndex + localIndex
    setSelectedImage(`/gallery/${image}`)
    setSelectedIndex(globalIndex)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (selectedIndex + 1) % allImages.length
      : (selectedIndex - 1 + allImages.length) % allImages.length

    setSelectedIndex(newIndex)
    setSelectedImage(`/gallery/${allImages[newIndex]}`)
  }

  return (
    <div className="bg-black">
      {/* Hero Section with Forest Background */}
      <section id="home" className="relative h-screen overflow-hidden">
        {/* Background layers for parallax effect */}
        <div className="absolute inset-0 w-full h-full">
          {/* Main forest background - slowly zooming */}
          <motion.div
            className="absolute -inset-4 bg-cover bg-center bg-no-repeat parallax-back"
            style={{
              backgroundImage: 'url(/forest-scene.jpg)',
              backgroundSize: 'cover',
              width: 'calc(100% + 2rem)',
              height: 'calc(100% + 2rem)',
              left: '-1rem',
              top: '-1rem',
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Fog overlay layers with movement */}
          <div className="absolute -inset-4 bg-gradient-to-t from-black/60 via-transparent to-black/30 animate-fog" />
          <div
            className="absolute -inset-4 bg-gradient-to-b from-transparent via-black/20 to-transparent animate-fog"
            style={{ animationDelay: '30s', animationDuration: '120s' }}
          />
          
          {/* Subtle dark teal glow from bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[150%] h-[70%]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E3A]/30 via-transparent to-transparent" />
          </div>
          
          {/* Enhanced mystical fog layers - larger, smoother waves */}
          <motion.div
            className="absolute -inset-8"
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
            className="absolute -inset-8"
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
            className="absolute -inset-8"
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
        <div className="absolute -inset-4 bg-black/40" />
        
        {/* Hero content */}
        <div className="relative z-10 h-screen flex flex-col items-center justify-center">
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

      {/* Gallery Section - Multi-Row Carousel Layout */}
      <section id="gallery" className="relative overflow-hidden pt-8 min-h-[85vh]">
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
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-gallery-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              left: `${10 + i * 7}%`,
              bottom: '8%',
              background: `radial-gradient(circle, rgba(200, 200, 200, 0.8) 0%, rgba(150, 150, 150, 0.4) 40%, transparent 70%)`,
              boxShadow: '0 0 6px rgba(200, 200, 200, 0.6), 0 0 12px rgba(150, 150, 150, 0.3)',
            }}
            animate={{
              y: [0, -700 - Math.random() * 200],
              x: [0, Math.sin(i + 1) * 60],
              opacity: [0, 0.8, 0.5, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: 20 + i * 3,
              ease: "easeOut",
              repeat: Infinity,
              delay: i * 1.8,
            }}
          />
        ))}

        <div className="relative z-10 py-8 flex flex-col h-full justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-white uppercase mb-8 text-center" style={{
              textShadow: '0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)',
              WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)'
            }}>
              GALLERY
            </h2>

            {/* Multi-Row Gallery Layout */}
            <div className="max-w-6xl mx-auto px-8 mt-[16px]" style={{gap: '8px', display: 'flex', flexDirection: 'column'}}>
              {/* Featured Gallery - Top Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Featured Carousel Container */}
                <div className="embla overflow-hidden" ref={featuredRef}>
                  <div className="embla__container flex">
                    {featuredImages.map((image, i) => (
                      <div
                        key={`featured-${i}`}
                        className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 px-4"
                      >
                        <motion.div
                          className="relative overflow-hidden cursor-pointer group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleImageClick(image, featuredImages, 0)}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Enhanced glow effects */}
                          <motion.div
                            className="absolute -inset-6 rounded-xl -z-10"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 70%)`,
                              filter: 'blur(25px)',
                            }}
                            initial={{ opacity: 0, scale: 0.6 }}
                            whileHover={{
                              opacity: 1,
                              scale: 1.3,
                              transition: { duration: 0.4, ease: "easeOut" }
                            }}
                          />

                          {/* Rotating glow ring */}
                          <motion.div
                            className="absolute -inset-4 rounded-xl -z-5"
                            style={{
                              background: `conic-gradient(from 0deg, rgba(251, 191, 36, 0.6), rgba(245, 158, 11, 0.3), rgba(251, 191, 36, 0.6))`,
                              filter: 'blur(15px)',
                            }}
                            initial={{ opacity: 0, rotate: 0 }}
                            whileHover={{
                              opacity: 1,
                              rotate: 360,
                              transition: { duration: 3, ease: "linear", repeat: Infinity }
                            }}
                          />

                          {/* Featured images */}
                          <motion.div
                            className="relative aspect-video overflow-hidden rounded-lg"
                            whileHover={{
                              borderRadius: "20px",
                              transition: { duration: 0.4 }
                            }}
                          >
                            <Image
                              src={`/gallery/${image}`}
                              alt={`Featured image ${i + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />

                            {/* Shimmer effects */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              initial={{ x: "-100%", opacity: 0 }}
                              whileHover={{
                                x: "100%",
                                opacity: 1,
                                transition: { duration: 0.8, ease: "easeInOut" }
                              }}
                            />

                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
                              initial={{ x: "-100%", opacity: 0 }}
                              whileHover={{
                                x: "100%",
                                opacity: 1,
                                transition: { duration: 1, ease: "easeInOut", delay: 0.2 }
                              }}
                            />
                          </motion.div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Navigation Arrows */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={scrollFeaturedPrev}
                  disabled={featuredPrevDisabled}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={scrollFeaturedNext}
                  disabled={featuredNextDisabled}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </motion.div>

              {/* Secondary Gallery - Bottom Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Secondary Carousel Container */}
                <div className="embla overflow-hidden" ref={secondaryRef}>
                  <div className="embla__container flex">
                    {secondaryImages.map((image, i) => (
                      <div
                        key={`secondary-${i}`}
                        className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 px-4"
                      >
                        <motion.div
                          className="relative overflow-hidden cursor-pointer group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleImageClick(image, secondaryImages, featuredImages.length)}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Subtle glow effects for secondary */}
                          <motion.div
                            className="absolute -inset-4 rounded-xl -z-10"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)`,
                              filter: 'blur(20px)',
                            }}
                            initial={{ opacity: 0, scale: 0.6 }}
                            whileHover={{
                              opacity: 1,
                              scale: 1.2,
                              transition: { duration: 0.4, ease: "easeOut" }
                            }}
                          />

                          {/* Secondary images - slightly smaller */}
                          <motion.div
                            className="relative aspect-video overflow-hidden rounded-lg"
                            whileHover={{
                              borderRadius: "16px",
                              transition: { duration: 0.4 }
                            }}
                          >
                            <Image
                              src={`/gallery/${image}`}
                              alt={`Gallery image ${i + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />

                            {/* Shimmer effects */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: "-100%", opacity: 0 }}
                              whileHover={{
                                x: "100%",
                                opacity: 1,
                                transition: { duration: 0.8, ease: "easeInOut" }
                              }}
                            />
                          </motion.div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Navigation Arrows */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white/80 hover:bg-black/60 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                  onClick={scrollSecondaryPrev}
                  disabled={secondaryPrevDisabled}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white/80 hover:bg-black/60 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                  onClick={scrollSecondaryNext}
                  disabled={secondaryNextDisabled}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
            </div>

            {/* YouTube Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto px-8" style={{marginTop: '14px'}}
            >
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Enhanced glow effect for video */}
                <motion.div
                  className="absolute -inset-6 rounded-2xl -z-10"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)`,
                    filter: 'blur(30px)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                />

                {/* Subtle rotating glow */}
                <motion.div
                  className="absolute -inset-4 rounded-2xl -z-5"
                  style={{
                    background: `conic-gradient(from 0deg, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.4))`,
                    filter: 'blur(20px)',
                  }}
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{
                    opacity: 0.6,
                    rotate: 360,
                  }}
                  transition={{
                    opacity: { duration: 1, delay: 1 },
                    rotate: { duration: 20, ease: "linear", repeat: Infinity }
                  }}
                />

                {/* YouTube iframe */}
                <motion.iframe
                  className="w-full aspect-video rounded-xl shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10"
                  src="https://www.youtube-nocookie.com/embed/LPaXGgHOpfQ"
                  title="Soft Mad Children - Live Performance"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  viewport={{ once: true }}
                />

                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl pointer-events-none"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{
                    x: "100%",
                    opacity: 1,
                    transition: { duration: 1, ease: "easeInOut" }
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      
      {/* Simple Clean Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            {/* Simple image container */}
            <div
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />

              {/* Simple close button */}
              <button
                className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Previous arrow */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 transition-all duration-200 hover:scale-110 hover:bg-white/10 rounded-full"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              {/* Next arrow */}
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 transition-all duration-200 hover:scale-110 hover:bg-white/10 rounded-full"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}