import { Layout } from "@/components/Layout/Layout";
import Markdown from "@/components/ui/markdown";
import BlogHeader from "@/features/blog/blog-header";
import RelatedArticles from "@/features/blog/related-articles";
import { urlFor } from "@/lib/sanity";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getRelatedBlogPosts,
} from "@/lib/sanity-queries";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const articles = await getBlogPosts();
    return articles
      .filter((article) => article.slug?.current)
      .map((article) => ({
        slug: article.slug.current,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  // Return early if error to maintain default metadata handling
  try {
    const { slug } = await params;
    const article = await getBlogPostBySlug(slug);

    if (!article) {
      return {
        title: `Article ${slug} Not Found`,
      };
    }

    return {
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt || "",
      openGraph: {
        title: article.title,
        description: article.excerpt || "",
        type: "article",
        publishedTime: article.publishedAt,
        authors: ["Deni Sugiarto"],
        tags: article.tags?.map((tag) => tag.name),
        images: article.coverImage
          ? [
            {
              url: article.coverImage.toString(),
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt || "",
      },
    };
  } catch (error) {
    return {
      title: "Article Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const article = await getBlogPostBySlug(slug);

    if (!article) {
      notFound();
    }

    const tagIds = article.tags?.map((tag) => tag._id) || [];
    const relatedArticles = await getRelatedBlogPosts(article._id, tagIds, 3);

    return (
      <Layout activeNavbar="Blog" isNavColorBlack>
        <section className="container px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl w-full min-w-0">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 border-4 border-foreground bg-accent px-4 py-2 text-sm font-black uppercase tracking-widest text-accent-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
            >
              <ArrowLeft className="h-5 w-5 stroke-[3]" />
              BACK TO ARTICLES
            </Link>

            <article className="mb-8 w-full border-4 border-foreground bg-card shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:mb-12 md:shadow-[12px_12px_0px_0px_hsl(var(--foreground))] overflow-hidden">
              <div className="border-b-4 border-foreground bg-background px-4 py-8 sm:px-8 lg:px-16">
                <div className="mx-auto max-w-3xl w-full min-w-0 overflow-hidden">
                  <BlogHeader article={article} />
                </div>
              </div>

              {article.coverImage && (
                <div className="border-b-4 border-foreground bg-background px-4 py-4 sm:px-6 lg:px-8">
                  <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden border-4 border-foreground bg-muted shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
                    <Image
                      src={urlFor(article.coverImage)
                        .width(1200)
                        .height(630)
                        .url()}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                  </div>
                </div>
              )}

              {article.content && (
                <div className="bg-background px-4 py-8 sm:px-8 lg:px-16 w-full max-w-full overflow-hidden">
                  <Markdown className="mx-auto max-w-3xl prose prose-base sm:prose-lg md:prose-xl dark:prose-invert break-words prose-headings:font-black prose-headings:uppercase prose-p:font-bold prose-p:leading-relaxed prose-a:font-black prose-a:text-primary hover:prose-a:underline hover:prose-a:bg-primary hover:prose-a:text-primary-foreground prose-img:border-4 prose-img:border-foreground prose-img:max-w-full prose-img:h-auto prose-img:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:prose-img:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
                    {article.content}
                  </Markdown>
                </div>
              )}
            </article>

            <RelatedArticles articles={relatedArticles} />
          </div>
        </section>
      </Layout>
    );
  } catch (error) {
    console.error("Error loading article:", error);
    notFound();
  }
}
