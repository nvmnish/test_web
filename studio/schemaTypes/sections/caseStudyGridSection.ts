import { defineField, defineType } from 'sanity';

export const caseStudyGridSection = defineType({
  name: 'caseStudyGridSection',
  title: 'Case Studies / Proof Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'hidden',
      title: 'Hide Section on Live Site',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Verified Proof',
    }),
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'What happens when operators speak clearly.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Real operating outcomes across campus enrollment, commercial architecture, and executive demand.',
    }),
    defineField({
      name: 'selectionMode',
      title: 'Case Studies Selection',
      type: 'string',
      options: {
        list: [
          { title: 'Show All Featured Case Studies', value: 'all' },
          { title: 'Manually Select Specific Studies', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'selectedStudies',
      title: 'Selected Case Studies (if Manual)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      hidden: ({ parent }) => parent?.selectionMode !== 'manual',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare({ title, eyebrow }) {
      return {
        title: title || 'Case Studies Grid',
        subtitle: eyebrow || 'Proof Section',
      };
    },
  },
});
