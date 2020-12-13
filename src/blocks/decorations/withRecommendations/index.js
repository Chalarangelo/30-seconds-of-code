import { Recommender } from 'blocks/utilities/recommender';
import { ArgsError } from 'blocks/utilities/error';
import { Snippet } from 'blocks/entities/snippet';

/**
 * Decorates a given snippet, adding the `recommendedSnippets` property.
 * @param {Snippet} snippet - The snippet to be decorated.
 * @returns {Snippet} The decorated snippet.
 * @throws Will throw an error if `snippet` is not an instance of `Snippet`.
 */
export const withRecommendations = snippet => {
  if (!(snippet instanceof Snippet)) {
    throw new ArgsError(
      "Invalid arguments. 'snippet' must be an instance of 'Snippet'."
    );
  }

  Object.defineProperties(snippet, {
    // Note: this is currently unused, but could be a potential common interface
    // for all decorators in the future.
    decorated: {
      value: true,
      writable: true,
      configurable: true,
    },
    // Note: The `recommendedSnippets` getter should only be executed once all of
    // the snippets have been loaded, otherwise it will produce incomplete recommendations.
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
