import { defineField, defineType } from 'sanity';

export const resourceListingSection = defineType({
  name: 'resourceListingSection',
  title: 'Free Tools & Downloads Section',
  type: 'object',
  fields: [
    defineField({
      name: 'hidden',
      title: 'Hide Section on Live Site',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Working Artifacts & Diagnostics',
    }),
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Diagnostic tools you can use this afternoon.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Free frameworks, scorecards, and teardowns designed to pinpoint narrative gaps and messaging bloat.',
    }),
    defineField({
      name: 'selectionMode',
      title: 'Resources Selection',
      type: 'string',
      options: {
        list: [
          { title: 'Show All Published Resources Automatically', value: 'all' },
          { title: 'Manually Select & Order Specific Tools', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'selectedResources',
      title: 'Selected Tools / Downloads (if Manual)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'resourceItem' }] }],
      hidden: ({ parent }) => parent?.selectionMode !== 'manual',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare({ title, eyebrow }) {
      return {
        title: title || 'Free Tools Listing',
        subtitle: eyebrow || 'Resource Items',
      };
    },
  },
});
