import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkUnwrapImages from 'remark-unwrap-images';
import {
  safeguardExternalLinks,
  convertHeadings,
  highlightCode,
  linkInlineCode,
  transfomImagePaths,
  wrapTables,
} from '#blocks/extractor/markdownParser/remarkPlugins';
import pathSettings from '#settings/paths';
const assetPath = `/${pathSettings.staticAssetPath}`;

export class MarkdownParser {
  static _languageData = new Map();
  static _processors = new Map();

  static setupProcessors = ({ languageData, grammars }) => {
    // Language data is a Map of language objects:
    // (key => {id, long, short, name, allLanguageReferences, references})
    MarkdownParser._languageData = [...languageData.values()].reduce(
      (languageDataMap, { short, allLanguageReferences }) => {
        const allReferences = allLanguageReferences.reduce((acc, ref) => {
          const references = languageData.get(ref).references;
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
      // * Unwrap images (`remarkUnwrapImages`)
      //   Note: this must come before `remarkRehype`, as it transforms AST nodes
      // ---------------------------------------------
      // * Parse to HTML (`remarkRehype`)
      //   Note: From this point onwards, the AST is a HAST
      //   Note: the plugins below this point transform HAST nodes
      // * Link inline code (`linkInlineCode`)
      //   Note: this uses the references passed from the extractor
      //   Note: this must come before `safeguardExternalLinks`
      // * Safeguard external links (`safeguardExternalLinks`)
      //   Note: this transform links added in `linkInlineCode`
      // * Convert headings (`convertHeadings`) inside the allowed range
      // * Transform image paths (`transfomImagePaths`) to include the asset path
      // * Wrap tables in a div (`wrapTables`)
      // * Stringify to HTML (`rehypeStringify`)
      //   Note: This produces the final HTML
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(highlightCode, { grammars })
        .use(remarkUnwrapImages)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(linkInlineCode, { references })
        .use(safeguardExternalLinks)
        .use(convertHeadings, { minLevel: 2, maxLevel: 4 })
        .use(transfomImagePaths, { assetPath })
        .use(wrapTables, { className: 'table-wrapper' })
        .use(rehypeStringify, { allowDangerousHtml: true });
      processors.set(short, processor);
      return processors;
    }, new Map());
  };

  static parseMarkdown = (markdown, languageShort = null) => {
    const processor = MarkdownParser._processors.get(
      languageShort || 'default'
    );
    return String(processor.processSync(markdown));
  };

  static parseSegments = (texts, languageShort) =>
    Object.entries(texts).reduce((result, [key, value]) => {
      if (!value.trim()) return result;

      const htmlKey = `${key}Html`;
      result[htmlKey] = MarkdownParser.parseMarkdown(value, languageShort);

      return result;
    }, {});
}
