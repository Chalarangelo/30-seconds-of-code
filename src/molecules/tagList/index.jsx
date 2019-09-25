import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'atoms/tag';

const TagList = ({
  tags,
}) => {
  // Deduplicate tags
  const _tags = [...new Set(tags)];

  return (
    <div className="tag-list">
      { _tags.map(tag => (
        <Tag name={ tag } key={ `t_${tag}` }/>
      )) }
    </div>
  );
};

TagList.propTypes = {
  /** List of tag names */
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
