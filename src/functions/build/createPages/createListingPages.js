import { chunk } from 'functions/utils';
import { transformSnippetIndex } from 'functions/transformers';
import _ from 'lang';
const _l = _('en');

const createListingPages = (indexedChunks, listingPage, createPage, context, baseUrl, slugOrderingSegment) => {
  indexedChunks.forEach((chunk, i, chunks) => {
    createPage({
      path: `${baseUrl}/${slugOrderingSegment}/${i + 1}`,
      component: listingPage,
      context: {
        snippetList: chunk,
        paginator: {
          pageNumber: i + 1,
          totalPages: chunks.length,
          baseUrl,
          slugOrderingSegment,
        },
        ...context,
      },
    });
  });
};

const createListingPagesWithOrderOptions = (
  listingPage, createPage, context, baseUrl, orders, chunks, contextCustomizer = () => ({})
) => {
  orders.forEach((order, i) => {
    createListingPages(
      chunks[i],
      listingPage,
      createPage,
      { ...context, ...contextCustomizer(order, i)},
      baseUrl,
      order
    );
  });
};

const createAllListingPages = (searchIndex, listingMetas, listingPage, createPage, context) => {
  // Create listing pages for the main listing
  const searchIndexChunks = chunk(transformSnippetIndex(searchIndex.edges), 20);
  const mainListingSublinks = listingMetas
    .filter(v => !v.unlisted)
    .map(v => v.featured > 0 ? v : {...v, featured: 500 })
    .sort((a, b) => a.featured === b.featured ? a.name - b.name : a.featured - b.featured);

  createListingPages(
    searchIndexChunks,
    listingPage,
    createPage,
    {
      ...context,
      listingName: _l('Snippet List'),
      listingType: 'main',
      listingSublinks: mainListingSublinks,
    },
    '/list'
  );

  listingMetas
    .filter(v => !v.archived)
    .forEach(listingMeta => {
      const slugPrefix = listingMeta.slugPrefix;
      const searchIndexName = searchIndex.edges.find(s => s.node.slug.startsWith(`${slugPrefix}`)).node.language.long || '';
      const searchIndexSlugData = searchIndex.edges.filter(s =>
        s.node.slug.startsWith(`${slugPrefix}`) ||
        (s.node.blog && s.node.tags.all.find(t => t.toLowerCase() === searchIndexName.toLowerCase()))
      );
      const searchIndexSlugChunks = chunk(transformSnippetIndex(searchIndexSlugData), 20);
      const searchIndexTagPrefixes = listingMeta.tags;
      const languageListingSublinks = [
        {
          link: {
            internal: true,
            url: `${slugPrefix}/p/1`,
          },
          name: _l`tag.${'all'}`,
          selected: true,
        },
        ...listingMeta.tags
          .map(tag => ({
            link: {
              internal: true,
              url: `${slugPrefix}/t/${tag}/p/1`,
            },
            name: _l`tag.${tag}`,
          })),
      ];

      createListingPages(
        searchIndexSlugChunks,
        listingPage,
        createPage,
        {
          ...context,
          listingName: listingMeta.blog ? _l('Blog') : _l`codelang.${searchIndexName}`,
          snippetCount: searchIndexSlugData.length,
          listingType: listingMeta.blog ? 'blog' : 'language',
          listingLanguage: listingMeta.blog ? 'blog' : searchIndexName,
          listingSublinks: listingMeta.blog ? [] : languageListingSublinks,
        },
        `${slugPrefix}`
      );

      searchIndexTagPrefixes.forEach(tagPrefix => {
        const searchIndexTagData = searchIndex.edges
          .filter(s =>
            s.node.tags.primary === tagPrefix && s.node.slug.startsWith(`${slugPrefix}`) ||
            ( s.node.blog &&
              s.node.tags.all.find(t => t.toLowerCase() === searchIndexName.toLowerCase()) &&
              s.node.tags.all.find(t => t.toLowerCase() === tagPrefix.toLowerCase())
            )
          );
        const searchIndexTagChunks = chunk(transformSnippetIndex(searchIndexTagData), 20);
        const tagListingSublinks = languageListingSublinks
          .map(tag => ({...tag, selected: tag.link.url.indexOf(`/t/${tagPrefix}/`) !== -1}));

        createListingPages(
          searchIndexTagChunks,
          listingPage,
          createPage,
          {
            ...context,
            listingName: _l`codelang_tag.${searchIndexName}${tagPrefix}`,
            snippetCount: searchIndexTagData.length,
            listingType: 'tag',
            listingLanguage: searchIndexName,
            listingTag: tagPrefix,
            listingSublinks: listingMeta.blog ? [] : tagListingSublinks,
          },
          `${slugPrefix}/t/${tagPrefix}`
        );
      });

    });
};

export default createAllListingPages;
