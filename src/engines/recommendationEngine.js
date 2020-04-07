/* eslint-disable brace-style */
import { similarity } from 'utils';
import { determineLanguageFromTags, stripLanguageFromTags } from 'functions/transformers';

const determineRecommendedSnippets = (snippetNodes, snippetContext) => {
  const _snippetContext = {
    language: snippetContext.node.blog
      ? determineLanguageFromTags(snippetContext.node.tags.all)
      : snippetContext.node.language,
    primaryTag: snippetContext.node.blog
      ? stripLanguageFromTags(snippetContext.node.tags.all)[0]
      : snippetContext.node.tags.primary,
  };

  let relatedSnippets = snippetNodes
    .filter(v =>
      (
        v.node.blog &&
        v.node.tags.all.find(t => t.toLowerCase() === _snippetContext.language.long.toLowerCase()) &&
        v.node.tags.all.find(t => t.toLowerCase() === _snippetContext.primaryTag.toLowerCase())
      ) || (
        v.node.language &&
        v.node.language.short === _snippetContext.language.short &&
        v.node.tags.primary === _snippetContext.primaryTag
      )
    );
  // Handle snippets with very few recommendations (use language)
  if(relatedSnippets.length < 3) {
    relatedSnippets.push(
      ...snippetNodes
        .filter(v =>
          v.node.language &&
          v.node.language.long.toLowerCase() === _snippetContext.language.long.toLowerCase()
        )
        .sort((a, b) => b.ranking - a.ranking)
        .slice(0, 3 - relatedSnippets.length + 1)
    );
  }
  // Handle snippets with extremely few recommendations (use ranking)
  if (relatedSnippets.length < 3) {
    relatedSnippets.push(
      ...snippetNodes
        .sort((a, b) => b.ranking - a.ranking)
        .slice(0, 3 - relatedSnippets.length + 1)
    );
  }

  relatedSnippets
    .forEach(snippet =>
      snippet.similarity = similarity(snippet.node.tags.all, snippetContext.node.tags.all).length
    );

  return [...new Set(relatedSnippets.sort((a, b) =>
    b.similarity - a.similarity || b.ranking - a.ranking
  ))].filter(v => v.node.url !== snippetContext.node.url);
};

export default determineRecommendedSnippets;
