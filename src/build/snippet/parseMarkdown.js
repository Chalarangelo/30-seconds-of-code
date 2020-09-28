import Remark from 'remark';
import remarkOptions from 'config/remark';
import toHAST from 'mdast-util-to-hast';
import hastToHTML from 'hast-util-to-html';
import visit from 'unist-util-visit';
import Prism from 'prismjs';
import prismComponents from 'prismjs/components';
import { escapeHTML, optimizeAllNodes } from 'utils';

// Setup Remark using the appropriate options.
const remark = new Remark().data('settings', remarkOptions);

const transformers = [
  // Inject class into blog lists' <ol> elements
  {
    blogType: 'blog.list',
    matcher: /<ol>/g,
    replacer: '<ol class="blog-list">',
  },
  // Inject paragraphs and class into blog lists' <li> elements
  {
    blogType: 'blog.list',
    matcher: /<li>\n*(.+?)\n((?!<li>).+?)\n*<\/li>/g,
    replacer: '<li class="blog-list-item">$1</p><p>$2</li>',
  },
  // Add 'rel' and 'target' to external links
  {
    blogType: 'any',
    matcher: /(href="https?:\/\/)/g,
    replacer: 'target="_blank" rel="nofollow noopener noreferrer" $1',
  },
  // Convert blog post code to the appropriate elements
  {
    blogType: 'any',
    matcher: /<pre class="language-([^"]+)" data-code-language="([^"]*)">([\s\S]*?)<\/pre>/g,
    replacer: '<pre class="blog-code language-$1 notranslate" data-code-language="$2">$3</pre>',
  },
  // Convert blog blockquotes to the appropriate elements
  {
    blogType: 'any',
    matcher: /<blockquote>\s*\n*\s*<p>([\s\S]*?)<\/p>\s*\n*\s<\/blockquote>/g,
    replacer: '<blockquote class="blog-quote">$1</blockquote>',
  },
  // Convert image credit to the appropriate element
  {
    blogType: 'any',
    matcher: /<p>\s*\n*\s*<strong>Image credit:<\/strong>([\s\S]*?)<\/p>/g,
    replacer: '<p class="blog-image-credit">Image credit: $1</p>',
  },
];

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
const parseMarkdown = (markdown, isText = false, langData = []) => {
  const ast = remark.parse(markdown);

  // Highlight code blocks
  visit(ast, `code`, node => {
    const languageName = node.lang ? node.lang : `text`;
    node.type = `html`;
    const highlightedCode = highlightCode(
      languageName,
      node.value
    );
    const languageStringLiteral = isText && langData && langData.length
      ? (langData.find(l => l.shortCode === languageName) || { languageLiteral: ''}).languageLiteral
      : '';
    node.value = isText
      ? [
        `<div class="gatsby-highlight" data-language="${languageName}">`,
        `<pre class="language-${languageName}" data-code-language="${languageStringLiteral}">`,
        `${highlightedCode.trim()}`,
        `</pre>`,
        `</div>`,
      ].join('')
      : `${highlightedCode}`;
  });

  // Highlight inline code blocks
  visit(ast, `inlineCode`, node => {
    node.type = `html`;
    node.value = `<code class="notranslate">${escapeHTML(node.value)}</code>`;
  });

  const htmlAst = toHAST(ast, { allowDangerousHtml: true });
  return hastToHTML(htmlAst, { allowDangerousHtml: true });
};

const parseMarkdownSegments = ({texts, codeBlocks}, {isBlog, type, assetPath, langData}) => {
  const result = {};
  Object.entries(texts).forEach(([key, value]) => {
    if(!value) return;
    result[key] = value.trim() ? parseMarkdown(value, true, langData) : '';
  });
  if (isBlog) {
    result.fullDescription = transformers.reduce(
      (acc, { blogType, matcher, replacer }) => {
        if (blogType === 'any' || blogType === type)
          return acc.replace(matcher, replacer);
        return acc;
      },
      result.fullDescription
    );
    // Transform relative paths for images
    result.fullDescription = result.fullDescription.replace(
      /(<p>)*<img src="\.\/([^"]+)"([^>]*)>(<\/p>)*/g,
      (match, openTag, imgSrc, imgRest) =>
        `<img class="card-image" src="${assetPath}${imgSrc}"${imgRest}>`
    );
  } else {
    Object.entries(codeBlocks).forEach(([key, value]) => {
      if(!value) return;
      result[key] = value.trim() ? optimizeAllNodes(parseMarkdown(value)).trim() : '';
    });
  }
  return result;
};

export default parseMarkdownSegments;
