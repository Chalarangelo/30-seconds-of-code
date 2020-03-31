import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'components/atoms/anchor';
import literals from 'lang/en/client/footer';
import config from 'config/global';

const propTypes = {
  rest: PropTypes.any,
};

/**
 * Static component that renders the page footer.
 * Dependent on the `Anchor` atom.
 */
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
        { literals.about }
      </Anchor>
      <Anchor
        link={ {
          internal: true,
          url: '/cookies',
        } }
        className='footer-link'
      >
        { literals.cookies }
      </Anchor>
      <Anchor
        link={ {
          internal: false,
          url: config.githubOrgUrl,
          rel: 'noopener nofollow',
          target: '_blank',
        } }
        className='footer-link'
      >
        { literals.github }
      </Anchor>
      <Anchor
        link={ {
          internal: false,
          url: config.twitterUrl,
          rel: 'noopener nofollow',
          target: '_blank',
        } }
        className='footer-link'
      >
        { literals.twitter }
      </Anchor>
      <Anchor
        link={ {
          internal: false,
          url: config.discordUrl,
          rel: 'noopener nofollow',
          target: '_blank',
        } }
        className='footer-link'
      >
        { literals.discord }
      </Anchor>
    </p>
    <p>
      { literals.copyright }
      <Anchor
        link={ {
          internal: false,
          url: config.githubOrgUrl,
          rel: 'noopener',
          target: '_blank',
        } }
      >
        { config.orgName }
      </Anchor>
      <br/>
      { literals.snippetLicense }
      <Anchor
        link={ {
          internal: false,
          url: config.licenseUrl,
          rel: 'noopener nofollow',
          target: '_blank',
        } }
      >
        { literals.ccLicense }
      </Anchor>
      <br/>
      { literals.poweredBy }
      <Anchor
        link={ {
          internal: false,
          url: 'https://www.netlify.com/',
          rel: 'noopener nofollow',
          target: '_blank',
        } }
      >
        { literals.netlify }
      </Anchor>
      { ', ' }
      <Anchor
        link={ {
          internal: false,
          url: 'https://www.gatsbyjs.org/',
          rel: 'noopener nofollow',
          target: '_blank',
        } }
      >
        { literals.gatsby }
      </Anchor>
      { ', ' }
      <Anchor
        link={ {
          internal: false,
          url: 'https://travis-ci.com/',
          rel: 'noopener nofollow',
          target: '_blank',
        } }
      >
        { literals.travis }
      </Anchor>
      { ' & ' }
      <Anchor
        link={ {
          internal: false,
          url: 'https://github.com/',
          rel: 'noopener nofollow',
          target: '_blank',
        } }
      >
        { literals.github }
      </Anchor>
    </p>
  </footer>
);

Footer.propTypes = propTypes;

export default Footer;
