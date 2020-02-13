import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from 'molecules/navBar';
import Footer from 'molecules/footer';
import CookieConsentPopup from 'molecules/cookieConsentPopup';
import { useMedia } from 'functions/hooks';
import { trimWhiteSpace } from 'functions/utils';
import { toggleDarkMode, decideCookies } from 'state/shell';
import config from '../../../config';
import env from '../../../.build/env';

// eslint-disable-next-line complexity
const Shell = ({
  isDarkMode,
  acceptsCookies,
  isSearch = false,
  dispatch,
  logoSrc,
  externalUrl = config.repositoryUrl,
  children,
}) => {
  const darkModeEnabledInitially = useMedia(
    ['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)'],
    [true, false],
    false
  );

  useEffect(() => {
    if (darkModeEnabledInitially && isDarkMode === undefined)
      dispatch(toggleDarkMode(true));
  }, []);

  return (
    <div
      className={ trimWhiteSpace`page-container ${isDarkMode ? 'dark' : ''}` }
    >
      {
        typeof acceptsCookies === 'undefined' && env === 'PRODUCTION' ?
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
          url: '/settings',
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
  /** Is this a search page? */
  isSearch: PropTypes.bool,
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
  /** URI for the logo image */
  logoSrc: PropTypes.string,
  /** URL of the external resource to link to */
  externalUrl: PropTypes.string,
};

export default connect(
  state => ({
    isDarkMode: state.shell.isDarkMode,
    acceptsCookies: state.shell.acceptsCookies,
  }),
  null
)(Shell);
