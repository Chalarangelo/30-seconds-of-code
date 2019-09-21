import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'helpers/trimWhiteSpace';

export const EXPERTISE_LEVELS = ['beginner', 'intermediate', 'advanced'];

const Expertise = ({
  level = 'intermediate',
}) => (
  <div className={ trimWhiteSpace`expertise ${level}` } />
);

Expertise.propTypes = {
  level: PropTypes.oneOf(EXPERTISE_LEVELS),
};

export default Expertise;
