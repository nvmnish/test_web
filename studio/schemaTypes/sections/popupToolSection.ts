import { defineField, defineType } from 'sanity';

export const popupToolSection = defineType({
  name: 'popupToolSection',
  title: 'Free Tool Floating Popup',
  type: 'object',
  fields: [
    defineField({
      name: 'badgeText',
      title: 'Eyebrow Badge Text',
      type: 'string',
      initialValue: 'free tool',
      description: 'Default: free tool',
    }),
    defineField({
      name: 'headline',
      title: 'Popup Headline',
      type: 'string',
      initialValue: 'Are your B2B Emails Hit or Miss? Transform them in 3 seconds for free!',
      description: 'The main attention-grabbing headline in the popup.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Action Button Text',
      type: 'string',
      initialValue: 'fix my email',
    }),
    defineField({
      name: 'starIcon',
      title: 'Show Star Icon on Button',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'delaySeconds',
      title: 'Display Delay (seconds after load)',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'badgeText',
    },
  },
});
