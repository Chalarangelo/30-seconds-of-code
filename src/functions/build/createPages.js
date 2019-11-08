import { parseSnippetContext } from 'functions/parsers';
import { chunk, transformSnippetIndex } from 'functions/utils';
import _ from 'lang';
const _l = _('en');

/**
 * Creates individual snippet pages.
 */
const createSnippetPages = (snippets, snippetPage, createPage, commonContext) => {
  snippets.forEach(snippet => {
    createPage({
      path: `${snippet.node.slug}`,
      component: snippetPage,
      context: {
        snippet: parseSnippetContext(snippet.node, commonContext.cardTemplate),
        ...commonContext,
      },
    });
  });
};

const createHomePage = (homePage, createPage, context) => {
  createPage({
    path: '/',
    component: homePage,
    context: {
      ...context,
    },
  });
};

const createSearchPage = (searchPage, createPage, context) => {
  createPage({
    path: '/search',
    component: searchPage,
    context: {
      ...context,
    },
  });
};

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

const createAllListingPages = (searchIndex, listingPage, createPage, context) => {
  const searchIndexChunks = chunk(transformSnippetIndex(searchIndex.edges), 20);
  const searchIndexSlugPrefixes = [
    ...new Set(
      searchIndex.edges
        .map(v => v.node.slug.slice(1)).map(v => v.slice(0, v.indexOf('/')))
    ),
  ];

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

  searchIndexSlugPrefixes.forEach(slugPrefix => {
    const searchIndexSlugData = searchIndex.edges.filter(s => s.node.slug.startsWith(`/${slugPrefix}`));
    const searchIndexSlugChunks = chunk(transformSnippetIndex(searchIndexSlugData), 20);
    const searchIndexName = searchIndexSlugData[0].node.language.long;

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
      `/${slugPrefix}`
    );

    const searchIndexTagPrefixes = [
      ...new Set(
        searchIndexSlugData
          .map(v => v.node.tags.primary)
      ),
    ];

    searchIndexTagPrefixes.forEach(tagPrefix => {
      const searchIndexTagData = searchIndex.edges.filter(s => s.node.tags.primary === tagPrefix && s.node.slug.startsWith(`/${slugPrefix}`));
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
        `/${slugPrefix}/t/${tagPrefix}`
      );
    });

  });
};

const create404Page = (notFoundPage, createPage, context) => {
  createPage({
    path: '/404',
    component: notFoundPage,
    context: {
      ...context,
    },
  });
};

const createSearchIndexPage = (searchPage, createPage, context) => {
  createPage({
    path: '/search_index',
    component: searchPage,
    context: {
      ...context,
    },
  });
};

/**
 * Tell plugins to add pages.
 * Takes a query string and a templates object.
 * Creates pages by running individual methods.
 */
const createPages = (query, templates) => ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(query)
    .then(result => {
      if (result.errors) throw result.errors;

      const searchIndex = result.data.searchIndex;

      const commonContext = {
        logoSrc: result.data.logoSrc.childImageSharp.original.src,
        snippetCount: searchIndex.edges.length,
      };

      createHomePage(
        templates['HomePage'],
        createPage,
        {
          ...commonContext,
        }
      );

      createSearchPage(
        templates['SearchPage'],
        createPage,
        {
          ...commonContext,
        }
      );

      create404Page(
        templates['NotFoundPage'],
        createPage,
        {
          ...commonContext,
        }
      );

      createAllListingPages(
        searchIndex,
        templates['ListingPage'],
        createPage,
        {
          ...commonContext,
        },
        '/list'
      );

      createSnippetPages(
        result.data.simpleSnippets.edges,
        templates['SnippetPage'],
        createPage,
        {
          ...commonContext,
          cardTemplate: 'standard',
        }
      );

      createSnippetPages(
        result.data.cssSnippets.edges,
        templates['SnippetPage'],
        createPage,
        {
          ...commonContext,
          cardTemplate: 'css',
        }
      );

      createSearchIndexPage(
        templates['SearchPage'],
        createPage,
        {
          ...commonContext,
          searchIndex: transformSnippetIndex(searchIndex.edges),
        });

      return null;
    });
};

export default createPages;
