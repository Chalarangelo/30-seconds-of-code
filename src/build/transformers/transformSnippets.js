import { stripMarkdownFormat } from 'utils';
import { transformTagName } from './transformTags';
import literals from 'lang/en/snippet';

/**
 * Transform the indexed snippets to the appropriate format.
 * Used in listing pages to render snippet previews.
 * @param {array} edges - An array of snippet edges.
 * @param {bool} withSearchTokens - Should include search tokens in the result?
 */
export const transformSnippetIndex = (edges, withSearchTokens = false) =>
  edges.map(({ node }) => ({
    title: node.title,
    expertise: transformTagName(node.expertise),
    primaryTag: transformTagName(node.tags.primary),
    language: node.language && node.language.long ? node.language.long : undefined,
    icon: node.icon,
    description: node.html.description.trim(),
    url: node.slug,
    ...(withSearchTokens ? { searchTokens: node.searchTokens } : {}),
  }));

/**
 * Given a snippet object with key-value pairs, creates an appropriate description.
 * Used in snippet pages to render the page description.
 * @param {object} snippet - The snippet object whose description to transform.
 * @param {string} cardTemplate - A string that determines the card template.
 */
export const transformSnippetDescription = (snippet, cardTemplate) => {
  const parsedDescription = stripMarkdownFormat(snippet.text.short);
  return cardTemplate === 'BlogSnippetCard' || parsedDescription.length <= 160
    ? parsedDescription
    : literals.pageDescription(snippet.title, snippet.language.long);
};

/**
 * Given a snippet object with key-value pairs, removes all unnecessary
 * information that should not be sent to the JSX component rendering the snippet.
 * Used in snippet pages to render individual snippets.
 * @param {object} snippet - The snippet object to be transformed.
 * @param {string} cardTemplate - A string that determines the card template.
 */
export const transformSnippetContext = (snippet, cardTemplate) => {
  const templateProps = cardTemplate === 'BlogSnippetCard' ? {
    authors: snippet.authors,
    type: snippet.type,
    cover: snippet.cover,
  } : {};
  return {
    id: snippet.id,
    title: snippet.title,
    description: stripMarkdownFormat(snippet.text.short),
    url: snippet.url,
    slug: snippet.slug,
    firstSeen: snippet.firstSeen,
    lastUpdated: snippet.lastUpdated,
    expertise: transformTagName(snippet.expertise),
    language: snippet.language,
    icon: snippet.icon,
    tags: {
      primary: transformTagName(snippet.tags.primary),
      all: snippet.tags.all.map(transformTagName),
    },
    html: snippet.html,
    code: snippet.code,
    ...templateProps,
  };
};
