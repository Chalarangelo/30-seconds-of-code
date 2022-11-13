import Link from 'next/link';
import Search from 'components/molecules/search';
import Footer from 'components/atoms/footer';
import CookieConsentPopup from 'components/molecules/cookieConsentPopup';
import literals from 'lang/en/client/common';
import { useShellState } from 'state/shell';

/**
 * Renders the application shell (Context-connected)
 * @param {bool} acceptsCookies - Does the user accept cookies?
 * @param {bool} isBot - Is the client a bot? (Auto-detect)
 * @param {bool} isSearch - Is this a search page?
 * @param {bool} isSettings - Is this a search page?
 */
const Shell = ({ isSearch = false, isFaq = false, children }) => {
  const { acceptsCookies, isBot } = useShellState();

  return (
    <div className='page-container'>
      <header
        className='nav-bar px-1 flex j-center a-center box-border'
        role='navigation'
        aria-label='Main'
      >
        <a href='#skip-link-target' className='skip-link fs-lg'>
          {literals.skipToContent}
        </a>
        <Link href='/'>
          <h1 className='m-0 fs-sm'>
            <a title={literals.siteName} aria-label={literals.siteName}>
              <img
                fetchpriority='high'
                src='/assets/30s-logo.png'
                alt={literals.home}
                className='nav-website-logo'
                width='124'
                height='42'
              />
            </a>
          </h1>
        </Link>
        <div className='nav-control-wrapper grid txt-150 a-center'>
          <Link href='/list/p/1'>
            <a className='px-2'>
              <span className='txt-150'>{literals.snippets}</span>
            </a>
          </Link>
          <Link href='/collections/p/1'>
            <a className='px-2'>
              <span className='txt-150'>{literals.collections}</span>
            </a>
          </Link>
          <Search isMainSearch={isSearch} />
        </div>
      </header>
      <div
        className='content my-0 mx-auto'
        {...(isFaq
          ? { itemScope: true, itemType: 'https://schema.org/FAQPage' }
          : {})}
      >
        <a
          href='#skip-link-target'
          className='skip-link fs-lg'
          id='skip-link-target'
        >
          {literals.startOfContent}
        </a>
        {children}
        <Footer />
      </div>
      {typeof acceptsCookies === 'undefined' &&
      process.env.NODE_ENV !== 'development' &&
      !isBot ? (
        <CookieConsentPopup />
      ) : null}
    </div>
  );
};

export default Shell;
