import Snippet from '#src/models/snippet.js';
import settings from '#src/config/settings.js';

export default class RecommendationPresenter {
  static candidates = null;
  static candidatesByLang = {};
  static candidatesByLangAndTag = {};

  static prepareRecommendableSnippets() {
    this.candidates = Snippet.scope('published', 'byRanking');

    const groupedCandidates = this.candidates.reduce((acc, snippet) => {
      if (!acc[snippet.languageId]) acc[snippet.languageId] = [];
      acc[snippet.languageId].push(snippet);
      return acc;
    }, {});

    Object.entries(groupedCandidates).forEach(
      ([language, languageSnippets]) => {
        const candidatesExceptLanguage = this.candidates.filter(
          snippet => snippet.languageId !== language
        );
        this.candidatesByLang[language] = languageSnippets.concat(
          candidatesExceptLanguage
        );

        const tagGroupedSnippets = languageSnippets.reduce((acc, snippet) => {
          if (!acc[snippet.primaryTag]) acc[snippet.primaryTag] = [];
          acc[snippet.primaryTag].push(snippet);
          return acc;
        }, {});

        this.candidatesByLangAndTag[language] = {};

        Object.entries(tagGroupedSnippets).forEach(([tag, tagSnippets]) => {
          const languageSnippetsExceptTag = languageSnippets.filter(
            snippet => snippet.primaryTag !== tag
          );
          this.candidatesByLangAndTag[language][tag] = tagSnippets
            .concat(languageSnippetsExceptTag)
            .concat(candidatesExceptLanguage);
        });
      }
    );
  }

  recommendableSnippets(language = null, tag = null) {
    if (RecommendationPresenter.candidates === null)
      RecommendationPresenter.prepareRecommendableSnippets();

    if (language === null) return RecommendationPresenter.candidates;

    const tagExists = Boolean(
      RecommendationPresenter.candidatesByLangAndTag[language][tag]
    );

    if (tag === null || !tagExists)
      return RecommendationPresenter.candidatesByLang[language];

    return RecommendationPresenter.candidatesByLangAndTag[language][tag];
  }

  constructor(object, options = {}) {
    this.object = object;
    this.options = options;

    this.id = this.object.id;
    this.slugId = this.object.slugId;
    this.languageId = this.object.languageId;
    this.primaryTag = this.object.primaryTag;
    this.recTokens = this.object.recTokens;
    this.isListed = this.object.isListed;
    this.recTokensLength = this.object.recTokens.size;
    this.recommendationRankings = new Map();
    this.minRankings = [];
  }

  recommendSnippets() {
    const recommendableSnippets = this.recommendableSnippets(
      this.object.languageId,
      this.object.primaryTag
    );

    recommendableSnippets.forEach(snippet => {
      // Skip if the snippet is the same as the current snippet
      if (snippet.id === this.id) return;
      // Skip if the snippet is the same in another language
      if (snippet.slugId === this.slugId) return;
      // Skip unless this snippet is listed or the object is unlisted
      if (!snippet.isListed && this.isListed) return;

      // Store the minimum ranking so far
      const minRanking = this.minRankings[0] || 0;

      // Performance optimization - if language score is 0 and the minimum
      // recommendation score is greater than the score limit without language,
      // then we can skip the rest of the calculations.
      const isSameLanguage = this.languageId === snippet.languageId;
      if (
        !isSameLanguage &&
        minRanking > settings.recommendations.scoreLimitWithoutLanguage
      )
        return;

      // Determine score for language:
      //  * Same language, as language = 100% of language score
      //  * Not same language = 0% of language score
      const languageScore = isSameLanguage
        ? settings.recommendations.fullLanguageScore
        : 0;

      // Performance optimization - if both language and primary tag scores are
      // 0 and the minimum recommendation score is greater than the score limit
      // without language and primary tag, then we can skip the rest of the
      // calculations.
      const primaryTagIndex = isSameLanguage
        ? snippet.tags.indexOf(this.primaryTag)
        : -1;

      if (
        !isSameLanguage &&
        primaryTagIndex === -1 &&
        minRanking >
          settings.recommendations.scoreLimitWithoutLanguageAndPrimaryTag
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
            ? settings.recommendations.fullPrimaryTagScore
            : settings.recommendations.halfPrimaryTagScore;

      // Determine recommendation token score:
      //  * Count found tokens and divide by total number of tokens
      const recTokenScore =
        ([...this.recTokens].reduce(
          (a, t) => (snippet.recTokens.has(t) ? a + 1 : a),
          0
        ) /
          this.recTokensLength) *
        settings.recommendations.recTokenScoreLimit;

      // Divide by the limit to get a value between 0 and 1
      const recommendationRanking =
        (languageScore + primaryTagScore + recTokenScore) /
        settings.recommendations.totalScoreLimit;

      // Performance optimization to minimize the number of times we have to
      // sort afterwards. As soon as the minimum amount of snippets has been
      // considered, we can start trimming off any snippets below the lowest
      // snippet's recommendation ranking.
      if (recommendationRanking > 0) {
        if (
          this.minRankings.length < settings.recommendations.recommendationCount
        ) {
          // First 4 snippets are always added
          this.minRankings.push(recommendationRanking);
        } else {
          // If the new ranking is lower than the lowest ranking, ignore it
          if (recommendationRanking < this.minRankings[0]) {
            return;
          } else {
            // Otherwise, replace the lowest ranking with the new ranking
            this.minRankings[0] = recommendationRanking;
          }
        }
        this.minRankings.sort((a, b) => a - b);

        this.recommendationRankings.set(snippet.id, [
          recommendationRanking,
          snippet.ranking,
          snippet,
        ]);
      }
    });

    return Array.from(this.recommendationRankings.values())
      .sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : b[0] - a[0]))
      .slice(0, settings.recommendations.recommendationCount)
      .map(r => r[2]);
  }
}
