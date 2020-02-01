import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a toast component.
 */
const Toast = ({
  message,
}) => (
  <div className="toast icon icon-check">
    { message }
  </div>
);

Toast.propTypes = {
  /** Toast string literal */
  message: PropTypes.string.isRequired,
};

export default Toast;
