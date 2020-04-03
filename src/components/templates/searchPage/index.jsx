import React from 'react';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import SearchResults from 'components/organisms/searchResults';
import PropTypes from 'prop-types';
import { pushNewPage } from 'state/navigation';
import literals from 'lang/en/client/search';

const propTypes = {
  pageContext: PropTypes.shape({
    logoSrc: PropTypes.string.isRequired,
    splashLogoSrc: PropTypes.string.isRequired,
    pageDescription: PropTypes.string.isRequired,
    recommendedSnippets: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  searchQuery: PropTypes.string,
  dispatch: PropTypes.func,
};

/**
 * Renders the search page.
 * Used to render the /search page.
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
    dispatch(pushNewPage(literals.search, '/search'));
  }, []);

  return (
    <>
      <Meta
        logoSrc={ splashLogoSrc }
        description={ pageDescription }
        title={ searchQuery.length === 0 ? literals.search : literals.resultsFor(searchQuery) }
      />
      <Shell logoSrc={ logoSrc } isSearch >
        <SearchResults recommendedSnippets={ recommendedSnippets }/>
      </Shell>
    </>
  );
};

SearchPage.propTypes = propTypes;

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
  }),
  null
)(SearchPage);
