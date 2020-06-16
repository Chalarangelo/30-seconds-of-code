import recommendationEngine from './recommendationEngine';
import recommendationEngineConfig from 'config/recommendationEngine';

import { fullSnippet, fullReactSnippet, fullBlogSnippet, fullCssSnippet, fullCssWithJsSnippet } from 'fixtures/snippets';

const snippetNodes = [
  fullSnippet,
  fullReactSnippet,
  fullBlogSnippet,
  fullCssSnippet,
  fullCssWithJsSnippet,
].map(v => ({node: v}));

let recommendedSnippets;

describe('recommendationEngine', () => {

  describe('with a normal snippet', () => {
    beforeEach(() => {
      recommendedSnippets = recommendationEngine(snippetNodes.map(n => n.node), fullSnippet);
    });

    it('should return an array of appropriate length', () => {
      expect(Array.isArray(recommendedSnippets)).toBe(true);
      expect(recommendedSnippets.length).toBe(recommendationEngineConfig.recommendationCount);
    });
  });

  describe('with a blog snippet', () => {
    beforeEach(() => {
      recommendedSnippets = recommendationEngine(snippetNodes.map(n => n.node), fullBlogSnippet);
    });

    it('should return an array of appropriate length', () => {
      expect(Array.isArray(recommendedSnippets)).toBe(true);
      expect(recommendedSnippets.length).toBe(recommendationEngineConfig.recommendationCount);
    });

  });
});
