import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'atoms/anchor';
import config from '../../../config';
import _ from 'lang';
const _l = _('en');

const Footer = ({
  ...rest
}) => (
  <footer { ...rest }>
    <p>
      <Anchor
        link={ {
          internal: true,
          url: '/about',
        } }
        className='footer-link'
      >
        { _l('footer.about') }
      </Anchor>
      <Anchor
        link={ {
          internal: true,
          url: '/cookies',
        } }
        className='footer-link'
      >
        { _l('footer.cookies') }
      </Anchor>
      <Anchor
        link={ {
          internal: false,
          url: config.githubOrgUrl,
          rel: 'noopener',
          target: '_blank',
        } }
        className='footer-link'
      >
        { _l('footer.github') }
      </Anchor>
      <Anchor
        link={ {
          internal: false,
          url: config.twitterUrl,
          rel: 'noopener',
          target: '_blank',
        } }
        className='footer-link'
      >
        { _l('footer.twitter') }
      </Anchor>
    </p>
    <p>
      { _l('Website, name & logo © 2017-2019 ') }
      <Anchor
        link={ {
          internal: false,
          url: config.githubOrgUrl,
          rel: 'noopener',
          target: '_blank',
        } }
      >
        { _l('30-seconds') }
      </Anchor>
      <br/>
      { _l('Individual snippets licensed under ') }
      <Anchor
        link={ {
          internal: false,
          url: config.licenseUrl,
          rel: 'noopener',
          target: '_blank',
        } }
      >
        { _l('CC0-1.0') }
      </Anchor>
      <br/>
      { _l('Powered by ') }
      <Anchor
        link={ {
          internal: false,
          url: 'https://github.com/',
          rel: 'noopener',
          target: '_blank',
        } }
      >
        { _l('GitHub') }
      </Anchor>
      { _l(', ') }
      <Anchor
        link={ {
          internal: false,
          url: 'https://www.gatsbyjs.org/',
          rel: 'noopener',
          target: '_blank',
        } }
      >
        { _l('Gatsby') }
      </Anchor>
      { _l(', ') }
      <Anchor
        link={ {
          internal: false,
          url: 'https://travis-ci.com/',
          rel: 'noopener',
          target: '_blank',
        } }
      >
        { _l('Travis CI') }
      </Anchor>
      { _l(' & ') }
      <Anchor
        link={ {
          internal: false,
          url: 'https://www.netlify.com/',
          rel: 'noopener',
          target: '_blank',
        } }
      >
        { _l('Netlify') }
      </Anchor>
    </p>
  </footer>
);

Footer.propTypes = {
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default Footer;
