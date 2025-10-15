import { defineField, defineType } from "sanity";

export const technology = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Technology Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
      description: "Name of the technology (e.g., React, Node.js, Python)",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Programming Language", value: "programming-language" },
          { title: "Backend", value: "backend" },
          { title: "Database", value: "database" },
          { title: "CSS", value: "css" },
          { title: "Mobile", value: "mobile" },
          { title: "Cloud Service", value: "cloud-service" },
          { title: "DevOps Tool", value: "devops-tool" },
          { title: "Testing Tool", value: "testing-tool" },
          { title: "Design Tool", value: "design-tool" },
          { title: "CMS", value: "cms" },
          { title: "API Technology", value: "api-technology" },
          { title: "Build Tool", value: "build-tool" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: "Category this technology belongs to",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          // Frontend Frameworks
          { title: "React", value: "SiReact" },
          { title: "Next.js", value: "SiNextdotjs" },
          { title: "Vue.js", value: "SiVuedotjs" },
          { title: "Angular", value: "SiAngular" },
          { title: "Svelte", value: "SiSvelte" },
          { title: "Nuxt.js", value: "SiNuxtdotjs" },

          // Programming Languages
          { title: "JavaScript", value: "SiJavascript" },
          { title: "TypeScript", value: "SiTypescript" },
          { title: "Python", value: "SiPython" },
          { title: "Java", value: "SiOpenjdk" },
          { title: "C#", value: "SiCsharp" },
          { title: "Go", value: "SiGo" },
          { title: "Rust", value: "SiRust" },
          { title: "PHP", value: "SiPhp" },
          { title: "Ruby", value: "SiRuby" },
          { title: "Dart", value: "SiDart" },

          // Backend & Runtime
          { title: "Node.js", value: "SiNodedotjs" },
          { title: "Express.js", value: "SiExpress" },
          { title: "NestJS", value: "SiNestjs" },
          { title: "Django", value: "SiDjango" },
          { title: "Flask", value: "SiFlask" },
          { title: "Spring Boot", value: "SiSpring" },
          { title: "Laravel", value: "SiLaravel" },
          { title: "Ruby on Rails", value: "SiRubyonrails" },

          // Databases
          { title: "PostgreSQL", value: "SiPostgresql" },
          { title: "MySQL", value: "SiMysql" },
          { title: "MongoDB", value: "SiMongodb" },
          { title: "Redis", value: "SiRedis" },
          { title: "SQLite", value: "SiSqlite" },
          { title: "Firebase", value: "SiFirebase" },
          { title: "Supabase", value: "SiSupabase" },

          // CSS & Styling
          { title: "Tailwind CSS", value: "SiTailwindcss" },
          { title: "CSS3", value: "SiCss3" },
          { title: "Sass", value: "SiSass" },
          { title: "Bootstrap", value: "SiBootstrap" },
          { title: "Material-UI", value: "SiMui" },
          { title: "Chakra UI", value: "SiChakraui" },
          { title: "Styled Components", value: "SiStyledcomponents" },
          { title: "Shadcn UI", value: "SiShadcnui" },

          // Mobile Development
          { title: "React Native", value: "SiReact" },
          { title: "Flutter", value: "SiFlutter" },
          { title: "Ionic", value: "SiIonic" },

          // Cloud & DevOps
          { title: "AWS", value: "SiAmazonaws" },
          { title: "Google Cloud", value: "SiGooglecloud" },
          { title: "Azure", value: "SiMicrosoftazure" },
          { title: "Vercel", value: "SiVercel" },
          { title: "Netlify", value: "SiNetlify" },
          { title: "Docker", value: "SiDocker" },
          { title: "Kubernetes", value: "SiKubernetes" },

          // Tools & Others
          { title: "Git", value: "SiGit" },
          { title: "GitHub", value: "SiGithub" },
          { title: "GitLab", value: "SiGitlab" },
          { title: "VS Code", value: "SiVisualstudiocode" },
          { title: "Webpack", value: "SiWebpack" },
          { title: "Vite", value: "SiVite" },
          { title: "Jest", value: "SiJest" },
          { title: "Figma", value: "SiFigma" },

          // API & Data
          { title: "GraphQL", value: "SiGraphql" },
          { title: "Prisma", value: "SiPrisma" },
          { title: "Sanity", value: "SiSanity" },
          { title: "Strapi", value: "SiStrapi" },
          { title: "other", value: "other" },
        ],
      },
      description:
        "React Simple Icons component name (e.g., SiReact, SiNodedotjs)",
    }),
    defineField({
      name: "iconCustom",
      title: "Custom Icon",
      type: "image",
      description: 'Used when icon is set to "Other"',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the image",
        }),
      ],
      hidden: ({ document }) => document?.icon !== "other",
    }),
    defineField({
      name: "color",
      title: "Brand Color",
      type: "string",
      description:
        "Hex color code for this technology's brand color (e.g., #61DAFB for React)",
    }),
    defineField({
      name: "proficiencyLevel",
      title: "My Proficiency Level (1-5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      description: "Your skill level with this technology",
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.min(0).max(50),
      description: "Number of years working with this technology",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order for displaying technologies (lower numbers appear first)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "icon",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? subtitle.replace("-", " ").toUpperCase()
          : "TECHNOLOGY",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});
