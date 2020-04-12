import recommendationEngine from 'engines/recommendationEngine';
import {
  transformSnippetIndex,
  transformSnippetContext,
  transformSnippetDescription,
  transformBreadcrumbs
} from 'build/transformers';

/**
 * Creates individual snippet pages.
 * @param {array} snippets - An array of snippets.
 * @param {*} snippetPage - Snippet page template.
 * @param {*} createPage - Page creation method from gatsby.
 * @param {*} commonContext - Context to be passed to the page.
 * @param {array} allSnippets - List of all snippets.
 * @param {array} imageContext - Image context.
 */
const createSnippetPages = (
  snippets,
  snippetPage,
  createPage,
  commonContext,
  allSnippets = snippets,
  imageContext = []
) => {
  snippets.forEach(snippet => {
    const recommendedSnippets = recommendationEngine(allSnippets, snippet);
    createPage({
      path: `${snippet.node.slug}`,
      component: snippetPage,
      context: {
        snippet: transformSnippetContext(snippet.node, commonContext.cardTemplate, imageContext),
        ...commonContext,
        recommendedSnippets: transformSnippetIndex(recommendedSnippets),
        breadcrumbs: transformBreadcrumbs(snippet.node, commonContext.cardTemplate),
        pageDescription: transformSnippetDescription(snippet.node, commonContext.cardTemplate),
      },
    });
  });
};

export default createSnippetPages;
