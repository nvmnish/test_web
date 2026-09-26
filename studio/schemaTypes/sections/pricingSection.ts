import { defineField, defineType } from 'sanity';

export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Pricing',
    }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Tier Identifier',
              type: 'string',
              description: 'e.g. work-with-me-directly or the-signal-room',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Tier Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle / Summary (e.g. Ongoing. Starts at $4,000 a month)',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price Display',
              type: 'string',
              initialValue: '$4,000',
            }),
            defineField({
              name: 'cadence',
              title: 'Billing Cadence',
              type: 'string',
              initialValue: '/ month',
            }),
            defineField({
              name: 'description',
              title: 'Tier Lead Description',
              type: 'string',
            }),
            defineField({
              name: 'featureHeader',
              title: 'Feature List Header',
              type: 'string',
              initialValue: 'Every month:',
            }),
            defineField({
              name: 'features',
              title: 'Feature Bullets',
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
              title: 'Ideal For Statement',
              type: 'string',
            }),
            defineField({
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'price',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tiers: 'tiers',
    },
    prepare({ title, tiers }) {
      return {
        title: title || 'Pricing',
        subtitle: `${tiers?.length || 0} pricing tiers`,
      };
    },
  },
});
