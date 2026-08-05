import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{type: 'siteSettings'}],
      description: 'Optional during migration. Assign this service to a site.',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
