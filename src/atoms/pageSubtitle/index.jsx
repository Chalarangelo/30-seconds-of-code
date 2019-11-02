import React from 'react';
import PropTypes from 'prop-types';
import {trimWhiteSpace} from 'functions/utils';

const PageSubtitle = ({
  className,
  children,
  isLight,
}) => (
  <p
    className={ trimWhiteSpace`
      ${isLight ? 'page-light-sub' : 'page-sub-title'}
      ${className}
    ` }
  >
    { children }
  </p>
);

PageSubtitle.propTypes = {
  /** Additional classNames for the component */
  className: PropTypes.string,
  /** The subtitle's children */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Determines the subtitle's color */
  isLight: PropTypes.bool,
};

export default PageSubtitle;
