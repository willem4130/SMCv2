'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface BlurTextProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
}

export default function BlurText({
  children,
  className = '',
  delay = 0,
  once = false
}: BlurTextProps) {
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

  return (
    <motion.p
      ref={ref}
      initial={{
        opacity: 0,
        filter: prefersReducedMotion ? 'blur(0px)' : 'blur(5px)',
        y: prefersReducedMotion ? 0 : 20
      }}
      animate={isInView ? {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0
      } : {
        opacity: 0,
        filter: prefersReducedMotion ? 'blur(0px)' : 'blur(5px)',
        y: prefersReducedMotion ? 0 : 20
      }}
      transition={{
        type: prefersReducedMotion ? "tween" : "spring",
        damping: 25,
        stiffness: 300,
        duration: prefersReducedMotion ? 0.3 : 0.8,
        delay: delay,
        ease: prefersReducedMotion ? "easeOut" : undefined
      }}
      style={{
        willChange: isInView ? 'transform, filter, opacity' : 'auto'
      }}
      className={`${className} blur-text-optimized animation-container`.trim()}
    >
      {children}
    </motion.p>
  )
}