import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'atoms/button';
import _ from 'lang';
const _l = _('en');

const CodepenButton = ({
  jsCode,
  htmlCode,
  cssCode,
  jsPreProcessor = 'none',
  jsExternal = [],
}) => (
  <form action='https://codepen.io/pen/define' method='POST' target='_blank'>
    <input
      type='hidden'
      name='data'
      value={
        JSON.stringify({
          js: jsCode,
          css: cssCode,
          html: htmlCode,
          js_pre_processor: jsPreProcessor,
          js_external: jsExternal.join(';'),
        })
      }
    />
    <Button
      className='codepen-btn'
      title={ _l('Edit on CodePen') }
    />
  </form>
);

CodepenButton.propTypes = {
  /** JS code to be passed to the CodePen definition */
  jsCode: PropTypes.string,
  /** HTML code to be passed to the CodePen definition */
  htmlCode: PropTypes.string,
  /** CSS code to be passed to the CodePen definition */
  cssCode: PropTypes.string,
  /** JS preprocessor ("none" || "coffeescript" || "babel" || "livescript" || "typescript") */
  jsPreProcessor: PropTypes.string,
  /** External JS files to be included */
  jsExternal: PropTypes.arrayOf(PropTypes.string),
};

export default CodepenButton;
