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
                <div key={i} className="h-64 rounded-lg bg-gray-700"></div>
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
        <h2 className="title-section font-title">projects</h2>

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
            <Button variant="outline" className="w-full gap-x-2 md:w-auto">
              View All Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedViewAll>
      </AnimatedProjectSection>
    </ProjectsAnimations>
  );
}
