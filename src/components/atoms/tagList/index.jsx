import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

/**
 * List of tags.
 * Used in most pages that render snippet information.
 */
const TagList = ({
  tags,
}) => (
  <p className="tag-list">
    { [...new Set(tags)]    // Deduplicate tags
      .filter(Boolean)      // Remove empty tags
      .join(', ')           // Combine tags
    }
  </p>
);

TagList.propTypes = propTypes;

export default TagList;
