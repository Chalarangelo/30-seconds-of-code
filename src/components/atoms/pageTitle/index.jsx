import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { trimWhiteSpace } from 'functions/utils';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

/**
 * Page title component. Renders a simple `<h2>` element with a base class
 * and passes children to the element.
 */
const PageTitle = ({
  className,
  children,
}) => (
  <h2 className={ trimWhiteSpace`page-title ${className}` }>
    { children }
  </h2>
);

PageTitle.propTypes = propTypes;

export default PageTitle;
