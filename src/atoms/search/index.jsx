import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { trimWhiteSpace, getURLParameters, throttle, getBaseURL } from 'functions/utils';
import { startIndexFetch, finishIndexFetch, pushNewQuery, searchByKeyphrase } from 'state/search';
import _ from 'lang';
const _l = _('en');

const handleHistoryUpdate = value => {
  if (typeof window !== 'undefined' && typeof window.location !== 'undefined' && typeof window.history !== 'undefined') {
    const encodedValue = encodeURIComponent(value);
    const params = getURLParameters(window.location.href);
    const baseURL = getBaseURL(window.location.href);
    if (value && params && params.keyphrase &&
      (encodedValue.includes(params.keyphrase) || params.keyphrase.includes(encodedValue))) {
      window.history.replaceState(
        { keyphrase: value },
        `Search results for ${value}`,
        `${baseURL}${value ? `?keyphrase=${encodedValue}` : ''}`
      );
    } else {
      window.history.pushState(
        { keyphrase: value },
        `Search results for ${value}`,
        `${baseURL}${value ? `?keyphrase=${encodedValue}` : ''}`
      );
    }
  }
};

const Search = ({
  className = '',
  id = '',
  searchIndex,
  searchQuery,
  shouldUpdateHistory = false,
  dispatch,
}) => {
  const [value, setValue] = React.useState(searchQuery);

  React.useEffect(() => {
    if(typeof window !== 'undefined' && typeof fetch !== 'undefined') {
      dispatch(startIndexFetch());
      fetch('/page-data/search_index/page-data.json')
        .then(response => response.json())
        .then(json => {
          const searchIndex = json.result.pageContext.searchIndex.edges
            .map(edge => edge.node)
            .map(node => ({
              title: node.title,
              expertise: node.expertise,
              primaryTag: node.tags.primary,
              language: node.language,
              html: node.html,
              url: node.slug,
            }));
          dispatch(finishIndexFetch(searchIndex));
        });
    }
    const params = getURLParameters(window.location.href);
    if (shouldUpdateHistory) {
      if (params && (params.keyphrase || params.keyphrase === '') && params.keyphrase !== encodeURIComponent(searchQuery))
        setValue(decodeURIComponent(params.keyphrase));
    }
  }, []);

  React.useEffect(throttle(() => {
    dispatch(pushNewQuery(value));
    dispatch(searchByKeyphrase(value, searchIndex));
    if(shouldUpdateHistory)
      handleHistoryUpdate(value);
  }, 500), [value]);

  return (
    <input
      defaultValue={ searchQuery }
      className={ trimWhiteSpace`search-box ${className}` }
      type='search'
      id={ id }
      placeholder={ _l('Search...') }
      aria-label={ _l('Search snippets') }
      onKeyUp={ e => {
        setValue(e.target.value);
      } }
    />
  );
};

Search.propTypes = {
  /** Initial value for the search bar */
  searchQuery: PropTypes.string,
  /** Index of the searchable data */
  searchIndex: PropTypes.arrayOf(PropTypes.shape({})),
  /** Additional classname(s) for the search bar */
  className: PropTypes.string,
  /** Element id */
  id: PropTypes.string,
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
  /** Should this component handle history updates? */
  shouldUpdateHistory: PropTypes.bool,
};

export default connect(
  state => ({
    searchIndex: state.search.searchIndex,
    searchQuery: state.search.searchQuery,
  }),
  null
)(Search);
