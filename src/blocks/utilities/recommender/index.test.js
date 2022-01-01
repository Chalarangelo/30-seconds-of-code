import { Recommender } from '.';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

describe('Recommender', () => {
  let snippets = [];
  beforeAll(() => {
    snippets = Object.values(SnippetFactory.create('SnippetPresets'));
  });

  describe('recommendSnippets', () => {
    it('returns an array of snippets with the correct length', () => {
      snippets.forEach(snippet => {
        const recommendations = Recommender.recommendSnippets(snippet);
        expect(recommendations.length).toBe(3);
      });
    });
  });
});
