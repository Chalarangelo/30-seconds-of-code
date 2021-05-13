import PropTypes from 'typedefs/proptypes';

const propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

/**
 * Simple toggle input component.
 * Uses an `<input>` element wrapped in a `<label>`.
 */
const Toggle = ({ onChange, checked = false, children }) => (
  <label className='toggle flex a-center md:fs-md'>
    {children}
    <input
      defaultChecked={checked}
      type='checkbox'
      className='toggle-switch'
      onChange={onChange}
    />
  </label>
);

Toggle.propTypes = propTypes;

export default Toggle;
