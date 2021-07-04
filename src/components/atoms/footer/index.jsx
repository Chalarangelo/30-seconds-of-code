import Link from 'next/link';
import literals from 'lang/en/client/footer';
import settings from 'settings/global';

/**
 * Static component that renders the page footer.
 */
const Footer = () => (
  <footer className='mt-8 pt-6 mx-2 mb-0'>
    <p className='fs-xs my-1.5'>
      <Link href='/about'>
        <a>{literals.about}</a>
      </Link>
      <Link href='/cookies'>
        <a className='ml-4'>{literals.cookies}</a>
      </Link>
      <a className='ml-4' href='/feed' data-link-rel='no-route'>
        {literals.feed}
      </a>
      <a
        className='ml-4'
        href={settings.githubOrgUrl}
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.github}
      </a>
      <a
        className='ml-4'
        href={settings.twitterUrl}
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {literals.twitter}
      </a>
    </p>
    <p className='fs-xs mt-0.5'>
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
