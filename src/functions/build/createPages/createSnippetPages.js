import { parseSnippetContext } from 'functions/parsers';
import { recommendationEngine } from 'engines';
import { transformSnippetIndex } from 'functions/utils';

/**
 * Creates individual snippet pages.
 */
const createSnippetPages = (snippets, snippetPage, createPage, commonContext, imageContext = []) => {
  snippets.forEach(snippet => {
    const recommendedSnippets = recommendationEngine(snippets, snippet);
    createPage({
      path: `${snippet.node.slug}`,
      component: snippetPage,
      context: {
        snippet: parseSnippetContext(snippet.node, commonContext.cardTemplate, imageContext),
        ...commonContext,
        recommendedSnippets: transformSnippetIndex(recommendedSnippets.slice(0, 3)),
      },
    });
  });
};

export default createSnippetPages;
