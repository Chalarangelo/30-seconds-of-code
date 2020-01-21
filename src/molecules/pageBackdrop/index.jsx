import React from 'react';
import PropTypes from 'prop-types';
import PageGraphic from 'atoms/pageGraphic';
import { trimWhiteSpace } from 'functions/utils';

/**
 * Renders the backdrop of a page.
 * Used in 404 and Search pages.
 * Depends on PageGraphic atom.
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
  <PageGraphic
    className={ graphicName }
    { ...rest }
  >
    <p className={ trimWhiteSpace`page-backdrop-text ${mainTextClassName}` }>
      { mainText }
    </p>
    { subText ?
      <p className={ trimWhiteSpace`page-backdrop-subtext ${subTextClassName}` }>
        { subText }
      </p>
      : null
    }
    { children }
  </PageGraphic>
);

PageBackdrop.propTypes = {
  /** The name of the graphic for the backdrop */
  graphicName: PropTypes.string,
  /** Main text for the backdrop */
  mainText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Additional classnames to be passed to the main text */
  mainTextClassName: PropTypes.string,
  /** Secondary text for the backdrop */
  subText: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Additional classnames to be passed to the secondary text */
  subTextClassName: PropTypes.string,
  /** Additional children elements for the backdrop */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** Any other arguments to be passed to the backdrop */
  rest: PropTypes.any,
};

export default PageBackdrop;
