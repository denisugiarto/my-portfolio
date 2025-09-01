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
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="mb-2 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
              Portfolio Showcase
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              My <span className="text-primary">Projects</span>
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              A curated collection of web applications, mobile apps, and
              software solutions I&apos;ve crafted. Each project represents a
              unique challenge and showcases different technologies and
              methodologies.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:gap-8">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="whitespace-nowrap">
                  {projects.length} Projects
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="whitespace-nowrap">
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
