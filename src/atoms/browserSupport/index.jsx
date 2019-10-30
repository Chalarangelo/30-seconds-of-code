import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lang';
const _l = _('en');

const BrowserSupport = ({
  supportPercentage,
  browserSupportHtml,
}) => (
  <>
    <h5 className='browser-support-title'>{ _l('Browser support') }</h5>
    <p className='browser-support-percentage'>
      { supportPercentage.toFixed(1) }%
    </p>
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
