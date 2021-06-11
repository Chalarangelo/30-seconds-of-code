import PropTypes from 'typedefs/proptypes';
import { useSearch } from 'state/search';
import PageBackdrop from 'components/atoms/pageBackdrop';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import CollectionChip from 'components/atoms/collectionChip';
import RecommendationList from 'components/organisms/recommendationList';
import literals from 'lang/en/client/search';
import Button from 'components/atoms/button';

const propTypes = {
  recommendedSnippets: PropTypes.arrayOf(PropTypes.snippet),
};

/**
 * Displays the search results area. (Context-connected)
 * Used in the Search page.
 * Dependent on multiple components.
 */
const SearchResults = ({ recommendedSnippets = [] }) => {
  const [
    {
      searchQuery,
      searchResults,
      filteredResults,
      availableFilters,
      typeFilter,
    },
    dispatch,
  ] = useSearch();
  const hasResults =
    searchQuery.trim().length > 1 && searchResults.length !== 0;
  return hasResults ? (
    <>
      <PageTitle>{literals.results}</PageTitle>
      {Boolean(availableFilters.length > 2) && (
        <ul className='list-section listing-anchors search-filters flex'>
          {availableFilters.map(type => (
            <li className='flex-none' key={`filter-${type.toLowerCase()}`}>
              <Button
                className={`action-btn ${
                  typeFilter === type.toLowerCase() ? 'selected' : ''
                }`}
                onClick={() => {
                  dispatch({
                    type: 'filterResultsByType',
                    resultType: type.toLowerCase(),
                  });
                }}
              >
                {type}
              </Button>
            </li>
          ))}
        </ul>
      )}
      <ul className='list-section'>
        {filteredResults.map(item =>
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
        backdropImage='/assets/search.svg'
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
