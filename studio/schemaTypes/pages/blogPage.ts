import { defineField, defineType } from 'sanity';

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog / Field Notes Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header & Intro', default: true },
    { name: 'featured', title: 'Featured Post' },
    { name: 'sections', title: 'Extra Sections' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      initialValue: 'Blog Page',
      group: 'header',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Field Notes & Essays',
      group: 'header',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Writing about the work',
      group: 'header',
    }),
    defineField({
      name: 'description',
      title: 'Lead Description',
      type: 'text',
      rows: 3,
      initialValue: 'Essays on positioning, founder-led messaging, demand architecture, and why so much B2B content gets shipped and forgotten.',
      group: 'header',
    }),

    // Featured post pin
    defineField({
      name: 'featuredPost',
      title: 'Featured Hero Article',
      type: 'reference',
      to: [{ type: 'blogPost' }],
      group: 'featured',
      description: 'Pin a specific article to the prominent hero slot.',
    }),

    // Extra sections
    defineField({
      name: 'sections',
      title: 'Extra Page Sections (Add / Reorder / Remove)',
      type: 'array',
      group: 'sections',
      of: [
        { type: 'closingCtaSection' },
        { type: 'faqSection' },
        { type: 'richTextSection' },
      ],
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      initialValue: 'Field Notes & Essays — GLS.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue: 'Essays on executive positioning, B2B messaging, and demand architecture by Sheri Otto.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
    },
  },
});
