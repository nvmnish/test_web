import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content & Layout', default: true },
    { name: 'hero', title: 'Hero Banner' },
    { name: 'popup', title: 'Floating Tool Popup' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      initialValue: 'Homepage',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    // Hero Dedicated Customization
    defineField({
      name: 'heroHeadline',
      title: 'Hero Main Headline',
      type: 'string',
      initialValue: 'Marketing for people too busy doing the work.',
      group: 'hero',
      description: 'The large serif headline on the homepage hero.',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
      initialValue: 'I turn operating insight into market authority. You talk for 45 minutes; I build the narrative backbone, voice bank, and demand engine that puts you in front of the right buyers.',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Sheri / Presenter Cutout Photo',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      description: 'The photo of Sheri pointing or presenting.',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Texture / Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero Primary CTA Text',
      type: 'string',
      initialValue: 'Book a 20-min gap check',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero Secondary CTA Text',
      type: 'string',
      initialValue: 'Tell me what feels heavy',
      group: 'hero',
    }),

    // Floating Tool Popup on Homepage
    defineField({
      name: 'popupEnabled',
      title: 'Enable Bottom-Right Tool Popup',
      type: 'boolean',
      initialValue: true,
      group: 'popup',
    }),
    defineField({
      name: 'popupBadge',
      title: 'Popup Eyebrow Badge',
      type: 'string',
      initialValue: 'free tool',
      group: 'popup',
    }),
    defineField({
      name: 'popupHeadline',
      title: 'Popup Headline',
      type: 'string',
      initialValue: 'Are your B2B Emails Hit or Miss? Transform them in 3 seconds for free!',
      group: 'popup',
    }),
    defineField({
      name: 'popupButtonText',
      title: 'Popup Button Label',
      type: 'string',
      initialValue: 'fix my email',
      group: 'popup',
    }),

    // Flexible Elementor-like Page Builder Section List
    defineField({
      name: 'sections',
      title: 'Page Sections (Drag, Add, Reorder or Remove)',
      type: 'array',
      group: 'content',
      description: 'Rearrange, disable, or add subsections to customize the layout like a visual builder.',
      of: [
        { type: 'whoWeServeSection' },
        { type: 'clientStoriesSection' },
        { type: 'metricsSection' },
        { type: 'videoCarouselSection' },
        { type: 'pricingSection' },
        { type: 'comparisonSection' },
        { type: 'faqSection' },
        { type: 'closingCtaSection' },
        { type: 'richTextSection' },
        { type: 'mediaCalloutSection' },
        { type: 'popupToolSection' },
      ],
    }),


    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      initialValue: 'GLS. — Marketing for People Too Busy Doing the Work',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue: 'Content and messaging advisory for founders, operators, and in-house teams by Sheri Otto.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroHeadline',
      media: 'heroImage',
    },
  },
});
