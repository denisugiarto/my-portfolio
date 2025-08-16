import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Layout } from "@/components/Layout/Layout"
import PortableText from "@/components/portable-text/PortableText"
import BlogHeader from "@/features/blog/blog-header"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity-queries"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export async function generateStaticParams() {
  try {
    const articles = await getBlogPosts()
    return articles
      .filter((article) => article.slug?.current)
      .map((article) => ({
        slug: article.slug.current,
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const article = await getBlogPostBySlug(slug)
    
    if (!article) {
      return {
        title: 'Article Not Found',
      }
    }

    return {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt || '',
      openGraph: {
        title: article.title,
        description: article.excerpt || '',
        type: 'article',
        publishedTime: article.publishedAt,
        authors: ['Deni Sugiarto'],
        tags: article.tags,
        images: article.coverImage ? [
          {
            url: article.coverImage.toString(),
            width: 1200,
            height: 630,
            alt: article.title,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || '',
      },
    }
  } catch (error) {
    return {
      title: 'Article Not Found',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params
    const article = await getBlogPostBySlug(slug)
    
    if (!article) {
      notFound()
    }

    return (
      <Layout activeNavbar="Blog" isNavColorBlack>
        <section className="container p-4 pt-20">
          <Link
            href="/blog"
            className="mb-4 flex w-max gap-2 rounded-md py-1 pr-2 hover:bg-slate-200 dark:hover:bg-slate-500"
            title="back to blog page"
          >
            <ChevronLeft />
            Back
          </Link>
          <BlogHeader article={article} />
          {article.content && <PortableText content={article.content} />}
        </section>
      </Layout>
    )
  } catch (error) {
    console.error('Error loading article:', error)
    notFound()
  }
}