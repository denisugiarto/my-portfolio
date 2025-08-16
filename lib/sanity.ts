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
  featured: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: any
  }
}

export interface Project {
  _id: string
  title: string
  slug: {current: string}
  description?: string
  shortDescription?: string
  coverImage?: any
  gallery?: any[]
  technologies?: string[]
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
  subject?: string
  message: string
  phone?: string
  company?: string
  projectType?: string
  budget?: string
  timeline?: string
  status?: string
  priority?: string
  notes?: string
  submittedAt: string
  ipAddress?: string
  userAgent?: string
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