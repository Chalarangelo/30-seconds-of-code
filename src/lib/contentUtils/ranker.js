/**
 * Utility for ranking snippets.
 */
export default class Ranker {
  static rankerSettings = {
    keywordScoreLimit: 100,
    keywordCountLimit: 20,
  };
  static keywordScoreData = {};

  static set keywordScores(data) {
    Ranker.keywordScoreData = Object.fromEntries(
      Object.entries(data).sort(([, a], [, b]) => b - a)
    );
  }

  static get keywordScores() {
    return Ranker.keywordScoreData;
  }

  /**
   * Given an indexable content string, produce a ranking between 0 and 1.
   * @param {string} indexableContent - The content to be ranked.
   * @returns {number} A value between 0.0 and 1.0.
   */
  static rankIndexableContent = indexableContent => {
    const { keywordScoreLimit, keywordCountLimit } = Ranker.rankerSettings;
    // Initialize scoring variables
    let score = 0,
      count = 0;

    // Add points from keywords: If the content has too many keywords, there is a
    // limit and the X most valuable will apply. Same for very high scores.
    for (let k in Ranker.keywordScores) {
      if (indexableContent.includes(k)) {
        score += Ranker.keywordScores[k];
        count++;
      }
      if (count >= keywordCountLimit || score >= keywordScoreLimit) break;
    }

    score = Math.min(score, keywordScoreLimit);

    // Divide by limit and return ranking
    return Math.max(0.0001, score / keywordScoreLimit);
  };
}
