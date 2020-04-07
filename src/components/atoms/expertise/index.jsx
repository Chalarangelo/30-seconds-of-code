import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'functions/utils';

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
}) => level ? (
  <span className={ combineClassNames`expertise ${level.toLowerCase()}` } />
) : null;

Expertise.propTypes = propTypes;

export default Expertise;
