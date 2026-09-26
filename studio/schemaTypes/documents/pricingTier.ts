import { defineField, defineType } from 'sanity';

export const pricingTier = defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Tier ID (e.g. work-with-me-directly or the-signal-room)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price Display (e.g. $4,000)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cadence',
      title: 'Cadence (e.g. / month)',
      type: 'string',
      initialValue: '/ month',
    }),
    defineField({
      name: 'description',
      title: 'Lead Description',
      type: 'string',
    }),
    defineField({
      name: 'featureHeader',
      title: 'Feature Header',
      type: 'string',
      initialValue: 'Every month:',
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer Callout Note',
      type: 'string',
    }),
    defineField({
      name: 'idealFor',
      title: 'Ideal For',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
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
      subtitle: 'price',
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
