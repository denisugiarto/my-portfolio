import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience Management",
  description: "Manage your work experiences through Sanity CMS.",
};

export default function ExperienceManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
              Experience Management
            </h1>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Add Experience */}
              <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                <h2 className="mb-4 text-xl font-semibold text-blue-900 dark:text-blue-100">
                  Add New Experience
                </h2>
                <p className="mb-4 text-blue-700 dark:text-blue-300">
                  Create a new work experience entry with company details, job
                  responsibilities, and achievements.
                </p>
                <div className="space-y-3 text-sm text-blue-600 dark:text-blue-400">
                  <p>• Job title and company information</p>
                  <p>• Employment dates and type</p>
                  <p>• Key achievements and technologies</p>
                  <p>• Company logo and description</p>
                </div>
              </div>

              {/* Manage Existing */}
              <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
                <h2 className="mb-4 text-xl font-semibold text-green-900 dark:text-green-100">
                  Manage Existing
                </h2>
                <p className="mb-4 text-green-700 dark:text-green-300">
                  Edit, reorder, or remove existing work experiences from your
                  portfolio.
                </p>
                <div className="space-y-3 text-sm text-green-600 dark:text-green-400">
                  <p>• Edit job details and descriptions</p>
                  <p>• Set display order and visibility</p>
                  <p>• Mark current positions</p>
                  <p>• Feature important roles</p>
                </div>
              </div>

              {/* SEO & Settings */}
              <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
                <h2 className="mb-4 text-xl font-semibold text-purple-900 dark:text-purple-100">
                  Experience Display
                </h2>
                <p className="mb-4 text-purple-700 dark:text-purple-300">
                  Control how your experiences appear on your portfolio
                  homepage.
                </p>
                <div className="space-y-3 text-sm text-purple-600 dark:text-purple-400">
                  <p>• Set featured experiences</p>
                  <p>• Control display order</p>
                  <p>• Show/hide from portfolio</p>
                  <p>• Format date ranges</p>
                </div>
              </div>

              {/* Analytics */}
              <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
                <h2 className="mb-4 text-xl font-semibold text-orange-900 dark:text-orange-100">
                  Career Timeline
                </h2>
                <p className="mb-4 text-orange-700 dark:text-orange-300">
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
            <div className="mt-12 rounded-lg bg-gray-100 p-6 dark:bg-gray-700">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Quick Access
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <a
                  href={`${
                    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
                  }/studio`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg bg-white p-4 transition-shadow hover:shadow-md dark:bg-gray-600"
                >
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    Sanity Studio
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Full-featured CMS interface for managing all content
                  </p>
                </a>

                <Link
                  href="/"
                  className="block rounded-lg bg-white p-4 transition-shadow hover:shadow-md dark:bg-gray-600"
                >
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    View Portfolio
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    See how your experiences appear on the live site
                  </p>
                </Link>

                <a
                  href={`${
                    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
                  }#experience`}
                  className="block rounded-lg bg-white p-4 transition-shadow hover:shadow-md dark:bg-gray-600"
                >
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    Experience Section
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Jump directly to the experience section
                  </p>
                </a>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
              <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
                Getting Started
              </h3>
              <ol className="list-inside list-decimal space-y-2 text-blue-800 dark:text-blue-200">
                <li>Access Sanity Studio using the link above</li>
                <li>
                  Navigate to &quot;Work Experience&quot; in the content types
                </li>
                <li>
                  Click &quot;Create new Experience&quot; to add your first
                  entry
                </li>
                <li>
                  Fill in all relevant details including dates, skills, and
                  achievements
                </li>
                <li>Set the display order and visibility preferences</li>
                <li>Save and publish your experience</li>
                <li>View the results on your portfolio homepage</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
