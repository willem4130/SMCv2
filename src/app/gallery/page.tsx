'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  {
    id: 1,
    src: '/api/placeholder/800/600',
    alt: 'Live performance at The Grand Theater',
    category: 'live',
  },
  {
    id: 2,
    src: '/api/placeholder/600/800',
    alt: 'Behind the scenes in the studio',
    category: 'studio',
  },
  {
    id: 3,
    src: '/api/placeholder/800/600',
    alt: 'Band portrait session',
    category: 'portrait',
  },
  {
    id: 4,
    src: '/api/placeholder/600/600',
    alt: 'Theatrical stage setup',
    category: 'live',
  },
  {
    id: 5,
    src: '/api/placeholder/800/600',
    alt: 'Recording session',
    category: 'studio',
  },
  {
    id: 6,
    src: '/api/placeholder/600/800',
    alt: 'Concert crowd',
    category: 'live',
  },
  {
    id: 7,
    src: '/api/placeholder/800/600',
    alt: 'Band members backstage',
    category: 'portrait',
  },
  {
    id: 8,
    src: '/api/placeholder/600/600',
    alt: 'Album artwork session',
    category: 'studio',
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live Shows' },
  { id: 'studio', label: 'Studio' },
  { id: 'portrait', label: 'Portraits' },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const handlePrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
      setSelectedImage(filteredImages[previousIndex].id)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
      setSelectedImage(filteredImages[nextIndex].id)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Capturing moments from our theatrical journey through vivid imagery and unforgettable performances.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                  <span>{image.alt}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              handlePrevious()
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <motion.div
            className="max-w-5xl max-h-[90vh] bg-gray-800 rounded-lg overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-600 p-8">
              <span className="text-2xl">
                {galleryImages.find(img => img.id === selectedImage)?.alt}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}