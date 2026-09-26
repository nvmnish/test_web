import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study / Proof Story',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'client',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'role',
      title: 'Role & Organization',
      type: 'string',
      description: 'e.g. Managing Principal & Founder or Head of School',
    }),
    defineField({
      name: 'industry',
      title: 'Industry / Location',
      type: 'string',
      description: 'e.g. Commercial Construction & Architecture',
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe Badge',
      type: 'string',
      initialValue: '3 Months In',
    }),
    defineField({
      name: 'quote',
      title: 'Primary Quote (Displayed in #536357 between client name line and text block)',
      type: 'text',
      rows: 3,
      description: 'Placed prominently between the separator line under the client name and the expandable story area in #536357 color.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Result Headline',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Client Video URL / File (Displayed Next to Text Block)',
      type: 'url',
      description: 'URL to video MP4, Loom, or streaming clip displayed alongside the case study text block.',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster / Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Cover poster thumbnail for the video space.',
    }),
    defineField({
      name: 'statNumber',
      title: 'Stat Callout (e.g. 3x, 2x, 26%)',
      type: 'string',
    }),
    defineField({
      name: 'statLabel',
      title: 'Stat Label (e.g. Commercial Projects Originated)',
      type: 'string',
    }),
    defineField({
      name: 'challenge',
      title: '01 · The Bottleneck / Challenge',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'approach',
      title: '02 · The GLS Extraction / Approach',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'outcome',
      title: '03 · The Commercial Result / Outcome',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Narrative Story Paragraphs (For expandable story reading)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'clientPhoto',
      title: 'Client Portrait / Work Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'client',
      subtitle: 'role',
      media: 'clientPhoto',
    },
  },
});
