// NOTE: Be very careful not to import Application in this file, as this is
// used in raw model definitions and can end up creating major issues.

/**
 * Utility for creating snippet recommendations.
 */
export class Recommender {
  static recommenderSettings = {
    languageScoreLimit: 45,
    primaryTagScoreLimit: 15,
    searchTokenScoreLimit: 40,
    recommendationCount: 3,
    get totalScoreLimit() {
      return (
        this.languageScoreLimit +
        this.primaryTagScoreLimit +
        this.searchTokenScoreLimit
      );
    },
  };

  static recommendSnippets = (snippet, snippets) => {
    const {
      languageScoreLimit,
      primaryTagScoreLimit,
      searchTokenScoreLimit,
      recommendationCount,
      totalScoreLimit,
    } = Recommender.recommenderSettings;
    const language = snippet.language;
    const primaryTag = snippet.truePrimaryTag;
    const searchTokens = snippet.searchTokensArray;

    const recommendationRankings = new Map();
    let minRankings = [];

    snippets.forEach(s => {
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
          (s.language === language ? 1 : s.tags.includes(language) ? 0.25 : 0) *
          languageScoreLimit;
        // Determine primary tag score:
        //  * Same primary tag = 100% of tag score
        //  * Contains primary tag, but not primary = 50% of tag score
        //  * Doesn't contain tag = 0% of language score
        const primaryTagScore =
          (s.primaryTag === primaryTag
            ? 1
            : s.tags.includes(primaryTag)
            ? 0.5
            : 0) * primaryTagScoreLimit;
        // Determine search token score
        const searchTokenScore =
          searchTokens.reduce(
            (a, t) =>
              (a = s.searchTokens.includes(t)
                ? a + 1 / searchTokens.length
                : a),
            0
          ) * searchTokenScoreLimit;

        // Divide by the limit to get a value between 0 and 1
        const recommendationRanking = (
          (languageScore + primaryTagScore + searchTokenScore) /
          totalScoreLimit
        ).toFixed(2);

        // Performance optimization to minimize the number of times we have to
        // sort afterwards. As soon as the minimum amount of snippets has been
        // considered, we can start trimming off any snippets below the lowest
        // snippet's recommendation ranking.
        if (recommendationRanking > 0) {
          if (minRankings.length < recommendationCount) {
            // First 3 snippets are always added
            minRankings.push(recommendationRanking);
            minRankings.sort((a, b) => a - b);
          } else {
            // If the new ranking is lower than the lowest ranking, ignore it
            if (recommendationRanking < minRankings[0]) {
              return;
            } else {
              // Otherwise, replace the lowest ranking with the new ranking
              minRankings.push(recommendationRanking);
              minRankings.sort((a, b) => a - b);
              minRankings.shift();
            }
          }
          recommendationRankings.set(s.id, [recommendationRanking, s.ranking]);
        }
      }
    });

    return [...recommendationRankings.entries()]
      .sort(
        (
          [, [aRecommendationRanking, aRanking]],
          [, [bRecommendationRanking, bRanking]]
        ) => {
          // Rank by recommendationRanking as long as possible, otherwise by ranking
          if (aRecommendationRanking === bRecommendationRanking)
            return bRanking - aRanking;
          return +bRecommendationRanking - +aRecommendationRanking;
        }
      )
      .slice(0, recommendationCount)
      .map(([id]) => id);
  };
}
