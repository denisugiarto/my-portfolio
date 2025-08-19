import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main headline for the hero section",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: "Supporting text below the main headline",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: "Short professional bio (1-2 lines)",
    }),
    defineField({
      name: "primaryCTA",
      title: "Primary Call to Action",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
          description: "Internal link (e.g., #projects) or external URL",
        }),
      ],
    }),
    defineField({
      name: "secondaryCTA",
      title: "Secondary Call to Action",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
          description: "Internal link (e.g., #contact) or external URL",
        }),
      ],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Optional background image for the hero section",
    }),
    defineField({
      name: "technologies",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "technology" }],
        },
      ],
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability Status",
      type: "object",
      fields: [
        defineField({
          name: "isAvailable",
          title: "Available for Work",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "statusText",
          title: "Status Text",
          type: "string",
          initialValue: "Available for new projects",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "headline",
      subtitle: "bio",
    },
  },
});
