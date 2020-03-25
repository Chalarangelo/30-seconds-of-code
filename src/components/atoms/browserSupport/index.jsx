import React from 'react';
import PropTypes from 'prop-types';
import literals from 'lang/en/client/common';

/**
 * Browser support component that displays formatted browser support percentage.
 * Used in CSS snippet cards.
 */
const BrowserSupport = ({
  supportPercentage,
  browserSupportHtml,
}) => (
  <>
    <h5 className='browser-support-title'>{ literals.BrowserSupport }</h5>
    <p className='browser-support-percentage'>{ supportPercentage.toFixed(1) }%</p>
    <div
      className='browser-support-text'
      dangerouslySetInnerHTML={ {
        __html: browserSupportHtml,
      } }
    />
  </>
);

BrowserSupport.propTypes = {
  /** Numeric representation of the browser support percentage*/
  supportPercentage: PropTypes.number,
  /** Html for the browser support text */
  browserSupportHtml: PropTypes.string,
};

export default BrowserSupport;
