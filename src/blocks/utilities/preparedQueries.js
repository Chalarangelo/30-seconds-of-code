import settings from '#settings/global';
import searchEngineSettings from '#settings/searchEngine';
import { globSync } from 'glob';
import { YAMLHandler } from '#blocks/utilities/yamlHandler';
import { CSVHandler } from '#blocks/utilities/csvHandler';

const { serverStopWords } = searchEngineSettings;
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

// Format matchers
const boldMatcher = /(\*\*)(.*?)\1/gm;
const headingMatcher = /^##+ (.*)$/gm;

// Image asset constants
const supportedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'tif', 'tiff'];
const coverAssetPath = 'content/assets/cover';

// Redirects constants
const redirectsPath = 'content/redirects.yaml';

// Collection config constants
const contentConfigsGlob = 'content/collections/**/*.yaml';

// Performance constants (manually import Pages.csv from Google Search Console)
const performancePath = 'imported/Pages.csv';

// Ranking engine constants
const rankingEnginePath = 'content/rankingEngine.yaml';

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
    ({ language = null, tag = null, type = null, primary = false } = {}) =>
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
   * Returns an array of slugs for all snippet pages.
   * @param {boolean} options.includeUnlisted - Whether to include unlisted
   *  snippets (default: false).
   */
  static snippetPageSlugs =
    application =>
    ({ includeUnlisted = false } = {}) =>
      withCache(`snippetPageSlugs#${includeUnlisted}`, () => {
        const Snippet = application.dataset.getModel('Snippet');
        const snippets = includeUnlisted
          ? Snippet.records
          : Snippet.records.listed;
        return snippets.published.map(snippet => snippet.slug, { flat: true });
      });

  /**
   * Returns an array of slugs for all snippet pages with alternative urls included.
   */
  static snippetPagesWithAlternativeUrls = (application, queries) => () =>
    withCache('snippetPagesWithAlternativeUrls', () => {
      const snippetSlugs = queries.snippetPageSlugs();
      return snippetSlugs.map(queries.pageAlternativeUrls);
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

  /**
   * Returns an array of slugs for the given collection.
   * @param {string} collectionId - The collection id to get slugs for.
   */
  static collectionSnippetSlugs =
    (application, queries) =>
    (collectionId, { includeRedirects = false, type = null } = {}) =>
      withCache(
        `collectionSnippetSlugs#${collectionId}-${includeRedirects}-${type}`,
        () => {
          const Collection = application.dataset.getModel('Collection');

          let snippets = Collection.records.get(collectionId).snippets;

          if (type)
            snippets = snippets.filter(snippet => snippet.type === type);

          const snippetSlugs = snippets.map(snippet => snippet.slug, {
            flat: true,
          });

          if (includeRedirects)
            return snippetSlugs.map(queries.pageAlternativeUrls);

          return snippetSlugs;
        }
      );

  /**
   * Returns an object with the performance data for each of the snippet pages in
   *  the given collection.
   * @param {string} collectionId - The collection id to get performance data for.
   * @param {object} options - Options object.
   * @param {boolean} options.includeRedirects - Whether to include redirects in
   *   the returned data (default: true).
   * @param {string} options.type - Snippet type to filter by.
   * @param {number} options.sorted - Whether to sort the returned data by clicks
   *  (1 = descending, -1 = ascending, 0 = no sorting).
   */
  static collectionPagesPerformance =
    (application, queries) =>
    (collectionId, { includeRedirects = true, type = null, sorted = 0 } = {}) =>
      withCache(
        `collectionPagesPerformance#${collectionId}-${includeRedirects}-${type}-${sorted}`,
        () => {
          const snippetSlugs = queries.collectionSnippetSlugs(collectionId, {
            includeRedirects,
            type,
          });

          const dataPairs = snippetSlugs.reduce((acc, snippetSlugs) => {
            const [allSlugs, snippetSlug] = Array.isArray(snippetSlugs)
              ? [snippetSlugs, snippetSlugs[0]]
              : [[snippetSlugs], snippetSlugs];
            const pagesPerformance = queries.pagePerformance(...allSlugs);

            const total = Object.values(pagesPerformance).reduce(
              (acc, pagePerformance) => {
                acc.clicks += pagePerformance.clicks;
                acc.impressions += pagePerformance.impressions;
                return acc;
              },
              { clicks: 0, impressions: 0 }
            );

            acc.push([snippetSlug, total]);
            return acc;
          }, []);

          if (sorted !== 0)
            dataPairs.sort((a, b) => {
              const aClicks = a[1].clicks;
              const bClicks = b[1].clicks;
              return sorted === 1 ? bClicks - aClicks : aClicks - bClicks;
            });

          return Object.fromEntries(dataPairs);
        }
      );

  /**
   * Returns an object with the performance data for the given snippet page.
   * @param {string} snippetSlug - The snippet slug to get performance data for
   *    (e.g. '/js/s/bifurcate-by').
   */
  static snippetPagePerformance = (application, queries) => snippetSlug =>
    withCache(`snippetPagePerformance#${snippetSlug}`, () => {
      const snippetSlugs = queries.pageAlternativeUrls(snippetSlug);
      const pagesPerformance = queries.pagePerformance(...snippetSlugs);

      const total = Object.values(pagesPerformance).reduce(
        (acc, pagePerformance) => {
          acc.clicks += pagePerformance.clicks;
          acc.impressions += pagePerformance.impressions;
          return acc;
        },
        { clicks: 0, impressions: 0 }
      );

      return total;
    });

  /**
   * Returns an array of slugs for all snippet pages with zero impressions.
   */
  static zeroImpressionSnippets = (application, queries) => () =>
    withCache('zeroImpressionSnippets', () => {
      const snippetSlugs = queries.snippetPageSlugs();
      const performanceData = snippetSlugs.map(snippetSlug =>
        queries.snippetPagePerformance(snippetSlug)
      );
      return Object.values(performanceData).reduce(
        (acc, pagePerformance, index) => {
          if (pagePerformance.impressions === 0) acc.push(snippetSlugs[index]);
          return acc;
        },
        []
      );
    });

  /**
   * Returns an object with information about specific formatting in the given
   *   snippet's full Markdown text.
   * @param {string} snippetId - The snippet id to get the cover image for.
   */
  static snippetHasFormatting = application => snippetId =>
    withCache(`snippetHasFormatting#${snippetId}`, () => {
      const Snippet = application.dataset.getModel('Snippet');
      const fullText = Snippet.records.get(snippetId).fullText;
      return {
        bold: boldMatcher.test(fullText),
        heading: headingMatcher.test(fullText),
      };
    });

  /**
   * Returns an object with information about references with the same code
   * identifier in multiple languages.
   * @param {string[]} languageKeys - The language keys to get references for.
   */
  static duplicateReferences =
    () =>
    (languageKeys = ['js', 'css', 'html', 'jsx']) =>
      withCache(`duplicateReferences#${languageKeys.join(',')}`, () => {
        const referenceMap = new Map();
        YAMLHandler.fromGlob(contentConfigsGlob).forEach(config => {
          const { short, references } = config;
          if (!references || !references.length) return;
          references.forEach(reference => {
            const referenceLanguages = referenceMap.get(reference) || [];
            referenceLanguages.push(short);
            referenceMap.set(reference, referenceLanguages);
          });
        });
        return [...referenceMap.entries()].reduce(
          (acc, [reference, languages]) => {
            if (languages.length > 1) acc[reference] = languages;
            return acc;
          },
          {}
        );
      });

  /**
   * Returns a frquency map of search tokens for the given collection.
   * @param {string} collectionId - The collection id to get search tokens for.
   * @param {object} options - Options object.
   * @param {number} options.minLength - Minimum length of search tokens (default: 3).
   * @param {boolean} options.excludeRanked - Whether to exclude ranked tags (default: true).
   * @returns {Map} A map of search tokens and their frequency.
   */
  static searchTokensFrequency =
    application =>
    (collectionId, { minLength = 3, excludeRanked = true } = {}) =>
      withCache(
        `searchTokensFrequency#${collectionId}-${minLength}-${excludeRanked}`,
        () => {
          const tagRankings = loadFileOnce(rankingEnginePath, YAMLHandler);
          const Collection = application.dataset.getModel('Collection');

          const tagFilter = excludeRanked
            ? tag => !tagRankings[tag]
            : () => true;

          const snippets = Collection.records.get(collectionId).snippets;
          const tokens = snippets
            .map(snippet => snippet.searchTokensArray, {
              flat: true,
            })
            .flat()
            .filter(token => {
              return (
                token.length >= minLength &&
                !serverStopWords.includes(token) &&
                tagFilter(token)
              );
            });
          const frequency = new Map(
            Object.entries(
              tokens.reduce((acc, token) => {
                acc[token] = (acc[token] || 0) + 1;
                return acc;
              }, {})
            ).sort((a, b) => b[1] - a[1])
          );

          return frequency;
        }
      );
}
