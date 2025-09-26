'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Ticket, AlertCircle } from 'lucide-react'

const upcomingShows = [
  {
    date: 'Mar 15, 2024',
    time: '8:00 PM',
    venue: 'The Grand Theater',
    city: 'Los Angeles, CA',
    status: 'tickets',
    ticketUrl: '#',
    featured: true,
  },
  {
    date: 'Mar 22, 2024',
    time: '9:00 PM',
    venue: 'Blue Note',
    city: 'New York, NY',
    status: 'tickets',
    ticketUrl: '#',
    featured: false,
  },
  {
    date: 'Apr 05, 2024',
    time: '7:00 PM',
    venue: 'Summer Music Festival',
    city: 'Austin, TX',
    status: 'sold-out',
    ticketUrl: '#',
    featured: false,
  },
  {
    date: 'Apr 12, 2024',
    time: '8:30 PM',
    venue: 'The Fillmore',
    city: 'San Francisco, CA',
    status: 'tickets',
    ticketUrl: '#',
    featured: false,
  },
  {
    date: 'Apr 20, 2024',
    time: '8:00 PM',
    venue: 'House of Blues',
    city: 'Chicago, IL',
    status: 'tickets',
    ticketUrl: '#',
    featured: false,
  },
]

const pastShows = [
  {
    date: 'Feb 28, 2024',
    venue: 'The Troubadour',
    city: 'Los Angeles, CA',
  },
  {
    date: 'Feb 14, 2024',
    venue: 'Mercury Lounge',
    city: 'New York, NY',
  },
  {
    date: 'Jan 31, 2024',
    venue: 'The Crocodile',
    city: 'Seattle, WA',
  },
]

export default function ShowsPage() {
  return (
    <div className="pt-16 min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-red-900/20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
              Tour Dates
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the magic live. Each show is a unique theatrical journey designed to transport you to another dimension.
            </p>
          </motion.div>

          {/* Featured Show */}
          {upcomingShows.filter(show => show.featured).map((show, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-500/30 rounded-lg p-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 text-orange-400 mb-4">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Featured Show</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">{show.venue}</h2>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-orange-400" />
                      <span>{show.date}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-orange-400" />
                      <span>Doors at {show.time}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-orange-400" />
                      <span>{show.city}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-end">
                  <a
                    href={show.ticketUrl}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <Ticket className="h-5 w-5" />
                    <span>Get Tickets</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Upcoming Shows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Upcoming Shows</h2>
            
            <div className="space-y-4">
              {upcomingShows.filter(show => !show.featured).map((show, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="text-center md:text-left">
                          <div className="text-2xl font-bold text-white">{show.date.split(',')[0]}</div>
                          <div className="text-sm text-gray-400">{show.date.split(',')[1]}</div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{show.venue}</h3>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <MapPin className="h-4 w-4" />
                            <span>{show.city}</span>
                            <span>•</span>
                            <Clock className="h-4 w-4" />
                            <span>{show.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      {show.status === 'sold-out' ? (
                        <span className="inline-block px-6 py-2 bg-gray-600 text-gray-300 font-medium rounded-full">
                          Sold Out
                        </span>
                      ) : (
                        <a
                          href={show.ticketUrl}
                          className="inline-flex items-center space-x-2 px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Ticket className="h-4 w-4" />
                          <span>Tickets</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Past Shows */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Past Shows</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {pastShows.map((show, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-gray-400 text-sm mb-1">{show.date}</div>
                  <div className="text-white font-medium">{show.venue}</div>
                  <div className="text-gray-400 text-sm">{show.city}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-t from-orange-900/20 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Never Miss a Show
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get tour announcements and exclusive presale access delivered to your inbox.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}