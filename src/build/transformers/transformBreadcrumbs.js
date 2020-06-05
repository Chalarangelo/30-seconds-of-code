import { transformTagName } from './transformTags';
/**
 * Given a snippet object with key-value pairs, create the necessary breadcrumb data.
 * Used in snippet pages to render breadcrumbs and set up structured data.
 * @param {object} snippet - A snippet object.
 * @param {string} cardTemplate - A string that determines the card template.
 */
export const transformBreadcrumbs = (snippet, cardTemplate) => {
  const slugParts = snippet.slug.split('/').filter(Boolean).slice(0, -2);
  let breadcrumbs = [
    {
      url: `/${slugParts[0]}/p/1`,
      name: cardTemplate === 'BlogSnippetCard' ? transformTagName('blog') : snippet.language.long,
    },
  ];

  if(cardTemplate !== 'BlogSnippetCard') {
    breadcrumbs.push({
      url: `/${slugParts[0]}/${snippet.tags.primary.toLowerCase()}/p/1`,
      name: `${snippet.language.long} ${transformTagName(snippet.tags.primary)}`,
    });
  }

  return breadcrumbs;
};
