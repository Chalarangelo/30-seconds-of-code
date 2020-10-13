import React from 'react';
import PropTypes from 'typedefs/proptypes';

const propTypes = {
  level: PropTypes.string,
};

/**
 * Renders an expertise tag.
 * @param {string} level - One of the appropriate expertise levels:
 *   "Beginner", "Intermediate" (default), "Advanced", "Blog"
 */
const Expertise = ({
  level = 'Intermediate',
}) => (
  <span className={ `expertise ${level.toLowerCase()}` } title={ level } />
);

Expertise.propTypes = propTypes;

export default Expertise;
