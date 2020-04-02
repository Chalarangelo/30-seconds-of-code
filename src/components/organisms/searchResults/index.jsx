import React from 'react';
import { connect } from 'react-redux';
import PageBackdrop from 'components/molecules/pageBackdrop';
import PropTypes from 'prop-types';
import { Snippet as SnippetPropType } from 'typedefs';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import RecommendationList from 'components/organisms/recommendationList';
import literals from 'lang/en/client/search';

const propTypes = {
  searchQuery: PropTypes.string,
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  recommendedSnippets: PropTypes.arrayOf(SnippetPropType),
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
      <PageTitle isLight>
        { literals.results }
      </PageTitle>
      { searchResults.map(snippet => (
        <PreviewCard
          key={ `snippet_${snippet.url}` }
          snippet={ snippet }
        />
      )) }
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
