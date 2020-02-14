import React from 'react';
import PropTypes from 'prop-types';

/**
 * Toggle component.
 */
const Toggle = ({
  onChange,
  checked = false,
  children,
  ...rest
}) => (
  <label className='toggle'>
    { children }
    <input
      defaultChecked={ checked }
      type='checkbox'
      className='toggle-switch'
      onChange={ onChange }
      { ...rest }
    />
  </label>
);

Toggle.propTypes = {
  /** The callaback to be executed when the toggle changes state */
  onChange: PropTypes.func,
  /** Is this toggle checked by default? */
  checked: PropTypes.bool,
  /** The card's children */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Any other arguments to be passed to the card */
  rest: PropTypes.any,
};

export default Toggle;
