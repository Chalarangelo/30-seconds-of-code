import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import SearchResults from 'components/organisms/searchResults';
import { initializeIndex } from 'state/search';
import literals from 'lang/en/client/search';

const propTypes = {
  pageContext: PropTypes.shape({
    pageDescription: PropTypes.string.isRequired,
    recommendedSnippets: PropTypes.arrayOf(PropTypes.shape({})),
    searchIndex: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  searchQuery: PropTypes.string,
  includeArchive: PropTypes.bool,
  dispatch: PropTypes.func,
};

/**
 * Renders the search page.
 * Used to render the /search page.
 */
const SearchPage = ({
  pageContext: {
    recommendedSnippets,
    pageDescription,
    searchIndex,
  },
  searchQuery,
  includeArchive,
  dispatch,
}) => {
  React.useEffect(() => {
    if (includeArchive) {
      fetch('/page-data/archive/page-data.json')
        .then(res => res.json())
        .then(archiveIndex =>
          dispatch(initializeIndex([
            ...searchIndex,
            ...archiveIndex.result.pageContext.searchIndex,
          ]))
        );
    } else
      dispatch(initializeIndex(searchIndex));

  }, []);

  return (
    <>
      <Meta
        description={ pageDescription }
        title={ searchQuery.length === 0 ? literals.search : literals.resultsFor(searchQuery) }
      />
      <Shell isSearch >
        <SearchResults recommendedSnippets={ recommendedSnippets }/>
      </Shell>
    </>
  );
};

SearchPage.propTypes = propTypes;

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
    includeArchive: state.search.includeArchive,
  }),
  null
)(SearchPage);
