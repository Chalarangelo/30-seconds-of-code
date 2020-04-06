import React from 'react';
import PropTypes from 'typedefs/proptypes';
import literals from 'lang/en/client/common';

const propTypes = {
  supportPercentage: PropTypes.string,
  browserSupportHtml: PropTypes.string,
};
/**
 * Browser support component that displays formatted browser support percentage.
 * Used in CSS snippet cards.
 */
const BrowserSupport = ({
  supportPercentage,
  browserSupportHtml,
}) => (
  <>
    <h5 className='browser-support-title'>{ literals.browserSupport }</h5>
    <p className='browser-support-percentage'>{ supportPercentage }</p>
    <div
      className='browser-support-text'
      dangerouslySetInnerHTML={ {
        __html: browserSupportHtml,
      } }
    />
  </>
);

BrowserSupport.propTypes = propTypes;

export default BrowserSupport;
