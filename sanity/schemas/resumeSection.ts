import {defineField, defineType} from 'sanity'

export const resumeSection = defineType({
  name: 'resumeSection',
  title: 'Resume/Experience Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Experience'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional subtitle for the experience section'
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      description: 'Upload your resume PDF for download'
    }),
    defineField({
      name: 'downloadButtonText',
      title: 'Download Button Text',
      type: 'string',
      initialValue: 'Download Full Résumé (PDF)',
      description: 'Text for the resume download button'
    }),
    defineField({
      name: 'experienceEntries',
      title: 'Experience Entries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'jobTitle',
              title: 'Job Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'company',
              title: 'Company Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'companyUrl',
              title: 'Company Website',
              type: 'url',
              description: 'Optional link to company website'
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'e.g., "Remote" or "Jakarta, Indonesia"'
            }),
            defineField({
              name: 'employmentType',
              title: 'Employment Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Full-time', value: 'full-time' },
                  { title: 'Part-time', value: 'part-time' },
                  { title: 'Contract', value: 'contract' },
                  { title: 'Freelance', value: 'freelance' },
                  { title: 'Internship', value: 'internship' }
                ]
              }
            }),
            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'date',
              description: 'Leave empty if current position'
            }),
            defineField({
              name: 'isCurrent',
              title: 'Current Position',
              type: 'boolean',
              initialValue: false
            }),
            defineField({
              name: 'description',
              title: 'Job Description',
              type: 'text',
              rows: 4,
              description: 'Brief overview of the role and responsibilities'
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
                      name: 'achievement',
                      title: 'Achievement',
                      type: 'text',
                      rows: 2,
                      validation: Rule => Rule.required(),
                      description: 'Start with action verbs (Built, Optimized, Led, etc.)'
                    }),
                    defineField({
                      name: 'metric',
                      title: 'Metric/Impact',
                      type: 'string',
                      description: 'Quantifiable result (e.g., "50% improvement", "$1M revenue")'
                    }),
                    defineField({
                      name: 'technologies',
                      title: 'Technologies Used',
                      type: 'array',
                      of: [{ type: 'string' }],
                      description: 'Technologies/tools used for this achievement'
                    })
                  ],
                  preview: {
                    select: {
                      title: 'achievement',
                      subtitle: 'metric'
                    }
                  }
                }
              ]
            }),
            defineField({
              name: 'technologies',
              title: 'Technologies Used',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Main technologies used in this role'
            }),
            defineField({
              name: 'companyLogo',
              title: 'Company Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Optional company logo'
            }),
            defineField({
              name: 'isHighlighted',
              title: 'Highlight This Experience',
              type: 'boolean',
              initialValue: false,
              description: 'Mark as featured/important experience'
            })
          ],
          preview: {
            select: {
              title: 'jobTitle',
              subtitle: 'company',
              startDate: 'startDate',
              endDate: 'endDate',
              isCurrent: 'isCurrent'
            },
            prepare({title, subtitle, startDate, endDate, isCurrent}) {
              const start = startDate ? new Date(startDate).getFullYear() : '';
              const end = isCurrent ? 'Present' : (endDate ? new Date(endDate).getFullYear() : '');
              const dateRange = start && end ? ` (${start} - ${end})` : '';
              
              return {
                title: `${title} @ ${subtitle}`,
                subtitle: dateRange
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'degree',
              title: 'Degree',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'field',
              title: 'Field of Study',
              type: 'string'
            }),
            defineField({
              name: 'institution',
              title: 'Institution',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string'
            }),
            defineField({
              name: 'startYear',
              title: 'Start Year',
              type: 'number'
            }),
            defineField({
              name: 'endYear',
              title: 'End Year',
              type: 'number'
            }),
            defineField({
              name: 'gpa',
              title: 'GPA',
              type: 'string',
              description: 'Optional GPA or academic achievement'
            }),
            defineField({
              name: 'achievements',
              title: 'Academic Achievements',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Honors, awards, relevant coursework, etc.'
            })
          ],
          preview: {
            select: {
              title: 'degree',
              subtitle: 'institution',
              endYear: 'endYear'
            },
            prepare({title, subtitle, endYear}) {
              const year = endYear ? ` (${endYear})` : '';
              return {
                title: `${title}${year}`,
                subtitle
              }
            }
          }
        }
      ]
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
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'issuer',
              title: 'Issuing Organization',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'date',
              title: 'Date Obtained',
              type: 'date'
            }),
            defineField({
              name: 'expiryDate',
              title: 'Expiry Date',
              type: 'date',
              description: 'Leave empty if certification doesn\'t expire'
            }),
            defineField({
              name: 'credentialId',
              title: 'Credential ID',
              type: 'string'
            }),
            defineField({
              name: 'url',
              title: 'Certificate URL',
              type: 'url',
              description: 'Link to verify the certification'
            }),
            defineField({
              name: 'logo',
              title: 'Certification Logo',
              type: 'image',
              options: {
                hotspot: true,
              }
            })
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'issuer',
              date: 'date'
            },
            prepare({title, subtitle, date}) {
              const year = date ? ` (${new Date(date).getFullYear()})` : '';
              return {
                title: `${title}${year}`,
                subtitle
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      experienceEntries: 'experienceEntries'
    },
    prepare({title, experienceEntries}) {
      const entryCount = experienceEntries ? experienceEntries.length : 0;
      return {
        title,
        subtitle: `${entryCount} experience entries`
      }
    }
  }
})