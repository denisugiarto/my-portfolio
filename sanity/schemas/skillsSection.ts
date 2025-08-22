import { defineField, defineType } from "sanity";

export const skillsSection = defineType({
  name: "skillsSection",
  title: "Skills Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "Skills & Technologies",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      description: "Optional subtitle or description for the skills section",
    }),
    defineField({
      name: "skillGroups",
      title: "Skill Groups",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "groupName",
              title: "Group Name",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "e.g., Frontend, Backend, DevOps",
            }),
            defineField({
              name: "groupColor",
              title: "Group Color",
              type: "string",
              description: "Hex color code for this skill group",
            }),
            defineField({
              name: "groupIcon",
              title: "Group Icon",
              type: "string",
              description: "Icon name or emoji for this group",
            }),
            defineField({
              name: "skills",
              title: "Skills",
              type: "array",
              of: [
                {
                  type: "reference",
                  to: [{ type: "technology" }],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "groupName",
              skills: "skills",
              isCore: "isCore",
            },
            prepare({ title, skills, isCore }) {
              const skillCount = skills ? skills.length : 0;
              const coreLabel = isCore ? " (Core)" : "";
              return {
                title: `${title}${coreLabel}`,
                subtitle: `${skillCount} skills`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      skillGroups: "skillGroups",
    },
    prepare({ title, skillGroups }) {
      const groupCount = skillGroups ? skillGroups.length : 0;
      return {
        title,
        subtitle: `${groupCount} skill groups`,
      };
    },
  },
});
