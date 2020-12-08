import recommendationEngine from 'engines/recommendationEngine';
import { Snippet } from 'build/entities/snippet';

export const withRecommendations = snippet => {
  Object.defineProperties(snippet, {
    decorated: {
      value: true,
      writable: true,
      configurable: true,
    },
    recommendedSnippets: {
      get() {
        if (!snippet._recommendedSnippets) {
          snippet._recommendedSnippets = recommendationEngine(
            [...Snippet.instances],
            snippet
          );
        }
        return snippet._recommendedSnippets;
      },
    },
  });
  return snippet;
};
