import { defineField, defineType } from 'sanity';

export const closingCtaSection = defineType({
  name: 'closingCtaSection',
  title: 'Closing Call to Action Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'CTA Headline',
      type: 'string',
      initialValue: "Let's find the one thing you need to say.",
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
      rows: 3,
      initialValue: 'Twenty minutes. I will tell you what I see and where the gap is. No pitch deck, no proposal unless you ask for one.',
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Button Text',
      type: 'string',
      initialValue: 'Book a 20-minute gap check',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Button Text',
      type: 'string',
      initialValue: 'Tell me what feels heavy',
    }),
    defineField({
      name: 'authorPhoto',
      title: 'Presenter / Author Photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'authorPhoto',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Closing CTA',
        subtitle: 'Final page conversion banner',
        media,
      };
    },
  },
});
