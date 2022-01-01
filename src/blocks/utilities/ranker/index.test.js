import { Ranker } from '.';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

describe('Ranker', () => {
  let snippets = [];
  beforeAll(() => {
    Ranker._keywordScores = {
      iterator: 1,
      javascript: 2,
      visual: 3,
      blog: 4,
      advanced: 5,
    };
    snippets = Object.values(SnippetFactory.create('SnippetPresets'));
  });

  describe('rankSnippet', () => {
    it('returns a value between 0.0 and 1.0', () => {
      snippets.forEach(snippet => {
        const ranking = Ranker.rankSnippet(snippet);
        expect(ranking).toBeGreaterThanOrEqual(0.0);
        expect(ranking).toBeLessThanOrEqual(1.0);
      });
    });
  });
});
