import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from 'components/molecules/navBar';
import Footer from 'components/molecules/footer';
import CookieConsentPopup from 'components/molecules/cookieConsentPopup';
import { trimWhiteSpace } from 'functions/utils';
import { decideCookies } from 'state/shell';
import env from '../../../../.build/env';

// eslint-disable-next-line complexity
const Shell = ({
  isDarkMode,
  acceptsCookies,
  isBot,
  isSearch = false,
  isSettings = false,
  dispatch,
  logoSrc,
  lastPageUrl,
  children,
}) => {
  return (
    <div
      className={ trimWhiteSpace`page-container ${isDarkMode ? 'dark' : ''}` }
    >
      {
        typeof acceptsCookies === 'undefined' && env === 'PRODUCTION' && !isBot ?
          <CookieConsentPopup
            onAccept={ e => {
              e.preventDefault();
              dispatch(decideCookies(true));
            } }
            onDecline={ e => {
              e.preventDefault();
              dispatch(decideCookies(false));
            } }
          />
          : null
      }
      <NavBar
        logoSrc={ logoSrc }
        homeLink={ {
          internal: true,
          url: '/',
        } }
        settingsLink={ {
          internal: true,
          url: isSettings ? lastPageUrl ? lastPageUrl : '/' : '/settings',
          rel: 'nofollow',
        } }
        hasMainSearch={ isSearch }
      >
      </NavBar>
      <div className='content'>
        { children }
        <Footer />
      </div>
    </div>
  );
};

Shell.propTypes = {
  /** Children elements */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Should dark mode be applied? */
  isDarkMode: PropTypes.bool,
  /** Does the user accept cookies? */
  acceptsCookies: PropTypes.bool,
  /** Is the client a bot? (Auto-detect) */
  isBot: PropTypes.bool,
  /** Is this a search page? */
  isSearch: PropTypes.bool,
  /** Is this a search page? */
  isSettings: PropTypes.bool,
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
  /** URI for the logo image */
  logoSrc: PropTypes.string,
  /** URL of the last page */
  lastPageUrl: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    isDarkMode: state.shell.isDarkMode,
    lastPageUrl: state.navigation.lastPageUrl,
    acceptsCookies: state.shell.acceptsCookies,
    isBot: state.shell.isBot,
  }),
  null
)(Shell);
