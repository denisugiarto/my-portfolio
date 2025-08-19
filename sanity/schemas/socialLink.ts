import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "GitHub", value: "github" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Twitter/X", value: "twitter" },
          { title: "Instagram", value: "instagram" },
          { title: "Facebook", value: "facebook" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "Discord", value: "discord" },
          { title: "Telegram", value: "telegram" },
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Email", value: "email" },
          { title: "Website", value: "website" },
          { title: "Portfolio", value: "portfolio" },
          { title: "Resume/CV", value: "resume" },
          { title: "Blog", value: "blog" },
          { title: "Dev.to", value: "devto" },
          { title: "Medium", value: "medium" },
          { title: "Hashnode", value: "hashnode" },
          { title: "Stack Overflow", value: "stackoverflow" },
          { title: "CodePen", value: "codepen" },
          { title: "Dribbble", value: "dribbble" },
          { title: "Behance", value: "behance" },
          { title: "Figma", value: "figma" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: "Social media platform or service",
    }),
    defineField({
      name: "customPlatformName",
      title: "Custom Platform Name",
      type: "string",
      description: 'Used when platform is set to "Other"',
      hidden: ({ document }) => document?.platform !== "other",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
      description: "Full URL to your profile or contact method",
    }),
    defineField({
      name: "username",
      title: "Username/Handle",
      type: "string",
      description:
        "Your username on this platform (optional, for display purposes)",
    }),
    defineField({
      name: "label",
      title: "Display Label",
      type: "string",
      description: "Custom text to display (if different from platform name)",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          // Social Platforms
          { title: "GitHub", value: "SiGithub" },
          { title: "LinkedIn", value: "SiLinkedin" },
          { title: "Twitter/X", value: "SiX" },
          { title: "Instagram", value: "SiInstagram" },
          { title: "Facebook", value: "SiFacebook" },
          { title: "YouTube", value: "SiYoutube" },
          { title: "TikTok", value: "SiTiktok" },
          { title: "Discord", value: "SiDiscord" },
          { title: "Telegram", value: "SiTelegram" },
          { title: "WhatsApp", value: "SiWhatsapp" },

          // Developer Platforms
          { title: "Dev.to", value: "SiDevdotto" },
          { title: "Medium", value: "SiMedium" },
          { title: "Hashnode", value: "SiHashnode" },
          { title: "Stack Overflow", value: "SiStackoverflow" },
          { title: "CodePen", value: "SiCodepen" },
          { title: "GitLab", value: "SiGitlab" },
          { title: "Bitbucket", value: "SiBitbucket" },

          // Design Platforms
          { title: "Dribbble", value: "SiDribbble" },
          { title: "Behance", value: "SiBehance" },
          { title: "Figma", value: "SiFigma" },

          // Contact & Other
          { title: "Email", value: "SiGmail" },
          { title: "Website", value: "SiGooglechrome" },
          { title: "Portfolio", value: "SiAboutdotme" },
          { title: "Resume/CV", value: "SiAdobeacrobatreader" },
          { title: "Blog", value: "SiRss" },
          { title: "Other", value: "other" },
        ],
      },
      description:
        "React Simple Icons component name (e.g., SiGithub, SiLinkedin). Will auto-select based on platform if not specified.",
    }),
    defineField({
      name: "customIcon",
      title: "Custom Icon",
      type: "image",
      description: 'Used when icon is set to "Other"',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.icon !== "other",
    }),
    defineField({
      name: "color",
      title: "Brand Color",
      type: "string",
      description:
        "Hex color code for this platform's brand color (e.g., #1DA1F2 for Twitter)",
    }),
    defineField({
      name: "isPublic",
      title: "Show Publicly",
      type: "boolean",
      initialValue: true,
      description: "Should this link be displayed on your public portfolio?",
    }),
    defineField({
      name: "isPrimary",
      title: "Primary Contact Method",
      type: "boolean",
      initialValue: false,
      description: "Is this a primary way to contact you?",
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      initialValue: true,
      description: "Should this link open in a new browser tab?",
    }),
    defineField({
      name: "showInHeader",
      title: "Show in Header",
      type: "boolean",
      initialValue: false,
      description: "Display this link in the site header?",
    }),
    defineField({
      name: "showInFooter",
      title: "Show in Footer",
      type: "boolean",
      initialValue: true,
      description: "Display this link in the site footer?",
    }),    
    defineField({
      name: "showInContact",
      title: "Show in Contact Section",
      type: "boolean",
      initialValue: true,
      description: "Display this link in the contact section?",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order for displaying links (lower numbers appear first)",
    }),
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "url",
      customName: "customPlatformName",
      username: "username",
      media: "icon",
    },
    prepare({ title, subtitle, customName, username, media }) {
      const displayTitle = title === "other" ? customName : title;
      const displaySubtitle = username ? `@${username}` : subtitle;

      return {
        title: displayTitle?.charAt(0).toUpperCase() + displayTitle?.slice(1),
        subtitle: displaySubtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Platform A-Z",
      name: "platformAsc",
      by: [{ field: "platform", direction: "asc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "platform", direction: "asc" },
      ],
    },
    {
      title: "Primary First",
      name: "primaryFirst",
      by: [
        { field: "isPrimary", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
