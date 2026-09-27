import { defineField, defineType } from 'sanity';

export const blogListingSection = defineType({
  name: 'blogListingSection',
  title: 'Blog / Field Notes Listing Section',
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
      initialValue: 'Field Notes & Essays',
    }),
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Ideas on positioning, market signal, and doing the work.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Observations on B2B demand, executive thought leadership, and making your expertise visible.',
    }),
    defineField({
      name: 'postSelectionMode',
      title: 'Posts Selection',
      type: 'string',
      options: {
        list: [
          { title: 'Show Latest Posts Automatically', value: 'latest' },
          { title: 'Manually Select Specific Posts', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'limit',
      title: 'Number of Posts to Display (if Latest)',
      type: 'number',
      initialValue: 3,
    }),
    defineField({
      name: 'selectedPosts',
      title: 'Selected Blog Posts (if Manual)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      hidden: ({ parent }) => parent?.postSelectionMode !== 'manual',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare({ title, eyebrow }) {
      return {
        title: title || 'Blog Listing Section',
        subtitle: eyebrow || 'Field Notes',
      };
    },
  },
});
