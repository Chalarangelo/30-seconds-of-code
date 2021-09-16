import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';

const propTypes = {
  chip: PropTypes.chip,
};

/**
 * General-purpose collection chip.
 * Used in home page and collections page.
 * @param {object} chip - Collection chip object for the chip.
 */
const CollectionChip = ({ chip }) => {
  return (
    <li className='collection-chip srfc-01dp txt-200 br-xl'>
      <Link href={chip.url}>
        <a
          className={`inherit relative py-2 px-1 f-center flex j-center a-center f-alt box-border icon icon-${chip.icon} before:fs-lg`}
        >
          {chip.title}
        </a>
      </Link>
    </li>
  );
};

CollectionChip.propTypes = propTypes;

export default CollectionChip;
