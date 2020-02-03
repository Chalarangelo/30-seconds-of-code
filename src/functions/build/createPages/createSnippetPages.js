import { recommendationEngine } from 'engines';
import { transformSnippetIndex, transformSnippetContext } from 'functions/transformers';

/**
 * Creates individual snippet pages.
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
        recommendedSnippets: transformSnippetIndex(recommendedSnippets.slice(0, 3)),
      },
    });
  });
};

export default createSnippetPages;
