import { defineField, defineType } from "sanity";

export const blogCategory = defineType({
  name: "blogCategory",
  title: "Blog Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Green", value: "green" },
          { title: "Red", value: "red" },
          { title: "Yellow", value: "yellow" },
          { title: "Purple", value: "purple" },
          { title: "Pink", value: "pink" },
          { title: "Indigo", value: "indigo" },
          { title: "Gray", value: "gray" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
      initialValue: "blue",
    }),
    defineField({
      name: "customColor",
      title: "Custom Color",
      description: "For custom color selection. ex: #ffffff",
      type: "string",
      hidden: ({ document }) => document?.color !== "other",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name (e.g., 'Code', 'Lightbulb', 'Globe')",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
    },
  },
});