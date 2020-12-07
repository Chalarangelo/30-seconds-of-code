import { stripMarkdownFormat } from 'utils';
import { Tag } from 'build/utilities/tag';
import literals from 'lang/en/snippet';

/**
 * Transform the indexed snippets to the appropriate format.
 * Used in listing pages to render snippet previews.
 * @param {array} snippets - An array of snippets.
 * @param {bool} withSearchTokens - Should include search tokens in the result?
 * @param {string} injectIntoPrimaryTag - An additional primary tag to be injected into the snippet, if any.
 */
export const transformSnippetIndex = (
  snippets,
  withSearchTokens = false,
  injectIntoPrimaryTag = ''
) =>
  snippets.map(snippet => ({
    title: snippet.title,
    expertise: Tag.format(snippet.expertise),
    primaryTag:
      injectIntoPrimaryTag.length &&
      snippet.tags.primary !== injectIntoPrimaryTag
        ? [
            Tag.format(snippet.tags.primary),
            Tag.format(injectIntoPrimaryTag),
          ].join(', ')
        : Tag.format(snippet.tags.primary),
    language:
      snippet.language && snippet.language.long
        ? snippet.language.long
        : undefined,
    icon: snippet.icon,
    description: snippet.html.description.trim(),
    url: snippet.slug,
    ...(withSearchTokens ? { searchTokens: snippet.searchTokens } : {}),
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
  const templateProps =
    cardTemplate === 'BlogSnippetCard'
      ? {
          authors: snippet.authors,
          type: snippet.type,
          cover: snippet.cover,
        }
      : {};
  return {
    id: snippet.id,
    title: snippet.title,
    description: stripMarkdownFormat(snippet.text.short),
    url: snippet.url,
    slug: snippet.slug,
    firstSeen: snippet.firstSeen,
    lastUpdated: snippet.lastUpdated,
    expertise: Tag.format(snippet.expertise),
    language: snippet.language,
    icon: snippet.icon,
    tags: {
      primary: Tag.format(snippet.tags.primary),
      all: Tag.stripExpertise(snippet.tags.all).map(Tag.format),
    },
    html: snippet.html,
    code: snippet.code,
    ...templateProps,
  };
};
