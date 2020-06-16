import rankingEngine from 'config/rankingEngine';

// Get data from configuration
const {
  keywordScores,
  keywordScoreLimit,
  keywordCountLimit,
  longevityLimit,
  freshnessLimit,
  updateCountLimit,
} = rankingEngine;
const totalScoreLimit = keywordScoreLimit + longevityLimit + freshnessLimit + updateCountLimit;
const oneDayMs = 86400000;
const nowMs = +new Date();

/**
 * Given a raw snippet object produce a ranking between 0 and 1.
 * @param {object} snippet - The snippet to be ranked.
 */
const determineSnippetRanking = snippet => {
  // Initialize scoring variables
  let score = 0, keywordScoreValues = [];

  // Combine content for indexing
  const indexableContent = [
    snippet.title,
    ...snippet.tags.all,
    snippet.language && snippet.language.long || '',
    (snippet.type || '.').split('.')[0],
    snippet.code && snippet.code.src || '',
    snippet.code && snippet.code.css || '',
    snippet.code && snippet.code.html || '',
    snippet.code && snippet.code.js || '',
    snippet.code && snippet.code.style || '',
    snippet.text.full || '',
    snippet.text.short || '',
  ].join(' ').toLowerCase();

  // Add points from keywords: If the snippet has too many keywords, there is a
  // limit and the X most valuable will apply. Same for very high scores.
  Object.keys(keywordScores).forEach(k => {
    if (indexableContent.indexOf(k) !== -1) keywordScoreValues.push(keywordScores[k]);
  });
  if (keywordScoreValues.length > keywordCountLimit)
    keywordScoreValues = keywordScoreValues.sort((a, b) => b - a).slice(0, keywordCountLimit);
  score = Math.min(keywordScoreValues.reduce((acc, v) => acc + v, 0), keywordScoreLimit);

  // Calculate freshness, longevity and update values
  const firstSeen = (nowMs - (+snippet.firstSeen)) / oneDayMs;
  const lastUpdated = (nowMs - (+snippet.lastUpdated)) / oneDayMs;
  const updateCount = snippet.updateCount;

  // Add points for freshness: Should produce a curve that falls sharply around
  // the 30 day mark.
  score += Math.round((30 + lastUpdated) / (30 + lastUpdated * lastUpdated) * freshnessLimit);

  // Add points for longevity: Should produce something like a bull curve with
  // a peak at around the 360 day mark.
  score +=
    firstSeen < 360 ? Math.round(firstSeen / 360 * longevityLimit)
      : firstSeen < 1080 ? Math.round((1080 - firstSeen) / 720 * longevityLimit)
        : 0;

  // Add points from updates: Should produce a curve that peaks with a value of
  // about 1 near the 25 update mark.
  score += updateCount > 25 ? updateCountLimit : Math.round(((2 * updateCount - 2) / (23 + updateCount)) * updateCountLimit);

  // Divide by limit, applying the bias multiplier, and return ranking
  return +Math.max(0.0001, score / (totalScoreLimit * snippet.biasPenaltyMultiplier)).toFixed(4);
};

export default determineSnippetRanking;
