import React from "react";
import { Metadata } from "next";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Layout } from "@/components/Layout/Layout";
import { fetchExperiences } from "@/services/experience";
import ExperienceClient from "./experience-client";
import ExperienceHero from "./experience-hero";

export const metadata: Metadata = {
  title: "Experience | Deni Sugiarto",
  description: "Professional experience and career journey showcasing roles, achievements, and technologies used throughout my career.",
  openGraph: {
    title: "Experience | Deni Sugiarto",
    description: "Professional experience and career journey showcasing roles, achievements, and technologies used throughout my career.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Deni Sugiarto",
    description: "Professional experience and career journey showcasing roles, achievements, and technologies used throughout my career.",
  },
};

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function ExperiencePage() {
  const queryClient = new QueryClient();

  // Prefetch experience data for SSR
  await queryClient.prefetchQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });

  return (
    <Layout activeNavbar="Experience" isNavColorBlack>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <ExperienceHero />

          {/* Experience Timeline */}
          <ExperienceClient />
        </div>
      </HydrationBoundary>
    </Layout>
  );
}