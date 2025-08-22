import { Layout } from "@/components/Layout/Layout"
import BlogStaticContainer from "@/features/blog/static-container"
import { fetchArticles } from '@/services/blog'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest articles and insights about web development, React, Next.js, and modern frontend technologies.',
}

// Enable ISR with 60 second revalidation
export const revalidate = 3600

export default async function BlogPage() {
  // Fetch blog posts at build time and revalidate every 60 seconds
  const blogs = await fetchArticles()

  return (
    <Layout activeNavbar="Blog" isNavColorBlack>
      <Suspense fallback={<div className="container pt-40">Loading...</div>}>
        <BlogStaticContainer initialBlogs={blogs} />
      </Suspense>
    </Layout>
  )
}