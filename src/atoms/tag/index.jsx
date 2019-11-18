import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'functions/utils';

const Tag = ({
  name,
}) => (
  <span className="tag">
    { capitalize(name) }
  </span>
);

Tag.propTypes = {
  /** Tag string literal */
  name: PropTypes.string.isRequired,
};

export default Tag;
