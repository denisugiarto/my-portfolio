import { Layout } from "@/components/Layout/Layout";
import { AuroraBackground } from "@/components/ui/starfall-portfolio-landing";
import Hero from "@/features/home/hero";
import Projects from "@/features/home/projects";
import { HeroSection, Project, AboutSection } from "@/lib/sanity";
import BlogSection from "@/features/home/blog";
import Contact from "@/features/home/contact";

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
        <AuroraBackground />
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
