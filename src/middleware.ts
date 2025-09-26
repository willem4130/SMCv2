import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Allow access to login page
      if (req.nextUrl.pathname === '/admin/login') {
        return NextResponse.next()
      }

      // Check if user has appropriate role for admin access
      const token = req.nextauth.token
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }

      // Check role-based access
      const userRole = token.role
      if (!userRole || !['ADMIN', 'EDITOR', 'VIEWER'].includes(userRole)) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }

      // Additional role-based restrictions can be added here
      // For example, only ADMIN can access user management
      if (req.nextUrl.pathname.startsWith('/admin/users') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to non-admin routes
        if (!req.nextUrl.pathname.startsWith('/admin')) {
          return true
        }

        // Allow access to login page
        if (req.nextUrl.pathname === '/admin/login') {
          return true
        }

        // Require authentication for all other admin routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}