import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'GLS. — Marketing for People Too Busy Doing the Work',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      initialValue: 'Content and messaging advisory for founders, operators, and in-house teams by Sheri Otto.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Social Share Image (OG Image)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'sheri@growthlanestrategies.com',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking Link / Cal.com URL',
      type: 'string',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn Profile URL',
      type: 'url',
      initialValue: 'https://linkedin.com/in/sheriotto',
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer Copyright / Tagline',
      type: 'string',
      initialValue: 'Growth Lane Strategies. Content and messaging advisory by Sheri Otto.',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'siteDescription',
    },
  },
});
