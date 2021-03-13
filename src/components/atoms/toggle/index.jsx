import React from 'react';
import PropTypes from 'typedefs/proptypes';

const propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  rest: PropTypes.any,
};

/**
 * Simple toggle input component.
 * Uses an `<input>` element wrapped in a `<label>`.
 */
const Toggle = ({ onChange, checked = false, children, ...rest }) => (
  <label className='toggle flex a-center'>
    {children}
    <input
      defaultChecked={checked}
      type='checkbox'
      className='toggle-switch'
      onChange={onChange}
      {...rest}
    />
  </label>
);

Toggle.propTypes = propTypes;

export default Toggle;
