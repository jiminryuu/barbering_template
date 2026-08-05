import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'lookbook',
  title: 'Lookbook (Styles)',
  type: 'document',
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{type: 'siteSettings'}],
      description: 'Optional during migration. Assign this style to a site.',
    }),
    defineField({
      name: 'styleName',
      title: 'Style Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'gender',
      title: 'Hair Option / Gender',
      type: 'string',
      options: {
        list: [
          {title: 'Masculine', value: 'masculine'},
          {title: 'Feminine', value: 'feminine'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'masculine',
    }),
    defineField({
      name: 'images',
      title: '360 View Images',
      description: 'Upload multiple images from different angles for the 360 viewer',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'isDefault',
      title: 'Is Default/Signature Style?',
      description: 'This style will be shown if no other matches are found in the quiz',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
