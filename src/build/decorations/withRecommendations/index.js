import { Recommender } from 'build/utilities/recommender';

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
          snippet._recommendedSnippets = Recommender.recommendSnippets(snippet);
        }
        return snippet._recommendedSnippets;
      },
    },
  });
  return snippet;
};
