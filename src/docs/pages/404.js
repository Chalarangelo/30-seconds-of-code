import React from 'react';
import { connect } from 'react-redux';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import Shell from '../components/Shell';
import Meta from '../components/Meta';

// ===================================================
// Not found page
// ===================================================
const NotFoundPage = ({ isDarkMode }) => (
  <>
    <Meta title='Page not found' />
    <Shell withIcon={true}>
      <h2 className='page-title'>404</h2>
      <div className='page-graphic page-not-found'>
        <p className='empty-page-text'>
          <strong>Page not found</strong>
          <br />
        </p>
        <p className='empty-page-subtext'>
          Seems like you have reached a page that does not exist.
        </p>
        <AniLink
          paintDrip
          to='/'
          hex={isDarkMode ? '#434E76' : '#FFFFFF'}
          className='button button-a button-home'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            stroke-linecap='round'
            strokeLinejoin='round'
            className='feather feather-home'
          >
            <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
            <polyline points='9 22 9 12 15 12 15 22'></polyline>
          </svg>
          &nbsp;&nbsp;Go home
        </AniLink>
      </div>
    </Shell>
  </>
);

export default connect(
  state => ({
    isDarkMode: state.app.isDarkMode,
    lastPageTitle: state.app.lastPageTitle,
    lastPageUrl: state.app.lastPageUrl,
    searchQuery: state.app.searchQuery,
  }),
  null,
)(NotFoundPage);
