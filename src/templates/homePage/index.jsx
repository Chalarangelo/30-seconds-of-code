import React from 'react';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import Search from 'atoms/search';
import SearchResults from 'organisms/searchResults';
import ListingAnchors from 'molecules/listingAnchors';
import PropTypes from 'prop-types';
import _ from 'lang';
const _l = _('en');

// Used to produce a description
const templateData = {
  pageType: 'home',
};

const HomePage = ({
  pageContext: {
    logoSrc,
    listingAnchors,
  },
}) => {
  return (
    <>
      <Meta
        logoSrc={ logoSrc }
        description={ _l`site.pageDescription${templateData}` }
        meta={ [{ name: `google-site-verification`, content: `YX9mF-TxoHZGJ9SZ8XwvWgGR_KTcbH1uHul4iDklyr0`}] }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isListing={ false }
        withIcon={ false }
        withTitle={ false }
      >
        <h1 className='home-title'>
          <img
            src={ logoSrc }
            alt={ _l('Logo') }
            className='home-logo'
          />
          <span className='home-title-text'>
            { _l('site.title') }
          </span>
        </h1>
        <p className='home-sub-title'>
          { _l('site.description') }
        </p>
        <Search shouldUpdateHistory={ false } />
        <SearchResults isCompact />
        <ListingAnchors items={ listingAnchors } />
      </Shell>
    </>
  );
};

HomePage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** Links to list pages to be displayed on the page */
    listingAnchors: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default HomePage;
