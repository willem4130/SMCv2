'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// Actual band images from gallery directory
const galleryImages = [
  'soft-mad-children-band.jpg',
  'willem4130_a_car_driving_of_in_the_USA_sunset_style_of_the_Do_38eebbe1-559a-4582-ba99-66e24b290910_3.jpg',
  'willem4130_Abstract_picture_of_a_the_doors_tribute_band_perfo_0f9aeda4-d2fa-44ee-b72d-f46843b88ebc_2.jpg',
  'willem4130_jim_morisson_--profile_wqdhksx_--v_7_cf48b529-0bcd-4e05-93ab-0532aafdf9c8_3.jpg'
]


export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(`/gallery/${image}`)
    setSelectedIndex(index)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (selectedIndex + 1) % galleryImages.length
      : (selectedIndex - 1 + galleryImages.length) % galleryImages.length

    setSelectedIndex(newIndex)
    setSelectedImage(`/gallery/${galleryImages[newIndex]}`)
  }


  return (
    <div className="bg-black">
      {/* Gallery Section - Restored Atmospheric Framework */}
      <section className="relative overflow-hidden pt-8 h-screen max-h-screen">
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


            {/* Simple 2x2 Grid Layout */}
            <div className="max-w-5xl mx-auto px-8">
              <motion.div
                className="grid grid-cols-2 gap-6 md:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.2,
                      duration: 0.6
                    }
                  }
                }}
                layout
              >
                {galleryImages.map((image, i) => (
                  <motion.div
                    key={`gallery-${i}`}
                    className="relative overflow-hidden cursor-pointer group"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 60,
                        rotateX: 15,
                        scale: 0.9
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 120,
                          damping: 12,
                          duration: 0.8
                        }
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleImageClick(image, i)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Multiple enhanced glow effects */}
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

                    {/* Large viewable images */}
                    <motion.div
                      className="relative aspect-video overflow-hidden rounded-lg"
                      whileHover={{
                        borderRadius: "20px",
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

                      {/* Multiple animated shimmer effects */}
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
                ))}
              </motion.div>
            </div>
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