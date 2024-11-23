import { Layout } from "@/components/Layout/Layout";
import BlogList from "@/features/blog/blog-list";
import BlogContainer from "@/features/blog/container";
import { NextSeo } from "next-seo";
import Image from "next/image";

const title = "Blog: Tech journey of a software engineer - Deni Sugiarto";
const description = "Blog about software engineering. Web Development.";
const BlogPages = () => {
  return (
    <Layout activeNavbar="Blog">
      <NextSeo
        title={title}
        description={description}
        canonical={process.env.NEXT_PUBLIC_SITE_URL + "/blog/"}
        openGraph={{
          url: process.env.NEXT_PUBLIC_SITE_URL + "/blog",
          title: title,
          description: description,
          type: "website",
          images: [
            {
              url: "https://www.denisugiarto.my.id/android-chrome-512x512.png",
              width: 512,
              height: 512,
              alt: "logo image",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          site: process.env.NEXT_PUBLIC_SITE_URL + "/blog",
          cardType: "summary_large_image",
        }}
      />
      <Image
        src="/blog1-bg.jpg"
        alt="blog"
        width={800}
        height={400}
        className="fixed top-0 -z-10 min-h-screen w-full object-cover brightness-50 dark:brightness-50"
      />
      <BlogContainer />
    </Layout>
  );
};

export default BlogPages;
