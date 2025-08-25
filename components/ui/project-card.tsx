"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { m } from "framer-motion";
import { ExternalLink, Monitor, Calendar, Globe2Icon, GlobeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project, urlFor } from "@/lib/sanity";

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: "home" | "list";
  showStatus?: boolean;
  showCompletionDate?: boolean;
}

export default function ProjectCard({
  project,
  index = 0,
  variant = "list",
  showStatus = true,
}: ProjectCardProps) {
  const isHomeVariant = variant === "home";

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green-500/10",
          text: "text-green-700 dark:text-green-400",
          label: "Completed",
        };
      case "in-progress":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-700 dark:text-blue-400",
          label: "In Progress",
        };
      case "planning":
        return {
          bg: "bg-purple-500/10",
          text: "text-purple-700 dark:text-purple-400",
          label: "Planning",
        };
      default:
        return {
          bg: "bg-gray-500/10",
          text: "text-gray-700 dark:text-gray-400",
          label: status,
        };
    }
  };

  const statusConfig = project.status ? getStatusConfig(project.status) : null;

  return (
    <m.div
      className="group overflow-hidden rounded-xl border border-border bg-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true }}
    >
      <Link href={`/projects/${project.slug.current}`}>
        <div className="relative overflow-hidden">
          <Image
            src={
              project.coverImage
                ? urlFor(project.coverImage).width(420).height(300).url()
                : "/no-image.png"
            }
            width={420}
            height={300}
            className="h-52 w-full object-cover object-center"
            alt={`${project.title} project`}
          />
        </div>
      </Link>

      <div className="p-6 pt-5">
        <Link href={`/projects/${project.slug.current}`}>
          <h3 className="mb-2 text-xl font-bold text-card-foreground">
            {project.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription || project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div
            className={`flex flex-wrap gap-1.5 ${
              isHomeVariant ? "pb-2 pt-0" : "mb-5"
            }`}
          >
            {project.technologies
              .slice(0, isHomeVariant ? undefined : 4)
              .map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {tech.name}
                </span>
              ))}
            {!isHomeVariant && project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Project Links - Only show in home variant or as fallback */}

        <div className="mt-4 flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              title="website link"
              className="flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <GlobeIcon className="h-4 w-4" />
              Web
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              title="demo link"
              className="flex items-center gap-2 rounded-lg border bg-secondary px-2 py-1 text-sm leading-none text-white shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="github repo"
              className="flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <SiGithub className="h-4 w-4" />
              Repository
            </a>
          )}
        </div>
      </div>
    </m.div>
  );
}
