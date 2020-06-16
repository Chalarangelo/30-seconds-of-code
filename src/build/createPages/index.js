import createStaticPage from './createStaticPage';
import createListingPages from './createListingPages';
import createSnippetPages from './createSnippetPages';
import { transformSnippetIndex } from 'build/transformers';
import literals from 'lang/en';

/**
 * Tell plugins to add pages.
 * Takes a query string and a templates object.
 * Takes a list of requirable objects after being loaded.
 * Creates pages by running individual methods.
 */
const createPages = (query, templates, requirables) => ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(query)
    .then(result => {
      if (result.errors) throw result.errors;

      const searchIndex = result.data.searchIndex;
      const commonContext = {
        logoSrc: result.data.logoSrc.childImageSharp.original.src,
        splashLogoSrc: result.data.splashLogoSrc.childImageSharp.original.src,
        snippetCount: searchIndex.edges.length,
      };

      const listingMetas = requirables.map(rq => rq.meta);

      createStaticPage(
        templates['NotFoundPage'],
        createPage,
        commonContext,
        '/404'
      );

      createStaticPage(
        templates['StaticPage'],
        createPage,
        {
          ...commonContext,
          stringLiterals: literals.about,
        },
        '/about'
      );

      createStaticPage(
        templates['StaticPage'],
        createPage,
        {
          ...commonContext,
          stringLiterals: literals.cookies,
        },
        '/cookies'
      );

      createStaticPage(
        templates['SettingsPage'],
        createPage,
        {
          ...commonContext,
          stringLiterals: literals.settings,
        },
        '/settings'
      );

      createListingPages(
        searchIndex,
        listingMetas,
        templates['ListingPage'],
        createPage,
        commonContext,
        '/list'
      );

      createSnippetPages(
        result.data.simpleSnippets.edges,
        templates['SnippetPage'],
        createPage,
        {
          ...commonContext,
          cardTemplate: 'StandardSnippetCard',
        }
      );

      createSnippetPages(
        result.data.cssSnippets.edges,
        templates['SnippetPage'],
        createPage,
        {
          ...commonContext,
          cardTemplate: 'CssSnippetCard',
        }
      );

      createSnippetPages(
        result.data.blogSnippets.edges,
        templates['SnippetPage'],
        createPage,
        {
          ...commonContext,
          cardTemplate: 'BlogSnippetCard',
        },
        result.data.images.edges
      );

      createStaticPage(
        templates['SearchPage'],
        createPage,
        {
          ...commonContext,
          searchIndex: transformSnippetIndex(searchIndex.edges, true),
          recommendedSnippets: transformSnippetIndex(searchIndex.edges.slice(0, 3)),
          pageDescription: literals.search.pageDescription(searchIndex.edges.length),
        },
        '/search'
      );

      return null;
    });
};

export default createPages;
