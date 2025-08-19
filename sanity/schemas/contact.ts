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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'message',
    },
    prepare({title, subtitle, description}) {
      const truncatedMessage = description ? description.substring(0, 60) + '...' : 'No message';
      return {
        title: `${title}`,
        subtitle: `${subtitle} - ${truncatedMessage}`,
      }
    },
  },
})