import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content & Bio', default: true },
    { name: 'principles', title: 'Principles' },
    { name: 'sections', title: 'Additional Sections' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      initialValue: 'About Page',
      group: 'content',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'About GLS & Sheri Otto',
      group: 'content',
    }),
    defineField({
      name: 'headlineQuote',
      title: 'Featured Headline Quote',
      type: 'text',
      rows: 3,
      initialValue: '“I work with people who are great at what they do. My job is making sure the right people know it..”',
      group: 'content',
    }),
    defineField({
      name: 'bioLead',
      title: 'Bio Lead Paragraph',
      type: 'text',
      rows: 3,
      initialValue: 'I am Sheri Otto. I run positioning, executive narrative, and demand architecture for founders, operators, and in-house marketing leaders.',
      group: 'content',
    }),
    defineField({
      name: 'bioParagraphs',
      title: 'Bio & Background Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      group: 'content',
    }),
    defineField({
      name: 'bioImage',
      title: 'Sheri Photo',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),

    // Principles
    defineField({
      name: 'principlesTitle',
      title: 'Principles Section Title',
      type: 'string',
      initialValue: 'How I Think About This Work',
      group: 'principles',
    }),
    defineField({
      name: 'principles',
      title: 'Three Principles Cards',
      type: 'array',
      group: 'principles',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Number (e.g. 01)',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Principle Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'number',
            },
          },
        },
      ],
    }),

    // Optional Drag-and-Drop Sections
    defineField({
      name: 'sections',
      title: 'Extra Page Sections (Add / Reorder / Remove)',
      type: 'array',
      group: 'sections',
      of: [
        { type: 'metricsSection' },
        { type: 'clientStoriesSection' },
        { type: 'closingCtaSection' },
        { type: 'richTextSection' },
        { type: 'mediaCalloutSection' },
      ],
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      initialValue: 'About Sheri Otto & GLS. — Marketing Advisory',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue: 'Learn about Sheri Otto and the principles behind messaging that sounds like you.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      media: 'bioImage',
    },
  },
});
