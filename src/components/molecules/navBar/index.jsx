import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'typedefs';
import Anchor from 'components/atoms/anchor';
import Search from 'components/atoms/search';
import _ from 'lang';
const _l = _('en');

/**
 * Renders a group of navigational elements.
 * Used in the application's main navigation menu.
 * Depends on Search and Anchor atoms.
 */
const NavBar = ({
  logoSrc,
  homeLink,
  settingsLink,
  hasMainSearch = false,
  ...rest
}) => (
  <header className='nav-bar' { ...rest }>
    <Anchor
      className='nav-btn'
      link={ homeLink }
    >
      <img
        src={ logoSrc }
        alt={ _l('Logo') }
        className='nav-website-logo'
      />
    </Anchor>
    <Search
      isMainSearch={ hasMainSearch }
    />
    <Anchor
      className='nav-btn icon icon-settings'
      link={ settingsLink }
    />
  </header>
);

NavBar.propTypes = {
  /** URI for the logo image */
  logoSrc: PropTypes.string.isRequired,
  /** Link to the home page */
  homeLink: LinkPropType.isRequired,
  /** Link to the settings page */
  settingsLink: LinkPropType.isRequired,
  /** Should render the search as main? */
  hasMainSearch: PropTypes.bool,
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default NavBar;
