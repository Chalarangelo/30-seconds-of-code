import React from 'react';
import PropTypes from 'prop-types';

const CenteredWrapper = ({ children }) => (
  <div className="centered-wrapper">
    { children }
  </div>
);

CenteredWrapper.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CenteredWrapper;
