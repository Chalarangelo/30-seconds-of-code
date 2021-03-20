import React from 'react';
import literals from 'lang/en/client/footer';
import settings from 'settings/global';

/**
 * Static component that renders the page footer.
 */
const Footer = () => (
  <footer>
    <p className='fs-xs'>
      <a className='footer-link' href='/about'>
        {literals.about}
      </a>
      <a className='footer-link' href='/cookies'>
        {literals.cookies}
      </a>
      <a className='footer-link' href='/feed'>
        {literals.feed}
      </a>
      <a
        className='footer-link'
        href={settings.githubOrgUrl}
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.github}
      </a>
      <a
        className='footer-link'
        href={settings.twitterUrl}
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.twitter}
      </a>
    </p>
    <p className='fs-xs'>
      {literals.copyright}
      <a
        href={settings.githubOrgUrl}
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {settings.orgName}
      </a>
      <br />
      {literals.snippetLicense}
      <a
        href={settings.licenseUrl}
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.ccLicense}
      </a>
      <br />
      {literals.poweredBy}
      <a
        href='https://www.netlify.com/'
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.netlify}
      </a>
      {', '}
      <a
        href='https://www.gatsbyjs.org/'
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.gatsby}
      </a>
      {' & '}
      <a
        href='https://github.com/'
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.github}
      </a>
    </p>
  </footer>
);

export default Footer;
