import { determineLanguageFromTags, stripLanguageFromTags } from 'build/transformers';
import recommendationEngine from 'config/recommendationEngine';

// Get data from configuration
const {
  recommendationCount,
  languageScoreLimit,
  primaryTagScoreLimit,
  searchTokenScoreLimit,
} = recommendationEngine;
const totalScoreLimit = languageScoreLimit + primaryTagScoreLimit + searchTokenScoreLimit;

/**
 * Given a snippet context and the snippet nodes, recommend relevent snippets.
 * @param {object} snippetNodes - The snippet nodes to use for recommendations.
 * @param {object} snippetContext - The snippet for which to recommend.
 */
const determineRecommendedSnippets = (snippetNodes, snippetContext) => {
  // Determine relevant attributes for the snippet
  const language = (snippetContext.blog
    ? determineLanguageFromTags(snippetContext.tags.all).long
    : snippetContext.language.long).toLowerCase();
  const primaryTag = (snippetContext.blog
    ? stripLanguageFromTags(snippetContext.tags.all)[0]
    : snippetContext.tags.primary).toLowerCase();
  const searchTokens = snippetContext.searchTokens.split(' ');

  return snippetNodes
    .map(v => {
      // Filter out any nodes with the same id (this very snippet)
      if(v.id === snippetContext.id)
        v.recommendationRanking = 0;
      else {
        // Determine score for language:
        //  * Same language, as language = 100% of language score
        //  * Same language, but as a tag = 25% of language score
        //  * Not same language = 0% of language score
        const languageScore = (
          v.language && v.language.long === language ? 1
            : v.tags.all.find(t => t.toLowerCase() === language) ? 0.25
              : 0
        ) * languageScoreLimit;
        // Determine primary tag score:
        //  * Same primary tag = 100% of tag score
        //  * Contains primary tag, but not primary = 50% of tag score
        //  * Doesn't contain tag = 0% of language score
        const primaryTagScore = (
          v.tags.primary.toLowerCase() === primaryTag ? 1
            : v.tags.all.find(t => t.toLowerCase() === primaryTag) ? 0.5
              : 0
        ) * primaryTagScoreLimit;
        // Determine search token score
        const searchTokenScore = searchTokens.reduce(
          (a, t) => a = v.searchTokens.indexOf(t) !== -1 ? a + 1 / searchTokens.length : a, 0
        ) * searchTokenScoreLimit;

        // Divide by the limit to get a value between 0 and 1
        v.recommendationRanking = ((languageScore + primaryTagScore + searchTokenScore) / totalScoreLimit).toFixed(2);
      }
      return v;
    }).sort((a, b) => {
      // Rank by recommendationRanking as long as possible, otherwise by ranking
      if (a.recommendationRanking === b.recommendationRanking)
        return b.ranking - a.ranking;
      return +b.recommendationRanking - +a.recommendationRanking;
    })
    .slice(0, recommendationCount);
};

export default determineRecommendedSnippets;
