import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import { getURLParameters, throttle, getBaseURL, getRootURL } from 'utils';
import { pushNewQuery, searchByKeyphrase } from 'state/search';
import { AnchorButton } from 'components/atoms/button';
import literals from 'lang/en/client/search';

/**
 * Handles browser history updates as necessary, depending on the given value.
 * @param {string} value - The keyphrase used to update the history.
 */
const handleHistoryUpdate = value => {
  if (typeof window !== 'undefined' && typeof window.location !== 'undefined' && typeof window.history !== 'undefined') {
    const encodedValue = encodeURIComponent(value);
    const params = getURLParameters(window.location.href);
    const baseURL = getBaseURL(window.location.href);
    if (value && params && params.keyphrase &&
      (encodedValue.includes(params.keyphrase) || params.keyphrase.includes(encodedValue))) {
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
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

/**
 * Search bar component. (Redux-connected)
 * Dependent on the `Anchor` component.
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
  isMainSearch = false,
  searchTimestamp,
  dispatch,
}) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (isMainSearch) {
      const params = getURLParameters(window.location.href);
      let initValue = searchQuery;
      if (params && (params.keyphrase) && params.keyphrase !== encodeURIComponent(searchQuery))
        initValue = decodeURIComponent(params.keyphrase);
      else if(searchTimestamp && new Date() - new Date(searchTimestamp || null) >= 1200000)
        initValue = '';
      setValue(initValue);
    }
  }, []);

  React.useEffect(throttle(() => {
    if (!isMainSearch && value === '') return;
    dispatch(pushNewQuery(value));
    dispatch(searchByKeyphrase(value, searchIndex));
    if (isMainSearch) handleHistoryUpdate(value);
  }, 500), [value, searchIndex]);

  return (
    <>
      <input
        defaultValue={ value }
        className='search-box'
        type='search'
        placeholder={ literals.searchPlaceholder }
        aria-label={ literals.searchSnippets }
        onKeyUp={ e => {
          setValue(e.target.value);
        } }
        onKeyPress={ e => {
          if (
            e.charCode === 13 &&
            typeof document !== 'undefined' &&
            document.activeElement &&
            document.activeElement.blur &&
            typeof document.activeElement.blur === 'function'
          ) {
            document.activeElement.blur();
            if (!isMainSearch) {
              const encodedValue = encodeURIComponent(value);
              const rootURL = getRootURL(window.location.href);
              window.location.href = `${ rootURL }/search/${ value ? `?keyphrase=${encodedValue}` : '' }`;
            }
          }
        } }
      />
      <AnchorButton
        className='icon icon-search search-btn'
        title={ literals.search }
        link={ {
          url: `/search/${ value ? `?keyphrase=${encodeURIComponent(value)}` : '' }`,
          internal: true,
          rel: 'nofollow',
        } }
      />
    </>
  );
};

Search.propTypes = propTypes;

export default connect(
  state => ({
    searchIndex: state.search.searchIndex,
    searchQuery: state.search.searchQuery,
    searchTimestamp: state.search.searchTimestamp,
  }),
  null
)(Search);
