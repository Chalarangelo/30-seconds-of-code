import React from 'react';
import PropTypes from 'prop-types';

/**
 * Page title component.
 */
const PageTitle = ({
  children,
}) => (
  <h2 className='page-title'>
    { children }
  </h2>
);

PageTitle.propTypes = {
  /** The title's children */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default PageTitle;
