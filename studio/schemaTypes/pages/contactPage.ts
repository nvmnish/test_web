import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header & Intro', default: true },
    { name: 'contactInfo', title: 'Contact Methods' },
    { name: 'sections', title: 'Extra Sections' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (Internal)',
      type: 'string',
      initialValue: 'Contact Page',
      group: 'header',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Get in touch',
      group: 'header',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: "Let's find the one thing you need to say.",
      group: 'header',
    }),
    defineField({
      name: 'description',
      title: 'Lead Description',
      type: 'text',
      rows: 3,
      initialValue: 'Whether you want to explore direct advisory, enroll your team in The Signal Room, or run a diagnostic on where your messaging stalls.',
      group: 'header',
    }),

    // Contact Methods
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'sheri@growthlanestrategies.com',
      group: 'contactInfo',
    }),
    defineField({
      name: 'location',
      title: 'Location Note',
      type: 'string',
      initialValue: 'Charlotte, North Carolina · Available Globally',
      group: 'contactInfo',
    }),
    defineField({
      name: 'bookingCtaText',
      title: 'Booking Card CTA Text',
      type: 'string',
      initialValue: 'Book a 20-minute gap check',
      group: 'contactInfo',
    }),
    defineField({
      name: 'bookingDescription',
      title: 'Booking Card Description',
      type: 'text',
      rows: 2,
      initialValue: 'No deck, no hard sell. We identify where your message is losing signal and give you 2-3 specific adjustments.',
      group: 'contactInfo',
    }),

    // Extra sections
    defineField({
      name: 'sections',
      title: 'Extra Page Sections (Add / Reorder / Remove)',
      type: 'array',
      group: 'sections',
      of: [
        { type: 'faqSection' },
        { type: 'closingCtaSection' },
        { type: 'richTextSection' },
      ],
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      initialValue: 'Contact Sheri Otto & GLS. — Marketing Advisory',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      initialValue: 'Get in touch with Sheri Otto for content, positioning, and narrative advisory.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
    },
  },
});
