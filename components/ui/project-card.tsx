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
      className={`group overflow-hidden rounded-xl transition-all duration-300 ${
        isHomeVariant 
          ? 'transition-all ease-linear hover:scale-105 md:mr-4 md:hover:scale-110'
          : 'bg-card border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1'
      }`}
      initial={{ opacity: 0, y: isHomeVariant ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: isHomeVariant ? 1.02 : 1.01 }}
    >
      <Link href={`/projects/${project.slug.current}`}>
        <div className="relative overflow-hidden">
          <Image
            src={project.coverImage ? urlFor(project.coverImage).width(420).height(300).url() : "/no-image.png"}
            width={420}
            height={300}
            className={`w-full object-cover object-center transition-all duration-500 ${
              isHomeVariant 
                ? 'h-48 rounded-lg shadow-lg group-hover:scale-105'
                : 'h-52 group-hover:scale-110 group-hover:brightness-110'
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
          
          {/* Hover Overlay */}
          {!isHomeVariant && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Quick Action Buttons */}
          {!isHomeVariant && (
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-white/90 text-gray-900 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white transition-colors backdrop-blur-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-gray-900/90 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-900 transition-colors backdrop-blur-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SiGithub className="w-3 h-3" />
                    Code
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className={isHomeVariant ? 'py-4' : 'p-6 pt-5'}>
        <Link href={`/projects/${project.slug.current}`}>
          <h3 className={`mb-2 text-xl font-bold transition-colors ${
            isHomeVariant 
              ? 'capitalize text-slate-900 dark:text-slate-200 hover:text-primary'
              : 'text-card-foreground group-hover:text-primary'
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
                className={`inline-flex items-center px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium transition-colors hover:bg-primary/20 ${
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
                className="flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md transition-all hover:scale-110 ease-in-out"
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
                className="flex items-center gap-2 rounded-lg border bg-secondary px-2 py-1 text-sm leading-none text-white shadow-md transition-all hover:scale-110 ease-in-out"
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
                className="flex items-center gap-2 rounded-lg border px-2 py-1 text-sm leading-none text-white shadow-md transition-all bg-primary hover:scale-110 ease-in-out"
                onClick={(e) => e.stopPropagation()}
              >
                <SiGithub className="h-4 w-4" /> 
                Repository
              </a>
            )}
          </div>
        )}

        {/* Footer Info */}
        {!isHomeVariant && (
          <div className="mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {project.completedAt && showCompletionDate && (
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>
                    {new Date(project.completedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-muted-foreground">View Details →</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </m.div>
  );
}