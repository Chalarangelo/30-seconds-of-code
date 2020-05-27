import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import PageBackdrop from 'components/molecules/pageBackdrop';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import RecommendationList from 'components/organisms/recommendationList';
import literals from 'lang/en/client/search';

const propTypes = {
  searchQuery: PropTypes.string,
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  recommendedSnippets: PropTypes.arrayOf(PropTypes.snippet),
};

/**
 * Displays the search results area. (Redux-connected)
 * Used in the Search page.
 * Dependent on multiple components.
 */
const SearchResults = ({
  searchQuery,
  searchResults,
  recommendedSnippets = [],
}) => {
  const hasResults = searchQuery.trim().length > 1 && searchResults.length !== 0;
  return hasResults ? (
    <>
      <PageTitle>{ literals.results }</PageTitle>
      <ul className='search-results'>
        { searchResults.map(snippet => (
          <PreviewCard
            key={ `snippet_${snippet.url}` }
            snippet={ snippet }
          />
        )) }
      </ul>
    </>
  ) : (
    <>
      <PageBackdrop
        graphicName={ searchQuery.trim().length <= 1 ? 'search-empty' : 'search-no-results' }
        mainText={ searchQuery.trim().length <= 1
          ? literals.searchPrompt
          : ( <>{ literals.noResults }<strong>{ searchQuery }</strong>{ '.' }</> )
        }
        mainTextClassName='search-page-text'
      />
      { recommendedSnippets.length ? (
        <RecommendationList snippetList={ recommendedSnippets } />
      ) : null }
    </>
  );
};

SearchResults.propTypes = propTypes;

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
    searchResults: state.search.searchResults,
  }),
  null
)(SearchResults);
