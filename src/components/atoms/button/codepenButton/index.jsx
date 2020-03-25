import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';
import literals from 'lang/en/client/common';

/* eslint-disable camelcase */
/**
 * Button that links to a generated Codepen from the page data.
 * See Codepen API: https://blog.codepen.io/documentation/api/prefill/
 */
const CodepenButton = ({
  jsCode,
  htmlCode,
  cssCode,
  jsPreProcessor = 'none',
  jsExternal = [],
}) => {
  const [active, setActive] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const btnRef = React.useRef();
  return (
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
      <button
        className={ trimWhiteSpace`btn codepen-btn icon ${active ? 'icon-check' : 'icon-codepen'} ${active ? 'active' : ''}` }
        ref={ btnRef }
        title={ literals.codepen }
        onClick={ e => {
          if(!processing) {
            e.preventDefault();
            setTimeout(() => setActive(true), 100);
            setTimeout(() => {
              setActive(false);
              btnRef.current.click();
            }, 750);
          }
          setProcessing(!processing);
        } }
      />
    </form>
  );
};

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
