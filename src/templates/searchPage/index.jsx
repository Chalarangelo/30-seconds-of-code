import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import Search from 'atoms/search';
import PropTypes from 'prop-types';
import _ from 'lang';
import SearchResults from 'organisms/searchResults';
import { pushNewPage } from 'state/navigation';
const _l = _('en');

const SearchPage = ({
  pageContext: {
    logoSrc,
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
        logoSrc={ logoSrc }
        title={ searchQuery.length === 0 ? _l('Search') : _l`Search results for${searchQuery}` }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch
        isList={ false }
        withIcon={ false }
        withTitle={ true }
      >
        <Search shouldUpdateHistory />
        <SearchResults />
      </Shell>
    </>
  );
};

SearchPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
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
