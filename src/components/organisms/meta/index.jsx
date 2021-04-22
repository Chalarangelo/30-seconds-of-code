import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Head from 'next/head';
import settings from 'settings/global';
import literals from 'lang/en/client/common';
import { generateStructuredData } from 'utils';
import { useShellState } from 'state/shell';

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
 * Dependent on the `next/head` component.
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
  logoSrc = '/assets/logo.png',
  structuredData,
  breadcrumbsData,
  canonical = '',
}) => {
  const { acceptsCookies } = useShellState();
  const metaDescription = description || literals.siteDescription;
  const titleString = title
    ? `${title} - ${literals.siteName}`
    : literals.siteName;

  // Load scripts
  const scripts = [];
  if (structuredData) {
    scripts.push({
      type: 'application/ld+json',
      key: 'structured-data',
      innerHTML: JSON.stringify(
        generateStructuredData(structuredData, settings, logoSrc)
      ),
    });
  }

  if (breadcrumbsData) {
    scripts.push({
      type: 'application/ld+json',
      key: 'breadcrumb-data',
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
      async: true,
      key: 'gtag-id',
      src: `https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalytics.id}`,
    });
    // GTAG
    scripts.push({
      key: 'gtag',
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
        key: 'gtag-pageview',
        innerHTML: `
        var hasFired = false;
        if(!hasFired){
          window.gtag('event', 'page_view', { page_path: '${window.location.pathname}' });
          hasFired = true;
        }`,
      });
    }

    // Hotjar
    scripts.push({
      key: 'hotjar',
      innerHTML: `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1988882,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
    });
  }

  return (
    <Head>
      <title>{titleString}</title>
      <meta name='description' content={metaDescription} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:title' content={titleString} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={`${settings.websiteUrl}${logoSrc}`} />
      <meta name='twitter:site' content={settings.twitterAccount} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta
        name='twitter:title'
        content={title ? `${title}` : literals.siteName}
      />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={`${settings.websiteUrl}${logoSrc}`} />
      {scripts.map(({ key, innerHTML, ...rest }) => (
        <script
          key={key}
          dangerouslySetInnerHTML={{ __html: innerHTML }}
          {...rest}
        />
      ))}
      <link
        rel='preconnect dns-prefetch'
        key='preconnect-google-analytics'
        href='https://www.google-analytics.com'
      />
      <link
        key='link-sitemap'
        rel='sitemap'
        href='/sitemap.xml'
        type='application/xml'
      />
      <link
        key='link-rss-feed'
        rel='alternate'
        href='/feed'
        type='application/rss+xml'
        title='30secondsofcode.org'
      />
      <link
        key='link-opensearch'
        rel='search'
        href='/opensearch.xml'
        type='application/opensearchdescription+xml'
        title='Snippet search'
      />
      <link
        rel='icon'
        href={`/assets/icons/favicon-32x32.png?v=${settings.manifestCacheKey}`}
        type='image/png'
      />
      ,
      <link
        rel='manifest'
        href='/manifest.webmanifest'
        crossOrigin='anonymous'
      />
      ,
      <meta name='theme-color' content='#1e253d' />,
      <link
        rel='apple-touch-icon'
        sizes='48x48'
        href={`/assets/icons/icon-48x48.png?v=${settings.manifestCacheKey}`}
      />
      ,
      <link
        rel='apple-touch-icon'
        sizes='72x72'
        href={`/assets/icons/icon-72x72.png?v=${settings.manifestCacheKey}`}
      />
      ,
      <link
        rel='apple-touch-icon'
        sizes='96x96'
        href={`/assets/icons/icon-96x96.png?v=${settings.manifestCacheKey}`}
      />
      ,
      <link
        rel='apple-touch-icon'
        sizes='144x144'
        href={`/assets/icons/icon-144x144.png?v=${settings.manifestCacheKey}`}
      />
      ,
      <link
        rel='apple-touch-icon'
        sizes='192x192'
        href={`/assets/icons/icon-192x192.png?v=${settings.manifestCacheKey}`}
      />
      ,
      <link
        rel='apple-touch-icon'
        sizes='256x256'
        href={`/assets/icons/icon-256x256.png?v=${settings.manifestCacheKey}`}
      />
      ,
      <link
        rel='apple-touch-icon'
        sizes='384x384'
        href={`/assets/icons/icon-384x384.png?v=${settings.manifestCacheKey}`}
      />
      ,
      <link
        rel='apple-touch-icon'
        sizes='512x512'
        href={`/assets/icons/icon-512x512.png?v=${settings.manifestCacheKey}`}
      />
      ,
      {canonical ? (
        <link rel='canonical' href={`${settings.websiteUrl}${canonical}`} />
      ) : null}
    </Head>
  );
};

Meta.propTypes = propTypes;

export default Meta;
