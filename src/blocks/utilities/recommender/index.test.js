import { Recommender } from '.';
import { ArgsError } from 'blocks/utilities/error';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

describe('Recommender', () => {
  let snippets = [];
  beforeAll(() => {
    snippets = Object.values(SnippetFactory.create('SnippetPresets'));
  });

  describe('recommendSnippets', () => {
    it('throws if snippet is not of the correct type', () => {
      expect(() => Recommender.recommendSnippets({})).toThrow(ArgsError);
    });

    it('returns an array of snippets with the correct length', () => {
      snippets.forEach(snippet => {
        const recommendations = Recommender.recommendSnippets(snippet);
        expect(recommendations.length).toBe(3);
      });
    });
  });
});
