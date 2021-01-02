import { withRecommendations } from '.';
import { Snippet } from 'blocks/entities/snippet';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { ArgsError } from 'blocks/utilities/error';
import { rawConfigs } from 'fixtures/blocks/contentConfigs';
import { rawSnippets } from 'fixtures/blocks/snippets';
import { Env } from 'blocks/utilities/env';

describe('withRecommendations', () => {
  let configs = {};
  let snippet, blogSnippet, unlistedSnippet, cssSnippet;

  beforeAll(() => {
    Env.setup();
    Object.keys(rawConfigs).forEach(name => {
      configs[name] = new ContentConfig(rawConfigs[name]);
    });
    snippet = new Snippet(rawSnippets.normal, configs.react);
    blogSnippet = new Snippet(rawSnippets.blog, configs.blog);
    unlistedSnippet = new Snippet(rawSnippets.normal, configs.dart);
    cssSnippet = new Snippet(rawSnippets.css, configs.css);
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
      expect(snippet.recommendedSnippets.includes(blogSnippet)).toBe(true);
      expect(snippet.recommendedSnippets.includes(cssSnippet)).toBe(true);
      expect(snippet.recommendedSnippets.includes(unlistedSnippet)).toBe(false);
    });
  });
});
