import { Project, urlFor } from "@/lib/sanity";
import { Calendar, ExternalLink, Github, Monitor } from "lucide-react";
import Image from "next/image";
import { SiGithub } from "@icons-pack/react-simple-icons";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Project Title */}
      <div>
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {project.title}
        </h1>

        {/* Short Description */}
        {project.shortDescription && (
          <p className="text-xl leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>
        )}
      </div>

      {/* Project Overview */}
      {project.description &&
        project.description !== project.shortDescription && (
          <div>
            <h2 className="mb-3 text-xl font-semibold">Project Overview</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        )}
    </div>
  );
}
