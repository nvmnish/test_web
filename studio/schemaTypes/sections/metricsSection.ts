import { defineField, defineType } from 'sanity';

export const metricsSection = defineType({
  name: 'metricsSection',
  title: 'Metrics & Proof Bar Section',
  type: 'object',
  fields: [
    defineField({
      name: 'metric1',
      title: 'metrics 1',
      description: 'First metric box. Followed by words and in bold.',
      type: 'object',
      fields: [
        defineField({
          name: 'metric',
          title: 'Metric (e.g. 3x, 26%, 100%)',
          type: 'string',
          initialValue: '3x',
        }),
        defineField({
          name: 'words',
          title: 'Words (Follows metric in bold)',
          type: 'string',
          initialValue: 'Commercial Projects Originated',
        }),
        defineField({
          name: 'descriptor',
          title: 'Optional Subtext / Descriptor',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'metric2',
      title: 'metrics 2',
      description: 'Second metric box. Kept on the second line with descriptor line next to bold large metric.',
      type: 'object',
      fields: [
        defineField({
          name: 'metric',
          title: 'Metric (e.g. 2x, 56%)',
          type: 'string',
          initialValue: '2x',
        }),
        defineField({
          name: 'words',
          title: 'Words (Follows metric in bold)',
          type: 'string',
          initialValue: 'Campus Enrollment Capacity Doubled',
        }),
        defineField({
          name: 'descriptorLine',
          title: 'Descriptor Line (Next to bold large metric)',
          type: 'string',
          initialValue: 'Harrisburg campus surged from 28% to 56% without prior advertising history',
        }),
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Additional / Grid Metrics (Optional Fallback)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Metric Number (e.g. 26, 2, 3)',
              type: 'number',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix (e.g. %, x, months)',
              type: 'string',
              initialValue: '%',
            }),
            defineField({
              name: 'description',
              title: 'Description Text',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'barPercentage',
              title: 'Bar Fill Percentage (0-100)',
              type: 'number',
              initialValue: 60,
            }),
          ],
          preview: {
            select: {
              number: 'number',
              suffix: 'suffix',
              description: 'description',
            },
            prepare({ number, suffix, description }) {
              return {
                title: `${number ?? ''}${suffix ?? ''}`,
                subtitle: description,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      m1Val: 'metric1.metric',
      m1Words: 'metric1.words',
      m2Val: 'metric2.metric',
      m2Words: 'metric2.words',
    },
    prepare({ m1Val, m1Words, m2Val, m2Words }) {
      if (m1Val || m2Val) {
        return {
          title: `Metrics: ${m1Val || ''} ${m1Words || ''} / ${m2Val || ''} ${m2Words || ''}`,
          subtitle: 'Two-line layout (metrics 1 + metrics 2)',
        };
      }
      return {
        title: 'Metrics & Proof Bar',
        subtitle: 'Metrics Section',
      };
    },
  },
});
