import React from 'react';
import { connect } from 'react-redux';
import PageBackdrop from 'molecules/pageBackdrop';
import PropTypes from 'prop-types';
import { Anchor } from 'atoms/anchor';
import _ from 'lang';
import PageSubtitle from 'atoms/pageSubtitle';
import PreviewCard from 'molecules/previewCard';
const _l = _('en');

// eslint-disable-next-line complexity
const SearchResults = ({
  searchQuery,
  searchResults,
}) =>
  searchQuery.trim().length <= 1 ? (
    <PageBackdrop
      graphicName='search-empty'
      mainText={ _l('Start typing a keyphrase to see matching snippets.') }
      mainTextClassName='search-page-text'
    />
  ) : searchResults.length === 0 ? (
    <PageBackdrop
      graphicName='search-no-results'
      mainText={ (
        <>
          { _l('We couldn\'t find any results for the keyphrase ') }<strong>{ searchQuery }</strong>
          { _l('.') }
        </>
      ) }
      mainTextClassName='search-page-text'
    />
  ) : (
    <>
      <PageSubtitle isLight className='search-results-title'>
        { _l('Search results') }
      </PageSubtitle>
      { searchResults.map(snippet => (
        <PreviewCard
          key={ `snippet_${snippet.url}` }
          snippet={ snippet }
        />
      )) }
    </>
  );

SearchResults.propTypes = {
  /** Search query */
  searchQuery: PropTypes.string,
  /** Search results */
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
    searchResults: state.search.searchResults,
  }),
  null
)(SearchResults);
