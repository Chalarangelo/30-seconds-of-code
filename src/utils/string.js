/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to be capitalized.
 * @param {bool} lowerRest - Should the rest of the characters be lowercased?
 */
export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/**
 * Optimizes nodes in an HTML string.
 * @param {string} data - The HTML string to be optimized.
 * @param {RegExp} regexp - The matcher for the optimization.
 * @param {string} replacer - The replacement for the matches.
 */
export const optimizeNodes = (data, regexp, replacer) => {
  let count = 0;
  let output = data;
  do {
    output = output.replace(regexp, replacer);
    count = 0;
    while (regexp.exec(output) !== null) ++count;
  } while (count > 0);
  return output;
};

/** Optimizes all nodes in an HTML string.
 * @param {string} html - The HTML string to be optimized.
 */
export const optimizeAllNodes = html => {
  let output = html;
  // Optimize punctuation nodes
  output = optimizeNodes(
    output,
    /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) =>
      `<span class="token punctuation">${p1}${p2}${p3}</span>`
  );
  // Optimize operator nodes
  output = optimizeNodes(
    output,
    /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token operator">${p1}${p2}${p3}</span>`
  );
  // Optimize keyword nodes
  output = optimizeNodes(
    output,
    /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`
  );
  return output;
};

/**
 * Returns an object containing the parameters of the current URL.
 * @param {string} url - The URL to be parsed.
 */
export const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );

/**
 * Returns the URL without any parameters.
 * @param {string} url - The URL to be parsed.
 */
export const getBaseURL = url =>
  url.indexOf('?') > 0 ? url.slice(0, url.indexOf('?')) : url;

/**
 * Returns the root URL without any parameters..
 * @param {string} url - The URL to be parsed.
 */
export const getRootURL = url => url.split('/').slice(0, 3).join('/');

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
 * Converts a slug to a SEO-friendly representation.
 * Steps:
 *  - Kebab-case
 *  - Add a '/' in the front
 * @param {string} str - The string to be converted.
 */
export const convertToSeoSlug = str => `/${toKebabCase(str)}`;

/**
 * Adds a trailing `/` to a slug, if necessary.
 * @param {string} str - The string to be converted.
 * */
export const addTrailingSlashToSlug = str => {
  if (str.includes('?'))
    return str.includes('/?') ? str : str.replace('?', '/?');
  return str.endsWith('/') ? str : `${str}/`;
};

/**
 * Replaces unsafe characters with HTML-safe ones.
 * @param {string} str - The string to be escaped.
 */
export const escapeHTML = str =>
  str
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
