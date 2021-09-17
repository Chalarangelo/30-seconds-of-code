import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import SnippetList from 'components/organisms/snippetList';

const propTypes = {
  slug: PropTypes.string.isRequired,
  paginator: PropTypes.paginator,
  snippetList: PropTypes.arrayOf(PropTypes.snippet),
  listingName: PropTypes.string,
  listingTitle: PropTypes.string,
  listingDescription: PropTypes.string,
  listingImage: PropTypes.string,
  listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
  pageDescription: PropTypes.string.isRequired,
};

/**
 * Renders a listing page.
 * Used to render the /list/p/1 page and any other listing pages.
 * Also used to render the /collections page.
 */
const ListingPage = ({
  slug,
  paginator = null,
  snippetList,
  listingName,
  listingTitle,
  listingDescription,
  listingImage,
  listingSublinks = [],
  pageDescription,
}) => {
  return (
    <>
      <Meta
        title={listingName}
        description={pageDescription}
        structuredData={{
          title: listingName,
          slug,
          items: snippetList,
          type: 'listing',
        }}
        canonical={slug}
      />
      <Shell>
        <SnippetList
          listingName={listingTitle}
          listingDescription={listingDescription}
          listingImage={listingImage}
          snippetList={snippetList}
          paginator={paginator}
          listingSublinks={listingSublinks}
        />
      </Shell>
    </>
  );
};

ListingPage.propTypes = propTypes;

export default ListingPage;
