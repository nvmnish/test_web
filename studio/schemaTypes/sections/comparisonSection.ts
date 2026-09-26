import { defineField, defineType } from 'sanity';

export const comparisonSection = defineType({
  name: 'comparisonSection',
  title: 'Comparison / Us vs. Them Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: "Who we aren't",
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'rows',
      title: 'Comparison Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'dimension',
              title: 'Dimension / Category (e.g. OUTPUT, VOICE, RESULTS)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'gls',
              title: 'GLS Approach',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'others',
              title: 'Traditional Agency / Others Approach',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'dimension',
              subtitle: 'gls',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      rows: 'rows',
    },
    prepare({ title, rows }) {
      return {
        title: title || "Who We Aren't",
        subtitle: `${rows?.length || 0} comparison rows`,
      };
    },
  },
});
