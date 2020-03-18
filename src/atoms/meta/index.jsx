import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Meta as MetaPropType } from 'typedefs';
import _ from 'lang';
import config from '../../../config';

require('index.scss'); // Do not change this to `import`, it's not going to work, no clue why

/**
 * Creates the <head> metadata content.
 * Depends on react-helmet.
 */
const Meta = ({
  title,
  description = '',
  locale = 'en',
  acceptsCookies,
  meta = [],
  logoSrc,
  structuredData,
  breadcrumbsData,
  canonical = '',
}) => {
  const _l = _(locale);
  const metaDescription = description || _l('site.pageDescription');

  // Load scripts
  const scripts = [];
  if (structuredData) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${config.siteUrl}${structuredData.slug}`,
        },
        'headline': structuredData.title,
        'image': [
          `${config.siteUrl}${logoSrc}`,
        ],
        'datePublished': structuredData.firstSeen,
        'dateModified': structuredData.lastUpdated,
        'author': {
          '@type': 'Organization',
          'name': config.author,
          'logo': {
            '@type': 'ImageObject',
            'url': `${config.siteUrl}${structuredData.orgLogoSrc}`,
          },
        },
        'publisher': {
          '@type': 'Organization',
          'name': config.author,
          'logo': {
            '@type': 'ImageObject',
            'url': `${config.siteUrl}${structuredData.orgLogoSrc}`,
          },
        },
        'description': structuredData.description,
      }),
    });
  }

  if (breadcrumbsData) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbsData.map((breadcrumb, i) => ({
          '@type': 'ListItem',
          'position': i + 1,
          'item': {
            '@id': `${config.siteUrl}${breadcrumb.link.url}`,
            'name': `${breadcrumb.name}`,
          },
        })),
      }),
    });
  }

  if(typeof window !== 'undefined' && acceptsCookies) {
    scripts.push({
      async: '',
      src: `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics.id}`,
    });

    scripts.push({
      innerHTML: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag(
        'config',
        '${config.googleAnalytics.id}',
        ${JSON.stringify(config.googleAnalytics.config)}
      );
      `,
    });
    // Send a pageview only the first time that gtag is added (is this safe?)
    if(typeof gtag === 'undefined') {
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
      htmlAttributes={ {
        lang: locale,
      } }
      title={ title ? title : _l('site.title') }
      titleTemplate={ title ? `%s - ${_l('site.title')}` : '%s' }
      meta={ [
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
          content: title ? `${title} - ${_l('site.title')}` : _l('site.title'),
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
          content: `${config.siteUrl}${logoSrc}`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:site`,
          content: `@30secondsofcode`,
        },
      ].concat(meta) }
      script={ scripts }
    >
      <link
        rel="preconnect dns-prefetch"
        key="preconnect-google-analytics"
        href="https://www.google-analytics.com"
      />
      {
        canonical ?
          <link
            rel="canonical"
            href={ `${config.siteUrl}${canonical}` }
          />
          : null
      }
    </Helmet>
  );
};

Meta.propTypes = {
  /** Page title */
  title: PropTypes.string,
  /** Page description */
  description: PropTypes.string,
  /** Page locale (language) */
  locale: PropTypes.string,
  /** Does the user accept cookies? */
  acceptsCookies: PropTypes.bool,
  /** Metadata array */
  meta: PropTypes.arrayOf(MetaPropType),
  /** Page logo URI */
  logoSrc: PropTypes.string,
  /** Structured data for the page (if any) */
  structuredData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    orgLogoSrc: PropTypes.string,
    firstSeen: PropTypes.string,
    lastUpdated: PropTypes.string,
  }),
  /** Structured data for breadcrumbs (if any) */
  breadcrumbsData: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.shape({
        url: PropTypes.string,
      }),
      name: PropTypes.string,
    })
  ),
  /** Canonical slug (not full URL) of this page, if canonical */
  canonical: PropTypes.string,
};

export default connect(
  state => ({
    acceptsCookies: state.shell.acceptsCookies,
  }),
  null
)(Meta);
