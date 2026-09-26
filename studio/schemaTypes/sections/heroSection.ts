import { defineField, defineType } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main display title (e.g. Marketing for people too busy doing the work.)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline / Lead Paragraph',
      type: 'text',
      rows: 3,
      description: 'Introductory sentence explaining your core proposition.',
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Button Text',
      type: 'string',
      initialValue: 'Book a 20-min gap check',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Button Text',
      type: 'string',
      initialValue: 'Tell me what feels heavy',
    }),
    defineField({
      name: 'heroImage',
      title: 'Sheri / Presenter Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          initialValue: 'Sheri Otto pointing to metrics and strategy',
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image / Texture',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'includeMetricsCounter',
      title: 'Show Animated Casino Counter Bar',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'heroImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero Banner & Presenter',
        media,
      };
    },
  },
});
