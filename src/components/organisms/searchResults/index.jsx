import { useSearch } from 'state/search';
import PageBackdrop from 'components/molecules/pageBackdrop';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCardList from 'components/organisms/previewCardList';
import literals from 'lang/en/client/search';

/**
 * Displays the search results area. (Context-connected)
 * Used in the Search page.
 * Dependent on multiple components.
 */
const SearchResults = ({ recommendations }) => {
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
    <div className='g-c2'>
      <PageTitle>{literals.results}</PageTitle>
      {Boolean(availableFilters.length > 2) && (
        <ul className='list-section listing-anchors mt-2 mx-3.5 flex'>
          {availableFilters.map(type => (
            <li className='flex-none' key={`filter-${type.toLowerCase()}`}>
              <button
                className={`btn action-btn ${
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
              </button>
            </li>
          ))}
        </ul>
      )}
      <PreviewCardList contentItems={filteredResults} />
    </div>
  ) : (
    <div className='g-c2'>
      <PageBackdrop
        backdropImage='/assets/splash/magnifying-glass.png'
        mainText={
          searchQuery.trim().length <= 1 ? (
            literals.searchPrompt
          ) : (
            <>
              {literals.noResults}
              <span className='txt-150'>{searchQuery}</span>
              {'.'}
            </>
          )
        }
        mainTextClassName='fs-lg'
      />
      <PageTitle className='recommendation-list-title f-center'>
        {recommendations.title}
      </PageTitle>
      <PreviewCardList
        contentItems={recommendations.items}
        fromParam='recommendations'
      />
    </div>
  );
};

export default SearchResults;
