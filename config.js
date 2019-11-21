/* eslint-disable camelcase */
module.exports = {
  // Project metadata
  name: `30 seconds of code`,
  description: `Short code snippets for all your development needs`,
  author: '30-seconds',
  shortName: `30s`,
  repositoryUrl: `https://github.com/30-seconds/30-seconds-of-code`,
  githubOrgUrl: `https://github.com/30-seconds`,
  twitterUrl: `https://twitter.com/30secondsofcode`,
  licenseUrl: `https://creativecommons.org/publicdomain/zero/1.0/`,
  siteUrl: `https://30secondsofcode.org`,
  googleSiteVerification: `YX9mF-TxoHZGJ9SZ8XwvWgGR_KTcbH1uHul4iDklyr0`,
  googleAnalytics: {
    id: `UA-117141635-1`,
    config: {
      anonymize_ip: true,     // Track as little as possible
      cookie_expires: 0,      // Track as little as possible
      send_page_view: false,  // Prevent duplicate page views
    },
  },
  // Path information
  assetPath: `assets`,
  contentPath: `${__dirname}/content`,
  templatesPath: `./src/templates`,
  templates: [
    {
      name: `HomePage`,
      path: `homePage/index.jsx`,
    },
    {
      name: `SnippetPage`,
      path: `snippetPage/index.jsx`,
    },
    {
      name: `SearchPage`,
      path: `searchPage/index.jsx`,
    },
    {
      name: `ListingPage`,
      path: `listingPage/index.jsx`,
    },
    {
      name: `NotFoundPage`,
      path: `notFoundPage/index.jsx`,
    },
    {
      name: `AboutPage`,
      path: `aboutPage/index.jsx`,
    },
    {
      name: `CookiePage`,
      path: `cookiePage/index.jsx`,
    },
  ],
  // Snippet ranking engine parameters
  rankingEngine: {
    tagScorelimit: 12,
    expertiseScoreLimit: 8,
    timeScoreLimitMultiplier: 0.6,
    beginnerExpertiseScore: 6,
    intermediateExpertiseScore: 8,
    advancedExpertiseScore: 2,
    firstSeenScorePercentage: 0.47,
    lastUpdateScorePercentage: 0.36,
    updateCountScorePercentage: 0.17,
    newLastUpdateMultiplier: 0.4,
    newFirstSeenMultiplier: 1.0,
    veryFreshLastUpdateMultiplier: 1.0,
    fresLastUpdateMultiplier: 0.8,
    somewhatFreshLastUpdateMultiplier: 0.7,
    updatedFreshFirstSeenMultiplier: 0.3,
    updatedFirstSeenMultiplier: 0.7,
    updatedOldFirstSeenMultiplier: 0.4,
    lastMonthUpdateMultiplier: 0.7,
    last2MonthUpdateMultiplier: 0.5,
    last3MonthUpdateMultiplier: 0.3,
    last6MonthUpdateMultiplier: 0.2,
    lastYearUpdateMultiplier: 0.1,
    lastMonthFirstSeenMultiplier: 0.6,
    last3MonthFirstSeenMultiplier: 0.5,
    last6MonthFirstSeenMultiplier: 0.4,
    lastYearFirstSeenMultiplier: 0.3,
    updateRank5Threshold: 50,
    updateRank4Threshold: 36,
    updateRank3Threshold: 24,
    updateRank2Threshold: 11,
    updateRank1Threshold: 6,
    updateRank0Threshold: 1,
    updateRank5Multiplier: 1.0,
    updateRank4Multiplier: 0.8,
    updateRank3Multiplier: 0.65,
    updateRank2Multiplier: 0.4,
    updateRank1Multiplier: 0.25,
    updateRank0Multiplier: 0.2,
    minimumRating: 0.0001,
  },
  // Snippet recommendation engine parameters
  recomendationEngine: {
    noContextFreshnessMultiplier: 0.45,
    noContextKeywordMultiplier: 0.55,
  },
};
