/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to be capitalized.
 * @param {bool} lowerRest - Should the rest of the characters be lowercased?
 */
export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/**
 * Strips markdown format from a string.
 * @param {string} str - The markdown string to be stripped.
 */
export const stripMarkdownFormat = str => {
  return str
    .replace(/[`*]/g, '')
    .replace(/\n/g, '')
    .replace(/\[(.*)\]\(.*\)/g, '$1')
    .replace(/_(.*?)_/g, '$1');
};

/**
 * Strips HTML format from a string.
 * @param {string} str - The HTML string to be stripped.
 */
export const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

/**
 * Converts a given string to kebab-case.
 * @param {string} str - The string to be converted.
 */
export const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

/**
 * Converts a piece of HTML text to a valid id name.
 * Steps:
 *  - Strip HTML tags
 *  - Kebab-case
 * @param {string} str - The string to be converted.
 */
export const convertToValidId = str => toKebabCase(stripHTMLTags(str));
