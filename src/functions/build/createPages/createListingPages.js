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
  createListingPages(
    searchIndexChunks,
    listingPage,
    createPage,
    {
      ...context,
      listingName: _l('Snippet List'),
      listingType: 'main',
    },
    '/list'
  );

  listingMetas.forEach(listingMeta => {
    const slugPrefix = listingMeta.slugPrefix;
    const searchIndexSlugData = searchIndex.edges.filter(s => s.node.slug.startsWith(`${slugPrefix}`));
    const searchIndexSlugChunks = chunk(transformSnippetIndex(searchIndexSlugData), 20);
    const searchIndexName = searchIndexSlugData[0].node.language.long;
    const searchIndexTagPrefixes = listingMeta.tags;

    createListingPages(
      searchIndexSlugChunks,
      listingPage,
      createPage,
      {
        ...context,
        listingName: _l`codelang.${searchIndexName}`,
        snippetCount: searchIndexSlugData.length,
        listingType: 'language',
        listingLanguage: searchIndexName,
      },
      `${slugPrefix}`
    );

    searchIndexTagPrefixes.forEach(tagPrefix => {
      const searchIndexTagData = searchIndex.edges.filter(s => s.node.tags.primary === tagPrefix && s.node.slug.startsWith(`${slugPrefix}`));
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
