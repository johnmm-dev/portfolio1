import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blogPost')
        .title('Blog Posts')
        .child(S.documentTypeList('blogPost').defaultOrdering([{ field: 'pubDate', direction: 'desc' }])),
      S.documentTypeListItem('series')
        .title('Series')
        .child(
          S.documentTypeList('series').child((seriesId) =>
            S.list()
              .title('Series')
              .items([
                S.listItem()
                  .title('Details')
                  .child(S.document().documentId(seriesId).schemaType('series')),
                S.listItem()
                  .title('Blog Posts')
                  .child(
                    S.documentList()
                      .title('Blog Posts')
                      .schemaType('blogPost')
                      .filter('_type == "blogPost" && seriesInfo.series._ref == $seriesId')
                      .params({ seriesId })
                      .defaultOrdering([{ field: 'seriesInfo.part', direction: 'asc' }]),
                  ),
              ]),
          ),
        ),
    ]);
