'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Image, 
  Users, 
  Settings, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Music
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', roles: ['ADMIN', 'EDITOR', 'VIEWER'] },
  { icon: FileText, label: 'Content', href: '/admin/content', roles: ['ADMIN', 'EDITOR'] },
  { icon: Calendar, label: 'Events', href: '/admin/events', roles: ['ADMIN', 'EDITOR'] },
  { icon: Image, label: 'Media', href: '/admin/media', roles: ['ADMIN', 'EDITOR'] },
  { icon: Music, label: 'Music', href: '/admin/music', roles: ['ADMIN', 'EDITOR'] },
  { icon: Users, label: 'Users', href: '/admin/users', roles: ['ADMIN'] },
  { icon: Settings, label: 'Settings', href: '/admin/settings', roles: ['ADMIN'] },
  { icon: Eye, label: 'Preview Site', href: '/', roles: ['ADMIN', 'EDITOR', 'VIEWER'] },
]

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const filteredMenuItems = menuItems.filter(item => 
    session?.user?.role && item.roles.includes(session.user.role)
  )

  return (
    <motion.div 
      className={`bg-gray-900 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-orange-400">Admin Panel</h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isExternal = item.href === '/'

          return (
            <Link
              key={item.href}
              href={item.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {!isCollapsed && session?.user && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-sm font-medium text-white">{session.user.name || session.user.email}</p>
            <p className="text-xs text-gray-400 capitalize">{session.user.role.toLowerCase()}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}