import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { useSearchState } from 'state/search';
import PageBackdrop from 'components/atoms/pageBackdrop';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import CollectionChip from 'components/atoms/collectionChip';
import RecommendationList from 'components/organisms/recommendationList';
import literals from 'lang/en/client/search';

const propTypes = {
  recommendedSnippets: PropTypes.arrayOf(PropTypes.snippet),
};

/**
 * Displays the search results area. (Context-connected)
 * Used in the Search page.
 * Dependent on multiple components.
 */
const SearchResults = ({ recommendedSnippets = [] }) => {
  const { searchQuery, searchResults } = useSearchState();
  const hasResults =
    searchQuery.trim().length > 1 && searchResults.length !== 0;
  return hasResults ? (
    <>
      <PageTitle>{literals.results}</PageTitle>
      <ul className='list-section'>
        {searchResults.map(item =>
          item.expertise ? (
            <PreviewCard key={`snippet_${item.url}`} snippet={item} />
          ) : (
            <CollectionChip key={`collection_${item.url}`} chip={item} />
          )
        )}
      </ul>
    </>
  ) : (
    <>
      <PageBackdrop
        graphicName={
          searchQuery.trim().length <= 1 ? 'search-empty' : 'search-no-results'
        }
        mainText={
          searchQuery.trim().length <= 1 ? (
            literals.searchPrompt
          ) : (
            <>
              {literals.noResults}
              <strong>{searchQuery}</strong>
              {'.'}
            </>
          )
        }
        mainTextClassName='search-page-text fs-lg'
      />
      {recommendedSnippets.length ? (
        <RecommendationList snippetList={recommendedSnippets} />
      ) : null}
    </>
  );
};

SearchResults.propTypes = propTypes;

export default SearchResults;
