import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import SnippetList from 'components/organisms/snippetList';
import literals from 'lang/en/client/common';

const propTypes = {
  pageContext: PropTypes.shape({
    paginator: PropTypes.paginator,
    sorter: PropTypes.sorter,
    snippetList: PropTypes.arrayOf(PropTypes.snippet),
    listingName: PropTypes.string,
    listingTitle: PropTypes.string,
    listingDescription: PropTypes.string,
    listingType: PropTypes.string,
    listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
    pageDescription: PropTypes.string.isRequired,
  }),
  path: PropTypes.string.isRequired,
};

/**
 * Renders a listing page.
 * Used to render the /list/p/1 page and any other listing pages.
 */
const ListingPage = ({
  pageContext: {
    paginator,
    sorter,
    snippetList,
    listingName,
    listingTitle,
    listingDescription,
    listingType,
    listingSublinks = [],
    pageDescription,
  },
  path,
}) => {
  const isFirstListingPage =
    listingType === 'main' && paginator.pageNumber === 1;
  const isHomePage =
    isFirstListingPage && paginator.slugOrderingSegment === 'p';

  return (
    <>
      <Meta
        title={isHomePage ? '' : listingName}
        description={pageDescription}
        canonical={isHomePage ? '/' : ''}
        structuredData={{
          title: listingName,
          slug: path,
          items: snippetList,
          type: 'listing',
        }}
      />
      <Shell>
        {isFirstListingPage ? (
          <>
            <h1 className='home-title'>
              <img
                src='/assets/30s-icon.png'
                alt={literals.siteName}
                className='home-logo'
                width='64'
                height='64'
              />
              <span className='home-title-text'>{literals.siteName}</span>
            </h1>
            <p className='home-sub-title'>{literals.siteDescription}</p>
          </>
        ) : null}
        <SnippetList
          listingName={listingTitle}
          listingDescription={listingDescription}
          listingType={listingType}
          snippetList={snippetList}
          paginator={paginator}
          sorter={sorter}
          listingSublinks={listingSublinks}
        />
      </Shell>
    </>
  );
};

ListingPage.propTypes = propTypes;

export default connect(() => ({}), null)(ListingPage);
