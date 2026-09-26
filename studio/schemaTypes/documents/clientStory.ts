import { defineField, defineType } from 'sanity';

export const clientStory = defineType({
  name: 'clientStory',
  title: 'Client Story (Home Feature)',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name (e.g. Shelia)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe Badge',
      type: 'string',
      initialValue: 'Three months into working together',
    }),
    defineField({
      name: 'quote',
      title: 'Display Quote',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storyLead',
      title: 'Story Lead Paragraph',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'storyBody',
      title: 'Story Details Paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'See how content can compound for you',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Link or Modal',
      type: 'string',
      initialValue: '#booking',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'quote',
    },
  },
  orderings: [
    {
      title: 'Display Order, Ascending',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
