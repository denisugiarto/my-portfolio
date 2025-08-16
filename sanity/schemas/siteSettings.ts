import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteInfo',
      title: 'Site Information',
      type: 'object',
      fields: [
        defineField({
          name: 'siteName',
          title: 'Site Name',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'Name of your portfolio website'
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          description: 'Short tagline for your portfolio'
        }),
        defineField({
          name: 'description',
          title: 'Site Description',
          type: 'text',
          rows: 3,
          description: 'Brief description of your portfolio for SEO'
        }),
        defineField({
          name: 'siteUrl',
          title: 'Site URL',
          type: 'url',
          validation: Rule => Rule.required(),
          description: 'Full URL of your portfolio (e.g., https://denisugiarto.my.id)'
        }),
        defineField({
          name: 'author',
          title: 'Author Name',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Site favicon (32x32px recommended)'
        })
      ]
    }),
    defineField({
      name: 'personalInfo',
      title: 'Personal Information',
      type: 'object',
      fields: [
        defineField({
          name: 'fullName',
          title: 'Full Name',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'displayName',
          title: 'Display Name',
          type: 'string',
          description: 'Name shown on the website (if different from full name)'
        }),
        defineField({
          name: 'jobTitle',
          title: 'Job Title',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'e.g., Full-Stack Developer, Frontend Engineer'
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'email',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'e.g., Jakarta, Indonesia'
        }),
        defineField({
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          description: 'e.g., GMT+7'
        }),
        defineField({
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Professional headshot or avatar'
        })
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Dev.to', value: 'devto' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Behance', value: 'behance' },
                  { title: 'Dribbble', value: 'dribbble' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Telegram', value: 'telegram' },
                  { title: 'Email', value: 'email' },
                  { title: 'Resume/CV', value: 'resume' },
                  { title: 'Portfolio', value: 'portfolio' },
                  { title: 'Other', value: 'other' }
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'username',
              title: 'Username',
              type: 'string',
              description: 'Optional username for display'
            }),
            defineField({
              name: 'isMainContact',
              title: 'Main Contact Method',
              type: 'boolean',
              initialValue: false,
              description: 'Mark as primary contact method'
            }),
            defineField({
              name: 'showInNavigation',
              title: 'Show in Navigation',
              type: 'boolean',
              initialValue: true,
              description: 'Display this link in the site navigation'
            }),
            defineField({
              name: 'showInFooter',
              title: 'Show in Footer',
              type: 'boolean',
              initialValue: true,
              description: 'Display this link in the site footer'
            })
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'username',
              url: 'url'
            },
            prepare({title, subtitle, url}) {
              return {
                title: title.charAt(0).toUpperCase() + title.slice(1),
                subtitle: subtitle || url
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          validation: Rule => Rule.required().max(60),
          description: 'Default meta title for pages (max 60 characters)'
        }),
        defineField({
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.required().max(160),
          description: 'Default meta description for pages (max 160 characters)'
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'SEO keywords for your portfolio'
        }),
        defineField({
          name: 'openGraphImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Default image for social media sharing (1200x630px recommended)'
        }),
        defineField({
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Your Twitter handle without @ (for Twitter Card meta tags)'
        })
      ]
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Google Analytics measurement ID (e.g., G-XXXXXXXXXX)'
        }),
        defineField({
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'Google Tag Manager container ID (e.g., GTM-XXXXXXX)'
        }),
        defineField({
          name: 'hotjarId',
          title: 'Hotjar Site ID',
          type: 'string',
          description: 'Hotjar site ID for heatmaps and recordings'
        }),
        defineField({
          name: 'linkedInInsightTag',
          title: 'LinkedIn Insight Tag',
          type: 'string',
          description: 'LinkedIn Insight Tag partner ID'
        })
      ]
    }),
    defineField({
      name: 'designSettings',
      title: 'Design Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex code for primary brand color (e.g., #3B82F6)'
        }),
        defineField({
          name: 'secondaryColor',
          title: 'Secondary Color',
          type: 'string',
          description: 'Hex code for secondary brand color'
        }),
        defineField({
          name: 'accentColor',
          title: 'Accent Color',
          type: 'string',
          description: 'Hex code for accent color'
        }),
        defineField({
          name: 'fontFamily',
          title: 'Font Family',
          type: 'string',
          options: {
            list: [
              { title: 'Inter', value: 'inter' },
              { title: 'Poppins', value: 'poppins' },
              { title: 'Montserrat', value: 'montserrat' },
              { title: 'Open Sans', value: 'open-sans' },
              { title: 'Roboto', value: 'roboto' },
              { title: 'Source Sans Pro', value: 'source-sans-pro' },
              { title: 'Custom', value: 'custom' }
            ]
          },
          description: 'Primary font family for the website'
        }),
        defineField({
          name: 'customFont',
          title: 'Custom Font URL',
          type: 'url',
          description: 'Google Fonts URL if using custom font',
          hidden: ({parent}) => parent?.fontFamily !== 'custom'
        })
      ]
    }),
    defineField({
      name: 'contactSettings',
      title: 'Contact Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'responseTime',
          title: 'Response Time',
          type: 'string',
          initialValue: 'Within 24 hours',
          description: 'Expected response time for contact inquiries'
        }),
        defineField({
          name: 'availabilityStatus',
          title: 'Availability Status',
          type: 'string',
          options: {
            list: [
              { title: 'Available for work', value: 'available' },
              { title: 'Partially available', value: 'partial' },
              { title: 'Not available', value: 'unavailable' },
              { title: 'Open to opportunities', value: 'open' }
            ]
          },
          initialValue: 'available'
        }),
        defineField({
          name: 'calendlyUrl',
          title: 'Calendly URL',
          type: 'url',
          description: 'Link to your Calendly booking page'
        }),
        defineField({
          name: 'bookingCTA',
          title: 'Booking Call-to-Action',
          type: 'string',
          initialValue: 'Book a 15-Min Intro Call',
          description: 'Text for the booking button'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'siteInfo.siteName',
      subtitle: 'personalInfo.fullName'
    }
  }
})