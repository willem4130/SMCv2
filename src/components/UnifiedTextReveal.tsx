'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface UnifiedTextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export default function UnifiedTextReveal({
  children,
  className = '',
  delay = 0,
  duration = 2.0,
  once = false
}: UnifiedTextRevealProps) {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Device and accessibility detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkMotionPreference = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }

    checkMobile()
    checkMotionPreference()

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Responsive viewport margin
  const viewportMargin = isMobile ? "-30%" : "-10%"
  const isInView = useInView(ref, { once, margin: viewportMargin })

  // Adjust duration for mobile
  const adjustedDuration = isMobile ? duration * 0.8 : duration

  return (
    <motion.div
      ref={ref}
      className={`${className} relative overflow-hidden animation-container`.trim()}
      initial={{
        opacity: prefersReducedMotion ? 0 : 1
      }}
      animate={isInView ? {
        opacity: 1
      } : {
        opacity: prefersReducedMotion ? 0 : 1
      }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.5,
        delay: delay
      }}
      style={{
        willChange: isInView ? 'clip-path, opacity, transform' : 'auto'
      }}
    >
      {/* Content container with left-to-right reveal */}
      <motion.div
        initial={{
          clipPath: prefersReducedMotion ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)'
        }}
        animate={isInView ? {
          clipPath: 'inset(0 0 0 0)'
        } : {
          clipPath: prefersReducedMotion ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)'
        }}
        transition={{
          type: "tween",
          duration: prefersReducedMotion ? 0.3 : adjustedDuration,
          delay: delay + 0.2,
          ease: prefersReducedMotion ? "easeOut" : "easeInOut"
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}