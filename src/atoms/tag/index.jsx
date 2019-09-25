import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({
  name,
}) => (
  <span className="tag">
    { name }
  </span>
);

Tag.propTypes = {
  /** Tag string literal */
  name: PropTypes.string.isRequired,
};

export default Tag;
