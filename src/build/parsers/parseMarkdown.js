import Remark from 'remark';
import remarkOptions from 'config/remark';
import toHAST from 'mdast-util-to-hast';
import hastToHTML from 'hast-util-to-html';
import visit from 'unist-util-visit';
import Prism from 'prismjs';
import prismComponents from 'prismjs/components';
import { escapeHTML } from 'utils';

// Setup Remark using the appropriate options.
const remark = new Remark().data('settings', remarkOptions);

/**
 * Get the real name of a language given it or an alias.
 * @param {string} name - Name or alias of a language.
 */
const getBaseLanguageName = name => {
  if (prismComponents.languages[name]) return name;
  return Object.keys(prismComponents.languages).find(language => {
    const { alias } = prismComponents.languages[language];
    if (!alias) return false;
    return Array.isArray(alias) ? alias.includes(name) : alias === name;
  });
};

/**
 * Loads prism languages on-demand (smartly doesn't load already loaded ones).
 * Throws and error if the language is invalid or not supported.
 * @param {string} language - A valid prism language name, as returned from
 * `getBaseLanguageName` or similar.
 */
const loadPrismLanguage = language => {
  if (!language) throw new Error(`Prism doesn't support language '${language}'.`);
  const languageData = prismComponents.languages[language];
  if (Prism.languages[language] || languageData.option === `default`) return;

  if (languageData.require) {
    // Load the required language first
    if (Array.isArray(languageData.require))
      languageData.require.forEach(loadPrismLanguage);
    else
      loadPrismLanguage(languageData.require);
  }

  require(`prismjs/components/prism-${language}.js`);
};

/**
 * Given some code and a language, returns the prism-highlighted code.
 * Automatically gets prim language names and loads languages on demand.
 * @param {string} language - A language name or alias.
 * @param {string} code - The code to be highlighted.
 */
const highlightCode = (language, code) => {
  if (!Prism.languages[language]) {
    const baseLanguage = getBaseLanguageName(language);
    if(!baseLanguage || baseLanguage === 'text') return escapeHTML(code);
    loadPrismLanguage(baseLanguage);
  }
  return Prism.highlight(code, Prism.languages[language], language);
};

/**
 * Parses markdown into HTML from a given markdown string, using remark + prismjs.
 * @param {string} markdown - The markdown string to be parsed.
 */
const parseMarkdown = markdown => {
  const ast = remark.parse(markdown);

  // Highlight code blocks
  visit(ast, `code`, node => {
    const languageName = node.lang ? node.lang : `text`;
    node.type = `html`;
    const highlightedCode = highlightCode(
      languageName,
      node.value
    );
    node.value = [
      `<div class="gatsby-highlight" data-language="${languageName}">`,
      `<pre class="language-${languageName}">`,
      `<code class="language-${languageName}">`,
      `${highlightedCode}`,
      `</code>`,
      `</pre>`,
      `</div>`,
    ].join('');
  });

  // Highlight inline code blocks
  visit(ast, `inlineCode`, node => {
    node.type = `html`;
    node.value = `<code>${escapeHTML(node.value)}</code>`;
  });

  const htmlAst = toHAST(ast, { allowDangerousHTML: true });
  return hastToHTML(htmlAst, { allowDangerousHTML: true });
};

export default parseMarkdown;
