import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { trimWhiteSpace, getURLParameters } from 'functions/utils';
import { startIndexFetch, finishIndexFetch, pushNewQuery, searchByKeyphrase } from 'state/search';
import _ from 'lang';
const _l = _('en');

const Search = ({
  className = '',
  id = '',
  searchIndex,
  searchQuery,
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
    console.log(getURLParameters(window.location.href));
  }, []);

  React.useEffect(() => {
    dispatch(pushNewQuery(value));
    dispatch(searchByKeyphrase(value, searchIndex));
  }, [value]);

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
};

export default connect(
  state => ({
    searchIndex: state.search.searchIndex,
    searchQuery: state.search.searchQuery,
  }),
  null
)(Search);
