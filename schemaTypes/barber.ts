import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'barber',
  title: 'Barber',
  type: 'document',
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{type: 'siteSettings'}],
      description: 'Optional during migration. Assign this barber profile to a site.',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
