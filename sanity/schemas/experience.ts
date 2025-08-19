import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  fields: [
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyUrl",
      title: "Company Website",
      type: "url",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Freelance", value: "freelance" },
          { title: "Internship", value: "internship" },
        ],
      },
      initialValue: "full-time",
    }),
    defineField({
      name: "workType",
      title: "Work Type",
      type: "string",
      options: {
        list: [
          { title: "On-site", value: "on-site" },
          { title: "Remote", value: "remote" },
          { title: "Hybrid", value: "hybrid" },
        ],
      },
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave empty if currently working here",
    }),
    defineField({
      name: "currentJob",
      title: "Currently Working Here",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "blockContent",
      description: "Detailed description of your role and responsibilities",
    }),
    defineField({
      name: "achievements",
      title: "Key Achievements",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key achievements and accomplishments",
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "technology" }],
        },
      ],
      description: "List of technologies used in this role",
    }),
    defineField({
      name: "skills",
      title: "Skills Developed",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Skills gained or improved in this role",
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Experience",
      type: "boolean",
      initialValue: false,
      description: "Highlight this experience on your portfolio",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order for display (lower numbers appear first)",
      initialValue: 0,
    }),
    defineField({
      name: "visible",
      title: "Visible on Portfolio",
      type: "boolean",
      initialValue: true,
      description: "Show this experience on your portfolio",
    }),
  ],
  preview: {
    select: {
      title: "jobTitle",
      subtitle: "company",
      media: "companyLogo",
      startDate: "startDate",
      currentJob: "currentJob",
    },
    prepare({ title, subtitle, media, startDate, currentJob }) {
      const year = startDate ? new Date(startDate).getFullYear() : "";
      const status = currentJob ? "(Current)" : "";
      return {
        title: `${title} - ${subtitle}`,
        subtitle: `${year} ${status}`.trim(),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Start Date, Newest First",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "startDate", direction: "desc" },
      ],
    },
  ],
});
