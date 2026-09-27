import { defineField, defineType } from 'sanity';

const RESERVED_SLUGS = [
  'home',
  'about',
  'blog',
  'case-studies',
  'free-tools',
  'pricing',
  'booking',
  'contact',
  'newsletter',
  'api',
  'studio',
];

export const page = defineType({
  name: 'page',
  title: 'Custom Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal & Header)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (!slug?.current) return true;
          const clean = slug.current.toLowerCase().replace(/^\/+|\/+$/g, '');
          if (RESERVED_SLUGS.includes(clean)) {
            return `"${clean}" is a reserved core website route. Please choose a distinct URL slug (e.g. "landing/${clean}" or "special-${clean}").`;
          }
          return true;
        }),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share (OG) Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections (Add, Order, Duplicate, Hide or Remove)',
      type: 'array',
      description: 'Build your custom page layout using the site’s predefined section designs.',
      of: [
        { type: 'heroSection' },
        { type: 'whoWeServeSection' },
        { type: 'metricsSection' },
        { type: 'proofCtaSection' },
        { type: 'clientStoriesSection' },
        { type: 'videoCarouselSection' },
        { type: 'pricingSection' },
        { type: 'comparisonSection' },
        { type: 'faqSection' },
        { type: 'closingCtaSection' },
        { type: 'richTextSection' },
        { type: 'mediaCalloutSection' },
        { type: 'popupToolSection' },
        { type: 'blogListingSection' },
        { type: 'caseStudyGridSection' },
        { type: 'resourceListingSection' },
        { type: 'aboutBioSection' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `/${slug}` : 'No slug set',
      };
    },
  },
});
