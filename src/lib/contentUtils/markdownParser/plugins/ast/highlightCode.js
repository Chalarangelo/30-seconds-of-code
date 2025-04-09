import { visit } from 'unist-util-visit';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

/**
 * Highlight code blocks using Prism.js.
 *
 * @param {Object} options.grammars - The grammars to load for Prism.js.
 */
export const highlightCode = ({ grammars }) => {
  const languages = { ...grammars };
  // Load Prism grammars
  loadLanguages(Object.keys(languages));

  return tree => {
    visit(tree, `code`, node => {
      // Parse the language and title from the language string. Only supports
      // space separated language and title, e.g. `language [title]`.
      // The title must be wrapped in square brackets.
      const languageName = node.lang || 'text';
      const title = node.meta?.replace('[', '').replace(']', '') || null;
      node.type = `html`;

      let highlightedCode = Prism.highlight(
        node.value,
        Prism.languages[languageName],
        languageName
      );

      // Inject a `--hex-color` style into nodes with the `.hexcode.color` class.
      // This is then used by CSS to display a color swatch next to the hex code.
      if (languageName === 'css') {
        highlightedCode = highlightedCode.replace(
          /hexcode color">(#[0-9a-f]+)/g,
          `hexcode color" style="--hex-color:$1">$1`
        );
      }

      const languageStringLiteral = languages[languageName] || '';

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

      node.value = `<pre
        ${Object.entries(attributes).reduce(
          (acc, [key, value]) => `${acc} ${key}="${value}"`,
          ``
        )}>${highlightedCode.trim()}</pre>`;
    });
  };
};
