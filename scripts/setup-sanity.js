#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up Sanity CMS...\n");

// Check if Sanity CLI is installed
try {
  execSync("sanity --version", { stdio: "pipe" });
  console.log("✅ Sanity CLI is installed");
} catch (error) {
  console.log("📦 Installing Sanity CLI...");
  execSync("npm install -g sanity@latest", { stdio: "inherit" });
}

// Create a simple studio setup script
const studioSetup = `
# Sanity Studio Setup

Your portfolio now uses Sanity CMS for content management!

## Getting Started

1. **Initialize your Sanity project:**
   \`\`\`bash
   sanity login
   sanity dataset create production
   \`\`\`

2. **Start the development server:**
   \`\`\`bash
   pnpm dev
   \`\`\`

3. **Create your first blog post:**
   - Visit http://localhost:3000 to see your portfolio
   - The blog page will show "No articles found" until you add content

## Adding Content

To add blog posts and projects, you can:

1. **Use Sanity Studio locally:**
   \`\`\`bash
   pnpm sanity
   \`\`\`
   Then visit http://localhost:3333

2. **Use Sanity Studio online:**
   - Go to https://your-project.sanity.studio
   - Or deploy with \`sanity deploy\`

## Content Types Available

- **Blog Posts**: Articles with rich text, images, and SEO settings
- **Projects**: Portfolio projects with galleries and tech stacks
- **Contact Messages**: Form submissions from your contact form
- **SEO Settings**: Per-page SEO configuration

## Sample Content

You can create sample blog posts and projects through the Sanity Studio interface.

## Environment Variables

Make sure these are set in your \`.env.local\`:
- \`NEXT_PUBLIC_SANITY_PROJECT_ID=dmdxpdxy\`
- \`NEXT_PUBLIC_SANITY_DATASET=production\`
`;

fs.writeFileSync(path.join(process.cwd(), "SANITY_SETUP.md"), studioSetup);

console.log("✅ Setup complete!");
console.log("📄 Created SANITY_SETUP.md with instructions");
console.log("\nNext steps:");
console.log("1. Run: sanity login");
console.log("2. Run: sanity dataset create production");
console.log("3. Run: pnpm dev");
console.log("4. Visit http://localhost:3000 to see your portfolio");
