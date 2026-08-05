import {defineArrayMember, defineField, defineType} from 'sanity'

const colorRule = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

const paletteFields = [
  defineField({
    name: 'background',
    title: 'Background',
    type: 'string',
    validation: (Rule) => Rule.required().regex(colorRule),
  }),
  defineField({
    name: 'surface',
    title: 'Surface',
    type: 'string',
    validation: (Rule) => Rule.required().regex(colorRule),
  }),
  defineField({
    name: 'text',
    title: 'Text',
    type: 'string',
    validation: (Rule) => Rule.required().regex(colorRule),
  }),
  defineField({
    name: 'muted',
    title: 'Muted Text',
    type: 'string',
    validation: (Rule) => Rule.required().regex(colorRule),
  }),
  defineField({
    name: 'accent',
    title: 'Accent',
    type: 'string',
    validation: (Rule) => Rule.required().regex(colorRule),
  }),
  defineField({
    name: 'border',
    title: 'Border',
    type: 'string',
    validation: (Rule) => Rule.required().regex(colorRule),
  }),
]

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Barber.Co',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'string',
      initialValue: 'https://example.com',
    }),
    defineField({
      name: 'colorStyle',
      title: 'Color Style',
      type: 'string',
      description:
        'Preset palettes: Professional, Beauty, Coastal, and more. Use Custom to manually edit light and dark tokens.',
      options: {
        list: [
          {title: 'Custom', value: 'custom'},
          {title: 'Professional', value: 'professional'},
          {title: 'Beauty', value: 'beauty'},
          {title: 'Coastal', value: 'coastal'},
          {title: 'Luxury / High-End', value: 'luxury'},
          {title: 'Modern / Instagram', value: 'modern'},
          {title: 'Clean Clinical', value: 'clinical'},
          {title: 'Bold & Creative', value: 'creative'},
          {title: 'Rustic Brown', value: 'rustic'},
        ],
      },
      initialValue: 'custom',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'themeMode',
      title: 'Theme Mode',
      type: 'string',
      description: 'Choose between Light and Dark mode for the site.',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
      },
      initialValue: 'dark',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fontPreset',
      title: 'Font Preset',
      type: 'string',
      options: {
        list: [
          {title: 'Classic', value: 'classic'},
          {title: 'Editorial', value: 'editorial'},
          {title: 'Bold', value: 'bold'},
          {title: 'Modern', value: 'modern'},
          {title: 'Refined', value: 'refined'},
          {title: 'Friendly', value: 'friendly'},
          {title: 'Minimal', value: 'minimal'},
          {title: 'Luxury', value: 'luxury'},
          {title: 'Energetic', value: 'energetic'},
          {title: 'Salon', value: 'salon'},
        ],
      },
      initialValue: 'salon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      initialValue: [
        {label: 'Reviews', href: '#reviews'},
        {label: 'Services', href: '#services'},
        {label: 'Results', href: '#gallery'},
        {label: 'Lookbook', href: '#lookbook-360'},
        {label: 'Quiz', href: '#quiz'},
        {label: 'About', href: '#about'},
        {label: 'Book', href: '#book'},
      ],
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Content',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Family-Friendly Hair and Beauty Experience',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Cima',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Hair Salon',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
          initialValue:
            'From kids cuts to full transformations, your style is handled with care by {barberName}.',
        }),
        defineField({
          name: 'image',
          title: 'Hero Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      initialValue: [{label: 'Instagram'}, {label: 'Facebook'}, {label: 'TikTok'}],
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'socialProof',
      title: 'Social Proof',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Reviews',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Trusted by Local Families',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'rating',
          title: 'Average Rating',
          type: 'number',
          initialValue: 4.9,
          validation: (Rule) => Rule.required().min(0).max(5),
        }),
        defineField({
          name: 'reviewCount',
          title: 'Review Count',
          type: 'number',
          initialValue: 214,
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: 'profileUrl',
          title: 'Google Profile URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Our Team',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'A Salon Built Around Real People',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          initialValue:
            'We focus on welcoming service, honest recommendations, and quality results for every age.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'bookingCta',
      title: 'Booking CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Ready for Your Appointment?',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Book Your Visit in Under a Minute',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue:
            'Choose a service, pick a time, and let our team take care of the rest.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaLabel',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Book Now',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      fields: [
        defineField({
          name: 'locationLabel',
          title: 'Location Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Location',
        }),
        defineField({
          name: 'locationText',
          title: 'Location Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: '123 Grooming St, Style City',
        }),
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: '(c) 2026 Barber.Co. Built with Next.js and Sanity.',
        }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'object',
      initialValue: {
        defaultMode: 'dark',
        light: {
          background: '#f4f1ea',
          surface: '#ffffff',
          text: '#151515',
          muted: '#5f5b54',
          accent: '#1f6feb',
          border: '#d7d1c6',
        },
        dark: {
          background: '#050505',
          surface: '#0d0d0d',
          text: '#f5f5f5',
          muted: '#9a9a9a',
          accent: '#3b82f6',
          border: '#1f1f1f',
        },
      },
      fields: [
        defineField({
          name: 'defaultMode',
          title: 'Default Mode',
          type: 'string',
          options: {
            list: [
              {title: 'Dark', value: 'dark'},
              {title: 'Light', value: 'light'},
            ],
          },
          initialValue: 'dark',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'light',
          title: 'Light Palette',
          type: 'object',
          fields: paletteFields,
        }),
        defineField({
          name: 'dark',
          title: 'Dark Palette',
          type: 'object',
          fields: paletteFields,
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Site Settings',
      subtitle: 'Singleton document',
    }),
  },
})
