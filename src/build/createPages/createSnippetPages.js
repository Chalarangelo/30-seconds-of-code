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
 * @param {array} imageContext - Image context.
 */
const createSnippetPages = (
  snippets,
  snippetPage,
  createPage,
  commonContext
) => {
  snippets.forEach(snippet => {
    const recommendedSnippets = transformSnippetIndex(
      snippet.node.recommendedSnippets.map(v => ( { node: v }))
    );
    createPage({
      path: `${snippet.node.slug}`,
      component: snippetPage,
      context: {
        snippet: transformSnippetContext(snippet.node, commonContext.cardTemplate),
        ...commonContext,
        recommendedSnippets,
        breadcrumbs: transformBreadcrumbs(snippet.node, commonContext.cardTemplate),
        pageDescription: transformSnippetDescription(snippet.node, commonContext.cardTemplate),
      },
    });
  });
};

export default createSnippetPages;
