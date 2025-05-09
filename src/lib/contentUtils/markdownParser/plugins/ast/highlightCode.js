import { visit } from 'unist-util-visit';
import {
  parseMeta,
  getMetaString,
  getMetaRanges,
  getMetaRangeBoundaries,
} from '#src/lib/contentUtils/markdownParser/codeHighlighters/utils/metaParser.js';

/**
 * Returns the language name for the given node.
 * If the node's language is 'math', it returns 'text', too.
 * Otherwise, it returns the node's language.
 * @param {ASTNode} node - The AST node to get the language name from.
 * @returns {string} - The language name.
 */
const getLanguageName = node => {
  const languageName = node.lang || 'text';
  return languageName === 'math' ? 'text' : languageName;
};

/**
 * Parses the language and title from the language string. Only supports
 * space separated language and title, e.g. `language [title]`.
 * The title must be wrapped in square brackets.
 * (Curried function)
 *
 * @param {Object} languages - The languages object.
 * @param {ASTNode} node - The AST node to parse.
 * @returns {Object} - An object containing the extracted metadata.
 */
const createMetadataExtractor = languages => node => {
  const languageName = getLanguageName(node);
  const meta = parseMeta(node.meta || '');
  const title = getMetaString(meta, 'title')?.value || null;
  const languageStringLiteral = languages[languageName] || '';
  const highlightedLines = getMetaRanges(meta, null);
  const insertedLines = getMetaRanges(meta, 'ins');
  const deletedLines = getMetaRanges(meta, 'del');
  const foldedSections = getMetaRangeBoundaries(meta, 'collapse');

  return {
    languageName,
    title,
    languageStringLiteral,
    highlightedLines,
    insertedLines,
    deletedLines,
    foldedSections,
  };
};

/**
 * Creates attributes for the code block.
 *
 * @param {Object} metadata - The metadata object.
 * @param {Object} codeHighlighter - The code highlighter to use.
 * @returns {Object} - An object containing the HTML element's attributes.
 */
const createAttributes = (metadata, codeHighlighter) => {
  const { languageName, title, languageStringLiteral } = metadata;

  // Note: While something classless, such as `[data-code-grammar=languageName]`
  // would be nicer to look at, Prism uses the same language-X classes to target
  // nested styles. This is also the HTML5 spec suggestion for higlighting code.
  // By using a class for this plugin, consistence and compliance are ensured.
  const codeAttributes = {
    class: `language-${languageName} notranslate`,
    translate: `no`,
  };
  const preAttributes = {};

  if (languageStringLiteral)
    preAttributes[`data-code-language`] = languageStringLiteral;

  if (title) preAttributes[`data-code-title`] = title;

  if (codeHighlighter.name === 'prism')
    preAttributes[`data-code-preview`] = true;

  return { preAttributes, codeAttributes };
};

/**
 * Wraps the highlighted code in a `pre` and `code` tag, which seems to be the
 * semantically appropriate markup for this.
 * @param {string} code - The highlighted code.
 * @param {Object} attributes - Attributes produced by `createAttributes`.
 * @returns {string} - The wrapped code (HTML).
 */
const wrapHighlightedCode = (code, { preAttributes, codeAttributes }) => {
  const preAttributesString = Object.entries(preAttributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  const codeAttributesString = Object.entries(codeAttributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  return `<pre ${preAttributesString}><code ${codeAttributesString}>${code}</code></pre>`;
};

/**
 * Highlight code blocks using Prism, or Shiki.
 *
 * @param {Object} options.grammars - The grammars to load.
 * @param {Object} options.codeHighlighter - The code highlighter to use.
 */
export const highlightCode = ({ grammars, codeHighlighter }) => {
  const languages = { ...grammars };
  const extractMetadata = createMetadataExtractor(languages);

  return async tree => {
    let promises = [];

    visit(tree, `code`, node => {
      const metadata = extractMetadata(node);
      const attributes = createAttributes(metadata, codeHighlighter);
      const { languageName } = metadata;

      const promise = codeHighlighter
        .highlightCode(node.value, languageName, metadata)
        .then(highlightedCode => {
          node.type = `html`;
          node.value = wrapHighlightedCode(highlightedCode, attributes);
        });
      promises.push(promise);
    });
    await Promise.all(promises);

    return tree;
  };
};
