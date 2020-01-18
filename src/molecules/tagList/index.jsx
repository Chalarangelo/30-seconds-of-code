import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'atoms/tag';
import { EXPERTISE_LEVELS } from 'shared';
import Expertise from 'atoms/expertise';

const TagList = ({
  tags,
}) => {
  // Find expertise tag
  const _expertise = tags
    .filter(tag => EXPERTISE_LEVELS.includes(tag))[0];
  // Deduplicate tags
  const _tags = [...new Set(tags)]
    .filter(tag => !EXPERTISE_LEVELS.includes(tag));

  return (
    <div className="tag-list">
      { _tags.map(tag =>
        <Tag name={ tag } key={ `t_${tag}` }/>
      ) }
      {
        typeof _expertise !== 'undefined'
          ? <Expertise level={ _expertise } />
          : null
      }
    </div>
  );
};

TagList.propTypes = {
  /** List of tag names */
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
