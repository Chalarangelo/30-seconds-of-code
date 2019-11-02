import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import { Anchor } from 'atoms/anchor';
import PageBackdrop from 'molecules/pageBackdrop';
import Search from 'atoms/search';
import SimpleCard from 'molecules/simpleCard';
import PropTypes from 'prop-types';
import _ from 'lang';
import PageSubtitle from 'atoms/pageSubtitle';
import { startIndexFetch, finishIndexFetch, pushNewQuery } from 'state/search';
import { getURLParameters } from 'functions/utils';
const _l = _('en');

const SearchPage = ({
  pageContext: {
    logoSrc,
  },
  dispatch,
  searchIndex,
  searchQuery,
}) => {
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
        <Search
          // setSearchQuery={ setSearchQuery }
          // defaultValue={ props.searchQuery }
        />
        <PageSubtitle isLight>
          { _l('Click on a snippet card to view the snippet') }
        </PageSubtitle>
        <PageBackdrop
          graphicName='search-empty'
          mainText={ _l('Start typing a keyword to see matching snippets.') }
          mainTextClassName='search-page-text'
        />
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
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

export default connect(
  state => ({
    searchIndex: state.search.searchIndex,
    searchQuery: state.search.searchQuery,
  }),
  null
)(SearchPage);
