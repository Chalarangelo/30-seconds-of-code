/* eslint-disable no-prototype-builtins */
/**
 * Check if an object has the given key.
 * @param {object} obj - An object.
 * @param {array} keys - A list of nested keys.
 */
export const hasKey = (obj, keys) => {
  return (
    keys.length > 0 &&
    keys.every(key => {
      if (typeof obj !== 'object' || !obj.hasOwnProperty(key)) return false;
      obj = obj[key];
      return true;
    })
  );
};

/**
 * Check if an object has all the given keys.
 * @param {object} obj - A plain object.
 * @param {array} keys - An array of stringified keys.
 */
export const hasKeys = (obj, keys) =>
  typeof obj === 'object' &&
  keys.every(key => hasKey(obj, Array.isArray(key) ? key : [key]));

/**
 * Retrieve a set of properties indicated by the given selectors from an object.
 * @param {object} from - An object.
 * @param  {array} selectors - A list of selector keys.
 */
export const get = (from, selectors) =>
  selectors
    .map(s => (Array.isArray(s) ? s.join('.') : s))
    .map(s =>
      s
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter(t => t !== '')
        .reduce((prev, cur) => prev && prev[cur], from)
    );

/**
 * Generates structured data for a given entity based on the type.
 * @param {object} structuredData - An object with the required information.
 * @param {object} config - A configuration object for the website.
 * @param {string} logoSrc - Relative url for the logo image.
 */
export const generateStructuredData = (structuredData, config, logoSrc) => {
  switch (structuredData.type) {
    case 'snippet':
      return {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        name: structuredData.title,
        url: `${config.websiteUrl}${structuredData.slug}`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${config.websiteUrl}${structuredData.slug}`,
        },
        headline: structuredData.title,
        description: structuredData.description,
        image: `${config.websiteUrl}${logoSrc}`,
        datePublished: structuredData.firstSeen,
        dateModified: structuredData.lastUpdated,
        author: {
          '@type': 'Organization',
          name: config.orgName,
          logo: {
            '@type': 'ImageObject',
            url: `${config.websiteUrl}${structuredData.orgLogoSrc}`,
          },
        },
        publisher: {
          '@type': 'Organization',
          name: config.orgName,
          logo: {
            '@type': 'ImageObject',
            url: `${config.websiteUrl}${structuredData.orgLogoSrc}`,
          },
        },
      };
    case 'listing':
      return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: structuredData.title,
        url: `${config.websiteUrl}${structuredData.slug}`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${config.websiteUrl}${structuredData.slug}`,
        },
        numberOfItems: structuredData.items.length,
        itemListElement: structuredData.items.map((li, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${config.websiteUrl}${li.url}`,
          name: li.title,
        })),
      };
    default:
      /* istanbul ignore next */
      return {};
  }
};
