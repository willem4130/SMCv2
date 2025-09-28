'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

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


export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

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
      {/* Gallery Section - Multi-Row Layout */}
      <section className="relative overflow-hidden pt-8 min-h-[85vh]">
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