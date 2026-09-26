import { defineField, defineType } from 'sanity';

export const mediaCalloutSection = defineType({
  name: 'mediaCalloutSection',
  title: 'Media Callout Block (Photo / Video / Quote)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Callout Title',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Highlighted Quote',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Quote Author / Attribution',
      type: 'string',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType === 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL or Path',
      type: 'string',
      hidden: ({ parent }) => parent?.mediaType === 'image',
    }),
    defineField({
      name: 'caption',
      title: 'Caption / Subtext',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'quote',
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title || 'Media Callout Block',
        subtitle: subtitle || 'Image / Video callout',
        media,
      };
    },
  },
});
