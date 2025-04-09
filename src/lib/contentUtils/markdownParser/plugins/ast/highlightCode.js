import { visit } from 'unist-util-visit';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

// Parse the language and title from the language string. Only supports
// space separated language and title, e.g. `language [title]`.
// The title must be wrapped in square brackets.
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
  const languageName = node.lang || 'text';
  const title = node.meta?.replace('[', '').replace(']', '') || null;
  const languageStringLiteral = languages[languageName] || '';

  return { languageName, title, languageStringLiteral };
};

/**
 * Creates attributes for the code block.
 *
 * @param {Object} metadata - The metadata object.
 * @returns {Object} - An object containing the HTML element's attributes.
 */
const createAttributes = metadata => {
  const { languageName, title, languageStringLiteral } = metadata;

  // Note: While something classless, such as
  // `[data-code-grammar=languageName]` whould be nicer to look at, Prism
  // uses the same language-X classes to target nested styles. By using
  // a class for this plugin, consistence and compliance are ensured.
  const attributes = {
    class: `language-${languageName} notranslate`,
    translate: `no`,
  };

  if (languageStringLiteral)
    attributes[`data-code-language`] = languageStringLiteral;

  if (title) attributes[`data-code-title`] = title;

  return attributes;
};

/**
 * Highlight code blocks using Prism.js.
 *
 * @param {Object} options.grammars - The grammars to load for Prism.js.
 */
export const highlightCode = ({ grammars }) => {
  const languages = { ...grammars };
  const extractMetadata = createMetadataExtractor(languages);
  // Load Prism grammars
  loadLanguages(Object.keys(languages));

  return async tree => {
    let promises = [];

    visit(tree, `code`, node => {
      const metadata = extractMetadata(node);
      const attributes = createAttributes(metadata);
      const { languageName } = metadata;

      const promise = Promise.resolve(
        Prism.highlight(node.value, Prism.languages[languageName], languageName)
      ).then(highlightedCode => {
        // Inject a `--hex-color` style into nodes with the `.hexcode.color` class.
        // This is then used by CSS to display a color swatch next to the hex code.
        if (languageName === 'css') {
          highlightedCode = highlightedCode.replace(
            /hexcode color">(#[0-9a-f]+)/g,
            `hexcode color" style="--hex-color:$1">$1`
          );
        }

        node.type = `html`;
        node.value = `<pre
          ${Object.entries(attributes).reduce(
            (acc, [key, value]) => `${acc} ${key}="${value}"`,
            ``
          )}>${highlightedCode.trim()}</pre>`;
      });
      promises.push(promise);
    });
    await Promise.all(promises);

    return tree;
  };
};
