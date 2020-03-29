import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';

const propTypes = {
  className: PropTypes.string,
  rest: PropTypes.any,
};

/**
 * Generic card component. Renders a simple `<div>` element with a base class
 * and passes everything else to the element.
 */
const Card = ({
  className,
  ...rest
}) => (
  <div
    className={ trimWhiteSpace`card ${className}` }
    { ...rest }
  />
);

Card.propTypes = propTypes;

export default Card;
