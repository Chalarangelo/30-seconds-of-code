import remark from 'remark';
import remarkGfm from 'remark-gfm';
import toHAST from 'mdast-util-to-hast';
import hastToHTML from 'hast-util-to-html';
import visit from 'unist-util-visit';
import Prism from 'prismjs';
import getLoader from 'prismjs/dependencies';
import prismComponents from 'prismjs/components';
import clientLiterals from 'lang/en/client/common';
import { escapeHTML, optimizeAllNodes, convertToValidId } from 'utils';

const loader = getLoader(
  prismComponents,
  ['markup', 'javascript', 'js-extras', 'jsx', 'python', 'css', 'css-extras'],
  []
);
loader.load(id => {
  require(`prismjs/components/prism-${id}.min.js`);
});

// Setup Remark using the appropriate options.
const remarkOptions = {
  commonmark: true,
  footnotes: true,
  gfm: true,
  pedantic: true,
};
const remarkParser = new remark()
  .use(remarkGfm)
  .data('settings', remarkOptions);

const commonTransformers = [
  // Add 'rel' and 'target' to external links
  {
    matcher: /(href="https?:\/\/)/g,
    replacer: 'target="_blank" rel="nofollow noopener noreferrer" $1',
  },
  // Convert titles to the appropriate elements (h1,2,3 -> h3, h4,5,6 -> h4)
  {
    matcher: /<h([123456])>([\s\S]*?)<\/h\d>/g,
    replacer: (match, level, title) => {
      const lvl = level <= 3 ? 3 : 4;
      const fontClasses = lvl === 3 ? 'fs-lg md:fs-xl' : 'fs-md md:fs-lg';
      const id = convertToValidId(title);
      return `<h${lvl} class="card-title linkable relative mt-6 mx-0 mb-0 txt-150 f-alt ${fontClasses}">
        <a href="#${id}" id="${id}" class="fs-sm"></a>
        ${title}
      </h${lvl}>`;
    },
  },
  // Convert description code to the appropriate elements (mainly blogs)
  {
    matcher: /<pre class="language-([^"]+)" data-code-language="([^"]*)">([\s\S]*?)<\/pre>/g,
    replacer:
      '<pre class="language-$1 notranslate my-0 mx-0" data-code-language="$2">$3</pre>',
  },
  // Add a copy to clipboard button after each code block
  {
    matcher: /<\/pre>/g,
    replacer: `</pre><button class="flex-none before:fs-sm btn action-btn icon-btn icon icon-clipboard" title="${clientLiterals.copyToClipboard}" />`,
  },
  // Convert blockquotes to the appropriate elements
  {
    matcher: /<blockquote>\s*\n*\s*<p>([\s\S]*?)<\/p>\s*\n*\s<\/blockquote>/g,
    replacer: '<blockquote class="fs-md md:fs-lg">$1</blockquote>',
  },
  // Wrap blog tables in an appropriate wrapper
  {
    matcher: /<table>/g,
    replacer: '<div class="table-wrapper"><table>',
  },
  // Wrap blog tables in an appropriate wrapper
  {
    matcher: /<\/table>/g,
    replacer: '</table></div>',
  },
  // Convert blog cross tables to the appropriate elements
  {
    matcher: /<table>\s*\n*\s*<thead>\s*\n*\s*<tr>\s*\n*\s*<th><\/th>/g,
    replacer: '<table class="primary-col"><thead><tr><th></th>',
  },
];

/**
 * Parses markdown strings, returning plain objects.
 */
export class MarkdownParser {
  /**
   * Get the real name of a language given it or an alias.
   * @param {string} name - Name or alias of a language.
   */
  static _getBaseLanguageName = name => {
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
  static _loadPrismLanguage = language => {
    if (!language)
      throw new Error(`Prism doesn't support language '${language}'.`);
    const languageData = prismComponents.languages[language];

    if (Prism.languages[language] || languageData.option === `default`) return;

    if (languageData.require) {
      // Load the required language first
      if (Array.isArray(languageData.require))
        languageData.require.forEach(MarkdownParser._loadPrismLanguage);
      else MarkdownParser._loadPrismLanguage(languageData.require);
    }

    require(`prismjs/components/prism-${language}.js`);
  };

  /**
   * Given some code and a language, returns the prism-highlighted code.
   * Automatically gets prim language names and loads languages on demand.
   * @param {string} language - A language name or alias.
   * @param {string} code - The code to be highlighted.
   */
  static _highlightCode = (language, code) => {
    if (!Prism.languages[language]) {
      const baseLanguage = MarkdownParser._getBaseLanguageName(language);
      if (!baseLanguage || baseLanguage === 'text') return escapeHTML(code);
      MarkdownParser._loadPrismLanguage(baseLanguage);
    }
    return Prism.highlight(code, Prism.languages[language], language);
  };

  /**
   * Parses markdown into HTML from a given markdown string, using remark + prismjs.
   * @param {string} markdown - The markdown string to be parsed.
   */
  static parseMarkdown = (markdown, isText = false, languageData = []) => {
    const ast = remarkParser.parse(markdown);

    // Highlight code blocks
    visit(ast, `code`, node => {
      const languageName = node.lang ? node.lang : `text`;
      node.type = `html`;
      const highlightedCode = MarkdownParser._highlightCode(
        languageName,
        node.value
      );
      const languageStringLiteral =
        isText && languageData && languageData.length
          ? (
              [...languageData.values()].find(
                l => l.shortCode === languageName
              ) || {
                languageLiteral: '',
              }
            ).languageLiteral
          : '';
      node.value = isText
        ? [
            `<div class="code-highlight mt-4" data-language="${languageName}">`,
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

  static parseSegments = (
    { texts, codeBlocks },
    { isBlog, assetPath, languageData }
  ) => {
    const result = {};
    Object.entries(texts).forEach(([key, value]) => {
      if (!value) return;
      result[`${key}Html`] = value.trim()
        ? MarkdownParser.parseMarkdown(value, true, languageData)
        : '';
    });
    result.descriptionHtml = commonTransformers.reduce(
      (acc, { matcher, replacer }) => {
        return acc.replace(matcher, replacer);
      },
      result.descriptionHtml
    );
    result.fullDescriptionHtml = commonTransformers.reduce(
      (acc, { matcher, replacer }) => {
        return acc.replace(matcher, replacer);
      },
      result.fullDescriptionHtml
    );

    if (isBlog) {
      // Transform relative paths for images
      result.fullDescriptionHtml = result.fullDescriptionHtml.replace(
        /(<p>)*<img src="\.\/([^"]+)"([^>]*)>(<\/p>)*/g,
        (match, openTag, imgSrc, imgRest) => {
          const imgName = imgSrc.slice(0, imgSrc.lastIndexOf('.'));
          return `<picture>
            <source type="image/webp" srcset="${assetPath}/${imgName}.webp">
            <img class="card-fw-section" src="${assetPath}/${imgSrc}"${imgRest}>
          </picture>`;
        }
      );
    } else {
      Object.entries(codeBlocks).forEach(([key, value]) => {
        if (!value) return;
        result[`${key}CodeBlockHtml`] = value.trim()
          ? optimizeAllNodes(MarkdownParser.parseMarkdown(value)).trim()
          : '';
      });
    }
    return result;
  };
}
