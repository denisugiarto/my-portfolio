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

      {/* Key Features or Highlights */}
      <div>
        <h2 className="mb-3 text-xl font-semibold">Key Highlights</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h3 className="mb-2 font-semibold text-card-foreground">
              Technology Stack
            </h3>
            <p className="text-sm text-muted-foreground">
              Built with modern web technologies for optimal performance and
              user experience.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h3 className="mb-2 font-semibold text-card-foreground">
              Responsive Design
            </h3>
            <p className="text-sm text-muted-foreground">
              Fully responsive and optimized for all devices and screen sizes.
            </p>
          </div>

          {project.status === "completed" && (
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h3 className="mb-2 font-semibold text-card-foreground">
                Production Ready
              </h3>
              <p className="text-sm text-muted-foreground">
                Successfully deployed and ready for real-world usage.
              </p>
            </div>
          )}

          {project.liveUrl && (
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h3 className="mb-2 font-semibold text-card-foreground">
                Live & Interactive
              </h3>
              <p className="text-sm text-muted-foreground">
                Experience the project firsthand with the live demonstration.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
