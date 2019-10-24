import React from 'react';
import { connect } from 'react-redux';
import SnippetCard from 'organisms/snippetCard';
import { LinkBackAnchor } from 'atoms/anchor';
import Meta from 'atoms/meta';
import { Snippet as SnippetPropType } from 'typedefs';
import PropTypes from 'prop-types';
import 'index.scss';
import Shell from 'organisms/shell';
import _ from 'lang';
const _l = _('en');

const SnippetPage = ({
  pageContext: {
    snippet,
    logoSrc,
  },
  lastPageTitle = 'Home',
  lastPageUrl = '/',
  ...rest
}) => {
  return (
    <>
      <Meta
        title={ snippet.title }
        description={ snippet.description }
        logoSrc={ logoSrc }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isList={ false }
      >
        <LinkBackAnchor
          link={ {
            url: lastPageUrl,
            internal: true,
          } }
        >
          { _l`Back to${lastPageTitle}` }
        </LinkBackAnchor>
        <SnippetCard
          snippet={ snippet }
          toastContainer='toast-container'
        />
        <div id="toast-container"/>
      </Shell>
    </>
  )
  ;
};

SnippetPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** Snippet data for the card */
    snippet: SnippetPropType.isRequired,
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
  }),
  /** Title of the last page */
  lastPageTitle: PropTypes.string.isRequired,
  /** URL of the last page */
  lastPageUrl: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    isDarkMode: state.app.isDarkMode,
    lastPageTitle: state.app.lastPageTitle,
    lastPageUrl: state.app.lastPageUrl,
    searchQuery: state.app.searchQuery,
  }),
  null
)(SnippetPage);
