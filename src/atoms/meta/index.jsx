import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Meta as MetaPropType } from 'typedefs';
import _ from 'lang';
import config from '../../../config';

require('index.scss'); // Do not change this to `import`, it's not going to work, no clue why

const Meta = ({
  title,
  description = '',
  locale = 'en',
  meta = [],
  logoSrc,
  structuredData,
}) => {
  const _l = _(locale); // IDEA: Pass this to all components below or use it in Redux store to be able to localize the website in the future
  const metaDescription = description || _l('site.pageDescription');

  return (
    <Helmet
      htmlAttributes={ {
        lang: locale,
      } }
      title={ title ? title : _l('site.title') }
      titleTemplate={ title ? `%s - ${_l('site.title')}` : '%s' }
      // IDEA: generalize the meta, extract a constant or config somewhere
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
          name: `og:title`,
          content: title ? `${title} - ${_l('site.title')}` : _l('site.title'),
        },
        {
          name: `og:description`,
          content: metaDescription,
        },
        {
          name: `og:type`,
          content: `website`,
        },
        {
          name: `og:image`,
          content: logoSrc,
        },
      ].concat(meta) }
      script={ structuredData ? [
        {
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
        },
      ] : [] }
      // IDEA: See if we need to deal with this later
      // bodyAttributes={{
      //   class: ''
      // }}
    />
  );
};

Meta.propTypes = {
  /** Page title */
  title: PropTypes.string,
  /** Page description */
  description: PropTypes.string,
  /** Page locale (language) */
  locale: PropTypes.string,
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
};

export default Meta;
