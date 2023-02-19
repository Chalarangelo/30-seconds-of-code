import { MarkdownParser } from 'blocks/extractor/markdownParser';

describe('MarkdownParser', () => {
  let snippetResult, blogResult;
  beforeAll(() => {
    snippetResult = MarkdownParser.parseSegments(
      {
        texts: {
          fullDescription: 'This is a `snippet` *description*.',
          description: 'This is...',
        },
        codeBlocks: {
          src: '```js\nHello\n```',
          example: '```js\nHi\n```',
        },
      },
      {
        isBlog: false,
        assetPath: '/assets',
        languageData: [],
        languageKeys: [],
      }
    );
    blogResult = MarkdownParser.parseSegments(
      {
        texts: {
          fullDescription: 'This is a **blog**.\n\n* Hi\n* Hello\n',
          description: 'This is...',
        },
        codeBlocks: {},
      },
      {
        isBlog: true,
        assetPath: '/assets',
        languageData: [],
        languageKeys: [],
      }
    );
  });

  describe('parseSegments', () => {
    it('returns the correct results for normal snippets', () => {
      expect(Object.keys(snippetResult).sort()).toEqual(
        [
          'descriptionHtml',
          'exampleCodeBlockHtml',
          'fullDescriptionHtml',
          'srcCodeBlockHtml',
        ].sort()
      );
    });

    it('returns the correct results for blog snippets', () => {
      expect(Object.keys(blogResult).sort()).toEqual(
        ['descriptionHtml', 'fullDescriptionHtml'].sort()
      );
    });
  });
});
