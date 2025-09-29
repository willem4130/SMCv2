'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface AnimatedTextContainerProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export default function AnimatedTextContainer({
  children,
  className = '',
  delay = 0,
  once = false
}: AnimatedTextContainerProps) {
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

  // Responsive viewport margin for earlier mobile triggers
  const viewportMargin = isMobile ? "-30%" : "-10%"
  const isInView = useInView(ref, { once, margin: viewportMargin })

  // Container orchestration variants
  const containerVariants: Variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.2 : 0.3,
        when: "beforeChildren",
        duration: prefersReducedMotion ? 0.2 : undefined
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} animation-container`.trim()}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        willChange: isInView ? 'opacity, transform' : 'auto'
      }}
    >
      {children}
    </motion.div>
  )
}