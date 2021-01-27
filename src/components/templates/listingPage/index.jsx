import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import SnippetList from 'components/organisms/snippetList';

const propTypes = {
  pageContext: PropTypes.shape({
    paginator: PropTypes.paginator,
    sorter: PropTypes.sorter,
    snippetList: PropTypes.arrayOf(PropTypes.snippet),
    listingName: PropTypes.string,
    listingTitle: PropTypes.string,
    listingDescription: PropTypes.string,
    listingImage: PropTypes.string,
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
    listingImage,
    listingType,
    listingSublinks = [],
    pageDescription,
  },
  path,
}) => {
  return (
    <>
      <Meta
        title={listingName}
        description={pageDescription}
        structuredData={{
          title: listingName,
          slug: path,
          items: snippetList,
          type: 'listing',
        }}
      />
      <Shell>
        <SnippetList
          listingName={listingTitle}
          listingDescription={listingDescription}
          listingImage={listingImage}
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

export default ListingPage;
