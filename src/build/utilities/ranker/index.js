import { Snippet } from 'build/entities/snippet';
import { ArgsError } from 'build/utilities/error';
import rankerSettings from 'settings/rankingEngine';

// Get data from configuration
const {
  keywordScores,
  keywordScoreLimit,
  keywordCountLimit,
  freshnessLimit,
} = rankerSettings;
const totalScoreLimit = keywordScoreLimit + freshnessLimit;
const oneDayMs = 86400000;
const nowMs = +new Date();

export class Ranker {
  /**
   * Given a snippet object produce a ranking between 0 and 1.
   * @param {Snippet} snippet - The snippet to be ranked.
   * @returns {number} A value between 0.0 and 1.0.
   * @throws Will throw an error if `snippet` is not an instance of `Snippet`.
   */
  static rankSnippet = snippet => {
    if (!(snippet instanceof Snippet)) {
      throw new ArgsError(
        "Invalid arguments. 'snippet' must be an instance of 'Snippet'."
      );
    }
    // Initialize scoring variables
    let score = 0,
      keywordScoreValues = [];

    // Combine content for indexing
    const indexableContent = [
      snippet.title,
      ...snippet.tags.all,
      (snippet.config.language && snippet.config.language.long) || '',
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
    Object.keys(keywordScores).forEach(k => {
      if (indexableContent.indexOf(k) !== -1)
        keywordScoreValues.push(keywordScores[k]);
    });
    if (keywordScoreValues.length > keywordCountLimit)
      keywordScoreValues = keywordScoreValues
        .sort((a, b) => b - a)
        .slice(0, keywordCountLimit);
    score = Math.min(
      keywordScoreValues.reduce((acc, v) => acc + v, 0),
      keywordScoreLimit
    );

    // Calculate freshness, longevity and update values
    const firstSeen = (nowMs - +snippet.firstSeen) / oneDayMs;

    // Add points for freshness: Should produce a curve that falls sharply around
    // the 14 day mark.
    score += Math.round(
      ((14 + firstSeen) / (14 + firstSeen * firstSeen)) * freshnessLimit
    );

    const biasPenaltyMultiplier = snippet.config.biasPenaltyMultiplier
      ? snippet.config.biasPenaltyMultiplier
      : 1.0;
    // Divide by limit, applying the bias multiplier, and return ranking
    return +Math.max(
      0.0001,
      score / (totalScoreLimit * biasPenaltyMultiplier)
    ).toFixed(4);
  };
}
