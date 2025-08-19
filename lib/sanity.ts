import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dmdxpdxy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  perspective: 'published',
  token: process.env.SANITY_API_TOKEN, // Optional: only if dataset is private
})


const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export interface BlogPost {
  _id: string
  title: string
  slug: {current: string}
  excerpt?: string
  coverImage?: any
  content: any[]
  tags?: string[]
  publishedAt: string
  readTime?: number
  published: boolean
  featured: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: any
  }
}

export interface Technology {
  _id: string
  name: string
  slug: {current: string}
  category: string
  description?: string
  icon?: string
  color?: string
  website?: string
  proficiencyLevel?: string
  yearsOfExperience?: number
  featured: boolean
  isActive: boolean
  order?: number
}

export interface SocialLink {
  _id: string
  platform: string
  customPlatformName?: string
  url: string
  username?: string
  label?: string
  icon?: string
  color?: string
  isPublic: boolean
  isPrimary: boolean
  openInNewTab: boolean
  showInHeader: boolean
  showInFooter: boolean
  showInHero: boolean
  showInContact: boolean
  order?: number
  description?: string
}

export interface Project {
  _id: string
  title: string
  slug: {current: string}
  description?: string
  shortDescription?: string
  coverImage?: any
  gallery?: any[]
  technologies?: Technology[]
  category?: string
  status: string
  liveUrl?: string
  githubUrl?: string
  demoUrl?: string
  published: boolean
  featured: boolean
  order?: number
  completedAt?: string
  content?: any[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: any
  }
}

export interface ContactMessage {
  _id?: string
  name: string
  email: string
  message: string
}

export interface SEOSettings {
  _id: string
  pageId: string
  title: string
  metaTitle?: string
  metaDescription: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: any
  twitterCard: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: any
  canonicalUrl?: string
  noIndex: boolean
  noFollow: boolean
  structuredData?: string
}

export interface Experience {
  _id: string
  jobTitle: string
  company: string
  companyUrl?: string
  location?: string
  employmentType: string
  workType?: string
  startDate: string
  endDate?: string
  currentJob: boolean
  description?: any[]
  achievements?: string[]
  technologies?: string[]
  skills?: string[]
  companyLogo?: any
  featured: boolean
  order: number
  visible: boolean
}

export interface HeroSection {
  _id: string
  headline: string
  subheadline: string
  bio: string
  primaryCTA: {
    text: string
    link?: string
  }
  secondaryCTA: {
    text: string
    link?: string
  }
  backgroundImage?: any
  availabilityStatus: {
    isAvailable: boolean
    statusText: string
  }
  technologies?: Technology[]
  socialLinks?: SocialLink[]
}