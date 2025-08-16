import {defineField, defineType} from 'sanity'

export const skillsSection = defineType({
  name: 'skillsSection',
  title: 'Skills Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Skills & Technologies'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional subtitle or description for the skills section'
    }),
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: '3D Rotating Cube', value: '3d-cube' },
          { title: 'Progress Bars', value: 'progress-bars' },
          { title: 'Skill Cards', value: 'skill-cards' },
          { title: 'Tag Cloud', value: 'tag-cloud' },
          { title: 'Category Grid', value: 'category-grid' }
        ]
      },
      initialValue: 'skill-cards',
      description: 'How the skills should be displayed'
    }),
    defineField({
      name: 'skillGroups',
      title: 'Skill Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'groupName',
              title: 'Group Name',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., Frontend, Backend, DevOps'
            }),
            defineField({
              name: 'groupColor',
              title: 'Group Color',
              type: 'string',
              description: 'Hex color code for this skill group'
            }),
            defineField({
              name: 'groupIcon',
              title: 'Group Icon',
              type: 'string',
              description: 'Icon name or emoji for this group'
            }),
            defineField({
              name: 'isCore',
              title: 'Core Skill Group',
              type: 'boolean',
              initialValue: false,
              description: 'Mark as core/primary skill group for highlighting'
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
                      validation: Rule => Rule.required().min(1).max(100),
                      description: 'Skill level from 1-100'
                    }),
                    defineField({
                      name: 'experienceYears',
                      title: 'Years of Experience',
                      type: 'number',
                      validation: Rule => Rule.min(0),
                      description: 'Years working with this technology'
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Skill Icon',
                      type: 'string',
                      description: 'Icon name, emoji, or SVG for this skill'
                    }),
                    defineField({
                      name: 'color',
                      title: 'Skill Color',
                      type: 'string',
                      description: 'Brand color for this technology (e.g., #61DAFB for React)'
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 2,
                      description: 'Brief description of expertise with this skill'
                    }),
                    defineField({
                      name: 'projects',
                      title: 'Related Projects Count',
                      type: 'number',
                      description: 'Number of projects using this skill'
                    }),
                    defineField({
                      name: 'isHighlighted',
                      title: 'Highlight This Skill',
                      type: 'boolean',
                      initialValue: false,
                      description: 'Mark as a highlighted/featured skill'
                    }),
                    defineField({
                      name: 'certifications',
                      title: 'Certifications',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'name',
                              title: 'Certification Name',
                              type: 'string'
                            }),
                            defineField({
                              name: 'issuer',
                              title: 'Issuing Organization',
                              type: 'string'
                            }),
                            defineField({
                              name: 'url',
                              title: 'Certificate URL',
                              type: 'url'
                            }),
                            defineField({
                              name: 'date',
                              title: 'Date Obtained',
                              type: 'date'
                            })
                          ]
                        }
                      ]
                    })
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'proficiency',
                      media: 'icon'
                    },
                    prepare({title, subtitle}) {
                      return {
                        title,
                        subtitle: `${subtitle}% proficiency`,
                        media: undefined
                      }
                    }
                  }
                }
              ]
            })
          ],
          preview: {
            select: {
              title: 'groupName',
              skills: 'skills',
              isCore: 'isCore'
            },
            prepare({title, skills, isCore}) {
              const skillCount = skills ? skills.length : 0;
              const coreLabel = isCore ? ' (Core)' : '';
              return {
                title: `${title}${coreLabel}`,
                subtitle: `${skillCount} skills`
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'object',
      fields: [
        defineField({
          name: 'learningGoals',
          title: 'Currently Learning',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'skill',
                  title: 'Skill/Technology',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'progress',
                  title: 'Learning Progress',
                  type: 'number',
                  validation: Rule => Rule.min(0).max(100),
                  description: 'Learning progress from 0-100'
                }),
                defineField({
                  name: 'expectedCompletion',
                  title: 'Expected Completion',
                  type: 'date'
                })
              ]
            }
          ]
        }),
        defineField({
          name: 'preferences',
          title: 'Tech Preferences',
          type: 'object',
          fields: [
            defineField({
              name: 'favoriteStack',
              title: 'Favorite Tech Stack',
              type: 'string',
              description: 'Your go-to technology stack'
            }),
            defineField({
              name: 'preferredTools',
              title: 'Preferred Development Tools',
              type: 'array',
              of: [{ type: 'string' }]
            }),
            defineField({
              name: 'workingStyle',
              title: 'Working Style Notes',
              type: 'text',
              rows: 3,
              description: 'Notes about your development approach and preferences'
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      skillGroups: 'skillGroups'
    },
    prepare({title, skillGroups}) {
      const groupCount = skillGroups ? skillGroups.length : 0;
      return {
        title,
        subtitle: `${groupCount} skill groups`
      }
    }
  }
})