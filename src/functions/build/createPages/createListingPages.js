import { chunk, transformSnippetIndex } from 'functions/utils';
import _ from 'lang';
const _l = _('en');

const createListingPages = (indexedChunks, listingPage, createPage, context, baseUrl) => {
  indexedChunks.forEach((chunk, i, chunks) => {
    createPage({
      path: `${baseUrl}/p/${i + 1}`,
      component: listingPage,
      context: {
        snippetList: chunk,
        paginator: {
          pageNumber: i + 1,
          totalPages: chunks.length,
          baseUrl,
        },
        ...context,
      },
    });
  });
};

const createAllListingPages = (searchIndex, listingMetas, listingPage, createPage, context) => {
  // Create listing pages for the main listing
  const searchIndexChunks = chunk(transformSnippetIndex(searchIndex.edges), 20);
  const mainListingSublinks = listingMetas
    .filter(v => !v.archived)
    .map(v => v.featured > 0 ? v : {...v, featured: 500 })
    .sort((a, b) => a.featured - b.featured);

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
      const searchIndexSlugData = searchIndex.edges.filter(s => s.node.slug.startsWith(`${slugPrefix}`));
      const searchIndexSlugChunks = chunk(transformSnippetIndex(searchIndexSlugData), 20);
      const searchIndexName = searchIndexSlugData[0].node.language.long;
      const searchIndexTagPrefixes = listingMeta.tags;
      const languageListingSublinks = listingMeta.tags
        .map(tag => ({
          link: {
            internal: true,
            url: `${slugPrefix}/t/${tag}/p/1`,
          },
          name: _l`tag.${tag}`,
          style: listingMeta.style,
        }));

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
          .filter(s => s.node.tags.primary === tagPrefix && s.node.slug.startsWith(`${slugPrefix}`));
        const searchIndexTagChunks = chunk(transformSnippetIndex(searchIndexTagData), 20);

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
          },
          `${slugPrefix}/t/${tagPrefix}`
        );
      });

    });
};

export default createAllListingPages;
