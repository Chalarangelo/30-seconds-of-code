import { Tag } from 'blocks/utilities/tag';
import { Snippet } from 'blocks/entities/snippet';
import { ArgsError } from 'blocks/utilities/error';
import recommenderSettings from 'settings/recommendationEngine';

// Get data from configuration
const {
  recommendationCount,
  languageScoreLimit,
  primaryTagScoreLimit,
  searchTokenScoreLimit,
} = recommenderSettings;
const totalScoreLimit =
  languageScoreLimit + primaryTagScoreLimit + searchTokenScoreLimit;

/**
 * Utility for creating snippet recommendations.
 */
export class Recommender {
  static recommendSnippets = (snippet, snippets = [...Snippet.instances]) => {
    if (!(snippet instanceof Snippet)) {
      throw new ArgsError(
        "Invalid arguments. 'snippet' must be an instance of 'Snippet'."
      );
    }

    const isBlog = snippet.config.isBlog;

    // Determine relevant attributes for the snippet
    const language = (isBlog
      ? Tag.determineLanguage(snippet.tags.all).long
      : snippet.config.language.long
    ).toLowerCase();
    const primaryTag = (isBlog
      ? Tag.stripLanguage(snippet.tags.all)[0]
      : snippet.tags.primary
    ).toLowerCase();
    const searchTokens = snippet.searchTokens.split(' ');

    return snippets
      .map(s => {
        s.recommendationRanking = 0;
        // Filter out any nodes with the same id (this very snippet)
        if (
          s.id !== snippet.id &&
          s.titleSlug !== snippet.titleSlug &&
          (!snippet.isListed || s.isListed)
        ) {
          // Determine score for language:
          //  * Same language, as language = 100% of language score
          //  * Same language, but as a tag = 25% of language score
          //  * Not same language = 0% of language score
          const languageScore =
            (s.config.language && s.config.language.long === language
              ? 1
              : s.tags.all.find(t => t.toLowerCase() === language)
              ? 0.25
              : 0) * languageScoreLimit;
          // Determine primary tag score:
          //  * Same primary tag = 100% of tag score
          //  * Contains primary tag, but not primary = 50% of tag score
          //  * Doesn't contain tag = 0% of language score
          const primaryTagScore =
            (s.tags.primary.toLowerCase() === primaryTag
              ? 1
              : s.tags.all.find(t => t.toLowerCase() === primaryTag)
              ? 0.5
              : 0) * primaryTagScoreLimit;
          // Determine search token score
          const searchTokenScore =
            searchTokens.reduce(
              (a, t) =>
                (a =
                  s.searchTokens.indexOf(t) !== -1
                    ? a + 1 / searchTokens.length
                    : a),
              0
            ) * searchTokenScoreLimit;

          // Divide by the limit to get a value between 0 and 1
          s.recommendationRanking = (
            (languageScore + primaryTagScore + searchTokenScore) /
            totalScoreLimit
          ).toFixed(2);
        }
        return s;
      })
      .sort((a, b) => {
        // Rank by recommendationRanking as long as possible, otherwise by ranking
        if (a.recommendationRanking === b.recommendationRanking)
          return b.ranking - a.ranking;
        return +b.recommendationRanking - +a.recommendationRanking;
      })
      .slice(0, recommendationCount);
  };
}
