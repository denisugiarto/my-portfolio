import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout/Layout";
import Markdown from "@/components/ui/markdown";
import ProjectHeader from "@/features/projects/project-header";
import ProjectGallery from "@/features/projects/project-gallery";
import { getProjectBySlug, getProjects } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanity";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects
      .filter((project) => project.slug?.current)
      .map((project) => ({
        slug: project.slug.current,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      return {
        title: "Project Not Found",
      };
    }

    return {
      title: project.seo?.metaTitle || project.title,
      description:
        project.seo?.metaDescription ||
        project.shortDescription ||
        project.description ||
        "",
      openGraph: {
        title: project.title,
        description: project.shortDescription || project.description || "",
        type: "article",
        images: project.coverImage
          ? [
            {
              url: project.coverImage.toString(),
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.shortDescription || project.description || "",
      },
    };
  } catch (error) {
    return {
      title: "Project Not Found",
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
      notFound();
    }

    return (
      <Layout activeNavbar="Projects" isNavColorBlack>
        {/* Main Content */}
        <div className="container py-12 md:py-24">

          <div className="mb-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-4 py-2 text-sm font-black uppercase tracking-widest text-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))] transition-none hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))]"
              title="back to projects"
            >
              <ChevronLeft size={18} className="stroke-[3]" />
              BACK TO PROJECTS
            </Link>
          </div>

          {/* Hero Image Block - Brutalist Style */}
          {project.coverImage && (
            <div className="relative mb-16 w-full overflow-hidden border-4 border-foreground bg-card shadow-[12px_12px_0px_0px_hsl(var(--foreground))]">
              <div className="aspect-[21/9] w-full relative">
                <Image
                  src={urlFor(project.coverImage).width(1200).height(500).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>
          )}

          {/* Project Header - Redesigned */}
          <div className="mb-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 lg:col-start-1">
                <ProjectHeader project={project} />
              </div>

              {/* Right Column - Project Meta & Actions */}
              <div className="w-full lg:col-span-1 lg:col-start-3">
                <div className="sticky top-28">
                  {/* Project Quick Info Card */}
                  <div className="border-4 border-foreground bg-secondary p-8 shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <h3 className="inline-block border-2 border-foreground bg-primary px-3 py-1 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-[3px_3px_0px_0px_hsl(var(--foreground))]">
                        PROJECT INFO
                      </h3>
                      {project.category && (
                        <span className="border-2 border-foreground bg-background px-2 py-1 text-xs font-bold uppercase tracking-wider text-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                          {project.category}
                        </span>
                      )}
                    </div>

                    <div className="space-y-8">
                      {project.liveUrl || project.githubUrl ? (
                        <div className="flex flex-col gap-4">
                          {project?.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full"
                            >
                              <Button
                                size="lg"
                                className="w-full flex items-center justify-center gap-2 text-md font-black tracking-widest"
                              >
                                <ExternalLink size={18} className="stroke-[3]" />
                                VIEW LIVE SITE
                              </Button>
                            </a>
                          )}
                          {project?.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full"
                            >
                              <Button
                                size="lg"
                                variant="outline"
                                className="w-full flex items-center justify-center gap-2 text-md font-black tracking-widest bg-background"
                              >
                                <SiGithub size={18} />
                                SOURCE CODE
                              </Button>
                            </a>
                          )}
                        </div>
                      ) : null}

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div>
                          <h4 className="mb-4 text-sm font-black uppercase text-foreground border-b-4 border-foreground inline-block pb-1">
                            STACK
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={tech._id || index}
                                className="border-2 border-foreground bg-primary px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
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
            <div className="border-t-4 border-foreground pt-16">
              <ProjectGallery images={project.gallery} title={project.title} />
            </div>
          )}

          {/* Project Content */}
          {project.content && (
            <div className="border-t-4 border-foreground pt-16 pb-24">
              <div className="max-w-4xl mx-auto lg:mx-0">
                <h2 className="mb-10 text-3xl md:text-4xl font-black uppercase tracking-widest text-foreground inline-block border-b-4 border-foreground pb-2">
                  EXECUTION LOG
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-p:font-medium prose-p:leading-relaxed prose-a:font-bold prose-a:text-primary hover:prose-a:underline prose-img:border-4 prose-img:border-foreground prose-img:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] bg-card p-6 md:p-10 border-4 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
                  <Markdown>{project.content}</Markdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  } catch (error) {
    console.error("Error loading project:", error);
    notFound();
  }
}
