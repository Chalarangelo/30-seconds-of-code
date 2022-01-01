import { JSONHandler } from 'blocks/utilities/jsonHandler';
import pathSettings from 'settings/paths';
import rankerSettings from 'settings/rankingEngine';

// Get data from configuration
const { keywordScoreLimit, keywordCountLimit, freshnessLimit } = rankerSettings;
const totalScoreLimit = keywordScoreLimit + freshnessLimit;
const oneDayMs = 86400000;
const nowMs = +new Date();

/**
 * Utility for ranking snippets.
 */
export class Ranker {
  /**
   * Dynamically load keyword scores from the content configuration submodule.
   */
  static get keywordScores() {
    // Skip loading for test environment
    if (process.env.NODE_ENV === `test`) return {};
    if (!Ranker._keywordScores) {
      const { rawContentConfigsPath: configsPath } = pathSettings;
      Ranker._keywordScores = JSONHandler.fromFile(
        `${configsPath}/rankingEngine.json`
      );
    }
    return Ranker._keywordScores;
  }
  /**
   * Given a snippet object produce a ranking between 0 and 1.
   * @param {Snippet} snippet - The snippet to be ranked.
   * @returns {number} A value between 0.0 and 1.0.
   * @throws Will throw an error if `snippet` is not an instance of `Snippet`.
   */
  static rankSnippet = snippet => {
    // Initialize scoring variables
    let score = 0,
      keywordScoreValues = [];

    // Combine content for indexing
    const indexableContent = [
      snippet.title,
      ...snippet.tags,
      (snippet.repository.language && snippet.repository.language.long) || '',
      (snippet.type || '.').split('.')[0],
      (snippet.code && snippet.code.src) || '',
      (snippet.code && snippet.code.css) || '',
      (snippet.code && snippet.code.html) || '',
      (snippet.code && snippet.code.js) || '',
      (snippet.code && snippet.code.style) || '',
      snippet.text.full || '',
      snippet.text.short || '',
    ]
      .join(' ')
      .toLowerCase();

    // Add points from keywords: If the snippet has too many keywords, there is a
    // limit and the X most valuable will apply. Same for very high scores.
    Object.keys(Ranker.keywordScores).forEach(k => {
      if (indexableContent.indexOf(k) !== -1)
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

    // Calculate freshness in days
    const firstSeen = (nowMs - +snippet.firstSeen) / oneDayMs;

    // Add points from freshness, using a kind of lookup table
    if (firstSeen === 1) score += freshnessLimit;
    else if (firstSeen === 2) score += 0.85 * freshnessLimit;
    else if (firstSeen <= 4) score += 0.7 * freshnessLimit;
    else if (firstSeen <= 6) score += 0.45 * freshnessLimit;
    else if (firstSeen <= 10) score += 0.25 * freshnessLimit;
    else if (firstSeen <= 14) score += 0.1 * freshnessLimit;

    const biasPenaltyMultiplier = snippet.repository.biasPenaltyMultiplier
      ? snippet.repository.biasPenaltyMultiplier
      : 1.0;
    // Divide by limit, applying the bias multiplier, and return ranking
    return +Math.max(
      0.0001,
      score / (totalScoreLimit * biasPenaltyMultiplier)
    ).toFixed(4);
  };
}
