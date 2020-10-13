import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Search from 'components/molecules/search';
import Footer from 'components/molecules/footer';
import CookieConsentPopup from 'components/molecules/cookieConsentPopup';
import literals from 'lang/en/client/common';
import { pushNewPage } from 'state/navigation';
import { combineClassNames } from 'utils';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isDarkMode: PropTypes.bool,
  acceptsCookies: PropTypes.bool,
  isBot: PropTypes.bool,
  isSearch: PropTypes.bool,
  isSettings: PropTypes.bool,
  lastPageUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
};

/**
 * Renders the application shell (Redux-connected)
 * @param {bool} isDarkMode - Should dark mode be applied?
 * @param {bool} acceptsCookies - Does the user accept cookies?
 * @param {bool} isBot - Is the client a bot? (Auto-detect)
 * @param {bool} isSearch - Is this a search page?
 * @param {bool} isSettings - Is this a search page?
 */
const Shell = ({
  isDarkMode,
  acceptsCookies,
  isBot,
  isSearch = false,
  isSettings = false,
  lastPageUrl,
  dispatch,
  children,
}) => {
  React.useEffect(() => {
    if(isDarkMode) document.querySelector('body').classList.add('dark');
    else document.querySelector('body').classList.remove('dark');
  }, [isDarkMode]);

  return (
    <div className={ combineClassNames`page-container ${isDarkMode ? 'dark' : ''}` }>
      <header
        className='nav-bar'
        role='navigation'
        aria-label='Main'
      >
        <a className='nav-btn' href='/'>
          <img
            src='/assets/30s-icon.png'
            alt={ literals.home }
            className='nav-website-logo'
          />
        </a>
        <Search isMainSearch={ isSearch } />
        <a
          className='nav-btn icon icon-settings'
          href={ isSettings ? lastPageUrl ? lastPageUrl : '/' : '/settings' }
          rel='nofollow'
          title={ literals.settings }
          onClick={ () => {
            if (isSettings || !window || !window.location) return;
            dispatch(pushNewPage(window.location.pathname));
          } }
        />
      </header>
      <div className='content'>
        { children }
        <Footer />
      </div>
      {
        typeof acceptsCookies === 'undefined' && process.env.ENV !== 'development' && !isBot ?
          <CookieConsentPopup /> : null
      }
    </div>
  );
};

Shell.propTypes = propTypes;

export default connect(
  state => ({
    isDarkMode: state.shell.isDarkMode,
    lastPageUrl: state.navigation.lastPageUrl,
    acceptsCookies: state.shell.acceptsCookies,
    isBot: state.shell.isBot,
  }),
  null
)(Shell);
