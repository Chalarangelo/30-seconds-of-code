import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Meta as MetaPropType } from 'proptypes';
import _ from 'lang';

require('index.scss'); // Do not change this to `import`, it's not going to work, no clue why

const Meta = ({
  title,
  description = '',
  locale = 'en',
  meta = [],
  logoSrc,
}) => {
  const _l = _(locale); // TODO: Pass this to all components below or use it in Redux store to be able to localize the website in the future
  const metaDescription = description || _l('site.description');

  return (
    <Helmet
      htmlAttributes={ {
        lang: locale,
      } }
      title={ title ? title : _l('site.title') }
      titleTemplate={ title ? `%s - ${_l('site.title')}` : '%s' }
      // TODO: generalize the meta, extract a constant or config somewhere
      meta={ [
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: _l('site.author'),
        },
        {
          name: `viewport`,
          content: `width=device-width, initial-scale=1`,
        },
        {
          name: `og:title`,
          content: _l('site.title'),
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
      // TODO: See if we need to deal with this later
      // bodyAttributes={{
      //   class: ''
      // }}
    />
  );
};

Meta.propTypes = {
  /** Page title */
  title: PropTypes.string.isRequired,
  /** Page description */
  description: PropTypes.string,
  /** Page locale (language) */
  locale: PropTypes.string,
  /** Metadata array */
  meta: PropTypes.arrayOf(MetaPropType),
  /** Page logo URI */
  logoSrc: PropTypes.string.isRequired,
};

export default Meta;
