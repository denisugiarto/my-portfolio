import { NextSeo } from "next-seo";
import Layout from "../components/Layout";

import { ChevronUpIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import Hero from "../components/section/Hero";
const Contact = dynamic(() => import("../components/section/Contact"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const Experience = dynamic(() => import("../components/section/Experience"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const Projects = dynamic(() => import("../components/section/Projects"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
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
  return (
    <>
      <NextSeo
        title="Deni Sugiarto | Frontend Web Developer"
        description="Frontend Web Developer. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development."
        openGraph={{
          url: "https://www.denisugiarto.my.id",
          title: "Deni Sugiarto | Frontend Web Developer",
          description:
            "Frontend Web Developer. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development.",
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
      <Layout
        activeNavbar={
          isHomeVisible
            ? "#home"
            : isProjectVisible
              ? "#projects"
              : isContactVisible
                ? "#contactMe"
                : "#experience"
        }
      >
        <section id="home" className="bg-hero scroll-mt-24 " ref={HomeRef}>
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
          className="max-w-screen scroll-mt-20 bg-primary"
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
        {!isHomeVisible && (
          <a
            href="#"
            className="group fixed bottom-8 right-8 block h-10 w-10 rounded-xl border border-white bg-red-600 text-white shadow-red-600 transition-all ease-in-out hover:bg-red-700"
            aria-label="Back to Top"
          >
            <ChevronUpIcon className="translate-y-0 duration-300 ease-in-out md:group-hover:-translate-y-1" />
          </a>
        )}
      </Layout>
    </>
  );
}
