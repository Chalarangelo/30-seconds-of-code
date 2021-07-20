import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';
import Search from 'components/molecules/search';
import Footer from 'components/atoms/footer';
import CookieConsentPopup from 'components/molecules/cookieConsentPopup';
import literals from 'lang/en/client/common';
import { useShellState } from 'state/shell';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isSearch: PropTypes.bool,
};

/**
 * Renders the application shell (Context-connected)
 * @param {bool} acceptsCookies - Does the user accept cookies?
 * @param {bool} isBot - Is the client a bot? (Auto-detect)
 * @param {bool} isSearch - Is this a search page?
 * @param {bool} isSettings - Is this a search page?
 */
const Shell = ({ isSearch = false, children }) => {
  const { acceptsCookies, isBot } = useShellState();

  return (
    <div className='page-container'>
      <header
        className='nav-bar flex j-center a-center box-border'
        role='navigation'
        aria-label='Main'
      >
        <Link href='/'>
          <a className='nav-logo-wrapper'>
            <img
              src='/assets/30s-icon.png'
              alt={literals.home}
              className='nav-website-logo'
              width='64'
              height='64'
            />
          </a>
        </Link>
        <Link href='/'>
          <a
            className='nav-title-wrapper flex flex-col flex-none'
            aria-label={literals.home}
          >
            <h1 className='nav-title m-0 txt-200 f-alt'>{literals.siteName}</h1>
            <p className='nav-subtitle m-0 txt-100'>
              {literals.siteDescription}
            </p>
          </a>
        </Link>
        <Search isMainSearch={isSearch} />
      </header>
      <div className='content my-0 mx-auto'>
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

Shell.propTypes = propTypes;

export default Shell;
