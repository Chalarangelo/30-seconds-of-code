/** Removes unnecessary whitespace from template literals parsed as classNames */
export const trimWhiteSpace = (...args) => {
  const plainTexts = args[0]
    .join(' ')
    .split(' ')
    .map(v => v.trim())
    .filter(Boolean);
  const interpolations = (args || [])
    .slice(1)
    .filter(Boolean)
    .reduce((acc, v) => [...acc, ...v.split(' ')], [])
    .map(v => v.trim())
    .filter(Boolean);
  return [...new Set([...plainTexts, ...interpolations])]
    .join(' ')
    .replace(/\s+/gm, ' ')
    .trim() || undefined;
};

/** Capitalizes the first letter of a string */
export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/** Optimizes nodes in an HTML string */
export const optimizeNodes = (data, regexp, replacer) => {
  let count = 0;
  let output = data;
  do {
    output = output.replace(regexp, replacer);
    count = 0;
    while (regexp.exec(output) !== null)++count;
  } while (count > 0);
  return output;
};

/** Optimizes all nodes in an HTML string */
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
    (match, p1, p2, p3) =>
      `<span class="token operator">${p1}${p2}${p3}</span>`
  );
  // Optimize keyword nodes
  output = optimizeNodes(
    output,
    /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`
  );
  return output;
};

/** Returns an object containing the parameters of the current URL. */
export const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

/** Returns the URL without any parameters. */
export const getBaseURL = url =>
  url.indexOf('?') > 0 ? url.slice(0, url.indexOf('?')) : url;


/** Strips markdown format from a string */
export const stripMarkdownFormat = str => {
  return str
    .replace(/[`*]/g, '')
    .replace(/\n/g, '')
    .replace(/\[(.*)\]\(.*\)/g, '$1')
    .replace(/_(.*?)_/g, '$1');
};
