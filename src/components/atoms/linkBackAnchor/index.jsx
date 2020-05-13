import React from 'react';
import PropTypes from 'typedefs/proptypes';
import Anchor from 'components/atoms/anchor';
import { combineClassNames } from 'utils';

const linkBackPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  link: PropTypes.link.isRequired,
  className: PropTypes.string,
  rest: PropTypes.any,
};

/**
 * Anchor component for linking back to the previous page.
 * Just a decorated wrapper around the `Anchor` component.
 */
const LinkBackAnchor = ({
  children,
  link,
  className,
  ...rest
}) => (
  <Anchor
    className={ combineClassNames`link-back icon icon-arrow-left${className}` }
    link={ link }
    { ...rest }
  >
    { children }
  </Anchor>
);

LinkBackAnchor.propTypes = linkBackPropTypes;

export default LinkBackAnchor;
