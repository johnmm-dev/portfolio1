import { defineType, defineField, defineArrayMember } from 'sanity';

export const resume = defineType({
  name: 'resume',
  type: 'document',
  title: 'Resume',
  fields: [
    defineField({
      name: 'variants',
      title: 'Resume files',
      description:
        'One entry per version (e.g. short/long, PDF/DOCX). Shown as a dropdown on the homepage when there\'s more than one; downloaded directly when there\'s only one.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'variant',
          fields: [
            defineField({
              name: 'buttonName',
              type: 'string',
              title: 'Button name',
              description: 'Shown in the dropdown, e.g. "Short (PDF)".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'downloadName',
              type: 'string',
              title: 'Download name',
              description: 'File name the visitor gets, e.g. "Adnan Sabbir Resume - Short.pdf".',
              validation: (Rule) =>
                Rule.required()
                  .regex(/^[^/\\:*?"<>|]+\.(pdf|docx?)$/i, {
                    name: 'a safe filename ending in .pdf, .doc, or .docx',
                  })
                  .custom((value, context) => {
                    const doc = context.document as { variants?: { downloadName?: string }[] } | undefined;
                    const names = (doc?.variants ?? []).map((v) => v.downloadName);
                    const duplicates = names.filter((name) => name === value).length;
                    return duplicates > 1 ? 'Download name must be unique across variants.' : true;
                  }),
            }),
            defineField({
              name: 'file',
              type: 'file',
              title: 'File',
              options: { accept: '.pdf,.doc,.docx' },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'buttonName', subtitle: 'downloadName' },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Add at least one resume file.'),
    }),
  ],
  preview: {
    select: { variants: 'variants' },
    prepare: ({ variants }) => {
      const count = (variants ?? []).length;
      return { title: `Resume (${count} file${count === 1 ? '' : 's'})` };
    },
  },
});
