import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Card from 'atoms/card';
import NavBar from 'molecules/navBar';
import Expertise from 'atoms/expertise';
import CodeBlock from 'atoms/codeBlock';
import { CopyButton } from 'atoms/button';
import Toast from 'atoms/toast';
import { Snippet as SnippetPropType } from 'proptypes';
import { trimWhiteSpace } from 'functions/utils';
import _ from 'lang';
import { toggleDarkMode } from 'state/app';
const _l = _('en');

// TODO: Handle special classNames for the search and list buttons
// TODO: Handle default mode via media query
// eslint-disable-next-line complexity
const Shell = ({
  isDarkMode,
  isSearch,
  isList,
  dispatch,
  withIcon = true,
  withTitle = true,
  logoSrc,
  children,
}) => (
  <div className={ isDarkMode ? 'page-container dark' : 'page-container' }>
    <NavBar buttons={ [
      {
        icon: 'search',
        link: {
          internal: true,
          url: '/search',
          title: 'Search',
        },
      },
      {
        icon: 'list',
        link: {
          internal: true,
          url: '/list',
          title: 'Snippet list',
        },
      },
      {
        icon: 'github',
        link: {
          internal: false,
          url: 'https://github.com/',
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

Shell.propTypes = {
  /** Children elements */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Should dark mode be applied? */
  isDarkMode: PropTypes.bool.isRequired,
  /** Is this a search page? */
  isSearch: PropTypes.bool.isRequired,
  /** Is this a list page? */
  isList: PropTypes.bool.isRequired,
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func.isRequired,
  /** Should render an icon? */
  withIcon: PropTypes.bool,
  /** Should render a title? */
  withTitle: PropTypes.bool,
  /** URI for the logo image */
  logoSrc: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    isDarkMode: state.app.isDarkMode,
    lastPageTitle: state.app.lastPageTitle,
    lastPageUrl: state.app.lastPageUrl,
    searchQuery: state.app.searchQuery,
  }),
  null
)(Shell);
