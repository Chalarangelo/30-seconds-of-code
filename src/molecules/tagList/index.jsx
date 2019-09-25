import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'atoms/tag';

const TagList = ({
  tags,
}) => (
  <div className="tag-list">
    { tags.map(tag => (
      <Tag name={ tag } key={ `tl_${tag}` }/>
    )) }
  </div>
);

TagList.propTypes = {
  /** List of tag names */
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
