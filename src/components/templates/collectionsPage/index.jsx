import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';

const propTypes = {
  pageDescription: PropTypes.string.isRequired,
  chipList: PropTypes.arrayOf(PropTypes.chip),
  listingName: PropTypes.string,
  listingTitle: PropTypes.string,
};

/**
 * Renders a listing page.
 * Used to render the /list/p/1 page and any other listing pages.
 */
const CollectionsPage = ({
  chipList,
  listingName,
  listingTitle,
  pageDescription,
}) => {
  return (
    <>
      <Meta title={listingName} description={pageDescription} />
      <Shell>
        <PageTitle>{listingTitle}</PageTitle>
        <ul className='list-section'>
          {chipList.map(chip => (
            <PreviewCard key={`collection_${chip.url}`} contentItem={chip} />
          ))}
        </ul>
      </Shell>
    </>
  );
};

CollectionsPage.propTypes = propTypes;

export default CollectionsPage;
