import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/atoms/card';

/**
 * Renders a non-snippet card container.
 * Used in About and Cookie pages.
 * Depends on Card atom.
 */
const SimpleCard = ({
  className,
  title,
  children,
  ...rest
}) => (
  <Card
    className={ className }
    { ...rest }
  >
    <h4 className='card-title'>
      { title }
    </h4>
    <div className='card-description'>
      { children }
    </div>
  </Card>
);

SimpleCard.propTypes = {
  /** Additional classes for the card */
  className: PropTypes.string,
  /** The card's title */
  title: PropTypes.string,
  /** The card's children */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default SimpleCard;
