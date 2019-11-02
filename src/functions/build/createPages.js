import { parseSnippetContext } from 'functions/parsers';

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

const create404Page = (notFoundPage, createPage, context) => {
  createPage({
    path: '/404',
    component: notFoundPage,
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

      return null;
    });
};

export default createPages;
