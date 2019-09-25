import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({
  name,
}) => (
  <span className="tag" key={ `t_${name}` }>
    { name }
  </span>
);

Tag.propTypes = {
  /** Tag string literal */
  name: PropTypes.string.isRequired,
};

export default Tag;
