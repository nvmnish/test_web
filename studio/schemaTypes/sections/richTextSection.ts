import { defineField, defineType } from 'sanity';

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Custom Text & Heading Block',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Tag (optional)',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Text / Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'align',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'buttonText',
      title: 'Optional Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Optional Button Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Custom Text Block',
        subtitle: subtitle || 'Flexible text section',
      };
    },
  },
});
