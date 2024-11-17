import { Layout } from "@/components/Layout/Layout";
import BlogHeader from "@/components/ui/blog/blog-header";
import { fetchArticleBySlug, fetchArticles } from "@/services/blog";
import { ArticleType } from "@/types/blog";
import { ChevronLeft } from "lucide-react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import NotFoundPage from "../404";

interface ArticlePageProps {
  article: ArticleType;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const articles = await fetchArticles();

    const paths = articles?.map((article) => ({
      params: { slug: article.slug },
    }));

    return {
      paths,
      fallback: "blocking", // or false if you want 404 for new paths
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  params,
}) => {
  try {
    const slug = params?.slug as string;
    const article = await fetchArticleBySlug(slug);

    if (!article) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};

const CustomComponents: Components = {
  p: ({ children }) => <p className="mb-4 break-words">{children}</p>,
  li: ({ children }) => <li className="">{children}</li>,
  ul: ({ children }) => <ul className="mb-4 list-disc pl-6">{children}</ul>,
  h2: ({ children }) => <h2 className="my-2 text-2xl font-bold">{children}</h2>,
  h4: ({ children }) => <h4 className="text-xl">{children}</h4>,
  strong: ({ children }) => <strong className="text-lg">{children}</strong>,
  hr: () => <hr className="md-post-hr" />,
  code: ({ node, className, children, style, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return (
      <SyntaxHighlighter
        className="!mb-4 !mt-0 rounded-md !p-6"
        language={match?.[1]}
        style={a11yDark}
        PreTag="div"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
};

export default function ArticlePage({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <Layout activeNavbar="Blog" isNavColorBlack>
      <NextSeo
        title={`${article.title} - Deni Sugiarto`}
        description={article.description}
        openGraph={{
          url: process.env.NEXT_PUBLIC_SITE_URL + "/blog/" + article.slug,
          siteName: "Deni Sugiarto",
          title: article.title,
          description: article.description,
          type: "article",
          images: [
            {
              url: article.social_image,
              width: 500,
              height: 1000,
              alt: `images ${article.title}`,
              type: "image/png",
            },
          ],
          article: {
            publishedTime: article.created_at,
            modifiedTime: article.published_at,
            authors: ["deni sugiarto"],
            section: "blog",
            tags: article.tags,
          },
        }}
        twitter={{
          site: process.env.NEXT_PUBLIC_SITE_URL + "/blog/" + article.slug,
          cardType: "summary_large_image",
        }}
      />
      <section className="container pt-20">
        <Link
          href="/blog"
          className="mb-4 flex w-max gap-2 rounded-md py-1 pr-2 hover:bg-slate-200 dark:hover:bg-slate-500"
          title="back to blog page"
        >
          <ChevronLeft />
          Back
        </Link>
        <BlogHeader {...article} />
        <Markdown
          remarkPlugins={[remarkGfm]} // Allows us to have embedded HTML tags in our markdown
          components={CustomComponents}
          className="mt-8 w-[100vw-4rem] break-all bg-slate-100 px-12 py-8 dark:bg-slate-900"
        >
          {article.body_markdown}
        </Markdown>
      </section>
    </Layout>
  );
}
