import { withRecommendations } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { ArgsError } from 'blocks/utilities/error';
import SnippetFactory from 'test/fixtures/factories/blockSnippet';

describe('withRecommendations', () => {
  let snippet;

  beforeAll(() => {
    const snippets = SnippetFactory.create('SnippetPresets');
    snippet = snippets.snippet;
  });

  describe('constructor', () => {
    it('throws an error if called without a correct snippet', () => {
      expect(() => withRecommendations({})).toThrow(ArgsError);
    });
  });

  describe('constructed with normal snippet data', () => {
    beforeAll(() => {
      snippet = withRecommendations(snippet);
    });

    it('should return the given snippet', () => {
      expect(snippet instanceof Snippet).toBe(true);
    });

    it('should be a decorated snippet', () => {
      const { decorated } = snippet;
      expect(decorated).toBe(true);
    });

    it('should have a recommendedSnippets getter', () => {
      expect(typeof snippet.recommendedSnippets).not.toBe('undefined');
    });

    it('produces valid recommendations', () => {
      expect(snippet.recommendedSnippets.length).toBe(3);
    });
  });
});
