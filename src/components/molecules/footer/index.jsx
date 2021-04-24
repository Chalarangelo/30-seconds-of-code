import React from 'react';
import Link from 'next/link';
import literals from 'lang/en/client/footer';
import settings from 'settings/global';

/**
 * Static component that renders the page footer.
 */
const Footer = () => (
  <footer>
    <p className='fs-xs'>
      <Link href='/about'>
        <a className='footer-link'>{literals.about}</a>
      </Link>
      <Link href='/cookies'>
        <a className='footer-link'>{literals.cookies}</a>
      </Link>
      <a className='footer-link' href='/feed' data-link-rel='no-route'>
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
        href='https://nextjs.org/'
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.next}
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
