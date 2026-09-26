import { defineField, defineType } from 'sanity';

export const caseStudiesPage = defineType({
  name: 'caseStudiesPage',
  title: 'Proof & Case Studies Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header & Intro', default: true },
    { name: 'studies', title: 'Case Studies' },
    { name: 'sections', title: 'Extra Sections' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      initialValue: 'Proof & Case Studies',
      group: 'header',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Client Proof & Case Studies',
      group: 'header',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'What happens when expertise gets seen',
      group: 'header',
    }),
    defineField({
      name: 'description',
      title: 'Lead Description',
      type: 'text',
      rows: 3,
      initialValue: 'Real numbers from founders, builders, and marketing leaders who stopped hiding behind delivery and let their perspective compound in public.',
      group: 'header',
    }),

    // Ordered references or inline case studies
    defineField({
      name: 'featuredStudies',
      title: 'Case Studies Selection & Order',
      type: 'array',
      group: 'studies',
      description: 'Pick and order case studies shown on this page.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
    }),

    // Additional sections
    defineField({
      name: 'sections',
      title: 'Extra Page Sections (Add / Reorder / Remove)',
      type: 'array',
      group: 'sections',
      of: [
        { type: 'metricsSection' },
        { type: 'proofCtaSection' },
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
      initialValue: 'Case Studies & Proof — GLS.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue: 'Explore how Sheri Otto helps founders and operators turn operating insight into market authority.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
    },
  },
});
