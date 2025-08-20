import { Metadata } from 'next'
import { Layout } from "@/components/Layout/Layout"
import { getProjects } from "@/lib/sanity-queries"
import ProjectsStaticList from "@/features/projects/projects-static-list"

export const metadata: Metadata = {
  title: 'Projects | Deni Sugiarto',
  description: 'Explore my portfolio of web development projects, mobile apps, and software solutions. Built with modern technologies and best practices.',
  openGraph: {
    title: 'Projects | Deni Sugiarto',
    description: 'Explore my portfolio of web development projects, mobile apps, and software solutions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Deni Sugiarto',
    description: 'Explore my portfolio of web development projects, mobile apps, and software solutions.',
  },
}

// Enable ISR with 60 second revalidation
export const revalidate = 60

export default async function ProjectsPage() {
  // Fetch projects at build time and revalidate every 60 seconds
  const projects = await getProjects()

  return (
    <Layout activeNavbar="Projects" isNavColorBlack>
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 overflow-hidden pb-0">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Portfolio Showcase
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              My <span className="text-primary">Projects</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A curated collection of web applications, mobile apps, and software solutions I&apos;ve crafted. 
              Each project represents a unique challenge and showcases different technologies and methodologies.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="whitespace-nowrap">{projects.filter(p => p.status === 'completed').length} Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="whitespace-nowrap">{projects.filter(p => p.status === 'in-progress').length} In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="whitespace-nowrap">{new Set(projects.flatMap(p => p.technologies?.map(t => t.name) || [])).size} Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="pb-20 lg:pb-32 pt-0">
        <div className="container">
          <ProjectsStaticList initialProjects={projects} />
        </div>
      </section>
    </Layout>
  )
}