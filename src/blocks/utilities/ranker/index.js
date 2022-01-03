import { JSONHandler } from 'blocks/utilities/jsonHandler';
import pathSettings from 'settings/paths';
import rankerSettings from 'settings/rankingEngine';

// Get data from configuration
const {
  snippet: {
    keywordScoreLimit: snippetKeywordScoreLimit,
    keywordCountLimit: snippetKeywordCountLimit,
    freshnessLimit: snippetFreshnessLimit,
  },
  listing: {
    mainListingBaseRanking,
    blogTagListingBaseRanking,
    languageListingBaseRanking,
    blogListingBaseRanking,
    tagListingBaseRanking,
    collectionListingBaseRanking,
    baseListingScoreLimit,
    keywordScoreLimit: listingKeywordScoreLimit,
    keywordCountLimit: listingKeywordCountLimit,
  },
} = rankerSettings;
const totalSnippetScoreLimit = snippetKeywordScoreLimit + snippetFreshnessLimit;
const totalListingScoreLimit = listingKeywordScoreLimit + baseListingScoreLimit;
const oneDayMs = 86400000;
const nowMs = +new Date();

/**
 * Utility for ranking snippets.
 */
export class Ranker {
  static keywordScoreData = {};

  /**
   * Dynamically load keyword scores from the content configuration submodule.
   */
  static get keywordScores() {
    // Skip loading for test environment
    if (process.env.NODE_ENV === `test`) return {};
    if (!Object.keys(Ranker.keywordScoreData).length) {
      const { rawContentConfigsPath: configsPath } = pathSettings;
      Ranker.keywordScoreData = JSONHandler.fromFile(
        `${configsPath}/rankingEngine.json`
      );
    }
    return Ranker.keywordScoreData;
  }

  /**
   * Given a snippet record produce a ranking between 0 and 1.
   * @param {Snippet} snippet - The snippet to be ranked.
   * @returns {number} A value between 0.0 and 1.0.
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
      if (indexableContent.includes(k))
        keywordScoreValues.push(Ranker.keywordScores[k]);
    });
    if (keywordScoreValues.length > snippetKeywordCountLimit)
      keywordScoreValues = keywordScoreValues
        .sort((a, b) => b - a)
        .slice(0, snippetKeywordCountLimit);
    score = Math.min(
      keywordScoreValues.reduce((acc, v) => acc + v, 0),
      snippetKeywordScoreLimit
    );

    // Calculate freshness in days
    const firstSeen = Math.round((nowMs - +snippet.firstSeen) / oneDayMs);

    // Add points from freshness, using a kind of lookup table
    if (firstSeen === 1) score += snippetFreshnessLimit;
    else if (firstSeen === 2) score += 0.85 * snippetFreshnessLimit;
    else if (firstSeen <= 4) score += 0.7 * snippetFreshnessLimit;
    else if (firstSeen <= 6) score += 0.45 * snippetFreshnessLimit;
    else if (firstSeen <= 10) score += 0.25 * snippetFreshnessLimit;
    else if (firstSeen <= 14) score += 0.1 * snippetFreshnessLimit;

    const biasPenaltyMultiplier = snippet.repository.biasPenaltyMultiplier
      ? snippet.repository.biasPenaltyMultiplier
      : 1.0;
    // Divide by limit, applying the bias multiplier, and return ranking
    return +Math.max(
      0.0001,
      score / (totalSnippetScoreLimit * biasPenaltyMultiplier)
    ).toFixed(4);
  };

  /**
   * Given a listing object produce a ranking between 0 and 1.
   * @param {Listing} listing - The listing to be ranked.
   * @returns {number} A value between 0.0 and 1.0.
   */
  static rankListing = listing => {
    // Initialize scoring variables
    let score = 0,
      keywordScoreValues = [];

    // Combine content for indexing
    const indexableContent = [listing.name, listing.description]
      .join(' ')
      .toLowerCase();

    // Add points from keywords: If the snippet has too many keywords, there is a
    // limit and the X most valuable will apply. Same for very high scores.
    Object.keys(Ranker.keywordScores).forEach(k => {
      if (indexableContent.includes(k))
        keywordScoreValues.push(Ranker.keywordScores[k]);
    });
    if (keywordScoreValues.length > listingKeywordCountLimit)
      keywordScoreValues = keywordScoreValues
        .sort((a, b) => b - a)
        .slice(0, listingKeywordCountLimit);
    score = Math.min(
      keywordScoreValues.reduce((acc, v) => acc + v, 0),
      listingKeywordScoreLimit
    );

    // Add points from listing type
    if (listing.isBlogTag)
      score += blogTagListingBaseRanking * baseListingScoreLimit;
    else if (listing.isLanguage)
      score += languageListingBaseRanking * baseListingScoreLimit;
    else if (listing.isBlog)
      score += blogListingBaseRanking * baseListingScoreLimit;
    else if (listing.isCollection)
      score += collectionListingBaseRanking * baseListingScoreLimit;
    else if (listing.isTag)
      score += tagListingBaseRanking * baseListingScoreLimit;
    else score += mainListingBaseRanking * baseListingScoreLimit;
    // Divide by limit, applying the bias multiplier, and return ranking
    return +Math.max(0.0001, score / totalListingScoreLimit).toFixed(4);
  };
}
