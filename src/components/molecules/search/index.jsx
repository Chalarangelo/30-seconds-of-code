import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getURLParameters, throttle } from 'utils';
import { useSearch } from 'state/search';
import literals from 'lang/en/client/search';

/**
 * Search bar component. (Context-connected)
 * @param {bool} isMainSearch - Is this the main search? Determines the input's
 *   behavior, as it will update history and handle searching if `true`, otherwise
 *   it will act as an idle input that expects interaction to provide an entry
 *   point to the search page.
 */
const Search = ({ isMainSearch = false }) => {
  const router = useRouter();
  const [
    { searchIndex, searchQuery, searchResults, searchTimestamp },
    dispatch,
  ] = useSearch();
  const [value, setValue] = useState('');
  const [searchIndexInitialized, setSearchIndexInitialized] = useState(false);
  const [selectedResult, setSelectedResult] = useState(-1);

  const hasResults = value.trim().length > 1 && searchResults.length !== 0;

  const handleHistoryUpdate = value => {
    const encodedValue = encodeURIComponent(value);
    const { pathname, query } = router;
    const newURL = `${pathname}${value ? `?keyphrase=${encodedValue}` : ''}`;

    if (
      value &&
      query &&
      query.keyphrase &&
      (encodedValue.includes(query.keyphrase) ||
        query.keyphrase.includes(encodedValue))
    ) {
      router.replace(newURL, undefined, { shallow: true });
    } else {
      router.push(newURL, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    if (isMainSearch) {
      const params = getURLParameters(window.location.href);
      let initValue = searchQuery;
      if (
        params &&
        params.keyphrase &&
        params.keyphrase !== encodeURIComponent(searchQuery)
      )
        initValue = decodeURIComponent(params.keyphrase);
      else if (
        searchTimestamp &&
        new Date() - new Date(searchTimestamp || null) >= 1200000
      )
        initValue = '';
      setValue(initValue);
    }
  }, []);

  useEffect(
    throttle(() => {
      if (!isMainSearch && !searchIndexInitialized) return;
      dispatch({ type: 'pushNewQuery', query: value });
      dispatch({ type: 'searchByKeyphrase', keyphrase: value });
      if (isMainSearch) handleHistoryUpdate(value);
      else setSelectedResult(-1);
    }, 500),
    [value, searchIndex]
  );

  return (
    <div
      className='search-wrapper relative mb-2 flex br-md txt-100 icon icon-search before:fs-sm'
      onKeyUp={e => {
        e.preventDefault();
        if (isMainSearch || !hasResults) return;
        if (e.key === 'ArrowDown') {
          const nextResult = selectedResult + 1;
          setSelectedResult(
            nextResult >= 5 || nextResult > searchResults.length
              ? 0
              : nextResult
          );
        } else if (e.key === 'ArrowUp') {
          const previousResult = selectedResult - 1;
          setSelectedResult(
            previousResult < 0
              ? Math.min(searchResults.length, 4)
              : previousResult
          );
        }
      }}
    >
      <input
        defaultValue={value}
        className='search-box srfc-inset py-1 px-2 box-border'
        type='search'
        placeholder={literals.searchPlaceholder}
        aria-label={literals.searchSnippets}
        onFocus={() => {
          if (!isMainSearch && !searchIndexInitialized) {
            fetch('/search-data.json')
              .then(data => data.json())
              .then(json => {
                dispatch({
                  type: 'initializeIndex',
                  index: json.searchIndex,
                });
                setSearchIndexInitialized(true);
              });
          }
          if (!isMainSearch) setSelectedResult(-1);
        }}
        onKeyUp={e => {
          setValue(e.target.value);
        }}
        onKeyPress={e => {
          if (
            e.charCode === 13 &&
            typeof document !== 'undefined' &&
            document.activeElement &&
            document.activeElement.blur &&
            typeof document.activeElement.blur === 'function'
          ) {
            document.activeElement.blur();
            const { basePath } = router;
            if (!isMainSearch) {
              if (
                selectedResult !== -1 &&
                selectedResult < searchResults.length - 1
              ) {
                router.push(
                  `${basePath}${searchResults[selectedResult].url}?from=autocomplete`
                );
              } else {
                const encodedValue = encodeURIComponent(value);
                router.push(
                  `${basePath}/search/${
                    value ? `?keyphrase=${encodedValue}` : ''
                  }`
                );
              }
            }
          }
        }}
      />
      <a
        className='search-btn'
        aria-hidden='true'
        title={literals.search}
        href={`/search/${
          value ? `?keyphrase=${encodeURIComponent(value)}` : ''
        }`}
        rel='nofollow'
      />
      {!isMainSearch && value ? (
        <ul className='search-autocomplete-list pl-0 my-0 mx-2 srfc-02db'>
          {[
            ...searchResults.slice(0, 4),
            {
              title: `Search for "${value.trim()}"`,
              url: `${router.basePath}/search?keyphrase=${encodeURIComponent(
                value
              )}`,
              search: true,
            },
          ].map((item, i, arr) => (
            <li key={`autocomplete-result-${item.url}`}>
              <a
                href={
                  i === arr.length - 1
                    ? item.url
                    : `${item.url}?from=autocomplete`
                }
                title={item.title}
                className={`flex py-2 px-3 ${
                  selectedResult === i ? 'selected' : ''
                }`}
                data-link-rel='no-route'
              >
                <span className='result-title f-ellipsis mr-2 txt-150'>
                  {item.title}
                </span>
                {!item.search ? (
                  <span className='result-tag txt-050 fs-mi'>
                    {item.expertise
                      ? item.language
                        ? item.language
                        : `${item.expertise[0].toUpperCase()}${item.expertise.slice(
                            1
                          )}`
                      : literals.snippetCollectionShort}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
