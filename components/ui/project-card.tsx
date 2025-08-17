'use client'

import { SiGithub } from "@icons-pack/react-simple-icons";
import { m } from "framer-motion";
import { ExternalLink, Monitor, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project, urlFor } from "@/lib/sanity";

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: 'home' | 'list';
  showStatus?: boolean;
  showCompletionDate?: boolean;
}

export default function ProjectCard({ 
  project, 
  index = 0, 
  variant = 'list',
  showStatus = true,
  showCompletionDate = true 
}: ProjectCardProps) {
  const isHomeVariant = variant === 'home';

  return (
    <m.div
      className={`group overflow-hidden rounded-lg transition-all ${
        isHomeVariant 
          ? 'transition-all ease-linear hover:scale-105 md:mr-4 md:hover:scale-110'
          : 'bg-card shadow-lg hover:shadow-xl'
      }`}
      initial={{ opacity: 0, y: isHomeVariant ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/projects/${project.slug.current}`}>
        <div className="relative overflow-hidden">
          <Image
            src={project.coverImage ? urlFor(project.coverImage).width(420).height(300).url() : "/no-image.png"}
            width={420}
            height={300}
            className={`h-60 w-full object-cover transition-transform ${
              isHomeVariant 
                ? 'rounded-lg shadow-lg hover:scale-105'
                : 'group-hover:scale-105'
            }`}
            alt={`${project.title} project`}
          />
          {project.status && showStatus && !isHomeVariant && (
            <div className="absolute top-3 right-3">
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                project.status === 'completed' 
                  ? 'bg-success text-success-foreground'
                  : project.status === 'in-progress'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {project.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className={isHomeVariant ? 'py-4' : 'p-6'}>
        <Link href={`/projects/${project.slug.current}`}>
          <h3 className={`mb-2 text-xl font-bold transition-colors ${
            isHomeVariant 
              ? 'capitalize text-slate-900 dark:text-slate-200 hover:text-primary'
              : 'text-card-foreground group-hover:text-primary'
          }`}>
            {project.title}
          </h3>
        </Link>
        
        <p className={`text-sm ${
          isHomeVariant 
            ? 'text-base text-slate-600 dark:text-slate-300'
            : 'mb-4 text-muted-foreground line-clamp-3'
        }`}>
          {project.shortDescription || project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className={`flex flex-wrap gap-1 ${isHomeVariant ? 'pb-2 pt-0' : 'mb-4'}`}>
            {project.technologies.slice(0, isHomeVariant ? undefined : 3).map((tech, techIndex) => (
              <span key={techIndex} className={`tag ${isHomeVariant ? '' : 'text-xs'}`}>
                #{tech}
              </span>
            ))}
            {!isHomeVariant && project.technologies.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Project Links */}
        <div className={`flex gap-2 ${isHomeVariant ? 'mt-4' : ''}`}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              title="website link"
              className={`flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md transition-all ${
                isHomeVariant 
                  ? 'hover:scale-110 ease-in-out'
                  : 'text-xs hover:bg-primary/90'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className={isHomeVariant ? 'h-4 w-4' : 'h-3 w-3'} /> 
              {isHomeVariant ? 'Web' : 'Live'}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              title="demo link"
              className={`flex items-center gap-2 rounded-lg border bg-secondary px-2 py-1 text-sm leading-none text-white shadow-md transition-all ${
                isHomeVariant 
                  ? 'hover:scale-110 ease-in-out'
                  : 'text-xs hover:bg-secondary/90'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {isHomeVariant ? <ExternalLink className="h-4 w-4" /> : <Monitor size={12} />} 
              Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="github repo"
              className={`flex items-center gap-2 rounded-lg border px-2 py-1 text-sm leading-none text-white shadow-md transition-all ${
                isHomeVariant 
                  ? 'bg-primary hover:scale-110 ease-in-out'
                  : 'bg-gray-600 text-xs hover:bg-gray-500'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <SiGithub className={isHomeVariant ? 'h-4 w-4' : 'h-3 w-3'} /> 
              {isHomeVariant ? 'Repository' : 'Code'}
            </a>
          )}
        </div>

        {/* Completion Date */}
        {project.completedAt && showCompletionDate && !isHomeVariant && (
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={12} />
            <span>
              {new Date(project.completedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
              })}
            </span>
          </div>
        )}
      </div>
    </m.div>
  );
}