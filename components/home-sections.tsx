"use client";

import { Layout } from "@/components/Layout/Layout";
import Hero from "@/features/home/hero";
import Projects from "@/features/home/projects";
import { cn } from "@/lib/utils";
import { ArrowBigUpIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HeroSection, Project } from "@/lib/sanity";
import BlogSection from "@/features/home/blog";
import Contact from "@/features/home/contact";

interface HomeSectionsProps {
  heroData: HeroSection | null;
  projectsData: Project[] | null;
}

export default function HomeSections({
  heroData,
  projectsData,
}: HomeSectionsProps) {
  const [isHomeVisible, setIsHomeVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Simple scroll-based section detection
      if (scrollY < windowHeight * 0.5) {
        setIsHomeVisible(true);
      } else {
        setIsHomeVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout activeNavbar="Home">
      <Hero heroData={heroData} />
      <Projects projects={projectsData} />
      <BlogSection />
      <Contact />
      <a
        href="#"
        className={cn(
          !isHomeVisible ? "opacity-100" : "opacity-0",
          "fixed bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full  border bg-background transition-opacity",
        )}
        aria-label="Back to Top"
      >
        <ArrowBigUpIcon className="bg-re h-6 w-6" />
      </a>
    </Layout>
  );
}
