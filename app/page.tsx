import { Suspense } from "react";
import { Metadata } from "next";
import HomeSections from "@/components/home-sections";
import { getHeroSection, getFeaturedProjects, getAboutSection } from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description:
    "Full-stack developer specializing in modern web applications with React, Next.js, and Node.js.",
};

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch data at build time
  const [heroData, projectsData, aboutData] = await Promise.all([
    getHeroSection(),
    getFeaturedProjects(),
    getAboutSection(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.14),_transparent_28%),radial-gradient(circle_at_right,_rgba(59,130,246,0.14),_transparent_32%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--muted)))]" />
      }
    >
      <HomeSections
        heroData={heroData}
        projectsData={projectsData}
        aboutData={aboutData}
      />
    </Suspense>
  );
}
