import { Layout } from "@/components/Layout/Layout";
import Hero from "@/features/home/hero";
import Projects from "@/features/home/projects";
import { HeroSection, Project, AboutSection } from "@/lib/sanity";
import dynamic from "next/dynamic";
import Contact from "@/features/home/contact";

// Lazy load blog section since it's below the fold and uses client-side data fetching
const BlogSection = dynamic(() => import("@/features/home/blog"), {
  loading: () => (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container relative z-10">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 h-4 w-24 animate-pulse rounded-none bg-gray-300 dark:bg-gray-700" />
          <div className="mx-auto mb-4 h-10 w-80 animate-pulse rounded-none bg-gray-300 dark:bg-gray-700" />
          <div className="mx-auto h-6 w-96 animate-pulse rounded-none bg-gray-300 dark:bg-gray-700" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-4 h-48 w-full rounded-none bg-gray-300 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-6 w-3/4 rounded-none bg-gray-300 dark:bg-gray-700" />
                <div className="h-4 w-full rounded-none bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
});

interface HomeSectionsProps {
  heroData: HeroSection | null;
  projectsData: Project[] | null;
  aboutData: AboutSection | null;
}

export default function HomeSections({
  heroData,
  projectsData,
  aboutData,
}: HomeSectionsProps) {
  return (
    <Layout activeNavbar="Home">
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <Hero heroData={heroData} />
          {/* <About aboutData={aboutData} /> */}
          <Projects projects={projectsData} />
          <BlogSection />
          <Contact />
        </div>
      </div>
    </Layout>
  );
}
