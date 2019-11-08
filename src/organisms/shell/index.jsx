import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Card from 'atoms/card';
import NavBar from 'molecules/navBar';
import Expertise from 'atoms/expertise';
import CodeBlock from 'atoms/codeBlock';
import { CopyButton } from 'atoms/button';
import Toast from 'atoms/toast';
import { trimWhiteSpace } from 'functions/utils';
import { useMedia } from 'functions/hooks';
import _ from 'lang';
import { toggleDarkMode } from 'state/shell';
const _l = _('en');
import config from '../../../config';

// TODO: Handle special classNames for the search and list buttons
// eslint-disable-next-line complexity
const Shell = ({
  isDarkMode,
  isSearch,
  isListing,
  dispatch,
  withIcon = true,
  withTitle = true,
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
    <div className={
      isDarkMode === true || (darkModeEnabledInitially && isDarkMode === undefined) ? 'page-container dark' : 'page-container'
    }>
      <NavBar buttons={ [
        {
          icon: 'search',
          className: isSearch ? 'active' : '',
          link: {
            internal: true,
            url: '/search',
            title: 'Search',
          },
        },
        {
          icon: 'list',
          className: isListing ? 'active' : '',
          link: {
            internal: true,
            url: '/list/p/1',
            title: 'Snippet list',
          },
        },
        {
          icon: 'github',
          link: {
            internal: false,
            url: externalUrl,
            title: 'Snippet list',
            rel: 'noopener',
            target: '_blank',
          },
        },
        {
          icon: isDarkMode ? 'sun' : 'moon',
          link: {
            internal: false,
            url: '#',
            title: isDarkMode ? _l('Switch to light mode') : _l('Switch to dark mode'),
          },
          onClick: e => {
            e.preventDefault();
            dispatch(toggleDarkMode(!isDarkMode));
          },
        },
      ] }/>
      <div className='content'>
        { withTitle ? (
          <h1 className='website-title'>
            { _l('site.title') }
            { withIcon ? (
              <img
                src={ logoSrc }
                alt={ _l('Logo') }
                className='website-logo'
              />
            ) : ( '' ) }
          </h1>
        ) : ( '' ) }
        { children }
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
  /** Is this a search page? */
  isSearch: PropTypes.bool,
  /** Is this a list page? */
  isListing: PropTypes.bool,
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
  /** Should render an icon? */
  withIcon: PropTypes.bool,
  /** Should render a title? */
  withTitle: PropTypes.bool,
  /** URI for the logo image */
  logoSrc: PropTypes.string,
  /** URL of the external resource to link to */
  externalUrl: PropTypes.string,
};

export default connect(
  state => ({
    isDarkMode: state.shell.isDarkMode,
  }),
  null
)(Shell);
