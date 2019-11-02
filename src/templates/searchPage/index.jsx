import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import { Anchor } from 'atoms/anchor';
import PageBackdrop from 'molecules/pageBackdrop';
import Search from 'atoms/search';
import PropTypes from 'prop-types';
import _ from 'lang';
import PageSubtitle from 'atoms/pageSubtitle';
import PreviewCard from 'molecules/previewCard';
import { pushNewPage } from 'state/navigation';
const _l = _('en');

const SearchPage = ({
  pageContext: {
    logoSrc,
  },
  searchQuery,
  searchResults,
  dispatch,
}) => {
  React.useEffect(() => {
    dispatch(pushNewPage('Search', '/search'));
  }, []);

  return (
    <>
      <Meta
        logoSrc={ logoSrc }
        // TODO: Dynamic name, based on query?
        title='Search '
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch
        isList={ false }
        withIcon={ false }
        withTitle={ true }
      >
        <Search />
        <PageSubtitle isLight>
          { _l('Click on a snippet card to view the snippet') }
        </PageSubtitle>
        {
          searchQuery.length === 0 ?
            <PageBackdrop
              graphicName='search-empty'
              mainText={ _l('Start typing a keyword to see matching snippets.') }
              mainTextClassName='search-page-text'
            />
            : searchResults.length === 0 ? (
              <PageBackdrop
                graphicName='search-no-results'
                mainText={ (
                  <>
                    { _l('We couldn\'t find any results for the keyword ') }<strong>{ searchQuery }</strong>
                  </>
                ) }
                mainTextClassName='search-page-text'
              />
            ) : (
              <>
                <PageSubtitle>
                  { _l('Search results') }
                </PageSubtitle>
                { searchResults.map(snippet => (
                  <PreviewCard
                    key={ `snippet_${snippet.id}` }
                    snippet={ snippet }
                  />
                )) }
              </>
            )
        }
      </Shell>
    </>
  );
};

SearchPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
  }),
  /** Search query */
  searchQuery: PropTypes.string,
  /** Search results */
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
    searchResults: state.search.searchResults,
  }),
  null
)(SearchPage);
