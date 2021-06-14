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
        author: structuredData.author
          ? {
              '@type': 'Person',
              ...structuredData.author,
            }
          : {
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
    case 'home':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: `${config.websiteUrl}`,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${config.websiteUrl}/search?keyphrase={keyphrase}`,
          'query-input': 'required name=keyphrase',
        },
      };
    default:
      /* istanbul ignore next */
      return {};
  }
};
