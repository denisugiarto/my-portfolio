import { Suspense } from "react";
import { Metadata } from "next";
import HomeSections from "@/components/home-sections";
import { getHeroSection, getFeaturedProjects } from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description:
    "Full-stack developer specializing in modern web applications with React, Next.js, and Node.js.",
};

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch data at build time
  const [heroData, projectsData] = await Promise.all([
    getHeroSection(),
    getFeaturedProjects(),
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
      <HomeSections heroData={heroData} projectsData={projectsData} />
    </Suspense>
  );
}
