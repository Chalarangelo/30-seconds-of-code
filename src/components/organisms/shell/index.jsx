import React from 'react';
import PropTypes from 'typedefs/proptypes';
import loadable from '@loadable/component';
import Search from 'components/molecules/search';
import Footer from 'components/molecules/footer';
import CookieConsentPopup from 'components/molecules/cookieConsentPopup';
import literals from 'lang/en/client/common';
import { useShellState } from 'state/shell';

const DevelopmentControls = loadable(() =>
  process.env.ENV === 'development'
    ? import('components/molecules/developmentControls')
    : () => null
);

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isSearch: PropTypes.bool,
  pageContext: PropTypes.shape({}),
};

/**
 * Renders the application shell (Context-connected)
 * @param {bool} acceptsCookies - Does the user accept cookies?
 * @param {bool} isBot - Is the client a bot? (Auto-detect)
 * @param {bool} isSearch - Is this a search page?
 * @param {bool} isSettings - Is this a search page?
 * @param {bool} pageContext - Page context (only-passed down in development)
 */
const Shell = ({ isSearch = false, children, pageContext }) => {
  const { acceptsCookies, isBot } = useShellState();

  return (
    <div className='page-container'>
      <header className='nav-bar' role='navigation' aria-label='Main'>
        <a className='nav-btn' href='/'>
          <img
            src='/assets/30s-icon.png'
            alt={literals.home}
            className='nav-website-logo'
            width='64'
            height='64'
          />
        </a>
        <a className='nav-title-wrapper' href='/' aria-label={literals.home}>
          <h1 className='nav-title txt-200 f-alt'>{literals.siteName}</h1>
          <p className='nav-subtitle txt-100'>{literals.siteDescription}</p>
        </a>
        <Search isMainSearch={isSearch} />
      </header>
      <div className='content'>
        {children}
        <Footer />
      </div>
      {process.env.ENV === 'development' && (
        <DevelopmentControls pageContext={pageContext} />
      )}
      {typeof acceptsCookies === 'undefined' &&
      process.env.ENV !== 'development' &&
      !isBot ? (
        <CookieConsentPopup />
      ) : null}
    </div>
  );
};

Shell.propTypes = propTypes;

export default Shell;
