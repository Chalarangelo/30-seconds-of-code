import React from 'react';
import PropTypes from 'prop-types';
import {trimWhiteSpace} from 'helpers/trimWhiteSpace';

const Expertise = ({
  level
}) => (
  <div className={trimWhiteSpace`expertise ${level}`} />
);

export default Expertise;