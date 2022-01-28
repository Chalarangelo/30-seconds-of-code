import { useEffect } from 'react';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import SearchResults from 'components/organisms/searchResults';
import { useSearch } from 'state/search';
import literals from 'lang/en/client/search';

/**
 * Renders the search page.
 * Used to render the /search page.
 */
const SearchPage = ({ recommendedSnippets, pageDescription, searchIndex }) => {
  const [{ searchQuery }, dispatch] = useSearch();
  useEffect(() => {
    dispatch({ type: 'initializeIndex', index: searchIndex });
  }, []);

  return (
    <>
      <Meta
        description={pageDescription}
        title={
          searchQuery.length === 0
            ? literals.search
            : literals.resultsFor(searchQuery)
        }
      />
      <Shell isSearch>
        <SearchResults recommendedSnippets={recommendedSnippets} />
      </Shell>
    </>
  );
};

export default SearchPage;
