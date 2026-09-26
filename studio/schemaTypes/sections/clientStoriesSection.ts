import { defineField, defineType } from 'sanity';

export const clientStoriesSection = defineType({
  name: 'clientStoriesSection',
  title: 'Client Stories Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Identifier / Title',
      type: 'string',
      initialValue: 'Client Stories',
    }),
    defineField({
      name: 'stories',
      title: 'Client Stories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow',
              type: 'string',
              initialValue: 'Client Story',
            }),
            defineField({
              name: 'quote',
              title: 'Featured Quote',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'clientName',
              title: 'Client Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'timeframe',
              title: 'Timeframe / Subtitle',
              type: 'string',
              initialValue: 'Three months into working together',
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
              rows: 3,
            }),
            defineField({
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
              initialValue: 'See how content can compound for you',
            }),
          ],
          preview: {
            select: {
              title: 'clientName',
              subtitle: 'quote',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      stories: 'stories',
    },
    prepare({ stories }) {
      return {
        title: 'Client Stories Section',
        subtitle: `${stories?.length || 0} stories configured`,
      };
    },
  },
});
