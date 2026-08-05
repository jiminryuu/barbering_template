import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Before & After Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{type: 'siteSettings'}],
      description: 'Optional during migration. Assign this gallery item to a site.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
