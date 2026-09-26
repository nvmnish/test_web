import { defineField, defineType } from 'sanity';

export const freeToolsPage = defineType({
  name: 'freeToolsPage',
  title: 'Free Tools & Resources Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header & Intro', default: true },
    { name: 'tools', title: 'Tools & Downloads' },
    { name: 'sections', title: 'Extra Sections' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      initialValue: 'Free Tools & Resources',
      group: 'header',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Free Tools & Diagnostics',
      group: 'header',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Where does your message stall?',
      group: 'header',
    }),
    defineField({
      name: 'description',
      title: 'Lead Description',
      type: 'text',
      rows: 3,
      initialValue: 'Four diagnostic tools and frameworks we use with founders to identify voice leaks, approval friction, and market silence before building a strategy.',
      group: 'header',
    }),

    // Tools list
    defineField({
      name: 'featuredTools',
      title: 'Tools & Resources Selection',
      type: 'array',
      group: 'tools',
      of: [
        {
          type: 'reference',
          to: [{ type: 'resourceItem' }],
        },
      ],
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
        { type: 'mediaCalloutSection' },
      ],
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      initialValue: 'Free Marketing Tools & Diagnostics — GLS.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue: 'Free diagnostics, scorecards, and extraction frameworks for founders and marketing leaders.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
    },
  },
});
