import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Layout } from "@/components/Layout/Layout"
import PortableText from "@/components/portable-text/PortableText"
import ProjectHeader from "@/features/projects/project-header"
import ProjectGallery from "@/features/projects/project-gallery"
import { getProjectBySlug, getProjects } from "@/lib/sanity-queries"
import { urlFor } from "@/lib/sanity"
import { ChevronLeft, Calendar, ExternalLink, Monitor } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import Image from "next/image"
import Link from "next/link"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects
      .filter((project) => project.slug?.current)
      .map((project) => ({
        slug: project.slug.current,
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const project = await getProjectBySlug(slug)
    
    if (!project) {
      return {
        title: 'Project Not Found',
      }
    }

    return {
      title: project.seo?.metaTitle || project.title,
      description: project.seo?.metaDescription || project.shortDescription || project.description || '',
      openGraph: {
        title: project.title,
        description: project.shortDescription || project.description || '',
        type: 'article',
        images: project.coverImage ? [
          {
            url: project.coverImage.toString(),
            width: 1200,
            height: 630,
            alt: project.title,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.shortDescription || project.description || '',
      },
    }
  } catch (error) {
    return {
      title: 'Project Not Found',
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const { slug } = await params
    const project = await getProjectBySlug(slug)
    
    if (!project) {
      notFound()
    }

    return (
      <Layout activeNavbar="Projects" isNavColorBlack>
        {/* Hero Section with Cover Image */}
        {project.coverImage && (
          <div className="relative h-[40vh] min-h-[300px] w-full">
            <Image
              src={urlFor(project.coverImage).width(1920).height(600).url()}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-0 right-0 z-20">
              <div className="container">
                <Link
                  href="/projects"
                  className="mb-4 inline-flex items-center gap-2 rounded-lg bg-black/70 px-3 py-2 text-sm text-white backdrop-blur-sm transition-all hover:bg-black/80"
                  title="back to projects"
                >
                  <ChevronLeft size={16} />
                  Back to Projects
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container">
          {/* Navigation for projects without cover image */}
          {!project.coverImage && (
            <div className="pt-24 pb-6">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground transition-all hover:bg-muted"
                title="back to projects"
              >
                <ChevronLeft size={16} />
                Back to Projects
              </Link>
            </div>
          )}

          {/* Project Header - Redesigned */}
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 lg:col-start-1">
                <ProjectHeader project={project} />
              </div>

              {/* Right Column - Project Meta & Actions */}
              <div className="lg:col-span-1 lg:col-start-3 w-full">
                <div className="sticky top-28">
                  {/* Project Quick Info Card */}
                  <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-card-foreground">Project Info</h3>
                    
                    <div className="space-y-4">
                      {/* Status & Category */}
                      <div className="flex flex-wrap gap-2">
                        {project.category && (
                          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                            {project.category.toUpperCase()}
                          </span>
                        )}
                        {project.status && (
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                            project.status === 'completed' 
                              ? 'bg-success text-success-foreground'
                              : project.status === 'in-progress'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {project.status.replace('-', ' ').toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Completion Date */}
                      {project.completedAt && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={16} />
                          <span>
                            Completed {new Date(project.completedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </span>
                        </div>
                      )}

                      {/* Project Links */}
                      <div className="space-y-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                          >
                            <ExternalLink size={16} />
                            View Live Site
                          </a>
                        )}
                        
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90"
                          >
                            <Monitor size={16} />
                            View Demo
                          </a>
                        )}
                        
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted"
                          >
                            <SiGithub size={16} />
                            View Source Code
                          </a>
                        )}
                      </div>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-card-foreground">Technologies</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={tech._id || index}
                                className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs"
                              >
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="py-8 border-t border-border">
              <ProjectGallery images={project.gallery} title={project.title} />
            </div>
          )}
          
          {/* Project Content */}
          {project.content && (
            <div className="py-8 border-t border-border">
              <div className="max-w-4xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Project Details</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <PortableText content={project.content} />
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    )
  } catch (error) {
    console.error('Error loading project:', error)
    notFound()
  }
}