import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';

const Card = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={ trimWhiteSpace`card ${className}` }
    { ...rest }
  >
    { children }
  </div>
);

Card.propTypes = {
  /** Additional classes for the card */
  className: PropTypes.string,
  /** The card's children */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default Card;
