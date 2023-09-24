import { MarkdownParser } from 'blocks/extractor/markdownParser';

describe('MarkdownParser', () => {
  let snippetResult;

  beforeAll(() => {
    snippetResult = MarkdownParser.parseSegments(
      {
        fullDescription: 'This is a `snippet` *description*.',
        description: 'This is...',
      },
      []
    );
  });

  describe('parseSegments', () => {
    it('returns the correct results for any snippet', () => {
      expect(Object.keys(snippetResult).sort()).toEqual(
        ['descriptionHtml', 'fullDescriptionHtml'].sort()
      );
    });
  });
});
