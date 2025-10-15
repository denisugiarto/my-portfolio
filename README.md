# My Portfolio Website

This is a personal portfolio website built using modern web technologies to showcase my skills and experience.

## Preview

![screencapture-denisugiarto-my-id-2024-12-07-20_11_41](https://github.com/user-attachments/assets/2789b29e-1c02-4d25-a7fb-bcd91d6629ff)

## Tech Stack

### Frontend
- **Next.js 15**: Performant and SEO-friendly React framework with App Router
- **TypeScript**: Enhanced type safety and code maintainability
- **Tailwind CSS**: Rapid and responsive UI development
- **Shadcn UI**: Pre-styled components for streamlined development
- **Framer Motion**: Smooth and delightful animations

### Content Management
- **Sanity CMS**: Headless CMS for managing all website content
- **Sanity Studio**: Built-in content editor accessible at `/studio`

### Data Fetching & State Management
- **TanStack React Query**: Efficient data fetching with automatic caching
- **Axios**: HTTP requests to external APIs

### UI & Utilities
- **Lucide React**: Rich set of customizable icons
- **dayjs**: Lightweight date and time manipulation
- **react-time-ago**: Display relative time for blog posts
- **react-markdown**: Markdown rendering with syntax highlighting

### Analytics & SEO
- **Google Analytics**: Website traffic tracking and insights
- **next-sitemap**: Automatic sitemap generation
- **next-seo**: SEO optimization utilities

### Features
- Dark/Light mode with `next-themes`
- Responsive design with mobile-first approach
- Blog with category filtering and pagination
- Project showcase with detailed pages
- Contact form with Sanity backend
- Experience timeline
- SEO optimized with meta tags and structured data

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-portfolio

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here

# Google Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

### Development

```bash
# Start Next.js development server (port 3000)
pnpm dev

# Start Sanity Studio (port 3333)
pnpm sanity

# Start both Next.js and Sanity Studio concurrently
pnpm dev:all
```

Visit:
- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

### Building for Production

```bash
# Build Next.js application
pnpm build

# Start production server
pnpm start

# Build Sanity Studio
pnpm sanity:build
```

## Sanity CMS Commands

### Authentication
```bash
# Login to Sanity account
pnpm sanity:login

# Logout from Sanity account
pnpm sanity:logout

# Check current login status
sanity whoami
```

### Development
```bash
# Start Sanity Studio locally
pnpm sanity

# Open Sanity project dashboard
pnpm sanity:manage
```

### Deployment
```bash
# Deploy Sanity Studio to cloud
pnpm sanity:deploy

# Build Sanity Studio for production
pnpm sanity:build
```

### Data Management
```bash
# Export dataset to file
pnpm sanity:dataset:export

# Import dataset from file
pnpm sanity:dataset:import <file.tar.gz>
```

### Advanced Sanity Commands
```bash
# Authentication
sanity login              # Login to Sanity
sanity logout             # Logout from Sanity
sanity whoami             # Check current user

# Export specific dataset
sanity dataset export production backup.tar.gz

# Import to specific dataset
sanity dataset import backup.tar.gz production

# Create new dataset
sanity dataset create staging

# List all datasets
sanity dataset list

# Copy dataset
sanity dataset copy production staging

# Delete dataset (use with caution!)
sanity dataset delete staging

# Manage users and permissions
sanity users list
sanity users invite user@example.com

# Check Sanity CLI version
sanity --version

# Upgrade Sanity dependencies
sanity upgrade

# View project info
sanity projects list
```

## Project Structure

```
my-portfolio/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages
│   ├── projects/          # Project pages
│   ├── experience/        # Experience pages
│   └── studio/            # Sanity Studio route
├── components/            # Reusable UI components
│   ├── Layout/           # Layout components
│   └── ui/               # Shadcn UI components
├── features/             # Feature-specific components
│   ├── blog/            # Blog components
│   ├── home/            # Home page sections
│   └── projects/        # Project components
├── lib/                  # Utility functions
│   ├── sanity.ts        # Sanity client setup
│   └── sanity-queries.ts # Sanity GROQ queries
├── sanity/              # Sanity CMS configuration
│   └── schemas/         # Content schemas
├── services/            # API services
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## Sanity Schemas

The project includes the following Sanity schemas:

### Content Types
- **Blog Post**: Articles with categories, tags, and SEO
- **Blog Category**: Categories for organizing blog posts
- **Project**: Portfolio projects with galleries and tech stacks
- **Experience**: Work experience timeline
- **Technology**: Tech stack and skills
- **Tag**: Tags for blog posts
- **Contact**: Contact form submissions

### Configuration
- **Site Settings**: Global site configuration
- **SEO Settings**: Per-page SEO configuration
- **Hero Section**: Homepage hero content
- **About Section**: About page content
- **Skills Section**: Skills showcase
- **Social Link**: Social media links

## Content Management

### Creating Blog Posts
1. Open Sanity Studio at `/studio`
2. Create a **Blog Category** first
3. Go to **Blog Post** and click "Create new"
4. Fill in:
   - Title (required)
   - Slug (auto-generated)
   - Category (required)
   - Excerpt (recommended for SEO)
   - Content (Markdown supported)
   - Cover Image
   - Tags
   - SEO metadata
5. Toggle "Published" to make it visible

### Managing Categories
- Categories support custom colors and icons (Lucide icons)
- Example icon names: `Code`, `Rocket`, `Book`, `Lightbulb`
- Colors: blue, green, red, yellow, purple, pink, indigo, gray, or custom hex

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Sanity Studio Deployment
```bash
pnpm sanity:deploy
```

This deploys Sanity Studio to `https://your-project.sanity.studio`

## Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm dev:all` | Start Next.js + Sanity Studio |
| `pnpm build` | Build Next.js for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm analyze` | Analyze bundle size |
| `pnpm sanity` | Start Sanity Studio locally |
| `pnpm sanity:login` | Login to Sanity account |
| `pnpm sanity:logout` | Logout from Sanity account |
| `pnpm sanity:build` | Build Sanity Studio |
| `pnpm sanity:deploy` | Deploy Sanity Studio |
| `pnpm sanity:manage` | Open Sanity dashboard |
| `pnpm sanity:dataset:export` | Export Sanity data |
| `pnpm sanity:dataset:import` | Import Sanity data |

## Pages

- **Landing Page**:
  - Home: Introduction and hero section
  - About: Personal info, skills, achievements
  - Experience: Professional background timeline
  - Projects: Portfolio showcase
  - Contact: Contact form and social links
- **Blog**: Articles with category filtering and search
- **Project Details**: Individual project pages
- **Sanity Studio**: Content management at `/studio`

## License

MIT
