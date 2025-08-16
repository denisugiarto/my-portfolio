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
      <section className="container p-4 pt-20">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-6xl">My Projects</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            A collection of projects I&apos;ve worked on, showcasing different technologies, 
            design patterns, and problem-solving approaches.
          </p>
        </div>
        
        <ProjectsStaticList initialProjects={projects} />
      </section>
    </Layout>
  )
}