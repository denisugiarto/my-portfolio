import { Project, urlFor } from "@/lib/sanity";
import { Calendar, ExternalLink, Github, Monitor } from "lucide-react";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-8">
      {/* Project Title */}
      <div>
        <h1 className="mb-6 text-4xl font-black uppercase leading-[1.1] tracking-tight sm:text-6xl lg:text-5xl xl:text-6xl">
          {project.title}
        </h1>

        {/* Short Description */}
        {project.shortDescription && (
          <p className="border-4 border-primary bg-secondary p-4 text-xl font-bold leading-relaxed text-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:text-2xl">
            {project.shortDescription}
          </p>
        )}
      </div>

      {/* Project Overview */}
      {project.description &&
        project.description !== project.shortDescription && (
          <div className="pt-4">
            <h2 className="mb-4 inline-block border-2 border-foreground bg-accent px-3 py-1 text-sm font-black uppercase tracking-widest text-accent-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))]">
              PROJECT OVERVIEW
            </h2>
            <p className="border-4 border-foreground bg-card p-6 text-xl font-medium leading-relaxed text-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] md:p-8">
              {project.description}
            </p>
          </div>
        )}
    </div>
  );
}
