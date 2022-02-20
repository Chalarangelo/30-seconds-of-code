import { JSONHandler } from 'blocks/utilities/jsonHandler';
// NOTE: Be very careful not to import Application in this file, as this is
// used in raw model definitions and can end up creating major issues.

const oneDayMs = 86400000;
const nowMs = +new Date();

/**
 * Utility for ranking snippets.
 */
export class Ranker {
  static rankerSettings = {
    snippetKeywordScoreLimit: 60,
    snippetKeywordCountLimit: 14,
    snippetFreshnessLimit: 20,
    mainListingBaseRanking: 0.5,
    blogTagListingBaseRanking: 1.0,
    blogListingBaseRanking: 0.8,
    languageListingBaseRanking: 0.6,
    collectionListingBaseRanking: 0.4,
    tagListingBaseRanking: 0.2,
    baseListingScoreLimit: 50,
    listingKeywordScoreLimit: 30,
    listingKeywordCountLimit: 10,
    get totalSnippetScoreLimit() {
      return this.snippetKeywordScoreLimit + this.snippetFreshnessLimit;
    },
    get totalListingScoreLimit() {
      return this.listingKeywordScoreLimit + this.baseListingScoreLimit;
    },
  };
  static keywordScoreData = {};

  /**
   * Dynamically load keyword scores from the content configuration submodule.
   */
  static get keywordScores() {
    // Skip loading for test environment
    if (process.env.NODE_ENV === `test`) return {};
    if (!Object.keys(Ranker.keywordScoreData).length) {
      Ranker.keywordScoreData = JSONHandler.fromFile(
        `content/configs/rankingEngine.json`
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
    const {
      snippetKeywordScoreLimit,
      snippetKeywordCountLimit,
      snippetFreshnessLimit,
      totalSnippetScoreLimit,
    } = Ranker.rankerSettings;
    // Initialize scoring variables
    let score = 0,
      keywordScoreValues = [];

    // Combine content for indexing
    const indexableContent = [
      snippet.title,
      ...snippet.tags,
      (snippet.repository.language && snippet.repository.language.long) || '',
      (snippet.type || '.').split('.')[0],
      snippet.srcCode || '',
      snippet.cssCode || '',
      snippet.htmlCode || '',
      snippet.jsCode || '',
      snippet.styleCode || '',
      snippet.fullText || '',
      snippet.shortText || '',
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
    const {
      mainListingBaseRanking,
      blogTagListingBaseRanking,
      languageListingBaseRanking,
      blogListingBaseRanking,
      tagListingBaseRanking,
      collectionListingBaseRanking,
      baseListingScoreLimit,
      listingKeywordScoreLimit,
      listingKeywordCountLimit,
      totalListingScoreLimit,
    } = Ranker.rankerSettings;
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
