// NOTE: Be very careful not to import Application in this file, as this is
// used in raw model definitions and can end up creating major issues.

/**
 * Utility for creating snippet recommendations.
 */
export class Recommender {
  static recommenderSettings = {
    // Language
    languageScoreLimit: 45,
    fullLanguageScore: 45,
    // Primary Tag
    primaryTagScoreLimit: 15,
    fullPrimaryTagScore: 15,
    halfPrimaryTagScore: 8, // Rounded up to 8 instead of 7.5
    // Search tokens
    searchTokenScoreLimit: 40,
    // Total
    // languageScoreLimit + primaryTagScoreLimit + searchTokenScoreLimit
    totalScoreLimit: 100,
    // Total without language
    // (primaryTagScoreLimit + searchTokenScoreLimit) / totalScoreLimit
    scoreLimitWithoutLanguage: 0.55,
    // Total without language and primary tag
    // searchTokenScoreLimit / totalScoreLimit
    scoreLimitWithoutLanguageAndPrimaryTag: 0.4,
    recommendationCount: 3,
  };

  static recommendSnippets = (snippet, snippets) => {
    const {
      fullLanguageScore,
      fullPrimaryTagScore,
      halfPrimaryTagScore,
      searchTokenScoreLimit,
      recommendationCount,
      totalScoreLimit,
      scoreLimitWithoutLanguage,
      scoreLimitWithoutLanguageAndPrimaryTag,
    } = Recommender.recommenderSettings;
    // Performance optimization - destructure and cache these, it's just faster
    const {
      id,
      fileSlug,
      language,
      primaryTag,
      searchTokensArray: searchTokens,
      isListed,
    } = snippet;
    const searchTokensLength = searchTokens.length;

    const recommendationRankings = new Map();
    let minRankings = [];

    snippets.forEach(s => {
      // Performance optimization - destructure and cache these, it's just faster
      const {
        id: _id,
        fileSlug: _fileSlug,
        isListed: _isListed,
        language: _language,
        tags: _tags,
        searchTokensArray: _searchTokens,
      } = s;

      // Cache the minimum ranking so far
      const minRanking = minRankings[0] || 0;

      // Filter out any nodes with the same id (this very snippet)
      if (_id !== id && _fileSlug !== fileSlug && (!isListed || _isListed)) {
        // Performance optimization - if language score is 0 and the minimum
        // recommendation score is greater than the score limit without language,
        // then we can skip the rest of the calculations.
        const isSameLanguage = _language === language;
        if (!isSameLanguage && minRanking > scoreLimitWithoutLanguage) return;

        // Determine score for language:
        //  * Same language, as language = 100% of language score
        //  * Not same language = 0% of language score
        const languageScore = isSameLanguage ? fullLanguageScore : 0;

        // Performance optimization - if both language and primary tag scores are
        // 0 and the minimum recommendation score is greater than the score limit
        // without language and primary tag, then we can skip the rest of the
        // calculations.
        const primaryTagIndex = isSameLanguage ? _tags.indexOf(primaryTag) : -1;
        if (
          !isSameLanguage &&
          primaryTagIndex === -1 &&
          minRanking > scoreLimitWithoutLanguageAndPrimaryTag
        )
          return;

        // Determine primary tag score:
        //  * Different language = 0% of tag score
        //  * Same primary tag = 100% of tag score
        //  * Contains primary tag, but not primary = 50% of tag score
        //  * Doesn't contain tag = 0% of language score
        const primaryTagScore =
          primaryTagIndex === -1
            ? 0
            : primaryTagIndex === 0
            ? fullPrimaryTagScore
            : halfPrimaryTagScore;

        // Determine search token score:
        //  * Count found tokens and divide by total number of tokens
        const searchTokenScore =
          (searchTokens.reduce(
            (a, t) => (_searchTokens.includes(t) ? a + 1 : a),
            0
          ) /
            searchTokensLength) *
          searchTokenScoreLimit;

        // Divide by the limit to get a value between 0 and 1
        const recommendationRanking =
          (languageScore + primaryTagScore + searchTokenScore) /
          totalScoreLimit;

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
              minRankings[0] = recommendationRanking;
              minRankings.sort((a, b) => a - b);
            }
          }
          recommendationRankings.set(_id, [recommendationRanking, s.ranking]);
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
