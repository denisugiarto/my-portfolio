import {defineField, defineType} from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact Message',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Replied', value: 'replied'},
          {title: 'Closed', value: 'closed'},
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          {title: 'Low', value: 'low'},
          {title: 'Medium', value: 'medium'},
          {title: 'High', value: 'high'},
          {title: 'Urgent', value: 'urgent'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes (not visible to the client)',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: Rule => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'message',
      media: 'status',
    },
    prepare({title, subtitle, description, media}) {
      const truncatedMessage = description ? description.substring(0, 60) + '...' : 'No message';
      return {
        title: `${title}`,
        subtitle: `${subtitle} - ${truncatedMessage}`,
        media: undefined,
      }
    },
  },
  orderings: [
    {
      title: 'Submitted Date, New First',
      name: 'submittedAtDesc',
      by: [
        {field: 'submittedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Priority, High First',
      name: 'priorityDesc',
      by: [
        {field: 'priority', direction: 'desc'},
        {field: 'submittedAt', direction: 'desc'}
      ]
    },
  ],
})