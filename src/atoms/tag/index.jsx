import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a tag.
 */
const Tag = ({
  name,
}) =>
  name ?
    (
      <span className="tag">
        { name }
      </span>
    )
    : null
;

Tag.propTypes = {
  /** Tag string literal */
  name: PropTypes.string,
};

export default Tag;
