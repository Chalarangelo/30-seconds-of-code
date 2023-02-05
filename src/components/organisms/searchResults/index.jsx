import { useSearch } from 'state/search';
import Image from 'components/atoms/image';
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
    <>
      <div className='g-c2'>
        <PageTitle>{literals.results}</PageTitle>
        {Boolean(availableFilters.length > 2) && (
          <ul className='list-section listing-chips mt-6 mx-3.5 flex'>
            {availableFilters.map(type => (
              <li
                className='flex-none fs-sm md:fs-md'
                key={`filter-${type.toLowerCase()}`}
              >
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
      </div>
      <div className='g-c3'>
        <PreviewCardList contentItems={filteredResults} />
      </div>
    </>
  ) : (
    <>
      <div className='g-c2'>
        <div className='box-border f-center txt-050 my-8 py-8 px-3.5'>
          <Image
            src='/assets/splash/magnifying-glass.png'
            className='br-lg'
            height='360'
            width='360'
          />
          <p className='f-center mx-auto mb-3 mt-8 fs-lg'>
            {searchQuery.trim().length <= 1 ? (
              literals.searchPrompt
            ) : (
              <>
                {literals.noResults}
                <span className='txt-150'>{searchQuery}</span>
                {'.'}
              </>
            )}
          </p>
        </div>
      </div>
      <div className='g-c3'>
        <PageTitle className='recommendation-list-title'>
          {recommendations.title}
        </PageTitle>
        <PreviewCardList contentItems={recommendations.items} />
      </div>
    </>
  );
};

export default SearchResults;
