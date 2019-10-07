import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'proptypes';
import NavButton from 'atoms/navButton';

const NavBar = ({
  buttons,
  ...rest
}) => (
  <header className="nav-bar" { ...rest }>
    { buttons.map(({icon, link, ...btn}, i) => (
      <NavButton icon={ icon } link={ link } key={ `nav-btn-${i}` } { ...btn } />
    )) }
  </header>
);

NavBar.propTypes = {
  /** Buttons that compose the navigation bar */
  buttons: PropTypes.arrayOf(PropTypes.shape({
    link: LinkPropType.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    rest: PropTypes.any,
  })).isRequired,
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default NavBar;
