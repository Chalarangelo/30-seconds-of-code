import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'typedefs';
import {Anchor} from 'atoms/anchor';
import { trimWhiteSpace } from 'functions/utils';

/**
 * Stylized anchor that looks like a button.
 * Depends on the Anchor atom component.
 */
const AnchorButton = ({
  className = '',
  link,
  children,
  ...rest
}) => (
  <Anchor
    className={ trimWhiteSpace`btn ${className}` }
    link={ link }
    { ...rest }
  >
    { children }
  </Anchor>
);

AnchorButton.propTypes = {
  /** Additional classname(s) for the link button */
  className: PropTypes.string,
  /** Children elements */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Anchor link data */
  link: LinkPropType.isRequired,
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default AnchorButton;
