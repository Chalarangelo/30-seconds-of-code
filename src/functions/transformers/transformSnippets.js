import { transformTagName } from './transformTags';

/** Transform the indexed snippets to appropriate format */
export const transformSnippetIndex = edges =>
  edges
    .map(edge => edge.node)
    .map(node => ({
      title: node.title,
      expertise: transformTagName(node.expertise),
      primaryTag: transformTagName(node.tags.primary),
      language: node.language && node.language.long ? node.language.long : undefined,
      description: node.html.description.trim(),
      url: node.slug,
      searchTokens: node.searchTokens,
    }));
