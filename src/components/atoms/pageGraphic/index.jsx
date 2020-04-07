import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'utils';

const propTypes = {
  className: PropTypes.string,
  rest: PropTypes.any,
};

/**
 * Page graphic component. Renders a simple `<div>` element with a base class
 * and passes everything else to the element.
 */
const PageGraphic = ({
  className,
  ...rest
}) => (
  <div
    className={ combineClassNames`page-graphic ${className}` }
    { ...rest }
  />
);

PageGraphic.propTypes = propTypes;

export default PageGraphic;
