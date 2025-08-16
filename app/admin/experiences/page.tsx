import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Experience Management',
  description: 'Manage your work experiences through Sanity CMS.',
}

export default function ExperienceManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Experience Management
            </h1>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Add Experience */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                  Add New Experience
                </h2>
                <p className="text-blue-700 dark:text-blue-300 mb-4">
                  Create a new work experience entry with company details, job responsibilities, and achievements.
                </p>
                <div className="space-y-3 text-sm text-blue-600 dark:text-blue-400">
                  <p>• Job title and company information</p>
                  <p>• Employment dates and type</p>
                  <p>• Key achievements and technologies</p>
                  <p>• Company logo and description</p>
                </div>
              </div>

              {/* Manage Existing */}
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-4">
                  Manage Existing
                </h2>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  Edit, reorder, or remove existing work experiences from your portfolio.
                </p>
                <div className="space-y-3 text-sm text-green-600 dark:text-green-400">
                  <p>• Edit job details and descriptions</p>
                  <p>• Set display order and visibility</p>
                  <p>• Mark current positions</p>
                  <p>• Feature important roles</p>
                </div>
              </div>

              {/* SEO & Settings */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
                  Experience Display
                </h2>
                <p className="text-purple-700 dark:text-purple-300 mb-4">
                  Control how your experiences appear on your portfolio homepage.
                </p>
                <div className="space-y-3 text-sm text-purple-600 dark:text-purple-400">
                  <p>• Set featured experiences</p>
                  <p>• Control display order</p>
                  <p>• Show/hide from portfolio</p>
                  <p>• Format date ranges</p>
                </div>
              </div>

              {/* Analytics */}
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-4">
                  Career Timeline
                </h2>
                <p className="text-orange-700 dark:text-orange-300 mb-4">
                  View your career progression and experience timeline.
                </p>
                <div className="space-y-3 text-sm text-orange-600 dark:text-orange-400">
                  <p>• Chronological career view</p>
                  <p>• Skills development tracking</p>
                  <p>• Technology evolution</p>
                  <p>• Career duration insights</p>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Access
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/studio`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white dark:bg-gray-600 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Sanity Studio
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Full-featured CMS interface for managing all content
                  </p>
                </a>
                
                <Link
                  href="/"
                  className="block p-4 bg-white dark:bg-gray-600 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    View Portfolio
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    See how your experiences appear on the live site
                  </p>
                </Link>

                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}#experience`}
                  className="block p-4 bg-white dark:bg-gray-600 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Experience Section
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Jump directly to the experience section
                  </p>
                </a>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 p-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                Getting Started
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
                <li>Access Sanity Studio using the link above</li>
                <li>Navigate to &quot;Work Experience&quot; in the content types</li>
                <li>Click &quot;Create new Experience&quot; to add your first entry</li>
                <li>Fill in all relevant details including dates, skills, and achievements</li>
                <li>Set the display order and visibility preferences</li>
                <li>Save and publish your experience</li>
                <li>View the results on your portfolio homepage</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}