import { defineField, defineType } from 'sanity';

export const footer = defineType({
  name: 'footer',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand / Logo Text',
      type: 'string',
      initialValue: 'GLS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Footer Tagline / Brand Statement',
      type: 'text',
      rows: 2,
      initialValue: 'Marketing and messaging advisory for leaders too busy doing the work to talk about it.',
    }),
    defineField({
      name: 'linkGroups',
      title: 'Footer Link Groups (Add, Rename, Reorder)',
      type: 'array',
      description: 'Grouped navigation links for multi-column or structured footer layouts.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'groupTitle',
              title: 'Group Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links in Group',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL / Path',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'isCta',
                      title: 'Highlight as CTA',
                      type: 'boolean',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'isExternal',
                      title: 'Open in New Tab',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'url',
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'groupTitle',
              links: 'links',
            },
            prepare({ title, links }) {
              return {
                title: title || 'Link Group',
                subtitle: `${links?.length || 0} links`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Standard Navigation Links (Flat Bar)',
      type: 'array',
      description: 'Flat horizontal navigation row.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Destination URL / Path',
              type: 'string',
              description: 'e.g. /case-studies, /about, /blog, /free-tools, /newsletter, /contact',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isCta',
              title: 'Highlight as CTA (e.g. Work with me)',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2026 GLS Advisory LLC. All rights reserved.',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links (Privacy, Terms)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      initialValue: 'https://www.linkedin.com',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      initialValue: 'https://www.instagram.com',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Contact Email Address',
      type: 'string',
      initialValue: 'sheri@glsadvisory.com',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color Code',
      type: 'string',
      initialValue: '#FFF9F3',
    }),
  ],
  preview: {
    select: {
      title: 'brandName',
      subtitle: 'tagline',
    },
  },
});
