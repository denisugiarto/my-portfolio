import {defineField, defineType} from 'sanity'

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      options: {
        list: [
          {title: 'Home Page', value: 'home'},
          {title: 'About Page', value: 'about'},
          {title: 'Projects Page', value: 'projects'},
          {title: 'Blog Page', value: 'blog'},
          {title: 'Contact Page', value: 'contact'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title that appears in browser tabs and search results',
      validation: Rule => Rule.required().max(60),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the page title for SEO (if different from page title)',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for search engines and social media',
      validation: Rule => Rule.required().min(120).max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'SEO keywords for this page',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Title for social media sharing (Facebook, LinkedIn, etc.)',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 3,
      description: 'Description for social media sharing',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image for social media sharing (1200x630px recommended)',
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          {title: 'Summary', value: 'summary'},
          {title: 'Summary Large Image', value: 'summary_large_image'},
        ],
      },
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'string',
      description: 'Title specifically for Twitter sharing',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'text',
      rows: 3,
      description: 'Description specifically for Twitter sharing',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'twitterImage',
      title: 'Twitter Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image specifically for Twitter sharing',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Canonical URL to prevent duplicate content issues',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      description: 'Prevent search engines from following links on this page',
      initialValue: false,
    }),
    defineField({
      name: 'structuredData',
      title: 'Structured Data',
      type: 'text',
      rows: 10,
      description: 'JSON-LD structured data for rich snippets',
    }),
  ],
  preview: {
    select: {
      title: 'pageId',
      subtitle: 'title',
    },
    prepare({title, subtitle}) {
      const pageNames = {
        home: 'Home Page',
        about: 'About Page',
        projects: 'Projects Page',
        blog: 'Blog Page',
        contact: 'Contact Page',
      }
      return {
        title: pageNames[title as keyof typeof pageNames] || title,
        subtitle: subtitle,
      }
    },
  },
})