import React from 'react';
import PropTypes from 'prop-types';
import {trimWhiteSpace} from 'helpers/trimWhiteSpace';

const Expertise = ({
  level = 'intermediate'
}) => (
  <div className={trimWhiteSpace`expertise ${level}`} />
);

Expertise.propTypes = {
  level: PropTypes.oneOf(['beginner', 'intermediate', 'advanced'])
};

export default Expertise;