import { parseSnippetContext } from 'functions/parsers';
import { chunk, transformSnippetIndex } from 'functions/utils';

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

      const commonContext = {
        logoSrc: result.data.logoSrc.childImageSharp.original.src,
      };

      const searchIndex = result.data.searchIndex;
      const searchIndexChunks = chunk(transformSnippetIndex(searchIndex.edges), 20);

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

      createListingPages(
        searchIndexChunks,
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
          searchIndex,
        });

      return null;
    });
};

export default createPages;
