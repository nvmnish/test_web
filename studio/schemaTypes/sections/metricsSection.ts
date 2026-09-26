import { defineField, defineType } from 'sanity';

export const metricsSection = defineType({
  name: 'metricsSection',
  title: 'Metrics & Proof Bar Section',
  type: 'object',
  fields: [
    defineField({
      name: 'metrics',
      title: 'Metrics Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Metric Number (e.g. 26, 2, 3)',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix (e.g. %, x,  months)',
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
      metrics: 'metrics',
    },
    prepare({ metrics }) {
      return {
        title: 'Metrics & Proof Bar',
        subtitle: `${metrics?.length || 0} metrics configured`,
      };
    },
  },
});
