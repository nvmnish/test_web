import { defineField, defineType } from 'sanity';

export const proofCtaSection = defineType({
  name: 'proofCtaSection',
  title: 'Proof & Cases CTA (Numbered Points)',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Ready to turn hard-won expertise into inbound pipeline?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'numberedPoints',
      title: 'Description (Numbered Points)',
      description: 'Add numbered points describing the process or outcomes.',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      initialValue: [
        'We audit your current positioning and identify where you lose high-value buyers in 20 minutes.',
        'We extract your lived client stories and build your proprietary voice bank without ghostwritten fluff.',
        'You spend 45 minutes bi-weekly; we ship 6 weeks of compounding authority content.',
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Book a gap call',
      description: 'Displays the single "Book a gap call" button.',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      points: 'numberedPoints',
    },
    prepare({ title, points }) {
      return {
        title: title || 'Proof & Cases CTA',
        subtitle: `${points?.length || 0} numbered points · "Book a gap call" button`,
      };
    },
  },
});
