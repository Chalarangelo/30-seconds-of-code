import React from 'react';
import literals from 'lang/en/client/footer';
import config from 'config/global';

/**
 * Static component that renders the page footer.
 */
const Footer = () => (
  <footer>
    <p>
      <a
        className='footer-link'
        href='/about'
      >
        { literals.about }
      </a>
      <a
        className='footer-link'
        href='/cookies'
      >
        { literals.cookies }
      </a>
      <a
        className='footer-link'
        href={ config.githubOrgUrl }
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        { literals.github }
      </a>
      <a
        className='footer-link'
        href={ config.twitterUrl }
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        { literals.twitter }
      </a>
    </p>
    <p>
      { literals.copyright }
      <a
        href={ config.githubOrgUrl }
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        { config.orgName }
      </a>
      <br/>
      { literals.snippetLicense }
      <a
        href={ config.licenseUrl }
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        { literals.ccLicense }
      </a>
      <br/>
      { literals.poweredBy }
      <a
        href='https://www.netlify.com/'
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        { literals.netlify }
      </a>
      { ', ' }
      <a
        href='https://www.gatsbyjs.org/'
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        { literals.gatsby }
      </a>
      { ', ' }
      <a
        href='https://travis-ci.com/'
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        { literals.travis }
      </a>
      { ' & ' }
      <a
        href='https://github.com/'
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        { literals.github }
      </a>
    </p>
  </footer>
);

export default Footer;
