import React from 'react';
import PropTypes from 'prop-types';

/**
 * List of tags.
 * Used in most pages that render snippet information.
 * Depends on Tag atom.
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

TagList.propTypes = {
  /** List of tag names */
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
