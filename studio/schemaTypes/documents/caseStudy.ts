import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study / Proof Story',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'client',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'role',
      title: 'Role & Organization',
      type: 'string',
      description: 'e.g. Managing Principal & Founder or Head of School',
    }),
    defineField({
      name: 'industry',
      title: 'Industry / Location',
      type: 'string',
      description: 'e.g. Commercial Construction & Architecture',
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe Badge',
      type: 'string',
      initialValue: '3 Months In',
    }),
    defineField({
      name: 'headline',
      title: 'Result Headline',
      type: 'string',
    }),
    defineField({
      name: 'statNumber',
      title: 'Stat Callout (e.g. 3x, 2x, 26%)',
      type: 'string',
    }),
    defineField({
      name: 'statLabel',
      title: 'Stat Label (e.g. Commercial Projects Originated)',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Primary Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'approach',
      title: 'The Approach',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'outcome',
      title: 'The Outcome',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Narrative Story Paragraphs (For detailed stories like Candice/Diane)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'quotes',
      title: 'Additional Quotes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'clientPhoto',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
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
      title: 'client',
      subtitle: 'role',
      media: 'clientPhoto',
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
