import { Layout } from "@/components/Layout/Layout";
import Hero from "@/features/home/hero";
import About from "@/features/home/about";
import Projects from "@/features/home/projects";
import dynamic from "next/dynamic";
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
      <Hero heroData={heroData} />
      {/* <About aboutData={aboutData} /> */}
      <Projects projects={projectsData} />
      <BlogSection />
      <Contact />
    </Layout>
  );
}
