import React from 'react';
import PropTypes from 'typedefs/proptypes';

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
    <li className='collection-chip'>
      <a
        className={`collection-chip-link icon icon-${chip.icon}`}
        href={chip.url}
      >
        {chip.name}
      </a>
    </li>
  );
};

CollectionChip.propTypes = propTypes;

export default CollectionChip;
