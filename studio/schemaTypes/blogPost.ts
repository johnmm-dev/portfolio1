import { defineType, defineField, defineArrayMember, getPublishedId } from 'sanity';

// Keep in sync with web/src/data/tags.ts until the Astro site reads tags
// from Sanity directly.
const TAG_OPTIONS = [
  { title: 'Backend Systems', value: 'backendSystems' },
  { title: 'Product Architecture', value: 'productArchitecture' },
  { title: 'ERP Systems', value: 'erpSystems' },
  { title: 'Developer Tools', value: 'developerTools' },
  { title: 'Robotics', value: 'robotics' },
  { title: 'Technical Writing', value: 'technicalWriting' },
  { title: 'Logistics', value: 'logistics' },
  { title: 'EdTech', value: 'edtech' },
  { title: 'Career', value: 'career' },
  { title: 'Philosophy', value: 'philosophy' },
  { title: 'Dubai', value: 'dubai' },
  { title: 'Hiking', value: 'hiking' },
  { title: 'Fishing', value: 'fishing' },
  { title: 'About Me', value: 'aboutMe' },
];

export const blogPost = defineType({
  name: 'blogPost',
  type: 'document',
  title: 'Blog Post',
  orderings: [
    {
      name: 'pubDateDesc',
      title: 'Publish date, newest first',
      by: [{ field: 'pubDate', direction: 'desc' }],
    },
    {
      name: 'pubDateAsc',
      title: 'Publish date, oldest first',
      by: [{ field: 'pubDate', direction: 'asc' }],
    },
    {
      name: 'title',
      title: 'Title',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) =>
        Rule.required().custom(async (title, context) => {
          if (!title || !context.document?._id) return true;
          const client = context.getClient({ apiVersion: '2025-02-19' });
          const publishedId = getPublishedId(context.document._id);
          const isUnique = await client.fetch(
            `!defined(*[!sanity::versionOf($published) && _type == "blogPost" && title == $title][0]._id)`,
            { published: publishedId, title },
          );
          return isUnique || 'Title already exists — choose a unique title';
        }),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      // Sanity checks slug uniqueness automatically per document type +
      // field path when `isUnique` is left unset.
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      title: 'Description',
      description: 'Used as the meta description and card summary.',
      validation: (Rule) =>
        Rule.required().max(160).warning('Longer descriptions may get truncated in search results.'),
    }),
    defineField({
      name: 'pubDate',
      type: 'datetime',
      title: 'Publish Date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: TAG_OPTIONS },
    }),
    defineField({
      name: 'draft',
      type: 'boolean',
      title: 'Draft',
      description: 'Draft posts are excluded from the production build/sitemap.',
      initialValue: true,
    }),
    defineField({
      name: 'reviewReady',
      type: 'boolean',
      title: 'Review Ready',
      description:
        'For draft posts only. When on, the post is reachable at /writing/review/<slug> for proofreading, without appearing in the Writing index, series pages, or sitemap. Has no effect once Draft is off.',
      initialValue: false,
    }),
    defineField({
      name: 'seriesInfo',
      type: 'object',
      title: 'Series Info',
      description: 'Optional multi-part post grouping.',
      fields: [
        defineField({
          name: 'series',
          type: 'reference',
          title: 'Series',
          to: [{ type: 'series' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'part',
          type: 'number',
          title: 'Part Number',
          validation: (Rule) =>
            Rule.required()
              .integer()
              .positive()
              .custom(async (part, context) => {
                const seriesRef = (context.parent as { series?: { _ref?: string } } | undefined)?.series?._ref;
                if (!part || !seriesRef || !context.document?._id) return true;
                const client = context.getClient({ apiVersion: '2025-02-19' });
                const publishedId = getPublishedId(context.document._id);
                const isUnique = await client.fetch(
                  `!defined(*[!sanity::versionOf($published) && _type == "blogPost" && seriesInfo.series._ref == $seriesRef && seriesInfo.part == $part][0]._id)`,
                  { published: publishedId, seriesRef, part },
                );
                return isUnique || 'Another post already uses this part number in this series';
              }),
        }),
      ],
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    // Sanity's default url validation rejects relative paths,
                    // which blocks internal links like /writing/other-post.
                    validation: (Rule) => Rule.required().uri({ allowRelative: true, scheme: ['http', 'https'] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'string',
              title: 'Description',
              description: 'Optional caption shown under the image.',
            }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'youtube',
          title: 'YouTube Video',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'YouTube URL',
              validation: (Rule) =>
                Rule.required().custom((url) => {
                  if (!url) return true;
                  const isYouTubeUrl = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/.test(url);
                  return isYouTubeUrl || 'Must be a youtube.com or youtu.be URL';
                }),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption shown under the video.',
            }),
          ],
          preview: {
            select: { url: 'url' },
            prepare: ({ url }) => ({ title: 'YouTube Video', subtitle: url }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'facebookVideo',
          title: 'Facebook Video',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'Facebook Video URL',
              description:
                'Use the canonical facebook.com/<page>/videos/<id>/ URL from the video\'s "Embed" dialog — a facebook.com/share/... link will not embed.',
              validation: (Rule) =>
                Rule.required().custom((url) => {
                  if (!url) return true;
                  const isFacebookUrl = /^https?:\/\/(www\.)?facebook\.com\//.test(url);
                  return isFacebookUrl || 'Must be a facebook.com URL';
                }),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption shown under the video.',
            }),
          ],
          preview: {
            select: { url: 'url' },
            prepare: ({ url }) => ({ title: 'Facebook Video', subtitle: url }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'pubDate', media: 'thumbnail' },
  },
});
