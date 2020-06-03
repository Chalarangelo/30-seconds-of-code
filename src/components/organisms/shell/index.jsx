import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Anchor from 'components/atoms/anchor';
import Search from 'components/molecules/search';
import Footer from 'components/molecules/footer';
import CookieConsentPopup from 'components/molecules/cookieConsentPopup';
import literals from 'lang/en/client/common';
import { combineClassNames } from 'utils';
import env from '../../../../.build/env';

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
  logoSrc: PropTypes.string,
  lastPageUrl: PropTypes.string.isRequired,
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
  logoSrc,
  lastPageUrl,
  children,
}) => (
  <div className={ combineClassNames`page-container ${isDarkMode ? 'dark' : ''}` }>
    <header
      className='nav-bar'
      role='navigation'
      aria-label='Main'
    >
      <Anchor className='nav-btn' link={ { internal: true, url: '/' } } >
        <img
          src={ logoSrc }
          alt={ literals.home }
          className='nav-website-logo'
        />
      </Anchor>
      <Search isMainSearch={ isSearch } />
      <Anchor
        className='nav-btn icon icon-settings'
        title={ literals.settings }
        link={ {
          internal: true,
          url: isSettings ? lastPageUrl ? lastPageUrl : '/' : '/settings',
          rel: 'nofollow',
        } }
      />
    </header>
    <div className='content'>
      { children }
      <Footer />
    </div>
    {
      typeof acceptsCookies === 'undefined' && env === 'PRODUCTION' && !isBot ?
        <CookieConsentPopup /> : null
    }
  </div>
);

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
