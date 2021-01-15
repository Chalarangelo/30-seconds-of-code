import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import CollectionList from 'components/molecules/collectionList';

const propTypes = {
  pageContext: PropTypes.shape({
    pageDescription: PropTypes.string.isRequired,
    chipList: PropTypes.arrayOf(PropTypes.chip),
    listingName: PropTypes.string,
    listingTitle: PropTypes.string,
  }),
};

/**
 * Renders a listing page.
 * Used to render the /list/p/1 page and any other listing pages.
 */
const CollectionsPage = ({
  pageContext: { chipList, listingName, listingTitle, pageDescription },
}) => {
  return (
    <>
      <Meta title={listingName} description={pageDescription} />
      <Shell>
        <CollectionList chipList={chipList} listingName={listingTitle} />
      </Shell>
    </>
  );
};

CollectionsPage.propTypes = propTypes;

export default connect(() => ({}), null)(CollectionsPage);
