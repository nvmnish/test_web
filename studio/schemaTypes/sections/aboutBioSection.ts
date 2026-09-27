import { defineField, defineType } from 'sanity';

export const aboutBioSection = defineType({
  name: 'aboutBioSection',
  title: 'About Bio & Principles Section',
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
      initialValue: 'About Sheri Otto',
    }),
    defineField({
      name: 'headlineQuote',
      title: 'Headline Quote',
      type: 'text',
      rows: 2,
      initialValue: '“I work with people who are great at what they do. My job is making sure the right people know it.”',
    }),
    defineField({
      name: 'bioImage',
      title: 'Presenter / Sheri Bio Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'Sheri Otto — Founder of GLS Advisory',
        }),
      ],
    }),
    defineField({
      name: 'bioLead',
      title: 'Bio Lead Paragraph (Large text)',
      type: 'text',
      rows: 2,
      initialValue: 'Most marketing fails because the people writing it have never done the work they are trying to explain.',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Narrative Story Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    }),
    defineField({
      name: 'principlesTitle',
      title: 'Principles Section Title',
      type: 'string',
      initialValue: 'Three things I believe',
    }),
    defineField({
      name: 'principles',
      title: 'Core Working Principles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number / Identifier', type: 'string' }),
            defineField({ name: 'title', title: 'Principle Title', type: 'string' }),
            defineField({ name: 'description', title: 'Principle Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'Bottom CTA Button Text',
      type: 'string',
      initialValue: 'Book a 20-minute gap check',
    }),
  ],
  preview: {
    select: {
      title: 'eyebrow',
      subtitle: 'headlineQuote',
      media: 'bioImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'About Bio Section',
        subtitle: subtitle || 'Bio & Principles',
        media,
      };
    },
  },
});
