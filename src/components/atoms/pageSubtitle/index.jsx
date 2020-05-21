import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'utils';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  isLight: PropTypes.bool,
};

/**
 * Page subtitle component. Renders a simple `<p>` element with a base class
 * and passes children to the element.
 * @param {bool} isLight - Determines the subtitle's color.
 */
const PageSubtitle = ({
  className,
  children,
  isLight,
}) => (
  <p
    className={ combineClassNames`${isLight ? 'page-light-sub' : 'page-sub-title'} ${className}` }
  >
    { children }
  </p>
);

PageSubtitle.propTypes = propTypes;

export default PageSubtitle;
