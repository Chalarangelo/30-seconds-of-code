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
  isCompact = false,
}) => {
  if(isCompact) {
    return searchQuery.length === 0 ? (
      <PageSubtitle className='search-compact-sub'>
        { _l('Start typing a keyphrase to see matching snippets or ') }
        <Anchor
          link={ {
            internal: true,
            url: '/list',
          } }
        >
          { _l('click to view the whole list') }
        </Anchor>
        { _l('.') }
      </PageSubtitle>
    ) : searchResults.length === 0 ? (
      <PageSubtitle className='search-compact-sub'>
        { _l('We couldn\'t find any results for the keyphrase ') }<strong>{ searchQuery }</strong>
        { _l('.') }
      </PageSubtitle>
    ) : (
      <>
        <PageSubtitle className='search-compact-sub'>
          { _l('Click on a snippet card to view the snippet.') }
        </PageSubtitle>
        <PageSubtitle isLight className='search-results-title'>
          { _l('Search results') }
        </PageSubtitle>
        { searchResults.slice(0, 10).map(snippet => (
          <PreviewCard
            key={ `snippet_${snippet.url}` }
            snippet={ snippet }
          />
        )) }
        { searchResults.length > 10 ?
          <Anchor
            className='search-compact-view-more'
            link={ {
              internal: true,
              url: `/search?keyphrase=${encodeURIComponent(searchQuery)}`,
            } }
          >
            { _l('Click to view more results') }
          </Anchor>
          : null }
      </>
    );
  } else {
    return searchQuery.length === 0 ? (
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
        <PageSubtitle className='search-compact-sub'>
          { _l('Click on a snippet card to view the snippet.') }
        </PageSubtitle>
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
  }
};

SearchResults.propTypes = {
  /** Search query */
  searchQuery: PropTypes.string,
  /** Search results */
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  /** Compact or large search */
  isCompact: PropTypes.bool,
};

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
    searchResults: state.search.searchResults,
  }),
  null
)(SearchResults);
