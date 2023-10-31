import { createRequire } from 'module';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';
import { visit } from 'unist-util-visit';
import { visitParents } from 'unist-util-visit-parents';
import { selectAll } from 'unist-util-select';
import Prism from 'prismjs';
import getLoader from 'prismjs/dependencies.js';
import prismComponents from 'prismjs/components.js';
import { escapeHTML, convertToValidId } from '#utils';
import pathSettings from '#settings/paths';

const require = createRequire(import.meta.url);

const assetPath = `/${pathSettings.staticAssetPath}`;
const loader = getLoader(
  prismComponents,
  [
    'markup',
    'javascript',
    'js-extras',
    'jsx',
    'python',
    'css',
    'css-extras',
    'shell',
  ],
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

const textTransformers = [
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
      return `<h${lvl} class="hash-link relative mt-6 mx-0 mb-0 txt-150 f-alt lh-tight ${fontClasses}">
        <a href="#${id}" id="${id}" class="fs-sm lnk-no-animation flex flex-col j-center"></a>
        ${title}
      </h${lvl}>`;
    },
  },
  // Convert blockquotes to the appropriate elements
  {
    matcher: /<blockquote>\s*\n*\s*<p>([\s\S]*?)<\/p>\s*\n*\s<\/blockquote>/g,
    replacer:
      '<blockquote class="fs-md md:fs-lg pl-6 mt-4 mb-2 mx-0 f-italic">$1</blockquote>',
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
  // Tranform relative paths for images
  {
    matcher: /(<p>)*<img src="\.\/([^"]+)"([^>]*)>(<\/p>)*/g,
    replacer: (match, openTag, imgSrc, imgRest) => {
      const imgName = imgSrc.slice(0, imgSrc.lastIndexOf('.'));
      if (imgSrc.endsWith('.png') || imgSrc.endsWith('.svg')) {
        return `<img src="${assetPath}/${imgSrc}"${imgRest}>`;
      }
      return `<picture>
          <source type="image/webp" srcset="${assetPath}/${imgName}.webp">
          <img src="${assetPath}/${imgSrc}"${imgRest}>
        </picture>`;
    },
  },
];

/**
 * Parses markdown strings, returning plain objects.
 */
export class MarkdownParser {
  static _languageData = new Map();

  /**
   * Caches the language data for later use.
   * @param {Map} languageData - A map of language names to language data.
   */
  static loadLanguageData = languageData => {
    MarkdownParser._languageData = languageData;
  };

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
  static parseMarkdown = (markdown, isText = false, referenceKeys = null) => {
    const languageData = MarkdownParser._languageData;
    const ast = remarkParser.parse(markdown);

    const languageObjects = {};

    if (referenceKeys && referenceKeys.length > 0)
      referenceKeys.forEach(key => {
        const languageObject = [...languageData.values()].find(
          l => l.short === key
        );
        if (languageObject) languageObjects[key] = languageObject;
      });

    // Highlight code blocks
    let codeNodeIndex = -1;
    let languageStringLiteralList = [];
    visit(ast, `code`, node => {
      codeNodeIndex++;
      const languageName = node.lang ? node.lang : `text`;
      node.type = `html`;

      const highlightedCode = MarkdownParser._highlightCode(
        languageName,
        node.value
      );

      const languageObject =
        isText && languageData && languageData.length
          ? [...languageData.values()].find(l => l.short === languageName)
          : null;
      const languageStringLiteral = languageObject ? languageObject.name : '';
      if (languageObject && !languageObjects[languageName])
        languageObjects[languageName] = languageObject;

      node.value = isText
        ? [
            `<pre class="language-${languageName} notranslate" data-code-language="${languageStringLiteral}" translate="no">`,
            `${highlightedCode.trim()}`,
            `</pre>`,
          ].join('')
        : `${highlightedCode}`;

      node.cni = codeNodeIndex;
      node.lsl = languageStringLiteral;
      languageStringLiteralList.push(languageStringLiteral);
    });

    // Revisit code blocks, find the last if necessary and change the language
    // to 'Examples'. Should only match 2 consecutive code blocks of the same
    // language and only once for the very last block on the page.
    selectAll('html + html', ast).forEach(node => {
      if (
        node.cni === codeNodeIndex &&
        languageStringLiteralList.slice(-2)[0] === node.lsl
      ) {
        node.value = node.value.replace(
          `data-code-language="${node.lsl}"`,
          'data-code-language="Examples"'
        );
      }
    });

    const references = new Map(
      Object.values(languageObjects)
        .map(obj => obj.references)
        .reduce((acc, val) => {
          try {
            return [...acc, ...val];
          } catch (e) {
            console.log(languageObjects);
            console.log(val);
            return acc;
          }
        }, [])
    );

    // Highlight inline code blocks
    visitParents(ast, `inlineCode`, (node, ancestors) => {
      const text = node.value;
      let newValue = `<code class="notranslate" translate="no">${escapeHTML(
        text
      )}</code>`;

      if (
        references.size &&
        !['link', 'heading'].includes(ancestors[ancestors.length - 1].type)
      ) {
        if (references.has(text)) {
          newValue = `<a href="${references.get(
            text
          )}" target="_blank" rel="noopener noreferrer">${newValue}</a>`;
        }
      }
      node.type = `html`;
      node.value = newValue;
    });

    const htmlAst = toHast(ast, { allowDangerousHtml: true });
    return toHtml(htmlAst, { allowDangerousHtml: true });
  };

  static parseSegments = (texts, languageKeys) =>
    Object.entries(texts).reduce((result, [key, value]) => {
      if (!value.trim()) return result;

      const htmlKey = `${key}Html`;
      result[htmlKey] = MarkdownParser.parseMarkdown(value, true, languageKeys);
      result[htmlKey] = textTransformers.reduce(
        (acc, { matcher, replacer }) => {
          return acc.replace(matcher, replacer);
        },
        result[htmlKey]
      );

      return result;
    }, {});
}
