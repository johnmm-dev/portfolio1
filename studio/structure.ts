import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blogPost')
        .title('Blog Posts')
        .child(S.documentTypeList('blogPost').defaultOrdering([{ field: 'pubDate', direction: 'desc' }])),
    ]);
