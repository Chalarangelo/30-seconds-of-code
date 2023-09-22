import { YAMLHandler } from 'blocks/utilities/yamlHandler';
// NOTE: Be very careful not to import Application in this file, as this is
// used in raw model definitions and can end up creating major issues.

/**
 * Utility for ranking snippets.
 */
export class Ranker {
  static rankerSettings = {
    keywordScoreLimit: 100,
    keywordCountLimit: 20,
  };
  static keywordScoreData = {};

  /**
   * Dynamically load keyword scores from the content configuration submodule.
   */
  static get keywordScores() {
    // Skip loading for test environment
    if (process.env.NODE_ENV === `test`) return {};
    if (!Object.keys(Ranker.keywordScoreData).length) {
      Ranker.keywordScoreData = YAMLHandler.fromFile(
        'content/rankingEngine.yaml'
      );
    }
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
      keywordScoreValues = [];

    // Add points from keywords: If the content has too many keywords, there is a
    // limit and the X most valuable will apply. Same for very high scores.
    Object.keys(Ranker.keywordScores).forEach(k => {
      if (indexableContent.includes(k))
        keywordScoreValues.push(Ranker.keywordScores[k]);
    });
    if (keywordScoreValues.length > keywordCountLimit)
      keywordScoreValues = keywordScoreValues
        .sort((a, b) => b - a)
        .slice(0, keywordCountLimit);
    score = Math.min(
      keywordScoreValues.reduce((acc, v) => acc + v, 0),
      keywordScoreLimit
    );

    // Divide by limit and return ranking
    return Math.max(0.0001, score / keywordScoreLimit);
  };
}
