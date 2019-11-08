import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import SnippetList from 'organisms/snippetList';
import PropTypes from 'prop-types';
import {
  Paginator as PaginatorPropType,
  Snippet as SnippetPropType
} from 'typedefs';
import { pushNewPage } from 'state/navigation';
import _ from 'lang';
const _l = _('en');

// Used to produce a description
const templateData = {
  pageType: 'listing',
};

const ListingPage = ({
  pageContext: {
    logoSrc,
    paginator,
    snippetList,
    listingName,
    snippetCount,
    listingType,
    listingLanguage,
    listingTag,
  },
  dispatch,
}) => {
  React.useEffect(() => {
    dispatch(pushNewPage(listingName, `${paginator.baseUrl}/p/${paginator.pageNumber}`));
  }, []);

  return (
    <>
      <Meta
        logoSrc={ logoSrc }
        title={ listingName }
        description={ _l`site.pageDescription${{...templateData, snippetCount, listingType, listingLanguage, listingTag }}` }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isListing
        withIcon={ true }
        withTitle={ true }
      >
        <SnippetList
          listingName={ listingName }
          snippetList={ snippetList }
          paginator={ paginator }
        />
      </Shell>
    </>
  );
};

ListingPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** Paginator component data */
    paginator: PaginatorPropType,
    /** List of snippets to be displayed */
    snippetList: PropTypes.arrayOf(SnippetPropType),
    /** Name of this listing page */
    listingName: PropTypes.string,
    /**  Number of indexed snippets */
    snippetCount: PropTypes.number,
    /** Type metadata for the listing description */
    listingType: PropTypes.string,
    /** Language metadata for the listing description */
    listingLanguage: PropTypes.string,
    /** Tag metadata for the listing description */
    listingTag: PropTypes.string,
  }),
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

export default connect(
  state => ({}),
  null
)(ListingPage);
