import React from 'react';
import { connect } from 'react-redux';
import PageBackdrop from 'molecules/pageBackdrop';
import PropTypes from 'prop-types';
import { Snippet as SnippetPropType } from 'typedefs';
import _ from 'lang';
import PageTitle from 'atoms/pageTitle';
import PreviewCard from 'molecules/previewCard';
import RecommendationList from 'organisms/recommendationList';
const _l = _('en');

// eslint-disable-next-line complexity
const SearchResults = ({
  searchQuery,
  searchResults,
  recommendedSnippets = [],
}) => {
  const hasResults = searchQuery.trim().length > 1 && searchResults.length !== 0;
  return hasResults ? (
    <>
      <PageTitle isLight>
        { _l('Search results') }
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
          ? _l('Start typing a keyphrase to see matching snippets.')
          : (
            <>
              { _l('We couldn\'t find any results for the keyphrase ') }<strong>{ searchQuery }</strong>
              { _l('.') }
            </>
          )
        }
        mainTextClassName='search-page-text'
      />
      { recommendedSnippets.length ? (
        <RecommendationList snippetList={ recommendedSnippets } />
      ) : null }
    </>
  );
};

SearchResults.propTypes = {
  /** Search query */
  searchQuery: PropTypes.string,
  /** Search results */
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  /** List of recommended snippets */
  recommendedSnippets: PropTypes.arrayOf(SnippetPropType),
};

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
    searchResults: state.search.searchResults,
  }),
  null
)(SearchResults);
