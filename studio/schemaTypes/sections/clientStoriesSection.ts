import { defineField, defineType } from 'sanity';

export const clientStoriesSection = defineType({
  name: 'clientStoriesSection',
  title: 'Client Stories / Quotes Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Identifier / Title',
      type: 'string',
      initialValue: 'Client Stories & Proof Quotes',
    }),
    defineField({
      name: 'stories',
      title: 'Client Quotes & Stories',
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
              name: 'paragraph',
              title: 'Story Paragraph (Underneath Quote in Figtree Font)',
              type: 'text',
              rows: 3,
              description: 'Appears directly underneath the quote in Figtree grey font.',
            }),
            defineField({
              name: 'photo',
              title: 'Client / Work Photo',
              type: 'image',
              options: { hotspot: true },
              description: 'Image displayed on the right for Quote 1, or on the left for Quote 2.',
            }),
            defineField({
              name: 'photoTag',
              title: 'Photo Tag / Category Badge',
              type: 'string',
              description: 'e.g. Commercial Architecture & Building or Campus Enrollment & Growth',
            }),
            defineField({
              name: 'imagePlacement',
              title: 'Image Placement',
              type: 'string',
              options: {
                list: [
                  { title: 'Right side of quote', value: 'right' },
                  { title: 'Left side of page', value: 'left' },
                ],
                layout: 'radio',
              },
              initialValue: 'right',
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
              media: 'photo',
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
        title: 'Client Quotes & Stories Section',
        subtitle: `${stories?.length || 0} quotes configured`,
      };
    },
  },
});
