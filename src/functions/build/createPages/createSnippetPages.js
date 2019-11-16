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

export default createSnippetPages;
