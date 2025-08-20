import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteInfo",
      title: "Site Information",
      type: "object",
      fields: [
        defineField({
          name: "siteName",
          title: "Site Name",
          type: "string",
          validation: (Rule) => Rule.required(),
          description: "Name of your portfolio website",
        }),
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "string",
          description: "Short tagline for your portfolio",
        }),
        defineField({
          name: "description",
          title: "Site Description",
          type: "text",
          rows: 3,
          description: "Brief description of your portfolio for SEO",
        }),
        defineField({
          name: "siteUrl",
          title: "Site URL",
          type: "url",
          validation: (Rule) => Rule.required(),
          description:
            "Full URL of your portfolio (e.g., https://denisugiarto.my.id)",
        }),
        defineField({
          name: "author",
          title: "Author Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "favicon",
          title: "Favicon",
          type: "image",
          options: {
            hotspot: true,
          },
          description: "Site favicon (32x32px recommended)",
        }),
      ],
    }),
    defineField({
      name: "personalInfo",
      title: "Personal Information",
      type: "object",
      fields: [
        defineField({
          name: "fullName",
          title: "Full Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "displayName",
          title: "Display Name",
          type: "string",
          description:
            "Name shown on the website (if different from full name)",
        }),
        defineField({
          name: "jobTitle",
          title: "Job Title",
          type: "string",
          validation: (Rule) => Rule.required(),
          description: "e.g., Full-Stack Developer, Frontend Engineer",
        }),
        defineField({
          name: "email",
          title: "Email Address",
          type: "email",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
        }),
        defineField({
          name: "location",
          title: "Location",
          type: "string",
          description: "e.g., Jakarta, Indonesia",
        }),
        defineField({
          name: "timezone",
          title: "Timezone",
          type: "string",
          description: "e.g., GMT+7",
        }),
        defineField({
          name: "profileImage",
          title: "Profile Image",
          type: "image",
          options: {
            hotspot: true,
          },
          description: "Professional headshot or avatar",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "socialLink" }],
        },
      ],
    }),
    defineField({
      name: "contactSettings",
      title: "Contact Settings",
      type: "object",
      fields: [
        defineField({
          name: "responseTime",
          title: "Response Time",
          type: "string",
          initialValue: "Within 24 hours",
          description: "Expected response time for contact inquiries",
        }),
        defineField({
          name: "availabilityStatus",
          title: "Availability Status",
          type: "string",
          options: {
            list: [
              { title: "Available for work", value: "available" },
              { title: "Partially available", value: "partial" },
              { title: "Not available", value: "unavailable" },
              { title: "Open to opportunities", value: "open" },
            ],
          },
          initialValue: "available",
        }),
        defineField({
          name: "calendlyUrl",
          title: "Calendly URL",
          type: "url",
          description: "Link to your Calendly booking page",
        }),
        defineField({
          name: "bookingCTA",
          title: "Booking Call-to-Action",
          type: "string",
          initialValue: "Book a 15-Min Intro Call",
          description: "Text for the booking button",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteInfo.siteName",
      subtitle: "personalInfo.fullName",
    },
  },
});
