import create404Page from './create404Page';
import createAboutPage from './createAboutPage';
import createCookiePage from './createCookiePage';
import createHomePage from './createHomePage';
import createListingPages from './createListingPages';
import createSearchIndexPage from './createSearchIndexPage';
import createSearchPage from './createSearchPage';
import createSnippetPages from './createSnippetPages';
import { transformSnippetIndex } from 'functions/utils';
import { parseListingMetas } from 'functions/parsers';

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

      const listingMetas = parseListingMetas(requirables);

      createHomePage(
        searchIndex,
        listingMetas,
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

      createAboutPage(
        templates['AboutPage'],
        createPage,
        {
          ...commonContext,
        }
      );

      createCookiePage(
        templates['CookiePage'],
        createPage,
        {
          ...commonContext,
        }
      );

      createListingPages(
        searchIndex,
        listingMetas,
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

      createSnippetPages(
        result.data.blogSnippets.edges,
        templates['SnippetPage'],
        createPage,
        {
          ...commonContext,
          cardTemplate: 'blog',
        },
        result.data.images.edges
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
