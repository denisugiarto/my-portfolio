'use client'

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/services/blog";
import { BlogPost, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function BlogSection() {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["home-blogs"],
    queryFn: fetchArticles,
    refetchOnWindowFocus: false,
  });

  const featuredBlogs = blogs?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container relative z-10">
          <h2 className="title-section font-title">latest articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 w-full rounded-lg bg-gray-300 dark:bg-gray-700 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !blogs || blogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative py-20 lg:py-32 overflow-hidden bg-muted/30">
        {/* SVG Background for Blog */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="blog-gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
              </linearGradient>
              <linearGradient id="blog-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.04)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.04)" />
              </linearGradient>
            </defs>
            
            {/* Floating article pages */}
            <m.rect
              x="150"
              y="200"
              width="100"
              height="140"
              rx="8"
              fill="url(#blog-gradient1)"
              initial={{ rotate: 3, opacity: 0.4 }}
              animate={{ 
                rotate: [3, -2, 3],
                opacity: [0.4, 0.7, 0.4],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <m.rect
              x="750"
              y="400"
              width="120"
              height="160"
              rx="10"
              fill="url(#blog-gradient2)"
              initial={{ rotate: -4, opacity: 0.3 }}
              animate={{ 
                rotate: [-4, 2, -4],
                opacity: [0.3, 0.6, 0.3],
                y: [0, 15, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Reading lines effect */}
            {[...Array(12)].map((_, i) => (
              <m.line
                key={i}
                x1={200 + (i * 50)}
                y1={250 + (i * 20)}
                x2={250 + (i * 50)}
                y2={250 + (i * 20)}
                stroke="rgba(99, 102, 241, 0.15)"
                strokeWidth="2"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scaleX: [0, 1, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>

        <m.div
          className="container relative z-10"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="title-section font-title">latest articles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights and tutorials on web development, React, and modern technologies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {featuredBlogs.map((blog, index) => (
              <m.article
                key={blog._id}
                className="group bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${blog.slug.current}`}>
                  <div className="relative h-48 overflow-hidden">
                    {blog.coverImage ? (
                      <Image
                        src={urlFor(blog.coverImage).width(400).height(200).url()}
                        alt={blog.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="text-6xl opacity-20">📝</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={blog.publishedAt}>
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                    {blog.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{blog.readTime} min read</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/blog/${blog.slug.current}`}>
                    <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-200 mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {blog.excerpt || 'Click to read more about this article...'}
                  </p>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          #{tag}
                        </span>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{blog.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </m.article>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-primary/50 bg-transparent px-8 py-4 font-semibold text-primary transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary hover:text-white"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}