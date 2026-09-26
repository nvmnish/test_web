import { defineField, defineType } from 'sanity';

export const videoCarouselSection = defineType({
  name: 'videoCarouselSection',
  title: 'Video Carousel Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: "Don't take our word for it",
    }),
    defineField({
      name: 'videos',
      title: 'Video Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'clientName',
              title: 'Client Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'posterImage',
              title: 'Cover / Poster Photo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'posterFallbackUrl',
              title: 'Static Poster URL (fallback)',
              type: 'string',
              description: 'e.g. images/Sandra.png or images/Alex.png',
            }),
            defineField({
              name: 'videoFile',
              title: 'Upload Video File',
              type: 'file',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Or Video URL / Local path',
              type: 'string',
              description: 'e.g. /videos/Sandra.mp4',
            }),
          ],
          preview: {
            select: {
              title: 'clientName',
              media: 'posterImage',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videos: 'videos',
    },
    prepare({ title, videos }) {
      return {
        title: title || 'Video Carousel',
        subtitle: `${videos?.length || 0} videos configured`,
      };
    },
  },
});
