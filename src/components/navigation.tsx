'use client'

import { useState } from 'react'
import { Menu, X, Facebook, Instagram, Mail } from 'lucide-react'

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Shows', href: '#shows' },
  { name: 'Gallery', href: '#gallery' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-sm z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Far Left */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => handleClick(e, '#home')}
              className="text-2xl font-semibold tracking-wide text-white/90 uppercase"
            >
              Soft Mad Children
            </a>
          </div>

          {/* Centered Navigation - Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="text-white/80 hover:text-white transition-all duration-500 text-base uppercase tracking-wider px-3 py-1 rounded-lg transform hover:scale-110"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons - Far Right Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.facebook.com/SoftMadChildren"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-all duration-500 p-2 rounded-lg transform hover:scale-110"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-all duration-500 p-2 rounded-lg transform hover:scale-110"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="mailto:willem@scex.nl"
              className="text-white/80 hover:text-white transition-all duration-500 p-2 rounded-lg transform hover:scale-110"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white/60 hover:text-white/80 transition-all duration-300 transform hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block text-white/80 hover:text-white transition-all duration-500 text-base uppercase tracking-wider px-3 py-2 rounded-lg transform hover:scale-105"
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Social Icons */}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/10">
              <a
                href="https://www.facebook.com/SoftMadChildren"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-all duration-500 p-2 rounded-lg transform hover:scale-110"
              >
                <Facebook className="h-7 w-7" />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-white transition-all duration-500 p-2 rounded-lg transform hover:scale-110"
              >
                <Instagram className="h-7 w-7" />
              </a>
              <a
                href="mailto:willem@scex.nl"
                className="text-white/80 hover:text-white transition-all duration-500 p-2 rounded-lg transform hover:scale-110"
              >
                <Mail className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}