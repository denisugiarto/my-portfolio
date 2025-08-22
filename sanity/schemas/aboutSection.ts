import {defineField, defineType} from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'About Me'
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
      description: 'Who you are and your experience'
    }),
    defineField({
      name: 'uniqueSellingProposition',
      title: 'Unique Selling Proposition (USP)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      description: 'What makes you different from other developers'
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Professional headshot or avatar'
    }),
    defineField({
      name: 'skillCategories',
      title: 'Skill Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'category',
              title: 'Category Name',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                list: [
                  { title: 'Frontend', value: 'frontend' },
                  { title: 'Backend', value: 'backend' },
                  { title: 'DevOps', value: 'devops' },
                  { title: 'Database', value: 'database' },
                  { title: 'Tools', value: 'tools' },
                  { title: 'Other', value: 'other' }
                ]
              }
            }),
            defineField({
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Skill Name',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'proficiency',
                      title: 'Proficiency Level',
                      type: 'number',
                      validation: Rule => Rule.required().min(1).max(5),
                      description: 'Proficiency level from 1-5 (1 = Beginner, 5 = Expert)'
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      description: 'Icon name from Lucide React or emoji'
                    }),
                    defineField({
                      name: 'color',
                      title: 'Color',
                      type: 'string',
                      description: 'Hex color code for the skill (e.g., #61DAFB for React)'
                    })
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'proficiency'
                    },
                    prepare({title, subtitle}) {
                      return {
                        title,
                        subtitle: `${subtitle}% proficiency`
                      }
                    }
                  }
                }
              ]
            })
          ],
          preview: {
            select: {
              title: 'category',
              skills: 'skills'
            },
            prepare({title, skills}) {
              const skillCount = skills ? skills.length : 0;
              return {
                title: title.charAt(0).toUpperCase() + title.slice(1),
                subtitle: `${skillCount} skills`
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Achievement Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2
            }),
            defineField({
              name: 'metric',
              title: 'Metric/Number',
              type: 'string',
              description: 'e.g., "50%", "100+", "$1M+"'
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Lucide React icon name or emoji'
            })
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'metric'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'personalInfo',
      title: 'Personal Information',
      type: 'object',
      fields: [
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'Current location (e.g., "Jakarta, Indonesia")'
        }),
        defineField({
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          description: 'e.g., "GMT+7"'
        }),
        defineField({
          name: 'languages',
          title: 'Languages',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'language',
                  title: 'Language',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'proficiency',
                  title: 'Proficiency',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Native', value: 'native' },
                      { title: 'Fluent', value: 'fluent' },
                      { title: 'Intermediate', value: 'intermediate' },
                      { title: 'Basic', value: 'basic' }
                    ]
                  }
                })
              ],
              preview: {
                select: {
                  title: 'language',
                  subtitle: 'proficiency'
                }
              }
            }
          ]
        }),
        defineField({
          name: 'yearsOfExperience',
          title: 'Years of Experience',
          type: 'number',
          validation: Rule => Rule.min(0)
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'introduction'
    }
  }
})