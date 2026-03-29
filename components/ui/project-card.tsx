"use client";

import { Project, urlFor } from "@/lib/sanity";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { m } from "framer-motion";
import { ExternalLink, GlobeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

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
}: ProjectCardProps) {
  const isHomeVariant = variant === "home";

  return (
    <m.div
      className="group overflow-hidden rounded-lg border-[3px] border-foreground bg-card shadow-[4px_4px_0px_0px_hsl(var(--foreground))] transition-all duration-150 hover:-translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]"
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
        <div className="relative overflow-hidden border-b-4 border-foreground">
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
          <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-foreground transition-none group-hover:bg-primary group-hover:text-primary-foreground group-hover:px-1 inline-block">
            {project.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground font-medium">
          {project.shortDescription || project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div
            className={`flex flex-wrap gap-2 ${isHomeVariant ? "pb-2 pt-0" : "mb-5"
              }`}
          >
            {project.technologies
              .slice(0, isHomeVariant ? undefined : 4)
              .map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-flex items-center rounded-none border-2 border-foreground bg-secondary px-2 py-1 text-xs font-bold uppercase tracking-wider text-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
                >
                  {tech.name}
                </span>
              ))}
            {!isHomeVariant && project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs font-bold text-foreground">
                +{project.technologies.length - 4} MORE
              </span>
            )}
          </div>
        )}

        {/* Project Links */}
        <div className="mt-4 flex gap-3 flex-wrap">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              title="website link"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <GlobeIcon className="h-4 w-4" />
                LINK
              </Button>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              title="demo link"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                DEMO
              </Button>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="github repo"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                className="flex items-center gap-2"
              >
                <SiGithub className="h-4 w-4" />
                REPO
              </Button>
            </a>
          )}
        </div>
      </div>
    </m.div>
  );
}
