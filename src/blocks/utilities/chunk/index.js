import globalConfig from 'settings/global';

const routePrefix = globalConfig.websiteUrl;

/**
 * Helper methods for working with chunked JSONs.
 */
export class Chunk {
  /**
   * Creates the bare minimum for an index chunk.
   * @param {string} path - Relative path for the chunk (e.g. `/404`).
   * @param {string} template - Name of the template to be used.
   * @param {number} priority - A value between 0.0 and 1.0 (default 0.5)
   * @param {object} rest - (Optional) Rest of the data to add
   */
  static createIndex = (path, template, priority = 0.5, rest = {}) => {
    const relRoute = path.startsWith('/') ? path : `/${path}`;
    return {
      template,
      relRoute,
      fullRoute: `${routePrefix}${relRoute}`,
      priority,
      ...rest,
    };
  };

  static createStaticPageChunks = (
    outPath,
    slug,
    template,
    priority,
    context = {}
  ) => {
    return [
      `${outPath}${slug}`,
      ['index', Chunk.createIndex(slug, template, priority)],
      ['context', context],
    ];
  };
}
