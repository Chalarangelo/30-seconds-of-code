import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'utils';

const propTypes = {
  graphicName: PropTypes.string,
  mainText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  mainTextClassName: PropTypes.string,
  subText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  subTextClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  rest: PropTypes.any,
};

/**
 * Renders the backdrop of a page.
 * Used in 404 and Search pages.
 * @param {*} graphicName - The name of the graphic for the backdrop
 * @param {*} mainText - Main text for the backdrop
 * @param {*} mainTextClassName - Additional classΝames to be passed to the main text
 * @param {*} subText - Secondary text for the backdrop
 * @param {*} subTextClassName - Additional classΝames to be passed to the secondary text
 */
const PageBackdrop = ({
  graphicName,
  mainText,
  mainTextClassName,
  subText,
  subTextClassName,
  children,
  ...rest
}) => (
  <div className={combineClassNames`page-graphic ${graphicName}`} {...rest}>
    <p className={combineClassNames`page-backdrop-text ${mainTextClassName}`}>
      {mainText}
    </p>
    {subText ? (
      <p
        className={combineClassNames`page-backdrop-subtext ${subTextClassName}`}
      >
        {subText}
      </p>
    ) : null}
    {children}
  </div>
);

PageBackdrop.propTypes = propTypes;

export default PageBackdrop;
