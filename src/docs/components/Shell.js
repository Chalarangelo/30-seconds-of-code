import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { connect } from 'react-redux';
import config from '../../../config';

import { toggleDarkMode } from '../state/app';

import SearchIcon from './SVGs/SearchIcon';
import GithubIcon from './SVGs/GithubIcon';
import DarkModeIcon from './SVGs/DarkModeIcon';
import LightModeIcon from './SVGs/LightModeIcon';
import ListIcon from './SVGs/ListIcon';

// ===================================================
// Application-level UI component
// ===================================================
const Shell = ({
  isDarkMode,
  isSearch,
  isList,
  dispatch,
  withIcon = true,
  withTitle = true,
  children,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      file(relativePath: { eq: "30s-icon.png" }) {
        id
        childImageSharp {
          original {
            src
          }
        }
      }
      snippetDataJson(meta: { type: { eq: "snippetListingArray" } }) {
        data {
          title
          id
          attributes {
            tags
          }
        }
      }
    }
  `);

  return (
    <div className={isDarkMode ? 'page-container dark' : 'page-container'}>
      {/* Menu */}
      <header className='menu'>
        <Link
          to='/search'
          aria-label='Search'title='Search'
          className={isSearch ? 'menu-button active' : 'menu-button'}
        >
          <SearchIcon />
        </Link>
        <Link
          to='/list'
          aria-label='Snippet list' title='Snippet list'
          className={isList ? 'menu-button active' : 'menu-button'}
        >
          <ListIcon />
        </Link>
        {/* eslint-disable-next-line */}
        <a target='_blank'
          rel='noopener'
          href={config.repositoryUrl}
          aria-label='View on GitHub' title='View on GitHub'
          className='menu-button'
        >
          <GithubIcon />
        </a>
        <button 
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className='menu-button'>
          {isDarkMode ? (
            <LightModeIcon
              key='lmit'
              onClick={() => dispatch(toggleDarkMode(!isDarkMode))}
            />
          ) : (
              <DarkModeIcon
                key='dmit'
                onClick={() => dispatch(toggleDarkMode(!isDarkMode))}
              />
            )}
        </button>
      </header>
      {/* Content */}
      <div className='content'>
        {withTitle ? (
          <h1 className='website-title'>
            {data.site.siteMetadata.title}
            {withIcon ? (
              <img
                src={data.file.childImageSharp.original.src}
                alt='Logo'
                className='website-logo'
              />
            ) : (
              ''
            )}
          </h1>
        ) : (
          ''
        )}
        {children}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    isDarkMode: state.app.isDarkMode,
    lastPageTitle: state.app.lastPageTitle,
    lastPageUrl: state.app.lastPageUrl,
    searchQuery: state.app.searchQuery,
  }),
  null,
)(Shell);
