import { NextSeo } from "next-seo";
import Image from "next/image";
import { Layout } from "@/components/Layout/Layout";
import BlogList from "@/components/ui/blog/blog-list";
const BlogPages = () => {
  return (
    <Layout activeNavbar="Blog">
      <NextSeo
        title="Blog | Deni Sugiarto | Frontend Web Developer"
        description="Blog about software engineering. Frontend Web Developer."
        openGraph={{
          url: "https://www.denisugiarto.my.id",
          title: "Blog | Deni Sugiarto | Frontend Web Developer",
          description:
            "Blog about software engineering. Frontend Web Developer.",
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
          handle: "@handle",
          site: "@site",
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
      <BlogList />
    </Layout>
  );
};

export default BlogPages;
