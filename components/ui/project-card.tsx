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
  showStatus = true
}: ProjectCardProps) {
  const isHomeVariant = variant === 'home';
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-green-500/10', text: 'text-green-700 dark:text-green-400', label: 'Completed' };
      case 'in-progress':
        return { bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400', label: 'In Progress' };
      case 'planning':
        return { bg: 'bg-purple-500/10', text: 'text-purple-700 dark:text-purple-400', label: 'Planning' };
      default:
        return { bg: 'bg-gray-500/10', text: 'text-gray-700 dark:text-gray-400', label: status };
    }
  };
  
  const statusConfig = project.status ? getStatusConfig(project.status) : null;

  return (
    <m.div
      className={`group overflow-hidden rounded-xl ${
        isHomeVariant 
          ? 'shadow-md'
          : 'bg-card border border-border'
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      viewport={{ once: true }}
    >
      <Link href={`/projects/${project.slug.current}`}>
        <div className="relative overflow-hidden">
          <Image
            src={project.coverImage ? urlFor(project.coverImage).width(420).height(300).url() : "/no-image.png"}
            width={420}
            height={300}
            className={`w-full object-cover object-center ${
              isHomeVariant 
                ? 'h-48 rounded-lg shadow-lg'
                : 'h-52'
            }`}
            alt={`${project.title} project`}
          />
          
          {/* Status Badge */}
          {project.status && showStatus && statusConfig && !isHomeVariant && (
            <div className="absolute top-4 right-4">
              <span className={`${statusConfig.bg} ${statusConfig.text} backdrop-blur-sm px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/20`}>
                {statusConfig.label}
              </span>
            </div>
          )}
          
        </div>
      </Link>

      <div className={isHomeVariant ? 'py-4' : 'p-6 pt-5'}>
        <Link href={`/projects/${project.slug.current}`}>
          <h3 className={`mb-2 text-xl font-bold ${
            isHomeVariant 
              ? 'capitalize text-slate-900 dark:text-slate-200'
              : 'text-card-foreground'
          }`}>
            {project.title}
          </h3>
        </Link>
        
        <p className={`text-sm leading-relaxed ${
          isHomeVariant 
            ? 'text-base text-slate-600 dark:text-slate-300'
            : 'mb-4 text-muted-foreground line-clamp-2'
        }`}>
          {project.shortDescription || project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className={`flex flex-wrap gap-1.5 ${isHomeVariant ? 'pb-2 pt-0' : 'mb-5'}`}>
            {project.technologies.slice(0, isHomeVariant ? undefined : 4).map((tech, techIndex) => (
              <span 
                key={techIndex} 
                className={`inline-flex items-center px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium ${
                  isHomeVariant ? 'text-xs' : 'text-xs'
                }`}
              >
                {tech.name}
              </span>
            ))}
            {!isHomeVariant && project.technologies.length > 4 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Project Links - Only show in home variant or as fallback */}
        {isHomeVariant && (
          <div className="flex gap-2 mt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                title="website link"
                className="flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" /> 
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
                className="flex items-center gap-2 rounded-lg border px-2 py-1 text-sm leading-none text-white shadow-md bg-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <SiGithub className="h-4 w-4" /> 
                Repository
              </a>
            )}
          </div>
        )}
      </div>
    </m.div>
  );
}