const preparedQueriesCache = new Map();

export class PreparedQueries {
  /**
   * Returns an array of (cover, count) tuples, sorted by count.
   */
  static coverImageUsage = application => () => {
    if (!preparedQueriesCache.has('coverImageUsage')) {
      const Snippet = application.dataset.getModel('Snippet');

      const groupedRecords = Snippet.records.groupBy('cover');
      const result = Object.keys(groupedRecords)
        .map(cover => ({
          cover,
          count: groupedRecords[cover].length,
        }))
        .sort((a, b) => b.count - a.count);

      preparedQueriesCache.set('coverImageUsage', result);
    }
    return preparedQueriesCache.get('coverImageUsage');
  };

  /**
   * Returns an array of matching snippets based on the given options.
   * @param {string} options.language - Language id
   * @param {string} options.tag - Tag string
   * @param {string} options.type - Snippet type
   * @param {boolean} options.primary - Whether to match primary tag or any
   */
  static matchSnippets =
    application =>
    ({ language = null, tag = null, type = null, primary = false }) => {
      const cacheKey = `matchSnippets#${language}-${tag}-${type}-${primary}`;

      if (!preparedQueriesCache.has(cacheKey)) {
        const Snippet = application.dataset.getModel('Snippet');
        const queryMatchers = [];

        if (type)
          if (type === 'article') {
            queryMatchers.push(snippet => snippet.type !== 'snippet');
          } else queryMatchers.push(snippet => snippet.type === type);
        if (language)
          queryMatchers.push(
            snippet => snippet.language && snippet.language.id === language
          );
        if (tag)
          if (primary)
            queryMatchers.push(snippet => snippet.primaryTag === tag);
          else queryMatchers.push(snippet => snippet.tags.includes(tag));

        return Snippet.records.where(snippet =>
          queryMatchers.every(matcher => matcher(snippet))
        );
      }
      return preparedQueriesCache.get(cacheKey);
    };
}
