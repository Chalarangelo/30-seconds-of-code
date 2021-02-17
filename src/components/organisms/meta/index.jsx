import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Helmet from 'react-helmet';
import settings from 'settings/global';
import literals from 'lang/en/client/common';
import { generateStructuredData } from 'utils';
import { useShellState } from 'state/shell';

require('styles/index.scss'); // Do not change this to `import`, it's not going to work, no clue why

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.meta),
  logoSrc: PropTypes.string,
  structuredData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    orgLogoSrc: PropTypes.string,
    firstSeen: PropTypes.string,
    lastUpdated: PropTypes.string,
  }),
  breadcrumbsData: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  canonical: PropTypes.string,
};

/**
 * Creates the `<head>` metadata content.
 * Dependent on `react-helmet` external module.
 * @param {string} title - Page title (leave empty to use the website title)
 * @param {string} description - Page description (leave empty to use the website title)
 * @param {*} meta - Array of metadata objects (if any)
 * @param {string} logoSrc - Page logo URI
 * @param {object} structuredData - Structured data for the page (if any)
 * @param {object} breadcrumbsData - Structured data for breadcrumbs (if any)
 * @param {string} canonical - Canonical slug (not full URL) of this page, if canonical
 */
const Meta = ({
  title,
  description = '',
  meta = [],
  logoSrc = '/assets/logo.png',
  structuredData,
  breadcrumbsData,
  canonical = '',
}) => {
  const { acceptsCookies } = useShellState();
  const metaDescription = description || literals.siteDescription;

  // Load scripts
  const scripts = [];
  if (structuredData) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(
        generateStructuredData(structuredData, settings, logoSrc)
      ),
    });
  }

  if (breadcrumbsData) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbsData.map((breadcrumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@id': `${settings.websiteUrl}${breadcrumb.url}`,
            name: `${breadcrumb.name}`,
          },
        })),
      }),
    });
  }

  if (typeof window !== 'undefined' && acceptsCookies) {
    scripts.push({
      async: '',
      src: `https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalytics.id}`,
    });
    // GTAG
    scripts.push({
      innerHTML: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag(
        'config',
        '${settings.googleAnalytics.id}',
        ${JSON.stringify(settings.googleAnalytics.config)}
      );
      `,
    });
    // Send a pageview only the first time that gtag is added (is this safe?)
    if (typeof gtag === 'undefined') {
      scripts.push({
        innerHTML: `
        var hasFired = false;
        if(!hasFired){
          window.gtag('event', 'page_view', { page_path: '${window.location.pathname}' });
          hasFired = true;
        }`,
      });
    }
  }

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title ? title : literals.siteName}
      titleTemplate={title ? `%s - ${literals.siteName}` : '%s'}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1`,
        },
        {
          property: `og:title`,
          content: title
            ? `${title} - ${literals.siteName}`
            : literals.siteName,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `${settings.websiteUrl}${logoSrc}`,
        },
        {
          name: `twitter:site`,
          content: settings.twitterAccount,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:title`,
          content: title ? `${title}` : literals.siteName,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: `${settings.websiteUrl}${logoSrc}`,
        },
      ].concat(meta)}
      script={scripts}
    >
      <link
        rel='preconnect dns-prefetch'
        key='preconnect-google-analytics'
        href='https://www.google-analytics.com'
      />
      {canonical ? (
        <link rel='canonical' href={`${settings.websiteUrl}${canonical}`} />
      ) : null}
    </Helmet>
  );
};

Meta.propTypes = propTypes;

export default Meta;
