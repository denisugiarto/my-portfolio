import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/ui/project-card";
import EmptyState from "@/components/ui/empty-state";
import { Project } from "@/lib/sanity";
import {
  ProjectsAnimations,
  AnimatedProjectSection,
  AnimatedProjectGrid,
  AnimatedViewAll,
} from "./projects-animations";
import { Button } from "@/components/ui/button";

interface ProjectsProps {
  projects: Project[] | null;
}

export default function Projects({ projects }: ProjectsProps) {
  // Show loading skeleton if no data (shouldn't happen with SSR but good fallback)
  if (!projects) {
    return (
      <section className="relative overflow-hidden">
        <div className="container">
          <h2 className="title-section font-title">projects</h2>
          <div className="animate-pulse">
            <div className="grid justify-between gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 rounded-none bg-gray-700"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="relative overflow-hidden">
        <div className="container">
          <h2 className="title-section font-title">projects</h2>
          <EmptyState />
        </div>
      </section>
    );
  }

  // Get featured projects (limit to 3 for homepage)
  const featuredProjects = projects.slice(0, 3);

  return (
    <ProjectsAnimations>
      <AnimatedProjectSection>
        <div className="mb-6 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-5">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300 md:mb-3">
              Selected work
            </p>
            <h2 className="font-title text-2xl font-black uppercase tracking-tight text-foreground md:text-4xl">
              Projects with a product-first lens
            </h2>
          </div>
          <p className="mt-1 max-w-2xl text-sm font-bold leading-relaxed text-foreground/80 md:mt-0 md:text-base md:leading-7">
            A few builds that balance clean engineering, strong UX, and the kind
            of polish people actually remember.
          </p>
        </div>

        <AnimatedProjectGrid>
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              variant="home"
              showStatus={false}
              showCompletionDate={false}
            />
          ))}
        </AnimatedProjectGrid>

        <AnimatedViewAll>
          <Link href="/projects" className="group">
            <Button
              variant="outline"
              className="h-12 w-full gap-x-2 rounded-none border-border/70 bg-background/70 px-6 shadow-sm backdrop-blur-md md:w-auto"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedViewAll>
      </AnimatedProjectSection>
    </ProjectsAnimations>
  );
}
