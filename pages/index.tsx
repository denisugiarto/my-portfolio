import { NextSeo } from "next-seo";
import { Layout } from "../components/Layout/Layout";

import dynamic from "next/dynamic";
import WhatsappIcon from "../public/WhatsApp-icon.svg";
import { useInView } from "react-intersection-observer";
import Hero, { linkHireMe } from "../components/section/home/Hero";
import { cn } from "../lib/utils";

const Contact = dynamic(() => import("../components/section/home/Contact"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});
const Experience = dynamic(() => import("../components/section/home/Experience"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});
const Projects = dynamic(() => import("../components/section/home/Projects"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

export default function Index() {
  const { ref: HomeRef, inView: isHomeVisible } = useInView({ threshold: 0.2 });
  const { ref: ProjectRef, inView: isProjectVisible } = useInView({
    threshold: 0.15,
  });
  const { ref: ContactRef, inView: isContactVisible } = useInView({
    threshold: 0.15,
  });
  const { ref: WorkRef, inView: isWorkVisible } = useInView();
  const sectionColor = [
    {
      background: "primary",
      text: "white",
    },
    {
      background: "white",
      text: "primary",
    },
  ];

  function determineActiveNavbarItem() {
    if (isHomeVisible) {
      return "Home";
    } else if (isProjectVisible) {
      return "Projects";
    } else if (isContactVisible) {
      return "Contact Me";
    } else {
      return "Experience";
    }
  }

  return (
    <>
      <NextSeo
        title="Web Developer - Web Portfolio - front end web dev - Deni Sugiarto"
        description="Web Developer magician. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development."
        canonical="https://denisugiarto.my.id/"
        openGraph={{
          url: process.env.NEXT_PUBLIC_SITE_URL,
          siteName: "Deni Sugiarto",
          title:
            "Web Developer - Web Portfolio - front end web dev - Deni Sugiarto",
          description:
            "Web Developer magician. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development.",
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
          site: process.env.NEXT_PUBLIC_SITE_URL,
          cardType: "summary_large_image",
        }}
      />
      <Layout activeNavbar={determineActiveNavbarItem()}>
        <section
          id="home"
          className="scroll-mt-24 bg-gradient-to-r from-blue-600 to-violet-600 pt-20 dark:from-slate-900"
          ref={HomeRef}
        >
          <Hero
            sectionColor={sectionColor[0].text}
            sectionBgColor={sectionColor[0].background}
          />
        </section>
        <section id="projects" className="scroll-mt-20" ref={ProjectRef}>
          <Projects />
        </section>
        <section
          id="contactMe"
          className="max-w-screen scroll-mt-20 bg-primary dark:bg-primary/10"
          ref={ContactRef}
        >
          <Contact />
        </section>
        <section
          id="experience"
          className="max-w-screen scroll-mt-20"
          ref={WorkRef}
        >
          <Experience />
        </section>
        {/* <Skills /> */}

        <a
          href={linkHireMe}
          className={cn(
            !isHomeVisible ? "opacity-100" : "opacity-0",
            "fixed bottom-8 right-8 block h-10 w-10 rounded-full bg-green-500 transition-opacity",
          )}
          aria-label="Back to Top"
        >
          <WhatsappIcon className="h-full w-full" />
        </a>
      </Layout>
    </>
  );
}
