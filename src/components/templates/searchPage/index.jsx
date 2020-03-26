import React from 'react';
import { connect } from 'react-redux';
import Meta from 'components/atoms/meta';
import Shell from 'components/organisms/shell';
import SearchResults from 'components/organisms/searchResults';
import PropTypes from 'prop-types';
import _ from 'lang';
import { pushNewPage } from 'state/navigation';
const _l = _('en');

/**
 * Renders the /search page.
 */
const SearchPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
    recommendedSnippets,
    pageDescription,
  },
  searchQuery,
  dispatch,
}) => {
  React.useEffect(() => {
    dispatch(pushNewPage('Search', '/search'));
  }, []);

  return (
    <>
      <Meta
        logoSrc={ splashLogoSrc }
        description={ pageDescription }
        title={ searchQuery.length === 0 ? _l('Search') : _l`Search results for${searchQuery}` }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch
        isListing={ false }
        withIcon={ false }
        withTitle={ true }
      >
        <SearchResults recommendedSnippets={ recommendedSnippets }/>
      </Shell>
    </>
  );
};

SearchPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
    /** Page description */
    pageDescription: PropTypes.string.isRequired,
    /** List of recommended snippets */
    recommendedSnippets: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  /** Search query */
  searchQuery: PropTypes.string,
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
  }),
  null
)(SearchPage);
