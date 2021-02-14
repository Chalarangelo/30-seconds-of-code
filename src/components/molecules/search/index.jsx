import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import { getURLParameters, throttle, getBaseURL, getRootURL } from 'utils';
import { pushNewQuery, searchByKeyphrase, initializeIndex } from 'state/search';
import literals from 'lang/en/client/search';

/**
 * Handles browser history updates as necessary, depending on the given value.
 * @param {string} value - The keyphrase used to update the history.
 */
const handleHistoryUpdate = value => {
  if (
    typeof window !== 'undefined' &&
    typeof window.location !== 'undefined' &&
    typeof window.history !== 'undefined'
  ) {
    const encodedValue = encodeURIComponent(value);
    const params = getURLParameters(window.location.href);
    const baseURL = getBaseURL(window.location.href);
    if (
      value &&
      params &&
      params.keyphrase &&
      (encodedValue.includes(params.keyphrase) ||
        params.keyphrase.includes(encodedValue))
    ) {
      window.history.replaceState(
        { keyphrase: value },
        literals.resultsFor(value),
        `${baseURL}${value ? `?keyphrase=${encodedValue}` : ''}`
      );
    } else {
      window.history.pushState(
        { keyphrase: value },
        literals.resultsFor(value),
        `${baseURL}${value ? `?keyphrase=${encodedValue}` : ''}`
      );
    }
  }
};

const propTypes = {
  /** Is this component the main search component? */
  isMainSearch: PropTypes.bool,
  /** Initial value for the search bar */
  searchQuery: PropTypes.string,
  /** Index of the searchable data */
  searchIndex: PropTypes.arrayOf(PropTypes.shape({})),
  /** Timestamp of the last search history update */
  searchTimestamp: PropTypes.string,
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

/**
 * Search bar component. (Redux-connected)
 * @param {bool} isMainSearch - Is this the main search? Determines the input's
 *   behavior, as it will update history and handle searching if `true`, otherwise
 *   it will act as an idle input that expects interaction to provide an entry
 *   point to the search page.
 * @param {string} searchQuery - Initial value for the input (Redux-connected)
 * @param {*} searchIndex - Search index data, fetched from state (Redux-connected)
 * @param {string} searchTimestamp - Last search timestamp (Redux-connected)
 */
const Search = ({
  searchIndex,
  searchQuery,
  searchResults,
  isMainSearch = false,
  searchTimestamp,
  dispatch,
}) => {
  const [value, setValue] = React.useState('');
  const [searchIndexInitialized, setSearchIndexInitialized] = React.useState(
    false
  );
  const [selectedResult, setSelectedResult] = React.useState(-1);

  const hasResults = value.trim().length > 1 && searchResults.length !== 0;

  React.useEffect(() => {
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

  React.useEffect(
    throttle(() => {
      if (!isMainSearch && !searchIndexInitialized) return;
      dispatch(pushNewQuery(value));
      dispatch(searchByKeyphrase(value, searchIndex));
      if (isMainSearch) handleHistoryUpdate(value);
      else setSelectedResult(-1);
    }, 500),
    [value, searchIndex]
  );

  return (
    <div
      className='search-wrapper'
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
        className='search-box'
        type='search'
        placeholder={literals.searchPlaceholder}
        aria-label={literals.searchSnippets}
        onFocus={() => {
          if (!isMainSearch && !searchIndexInitialized) {
            fetch('/page-data/search/page-data.json')
              .then(data => data.json())
              .then(json => {
                dispatch(initializeIndex(json.result.pageContext.searchIndex));
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
            const rootURL = getRootURL(window.location.href);
            if (!isMainSearch) {
              if (selectedResult !== -1 && selectedResult !== 4) {
                window.location.href = `${rootURL}${searchResults[selectedResult].url}`;
              } else {
                const encodedValue = encodeURIComponent(value);
                window.location.href = `${rootURL}/search/${
                  value ? `?keyphrase=${encodedValue}` : ''
                }`;
              }
            }
          }
        }}
      />
      <a
        className='btn icon icon-search search-btn'
        title={literals.search}
        href={`/search/${
          value ? `?keyphrase=${encodeURIComponent(value)}` : ''
        }`}
        rel='nofollow'
      />
      {!isMainSearch && value ? (
        <ul className='search-autocomplete-list'>
          {[
            ...searchResults.slice(0, 4),
            {
              title: `Search for "${value.trim()}"`,
              url: `${getRootURL(
                window.location.href
              )}/search/?keyphrase=${encodeURIComponent(value)}`,
              search: true,
            },
          ].map((item, i) => (
            <li key={`autocomplete-result-${item.url}`}>
              <a
                href={item.url}
                title={item.title}
                className={selectedResult === i ? 'selected' : null}
              >
                <span className='result-title'>{item.title}</span>
                {!item.search ? (
                  <span className='result-tag'>
                    {item.expertise
                      ? item.language
                        ? item.language
                        : item.expertise
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

Search.propTypes = propTypes;

export default connect(
  state => ({
    searchIndex: state.search.searchIndex,
    searchQuery: state.search.searchQuery,
    searchResults: state.search.searchResults,
    searchTimestamp: state.search.searchTimestamp,
  }),
  null
)(Search);
