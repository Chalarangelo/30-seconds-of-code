import settings from '#settings/global';
import { globSync } from 'glob';
import { YAMLHandler } from '#blocks/utilities/yamlHandler';
import { CSVHandler } from '#blocks/utilities/csvHandler';

const { websiteUrl } = settings;

const preparedQueriesCache = new Map();

const withCache = (cacheKey, fn) => {
  if (!preparedQueriesCache.has(cacheKey)) {
    preparedQueriesCache.set(cacheKey, fn());
  }
  return preparedQueriesCache.get(cacheKey);
};

const loadedFilesCache = new Map();

const loadFileOnce = (fileName, handler, options = null) => {
  const cacheKey = `${fileName}#${handler.name}@${JSON.stringify(options)}`;
  if (!loadedFilesCache.has(cacheKey)) {
    loadedFilesCache.set(cacheKey, handler.fromFile(fileName, options));
  }
  return loadedFilesCache.get(cacheKey);
};

// Image asset constants
const supportedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'tif', 'tiff'];
const coverAssetPath = 'content/assets/cover';

// Redirects constants
const redirectsPath = 'content/redirects.yaml';

// Performance constants (manually import Pages.csv from Google Search Console)
const performancePath = 'imported/Pages.csv';

export class PreparedQueries {
  /**
   * Returns an array of (cover, count) tuples, sorted by count.
   */
  static coverImageUsage = application => () =>
    withCache('coverImageUsage', () => {
      const Snippet = application.dataset.getModel('Snippet');

      const allCovers = globSync(
        `${coverAssetPath}/*.@(${supportedExtensions.join('|')})`
      ).map(coverName =>
        coverName.slice(
          coverName.lastIndexOf('/') + 1,
          coverName.lastIndexOf('.')
        )
      );

      const groupedRecords = Snippet.records.groupBy('cover');
      return new Map(
        allCovers
          .map(cover => [cover, groupedRecords[cover]?.length || 0])
          .sort((a, b) => b[1] - a[1])
      );
    });

  /**
   * Returns an array of (type, count) tuples, sorted by count.
   */
  static snippetCountByType = application => () =>
    withCache('snippetCountByType', () => {
      const Snippet = application.dataset.getModel('Snippet');

      const groupedRecords = Snippet.records.groupBy('type');
      return Object.fromEntries(
        Object.keys(groupedRecords).map(type => [
          type,
          groupedRecords[type].length,
        ])
      );
    });

  /**
   * Returns an array of matching snippets based on the given options.
   * @param {string} options.language - Language id
   * @param {string} options.tag - Tag string
   * @param {string} options.type - Snippet type
   * @param {boolean} options.primary - Whether to match primary tag or any
   */
  static matchSnippets =
    application =>
    ({ language = null, tag = null, type = null, primary = false }) =>
      withCache(`matchSnippets#${language}-${tag}-${type}-${primary}`, () => {
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
      });

  /**
   * Returns an array of matching slugs for which the given slug is an alternative.
   * @param {string} slug - The slug to match (e.g. '/js/s/bifurcate-by')
   */
  static pageAlternativeUrls = () => slug =>
    withCache(`pageAlternativeUrls#${slug}`, () => {
      const redirects = loadFileOnce(redirectsPath, YAMLHandler);

      const lookupPaths = [slug];
      const redirectedPaths = new Set();

      while (lookupPaths.length) {
        redirectedPaths.add(lookupPaths[0]);

        const fromPaths = redirects.filter(r => r.to === lookupPaths[0]);
        for (const fromPath of fromPaths) {
          if (!redirectedPaths.has(fromPath.from)) {
            lookupPaths.push(fromPath.from);
            redirectedPaths.add(fromPath.from);
          }
        }
        lookupPaths.shift();
      }
      return [...redirectedPaths];
    });

  /**
   * Returns an object with the performance data for each of the given page slugs.
   * Requires manual import of a `Pages.csv` exported from Google Search Console.
   * @param {...string} pageIds - The page slugs to get performance data for
   *    (e.g. '/js/s/bifurcate-by').
   */
  static pagePerformance =
    () =>
    (...pageIds) =>
      withCache(`pagePerformance#${pageIds.join(',')}`, () => {
        const performanceData = loadFileOnce(performancePath, CSVHandler, {
          withHeaders: true,
          keyProperty: 'Top pages',
          excludeProperties: ['CTR', 'Position'],
          transformProperties: {
            'Top pages': value => value.replace(websiteUrl, ''),
            Clicks: Number.parseInt,
            Impressions: Number.parseInt,
          },
        });

        return pageIds.reduce((acc, pageId) => {
          const pagePerformance = performanceData[pageId];
          acc[pageId] = pagePerformance
            ? {
                clicks: pagePerformance['Clicks'],
                impressions: pagePerformance['Impressions'],
              }
            : {
                clicks: 0,
                impressions: 0,
              };
          return acc;
        }, {});
      });
}
