import React from 'react';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import SnippetList from 'components/organisms/snippetList';
import PropTypes from 'prop-types';
import {
  Paginator as PaginatorPropType,
  Sorter as SorterPropType,
  Snippet as SnippetPropType
} from 'typedefs';
import { pushNewPage } from 'state/navigation';
import literals from 'lang/en/client/common';

const propTypes = {
  pageContext: PropTypes.shape({
    logoSrc: PropTypes.string.isRequired,
    splashLogoSrc: PropTypes.string.isRequired,
    paginator: PaginatorPropType,
    sorter: SorterPropType,
    snippetList: PropTypes.arrayOf(SnippetPropType),
    listingName: PropTypes.string,
    listingTitle: PropTypes.string,
    listingType: PropTypes.string,
    listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
    pageDescription: PropTypes.string.isRequired,
  }),
  dispatch: PropTypes.func,
};

/**
 * Renders a listing page.
 * Used to render the /list/p/1 page and any other listing pages.
 */
const ListingPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
    paginator,
    sorter,
    snippetList,
    listingName,
    listingTitle,
    listingType,
    listingSublinks = [],
    pageDescription,
  },
  dispatch,
}) => {
  React.useEffect(() => {
    dispatch(
      pushNewPage(
        listingName,
        `${paginator.baseUrl}/${paginator.slugOrderingSegment}/${paginator.pageNumber}`
      )
    );
  }, []);

  const isFirstListingPage = listingType === 'main' && paginator.pageNumber === 1;
  const isHomePage = isFirstListingPage && paginator.slugOrderingSegment === 'p';

  return (
    <>
      <Meta
        logoSrc={ splashLogoSrc }
        title={ isHomePage ? '' : listingName }
        description={ pageDescription }
        canonical={ isHomePage ? '/' : '' }
      />
      <Shell logoSrc={ logoSrc } >
        {
          isFirstListingPage ? (
            <>
              <h1 className='home-title'>
                <img
                  src={ logoSrc }
                  alt={ literals.siteName }
                  className='home-logo'
                />
                <span className='home-title-text'>
                  { literals.siteName }
                </span>
              </h1>
              <p className='home-sub-title'>
                { literals.siteDescription }
              </p>
            </>
          ) : null
        }
        <SnippetList
          listingName={ listingTitle }
          listingType={ listingType }
          snippetList={ snippetList }
          paginator={ paginator }
          sorter={ sorter }
          listingSublinks={ listingSublinks }
        />
      </Shell>
    </>
  );
};

ListingPage.propTypes = propTypes;

export default connect(
  () => ({}),
  null
)(ListingPage);
