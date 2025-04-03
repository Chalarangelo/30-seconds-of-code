import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import {
  safeguardExternalLinks,
  transformHeadings,
  highlightCode,
  transformAdmonitions,
  linkInlineCode,
  transfomImagePaths,
  wrapTables,
  embedCodepensFromLinks,
  loadWebComponents,
} from '#src/lib/contentUtils/markdownParser/remarkPlugins.js';
import {
  assetPath,
  componentsPublicPath,
} from '#src/lib/contentUtils/config.js';

export default class MarkdownParser {
  static _languageData = new Map();
  static _processors = new Map();

  static setupProcessors = ({ languages, grammars }) => {
    // Language data is a Map of language objects:
    // (key => {id, long, short, name, allLanguageReferences, references})
    MarkdownParser._languageData = [...languages.values()].reduce(
      (languageDataMap, { short, allLanguageReferences }) => {
        const allReferences = allLanguageReferences.reduce((acc, ref) => {
          const references = languages.get(ref).references;
          return references ? { ...acc, ...references } : acc;
        }, {});

        languageDataMap.set(short, new Map(Object.entries(allReferences)));
        return languageDataMap;
      },
      new Map()
    );

    MarkdownParser._processors = [
      ['default', new Map()],
      ...MarkdownParser._languageData.entries(),
    ].reduce((processors, [short, references]) => {
      // Processor setup:
      // * Parse markdown (`remarkParse`)
      // * Parse GitHub Flavored Markdown (`remarkGfm`)
      // * Highlight code (`highlightCode`)
      //   Note: this must come before `remarkRehype`, as it transforms AST nodes
      // * Embed Codepens from links (`embedCodepensFromLinks`)
      //   Note: this must come before `remarkRehype`, as it transforms AST nodes
      // ---------------------------------------------
      // * Parse to HTML (`remarkRehype`)
      //   Note: From this point onwards, the AST is a HAST
      //   Note: the plugins below this point transform HAST nodes
      // * Unwrap images (`rehypeUnwrapImages`)
      // * Load web components (`loadWebComponents`)
      //   Note: this dynamically loads web components scripts as modules
      // * Link inline code (`linkInlineCode`)
      //   Note: this uses the references passed from the extractor
      //   Note: this must come before `safeguardExternalLinks`
      // * Safeguard external links (`safeguardExternalLinks`)
      //   Note: this transform links added in `linkInlineCode`
      // * Transform admonitions (`transformAdmonitions`)
      // * Convert headings (`transformHeadings`) inside the allowed range
      //   Note: This also adds linkable IDs to heading elements
      // * Transform image paths (`transfomImagePaths`) to include the asset path
      // * Wrap tables in a div (`wrapTables`)
      // * Stringify to HTML (`rehypeStringify`)
      //   Note: This produces the final HTML
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(highlightCode, { grammars })
        .use(embedCodepensFromLinks, { className: 'codepen-wrapper' })
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeUnwrapImages)
        .use(loadWebComponents, { componentsPath: `/${componentsPublicPath}` })
        .use(linkInlineCode, { references })
        .use(safeguardExternalLinks)
        .use(transformAdmonitions)
        .use(transformHeadings, { minLevel: 2, maxLevel: 4 })
        .use(transfomImagePaths, { assetPath: `/${assetPath}` })
        .use(wrapTables, { className: 'table-wrapper' })
        .use(rehypeStringify, { allowDangerousHtml: true });
      processors.set(short, processor);
      return processors;
    }, new Map());
  };

  static processMarkdown = (markdown, languageShort = null) => {
    const processor = MarkdownParser._processors.get(
      languageShort || 'default'
    );
    return processor.process(markdown);
  };

  static parse = (text, languageShort) => {
    if (!text.trim()) return null;

    return MarkdownParser.processMarkdown(text, languageShort).then(html =>
      String(html)
    );
  };
}
