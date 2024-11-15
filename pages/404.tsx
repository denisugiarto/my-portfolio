import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import Link from "next/link";
import pageNotFoundAnimation from "@/assets/lottie/page-not-found.json";
import { NextSeo } from "next-seo";
const NotFoundPage = () => {
  return (
    <Layout isNavColorBlack>
      <NextSeo
        title="Page Not Found | 404 | Deni Sugiarto | Frontend Web Developer"
        description="Blog about software engineering. Frontend Web Developer."
        openGraph={{
          url: "https://www.denisugiarto.my.id",
          title: "Page Not Found | 404 | Deni Sugiarto | Frontend Web Developer",
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
      />
      <section className="container pt-20 text-center">
        <h1 className="sr-only">Page Not Found</h1>
        <Lottie
          animationData={pageNotFoundAnimation}
          loop={true}
          className="mx-auto max-h-[500px] w-full sm:w-10/12 lg:w-8/12"
        />
        <Link href="/" className="relative z-30">
          <Button variant="default">Back Home</Button>
        </Link>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
