/* eslint-disable brace-style */
import config from '../../config';
const { rankingEngine } = config;

const d = new Date(),
  d1Day = new Date(),
  d1Week = new Date(),
  d2Weeks = new Date(),
  d1Month = new Date(),
  d2Months = new Date(),
  d3Months = new Date(),
  d6Months = new Date(),
  d1Year = new Date();

d1Day.setDate(d.getDate() - 1);
d1Week.setDate(d.getDate() - 7);
d2Weeks.setDate(d.getDate() - 14);
d1Month.setDate(d.getDate() - 30);
d2Months.setDate(d.getDate() - 60);
d3Months.setDate(d.getDate() - 90);
d6Months.setDate(d.getDate() - 180);
d1Year.setDate(d.getDate() - 360);

const dates = [
  +d1Day,
  +d1Week,
  +d2Weeks,
  +d1Month,
  +d2Months,
  +d3Months,
  +d6Months,
  +d1Year,
];

/**
 * Given a raw snippet object produce a ranking between 0 and 1.
 * Negative rankings can be produced due to biasPenaltyMultiplier values.
 */
const determineSnippetRanking = snippet => {
  // Initialize score
  let score = 0;

  // Calculate limits
  const dataScoreLimit =
    rankingEngine.tagScorelimit +
    rankingEngine.expertiseScoreLimit +
    Object.values(snippet.keywordScores).reduce((a, v) => a + v, 0);
  const timeScoreLimit = Math.floor(dataScoreLimit * rankingEngine.timeScoreLimitMultiplier);

  // Combine content for indexing
  const indexableContent = [
    snippet.title,
    snippet.attributes.codeBlocks.src,
    snippet.attributes.codeBlocks.es6,
    snippet.attributes.codeBlocks.css,
    snippet.attributes.codeBlocks.html,
    snippet.attributes.codeBlocks.js,
    snippet.attributes.codeBlocks.style,
    snippet.attributes.text,
  ].join(' ');

  // Add points from tags
  score += snippet.attributes.tags.reduce((a, v) =>
    snippet.tagScores[v] ? a + snippet.tagScores[v] : a, 0
  );
  score = Math.min(score, rankingEngine.tagScorelimit);

  // Add points from expertise
  if (snippet.attributes.tags.includes('beginner'))
    score += rankingEngine.beginnerExpertiseScore;
  else if (snippet.attributes.tags.includes('intermediate'))
    score += rankingEngine.intermediateExpertiseScore;
  else if (snippet.attributes.tags.includes('advanced'))
    score += rankingEngine.advancedExpertiseScore;

  // Add points from keywords
  Object.keys(snippet.keywordScores).forEach(k => {
    if (indexableContent.indexOf(k) !== -1) score += snippet.keywordScores[k];
  });

  // Calculate freshness, longevity and update values
  const firstSeen = +snippet.meta.firstSeen * 1000;
  const lastUpdated = +snippet.meta.lastUpdated * 1000;
  const updateCount = snippet.meta.updateCount;
  const firstSeenLimit = timeScoreLimit * rankingEngine.firstSeenScorePercentage;
  const lastUpdatedLimit = timeScoreLimit * rankingEngine.lastUpdateScorePercentage;
  const updateCountLimit = timeScoreLimit * rankingEngine.updateCountScorePercentage;

  // Add points for freshness and longevity
  // First seen less than a day - new snippet (no reason to check last update)
  if (firstSeen >= dates[0]) {
    score += Math.round(firstSeenLimit * rankingEngine.newFirstSeenMultiplier);
    score += Math.round(lastUpdatedLimit * rankingEngine.newLastUpdateMultiplier);
  }
  // Last updated less than 2 weeks - newly updated snippet
  else if (lastUpdated >= dates[2]) {
    // Last updated in the last day - very fresh update
    if (lastUpdated >= dates[0])
      score += Math.round(lastUpdatedLimit * rankingEngine.veryFreshLastUpdateMultiplier);
    // Last updated in the last week - fresh update
    else if (lastUpdated >= dates[1])
      score += Math.round(lastUpdatedLimit * rankingEngine.fresLastUpdateMultiplier);
    // Last updated in the last 2 weeks - somewhat fresh update
    else if (lastUpdated >= dates[2])
      score += Math.round(lastUpdatedLimit * rankingEngine.somewhatFreshLastUpdateMultiplier);

    // First seen in the last month - fresh snippet that got an update
    if(firstSeen >= dates[3])
      score += Math.round(firstSeenLimit * rankingEngine.updatedFreshFirstSeenMultiplier);
    // First seen in the last year - snippet that got an update
    else if (firstSeen >= dates[3])
      score += Math.round(firstSeenLimit * rankingEngine.updatedFirstSeenMultiplier);
    // First seen over a year ago - old snippet that got an update
    else
      score += Math.round(firstSeenLimit * rankingEngine.updatedOldFirstSeenMultiplier);
  }
  // Last updated in the last year - normal snippet
  else if (lastUpdated >= dates[7]) {
    // Last updated in the last month
    if (lastUpdated > dates[3])
      score += Math.round(lastUpdatedLimit * rankingEngine.lastMonthUpdateMultiplier);
    // Last updated in the last 2 months
    else if (lastUpdated > dates[4])
      score += Math.round(lastUpdatedLimit * rankingEngine.last2MonthUpdateMultiplier);
    // Last updated in the last 3 months
    else if (lastUpdated > dates[5])
      score += Math.round(lastUpdatedLimit * rankingEngine.last3MonthUpdateMultiplier);
    // Last updated in the last 6 months
    else if (lastUpdated > dates[6])
      score += Math.round(lastUpdatedLimit * rankingEngine.last6MonthUpdateMultiplier);
    // Last updated in the last year
    else if (lastUpdated > dates[7])
      score += Math.round(lastUpdatedLimit * rankingEngine.lastYearUpdateMultiplier);

    // First seen in the last month
    if (firstSeen > dates[3])
      score += Math.round(firstSeenLimit * rankingEngine.lastMonthFirstSeenMultiplier);
    // First seen in the last 3 months
    else if (firstSeen > dates[5])
      score += Math.round(firstSeenLimit * rankingEngine.last3MonthFirstSeenMultiplier);
    // First seen in the last 6 months
    else if (firstSeen > dates[6])
      score += Math.round(firstSeenLimit * rankingEngine.last6MonthFirstSeenMultiplier);
    // First seen in the last year
    else if (firstSeen > dates[7])
      score += Math.round(firstSeenLimit * rankingEngine.lastYearFirstSeenMultiplier);
  }

  // Add points from updates
  if (updateCount >= rankingEngine.updateRank5Threshold)
    score += Math.round(updateCountLimit * rankingEngine.updateRank5Multiplier);
  else if (updateCount >= rankingEngine.updateRank4Threshold)
    score += Math.round(updateCountLimit * rankingEngine.updateRank4Multiplier);
  else if (updateCount >= rankingEngine.updateRank3Threshold)
    score += Math.round(updateCountLimit * rankingEngine.updateRank3Multiplier);
  else if (updateCount >= rankingEngine.updateRank2Threshold)
    score += Math.round(updateCountLimit * rankingEngine.updateRank2Multiplier);
  else if (updateCount >= rankingEngine.updateRank1Threshold)
    score += Math.round(updateCountLimit * rankingEngine.updateRank1Multiplier);
  else if (updateCount > rankingEngine.updateRank0Threshold)
    score += Math.round(updateCountLimit * rankingEngine.updateRank0Multiplier);

  // Divide by limit, applying the bias multiplier, return ranking
  return Math.max(
    rankingEngine.minimumRating, score / ((dataScoreLimit + timeScoreLimit) * snippet.biasPenaltyMultiplier)
  ).toFixed(4);
};

export default determineSnippetRanking;
