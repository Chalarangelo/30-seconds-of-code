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
    <li className='card srfc-02dp txt-100 list-card'>
      <div className={`card-icon br-xl icon icon-${chip.icon}`}></div>
      <div className='card-data'>
        <h3 className='card-title txt-200 fs-xl f-alt'>
          <a href={chip.url}>{chip.title}</a>
        </h3>
        <span className='card-subtitle fs-xs'>
          {literals.snippetCollection}
        </span>
      </div>
      <div className='card-description'>
        <p>{chip.description}</p>
      </div>
    </li>
  ) : (
    <li className='collection-chip srfc-01dp'>
      <a
        className={`collection-chip-link f-alt icon icon-${chip.icon}`}
        href={chip.url}
      >
        {chip.title}
      </a>
    </li>
  );
};

CollectionChip.propTypes = propTypes;

export default CollectionChip;
