import { defineField, defineType } from 'sanity';

export const whoWeServeSection = defineType({
  name: 'whoWeServeSection',
  title: 'Who We Serve Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Who We Serve',
    }),
    defineField({
      name: 'audiences',
      title: 'Target Audiences Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow Tag (e.g. MARKETING TEAMS)',
              type: 'string',
            }),
            defineField({
              name: 'headline',
              title: 'Card Headline',
              type: 'string',
            }),
            defineField({
              name: 'paragraphs',
              title: 'Description Paragraphs',
              type: 'array',
              of: [{ type: 'text' }],
            }),
            defineField({
              name: 'buttonText',
              title: 'Link Text',
              type: 'string',
              initialValue: 'See how it works',
            }),
            defineField({
              name: 'buttonUrl',
              title: 'Link URL or Action',
              type: 'string',
              initialValue: '/case-studies',
            }),
          ],
          preview: {
            select: {
              title: 'headline',
              subtitle: 'eyebrow',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Who We Serve',
        subtitle: 'Target audience cards (Marketing Teams & Founders)',
      };
    },
  },
});
