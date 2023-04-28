import settings from 'settings/global';

const { websiteUrl, orgName } = settings;
const orgLogoSrc = '/assets/30s-icon.png';

/**
 * Utility for generating structured data for pages.
 */
export class Schemer {
  static logo = {
    '@type': 'ImageObject',
    url: `${websiteUrl}${orgLogoSrc}`,
  };

  static organization = {
    '@type': 'Organization',
    name: orgName,
    logo: Schemer.logo,
  };

  static generateSnippetData = ({
    title,
    slug,
    description,
    cover,
    dateModified,
    author,
  }) => {
    const url = `${websiteUrl}${slug}`;
    const coverSrc = cover ? cover : orgLogoSrc;
    const _author = author
      ? {
          '@type': 'Person',
          name: author.name,
          url: author.profile,
        }
      : Schemer.organization;

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
      author: _author,
      publisher: Schemer.organization,
    };
  };

  static generateListingData = ({ title, slug, items }) => {
    const url = `${websiteUrl}${slug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: title,
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
      potentialAction: {
        '@type': 'SearchAction',
        target: `${websiteUrl}/search?keyphrase={keyphrase}`,
        'query-input': 'required name=keyphrase',
      },
    };
  };
}
