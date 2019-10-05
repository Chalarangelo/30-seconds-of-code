import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'proptypes';
import Anchor from 'atoms/anchor';
import { trimWhiteSpace } from 'functions/utils';

export const NAV_ICONS = [
  'search',
  'list',
  'github',
  'sun',
  'moon',
];

const NavButton = ({
  className,
  icon,
  link,
  ...rest
}) => (
  <Anchor
    className={ trimWhiteSpace`nav-btn ${icon} ${className}` }
    link={ link }
    { ...rest }
  />
);

NavButton.propTypes = {
  /** Additional classname(s) for the link button */
  className: PropTypes.string,
  /** Icon name for the navigation button */
  icon: PropTypes.oneOf(NAV_ICONS).isRequired,
  /** Anchor link data */
  link: LinkPropType.isRequired,
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default NavButton;
