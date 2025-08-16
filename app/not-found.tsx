import Link from 'next/link'
import { Layout } from "@/components/Layout/Layout"

export default function NotFound() {
  return (
    <Layout activeNavbar="Home">
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Sorry, the page you are looking for could not be found.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </Layout>
  )
}