import { Metadata } from 'next'
import { Suspense } from 'react'
import { Layout } from "@/components/Layout/Layout"
import { getBlogPosts } from "@/lib/sanity-queries"
import BlogStaticContainer from "@/features/blog/static-container"

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest articles and insights about web development, React, Next.js, and modern frontend technologies.',
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function BlogPage() {
  // Fetch blog posts at build time and revalidate every 60 seconds
  const blogs = await getBlogPosts()

  return (
    <Layout activeNavbar="Blog" isNavColorBlack>
      <Suspense fallback={<div className="container pt-40">Loading...</div>}>
        <BlogStaticContainer initialBlogs={blogs} />
      </Suspense>
    </Layout>
  )
}