import PropTypes from 'typedefs/proptypes';
import PageTitle from 'components/atoms/pageTitle';
import CollectionChip from 'components/atoms/collectionChip';

const propTypes = {
  chipList: PropTypes.arrayOf(PropTypes.chip),
  listingName: PropTypes.string,
};

/**
 * Renders a list of collection chips.
 * Dependent on the `CollectionChip` component.
 */
const CollectionList = ({ chipList, listingName }) => {
  return chipList.length ? (
    <>
      <PageTitle>{listingName}</PageTitle>
      <ul className='list-section'>
        {chipList.map(chip => (
          <CollectionChip key={`chip_${chip.url}`} chip={chip} />
        ))}
      </ul>
    </>
  ) : null;
};

CollectionList.propTypes = propTypes;

export default CollectionList;
