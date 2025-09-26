# Band Website

A modern, theatrical band website with content management system built with Next.js, TypeScript, Prisma, and NextAuth.

## Features

- 🎭 **Theatrical Homepage** with "Mysterious Mode" toggle
- 🎸 **Band Information** - About, Music, Shows, Gallery
- 📅 **Event Management** - Tour dates and show information
- 📝 **Content Management System** - Admin panel for managing content
- 🔐 **Authentication** - Secure admin access with NextAuth
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Performance** - Built with Next.js Turbopack

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd band-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your site URL (http://localhost:3000 for development)

4. **Set up the database**
   ```bash
   # Create database
   createdb band_website
   
   # Run migrations
   npm run db:migrate
   
   # Seed initial data (includes admin user)
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

## Default Admin Credentials

After running the seed script:
- **Email**: admin@bandwebsite.com
- **Password**: admin123

⚠️ **Important**: Change these credentials immediately in production!

## Project Structure

```
band-website/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── admin/      # Admin panel pages
│   │   ├── api/        # API routes
│   │   └── ...         # Public pages
│   ├── components/     # React components
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript types
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

## Admin Panel Features

Access the admin panel at `/admin`:

- **Dashboard** - Overview of site content and analytics
- **Content Management** - Create and edit pages, posts, and news
- **Event Management** - Manage tour dates and shows
- **Media Library** - Upload and manage images, videos, and audio
- **User Management** - Manage admin users and permissions
- **Site Settings** - Configure site-wide settings

## Customization

### Styling

The site uses Tailwind CSS for styling. Main style files:
- `src/app/globals.css` - Global styles and animations
- Theatrical and mysterious mode effects included

### Content Types

Available content types (defined in `prisma/schema.prisma`):
- PAGE - Static pages
- POST - Blog posts
- MUSIC_RELEASE - Album/single releases
- NEWS - News articles
- BIO - Band member bios
- PRESS_KIT - Press materials

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the project:
```bash
npm run build
```

The build output will be in `.next/` directory.

## Security

- All admin routes are protected by NextAuth
- Passwords are hashed with bcrypt
- Environment variables for sensitive data
- CSRF protection enabled

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@bandwebsite.com or open an issue.