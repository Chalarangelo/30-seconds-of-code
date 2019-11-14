import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';

const PageGraphic = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={ trimWhiteSpace`page-graphic ${className}` }
    { ...rest }
  >
    { children }
  </div>
);

PageGraphic.propTypes = {
  /** Additional classes for the graphic */
  className: PropTypes.string,
  /** The graphic's children */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Any other arguments to be passed to the graphic */
  rest: PropTypes.any,
};

export default PageGraphic;
