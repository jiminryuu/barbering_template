import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'quiz',
  title: 'Style Quiz',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Quiz Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Main Style Quiz',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{type: 'siteSettings'}],
      description: 'Optional: Assign this quiz to a site.',
    }),
    defineField({
      name: 'startingQuestionId',
      title: 'Starting Question ID',
      type: 'string',
      description: 'The ID of the first question to show (e.g., "length")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'question',
          fields: [
            defineField({
              name: 'id',
              title: 'Question ID',
              type: 'string',
              description: 'Unique identifier for this question (e.g., "length")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'questionText',
              title: 'Question Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'option',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Tag Value',
                      type: 'string',
                      description: 'The tag value to filter styles by (e.g., "Short")',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'styleMatch',
                      title: 'Direct Style Match',
                      type: 'reference',
                      to: [{type: 'lookbook'}],
                      description: 'Optional: Directly link this option to a specific lookbook style.',
                    }),
                    defineField({
                      name: 'nextQuestionId',
                      title: 'Next Question ID',
                      type: 'string',
                      description: 'ID of the next question. Leave blank to end the quiz.',
                    }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'questionText',
              subtitle: 'id',
            },
          },
        }),
      ],
    }),
  ],
})
