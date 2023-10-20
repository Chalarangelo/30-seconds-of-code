import settings from '#settings/global';

const { websiteUrl, ownerName, ownerUrl } = settings;
const orgLogoSrc = '/assets/30s-icon.png';

/**
 * Utility for generating structured data for pages.
 */
export class Schemer {
  static generateSnippetData = ({
    title,
    slug,
    description,
    cover,
    dateModified,
  }) => {
    const url = `${websiteUrl}${slug}`;
    const coverSrc = cover ? cover : orgLogoSrc;

    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      name: title,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      headline: title,
      description,
      image: `${websiteUrl}${coverSrc}`,
      datePublished: dateModified,
      dateModified,
      publisher: { '@type': 'Person', name: ownerName, url: ownerUrl },
    };
  };

  static generateListingData = ({ title, slug, pageNumber, items }) => {
    const name = pageNumber === 1 ? title : `${title} - Page ${pageNumber}`;
    const url = `${websiteUrl}${slug}`;

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      numberOfItems: items.length,
      itemListElement: items.map((li, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${websiteUrl}${li.url}`,
        name: li.title,
      })),
    };
  };

  static generateHomeData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: websiteUrl,
    };
  };
}
