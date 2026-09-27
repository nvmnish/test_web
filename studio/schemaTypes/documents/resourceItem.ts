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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / Graphic Asset',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Preview image for the resource card and detail page.',
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
      name: 'photoTagText',
      title: 'Green Tag Text on Photo',
      type: 'string',
      initialValue: 'Format: Instant Download & Templates',
      description: 'Customizable badge text displayed over the preview photo.',
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
      name: 'featureList',
      title: "What's Included List Items",
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'reviews',
      title: 'User Reviews & Stars',
      type: 'array',
      description: 'Stars, quote in Figtree, and author name for this tool.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'filledStars',
              title: 'Number of Filled Stars (1 to 5)',
              type: 'number',
              initialValue: 5,
              validation: (Rule) => Rule.min(1).max(5),
            }),
            defineField({
              name: 'quote',
              title: 'Review Quote (in Figtree font)',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Reviewer Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Reviewer Role / Company (Optional)',
              type: 'string',
            }),
          ],
        },
      ],
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
