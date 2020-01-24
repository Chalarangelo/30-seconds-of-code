import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import Search from 'atoms/search';
import SearchResults from 'organisms/searchResults';
import ListingAnchors from 'molecules/listingAnchors';
import PropTypes from 'prop-types';
import { Snippet as SnippetPropType } from 'typedefs';
import RecommendationList from 'organisms/recommendationList';
import { pushNewPage } from 'state/navigation';
import config from '../../../config';
import _ from 'lang';
const _l = _('en');

// Used to produce a description
const templateData = {
  pageType: 'home',
};

/**
 * Renders the / page.
 */
const HomePage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
    listingAnchors = [],
    recommendedSnippets = [],
  },
  dispatch,
}) => {
  React.useEffect(() => {
    dispatch(pushNewPage(_l('Home'), `/`));
  }, []);

  return (
    <>
      <Meta
        logoSrc={ splashLogoSrc }
        description={ _l`site.pageDescription${templateData}` }
        meta={ [{ name: `google-site-verification`, content: config.googleSiteVerification}] }
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
        <Search shouldUpdateHistory />
        <SearchResults isCompact />
        <ListingAnchors items={ listingAnchors } />
        <RecommendationList snippetList={ recommendedSnippets } />
      </Shell>
    </>
  );
};

HomePage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
    /** Links to list pages to be displayed on the page */
    listingAnchors: PropTypes.arrayOf(PropTypes.shape({})),
    /** List of recommended snippets */
    recommendedSnippets: PropTypes.arrayOf(SnippetPropType),
  }),
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

export default connect(
  // eslint-disable-next-line
  state => ({}),
  null
)(HomePage);
