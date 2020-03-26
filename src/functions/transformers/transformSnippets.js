import { stripMarkdownFormat } from 'functions/utils';
import { transformTagName } from './transformTags';
import literals from 'lang/en/snippet';

/**
* Transform the indexed snippets to the appropriate format.
*
* Used in listing pages to render snippet previews.
*/
export const transformSnippetIndex = edges =>
  edges
    .map(edge => edge.node)
    .map(node => ({
      title: node.title,
      expertise: transformTagName(node.expertise),
      primaryTag: transformTagName(node.tags.primary),
      language: node.language && node.language.long ? node.language.long : undefined,
      icon: node.icon,
      description: node.html.description.trim(),
      url: node.slug,
      searchTokens: node.searchTokens,
    }));

/**
* Given a snippet object with key-value pairs, creates an appropriate description.
*
* Used in snippet pages to render the page description.
*/
export const transformSnippetDescription = (snippet, cardTemplate) =>
  cardTemplate === 'blog'
    ? stripMarkdownFormat(snippet.text.short)
    : literals.pageDescription(snippet.title, snippet.language.long);

/**
* Given a snippet object with key-value pairs, removes all unnecessary
* information that should not be sent to the JSX component rendering the snippet.
*
* Used in snippet pages to render individual snippets.
*/
export const transformSnippetContext = (snippet, cardTemplate, imageContext) => {
  let templateProps = {};
  switch (cardTemplate) {
  case 'blog':
    templateProps = {
      authors: snippet.authors,
      type: snippet.blogType,
      cover:
          imageContext.find(
            v => v.node.absolutePath.includes(snippet.cover)
          ).node.childImageSharp.fluid,
    };
    break;
  case 'css':
    templateProps = {
      browserSupport: snippet.browserSupport,
    };
    break;
  default:
    templateProps = {
    };
    break;
  }
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
