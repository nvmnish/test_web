import { defineField, defineType } from 'sanity';

export const resourceItem = defineType({
  name: 'resourceItem',
  title: 'Free Resource / Tool',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Diagnostic Assessment, Framework & Prompts, Spreadsheet Calculator, Editorial Guide',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deliverable',
      title: 'Deliverable Note',
      type: 'string',
      description: 'e.g. PDF Guide + Notion Interview Template',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Download framework',
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Interactive Audit Modal', value: 'audit' },
          { title: 'Download / Link', value: 'download' },
        ],
      },
      initialValue: 'download',
    }),
    defineField({
      name: 'downloadFile',
      title: 'Upload File (PDF / Sheet)',
      type: 'file',
      hidden: ({ parent }) => parent?.type === 'audit',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Link URL (Optional)',
      type: 'url',
      hidden: ({ parent }) => parent?.type === 'audit',
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
      title: 'title',
      subtitle: 'category',
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
