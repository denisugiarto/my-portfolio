import { Metadata } from "next";
import { Layout } from "@/components/Layout/Layout";
import { getProjects } from "@/lib/sanity-queries";
import ProjectsStaticList from "@/features/projects/projects-static-list";

export const metadata: Metadata = {
  title: "Projects | Deni Sugiarto",
  description:
    "Explore my portfolio of web development projects, mobile apps, and software solutions. Built with modern technologies and best practices.",
  openGraph: {
    title: "Projects | Deni Sugiarto",
    description:
      "Explore my portfolio of web development projects, mobile apps, and software solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Deni Sugiarto",
    description:
      "Explore my portfolio of web development projects, mobile apps, and software solutions.",
  },
};

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function ProjectsPage() {
  // Fetch projects at build time and revalidate every 60 seconds
  const projects = await getProjects();

  return (
    <Layout activeNavbar="Projects" isNavColorBlack>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-0 pt-20 lg:pt-32">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-none bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-none bg-secondary/5 blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="mb-2 text-center">
            <div className="mb-4 inline-flex items-center gap-2 border-[3px] border-foreground bg-primary px-3 py-1 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] md:mb-6 md:px-4 md:py-2 md:text-sm">
              <span className="h-2.5 w-2.5 animate-pulse border-2 border-foreground bg-success"></span>
              Portfolio Showcase
            </div>

            <h1 className="mb-4 text-4xl font-black uppercase tracking-tight text-foreground md:mb-6 md:text-5xl lg:text-7xl">
              My{" "}
              <span className="inline-block border-[3px] border-foreground bg-primary px-2 text-primary-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                Projects
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-sm font-bold leading-relaxed text-foreground/80 md:text-lg md:leading-relaxed">
              A curated collection of web applications, mobile apps, and
              software solutions I&apos;ve crafted. Each project represents a
              unique challenge and showcases different technologies and
              methodologies.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-black uppercase md:mt-8 md:gap-6 md:text-sm">
              <div className="flex items-center gap-2 border-[3px] border-foreground bg-background px-3 py-1.5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                <div className="h-3.5 w-3.5 border-2 border-foreground bg-success"></div>
                <span className="whitespace-nowrap text-foreground">
                  {projects.length} Projects
                </span>
              </div>
              <div className="flex items-center gap-2 border-[3px] border-foreground bg-background px-3 py-1.5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                <div className="h-3.5 w-3.5 border-2 border-foreground bg-accent"></div>
                <span className="whitespace-nowrap text-foreground">
                  {
                    new Set(
                      projects.flatMap(
                        (p) => p.technologies?.map((t) => t.name) || [],
                      ),
                    ).size
                  }{" "}
                  Technologies
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="pb-20 pt-0 lg:pb-32">
        <div className="container">
          <ProjectsStaticList initialProjects={projects} />
        </div>
      </section>
    </Layout>
  );
}
