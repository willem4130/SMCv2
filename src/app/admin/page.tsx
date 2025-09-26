'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Calendar, 
  Image, 
  Users, 
  TrendingUp,
  Eye,
  Plus
} from 'lucide-react'

const statsCards = [
  {
    title: 'Total Content',
    value: '24',
    change: '+3 this week',
    icon: FileText,
    color: 'bg-blue-500'
  },
  {
    title: 'Upcoming Events',
    value: '5',
    change: '2 this month',
    icon: Calendar,
    color: 'bg-green-500'
  },
  {
    title: 'Media Files',
    value: '156',
    change: '+12 this week',
    icon: Image,
    color: 'bg-purple-500'
  },
  {
    title: 'Site Views',
    value: '2,340',
    change: '+15% this week',
    icon: Eye,
    color: 'bg-orange-500'
  }
]

const quickActions = [
  {
    title: 'Add New Post',
    description: 'Create a new blog post or news article',
    icon: FileText,
    href: '/admin/content/new',
    color: 'bg-blue-500'
  },
  {
    title: 'Schedule Event',
    description: 'Add a new show or event to the calendar',
    icon: Calendar,
    href: '/admin/events/new',
    color: 'bg-green-500'
  },
  {
    title: 'Upload Media',
    description: 'Add photos, videos, or audio files',
    icon: Image,
    href: '/admin/media/upload',
    color: 'bg-purple-500'
  },
  {
    title: 'Manage Users',
    description: 'Add or edit admin users',
    icon: Users,
    href: '/admin/users',
    color: 'bg-gray-500'
  }
]

export default function AdminDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name || 'Admin'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your band website.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.a
                key={action.title}
                href={action.href}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {action.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300">
                  <Plus className="h-4 w-4 mr-1" />
                  Get started
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="p-6">
            <div className="text-center py-8">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No recent activity
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Start creating content to see activity here.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}