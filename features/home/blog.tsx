"use client";

import { Tags, urlFor } from "@/lib/sanity";
import { fetchArticlesFeatured } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function BlogSection() {
  const {
    data: featuredBlogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["home-blogs"],
    queryFn: fetchArticlesFeatured,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Memoize skeleton array to prevent re-renders
  const skeletonItems = useMemo(() => [...Array(3)], []);

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="container relative z-10">
          <h2 className="font-title text-3xl font-bold text-foreground md:text-4xl">
            Notes from the build process
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skeletonItems.map((_, index) => (
              <div key={`skeleton-${index}`} className="animate-pulse">
                <div className="mb-4 h-48 w-full rounded-none bg-gray-300 dark:bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="h-6 w-3/4 rounded-none bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-4 w-full rounded-none bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-4 w-2/3 rounded-none bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !featuredBlogs || featuredBlogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="via-background/55 absolute inset-x-0 top-10 mx-auto h-[32rem] w-[92%] rounded-none border border-border/40 bg-gradient-to-br from-background/70 to-muted/60 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl" />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient
                id="blog-gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
              </linearGradient>
              <linearGradient
                id="blog-gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.04)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.04)" />
              </linearGradient>
            </defs>

            {/* Floating article pages */}
            <m.rect
              key="blog-rect-1"
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
                y: [0, -10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }}
            />

            <m.rect
              key="blog-rect-2"
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
                y: [0, 15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
              }}
            />

            {/* Reading lines effect */}
            {[...Array(12)].map((_, i) => (
              <m.line
                key={`blog-line-${i}`}
                x1={200 + i * 50}
                y1={250 + i * 20}
                x2={250 + i * 50}
                y2={250 + i * 20}
                stroke="rgba(99, 102, 241, 0.15)"
                strokeWidth="2"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                  repeatType: "loop",
                }}
              />
            ))}
          </svg>
        </div>

        <m.div
          className="container relative z-10"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-amber-700 dark:text-amber-300">
              Writing
            </p>
            <h2 className="font-title text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Notes from the build process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Practical thoughts on front-end engineering, product craft, and
              the details that make digital work feel sharp.
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs?.map((blog, index) => (
              <m.article
                key={blog._id}
                className="group overflow-hidden border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${blog.slug.current}`}>
                  <div className="relative h-48 overflow-hidden">
                    {blog.coverImage ? (
                      <Image
                        src={urlFor(blog.coverImage)
                          .width(400)
                          .height(200)
                          .url()}
                        alt={blog.title}
                        width={400}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                        <div className="text-6xl opacity-20">📝</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={blog.publishedAt}>
                        {new Date(blog.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
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
                    <h2 className="mb-3 line-clamp-2 text-xl font-bold text-card-foreground transition-colors duration-200 group-hover:text-primary">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {blog.excerpt || "Click to read more about this article..."}
                  </p>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 2).map((tag: Tags) => (
                        <span
                          key={tag._id}
                          className="inline-flex items-center rounded-none bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                        >
                          #{tag.name}
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
              className="group inline-flex items-center gap-2 rounded border-[3px] border-foreground bg-primary px-8 py-4 font-bold uppercase tracking-wider text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 transition-none group-hover:translate-x-1" />
            </Link>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
