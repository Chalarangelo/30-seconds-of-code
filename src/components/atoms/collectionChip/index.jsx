import React from 'react';
import PropTypes from 'typedefs/proptypes';
import literals from 'lang/en/client/common';

const propTypes = {
  chip: PropTypes.chip,
};

/**
 * General-purpose collection chip.
 * Used in home page and collections page.
 * @param {object} chip - Collection chip object for the chip.
 */
const CollectionChip = ({ chip }) => {
  const hasDescription = chip.description && chip.description.length;
  return hasDescription ? (
    <li className='card collection-card'>
      <div className={`card-icon icon icon-${chip.icon}`}></div>
      <div className='card-data'>
        <h3 className='card-title'>
          <a href={chip.url}>{chip.name}</a>
        </h3>
        <span className='card-subtitle'>{literals.snippetCollection}</span>
      </div>
      <div className='card-description'>
        <p>{chip.description}</p>
      </div>
    </li>
  ) : (
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
