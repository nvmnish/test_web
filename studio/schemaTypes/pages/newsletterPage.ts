import { defineField, defineType } from 'sanity';

export const newsletterPage = defineType({
  name: 'newsletterPage',
  title: 'Newsletter Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header & Form', default: true },
    { name: 'benefits', title: 'Benefits & Bullets' },
    { name: 'archive', title: 'Recent Editions' },
    { name: 'sections', title: 'Extra Sections' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      initialValue: 'Newsletter Page',
      group: 'header',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'The Weekly Signal',
      group: 'header',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'One message breakdown every Thursday morning.',
      group: 'header',
    }),
    defineField({
      name: 'description',
      title: 'Lead Description',
      type: 'text',
      rows: 3,
      initialValue: 'How founders turn raw operating knowledge into market authority. No fluff, no ChatGPT templates, no motivational quotes. Just real client teardowns and tactical positioning adjustments.',
      group: 'header',
    }),
    defineField({
      name: 'buttonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Get The Signal',
      group: 'header',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Privacy / Spam Disclaimer',
      type: 'string',
      initialValue: 'Sent to 1,200+ founders & operators. No spam, ever. Unsubscribe in one click.',
      group: 'header',
    }),

    // Benefits bullets
    defineField({
      name: 'benefits',
      title: 'What to Expect Bullets',
      type: 'array',
      group: 'benefits',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Bullet Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
        },
      ],
    }),

    // Recent editions / topics
    defineField({
      name: 'recentEditions',
      title: 'Past Editions Preview',
      type: 'array',
      group: 'archive',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'issue', title: 'Issue Number / Label', type: 'string' }),
            defineField({ name: 'title', title: 'Edition Title', type: 'string' }),
            defineField({ name: 'date', title: 'Sent Date', type: 'string' }),
            defineField({ name: 'snippet', title: 'Snippet', type: 'text', rows: 2 }),
          ],
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
      ],
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      initialValue: 'The Weekly Signal Newsletter — GLS.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue: 'Weekly message breakdowns and executive positioning notes by Sheri Otto.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
    },
  },
});
