import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';

/**
 * Page title component.
 */
const PageTitle = ({
  className,
  children,
}) => (
  <h2 className={ trimWhiteSpace`page-title ${className}` }>
    { children }
  </h2>
);

PageTitle.propTypes = {
  /** Additional classes for the title */
  className: PropTypes.string,
  /** The title's children */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default PageTitle;
