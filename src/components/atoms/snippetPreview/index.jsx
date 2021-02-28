import React from 'react';
import PropTypes from 'typedefs/proptypes';
import literals from 'lang/en/client/common';

const propTypes = {
  scopeId: PropTypes.string,
  scopedCss: PropTypes.string,
  htmlCode: PropTypes.string,
  jsCode: PropTypes.string,
};

/**
 * Snippet preview component.
 * Used in CSS snippet cards.
 * @param {string} scopeId - Scope id for the snippet preview
 * @param {string} scopedCss - Scoped CSS code for the snippet preview
 * @param {string} htmlCode - HTML code for the snippet preview
 * @param {string} jsCode - JS code for the snippet preview
 */
const SnippetPreview = ({ scopeId, scopedCss, htmlCode, jsCode }) => {
  React.useEffect(() => {
    if (!jsCode) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `function snippet_preview_js(){${jsCode}};`;
    document.body.appendChild(s);
    try {
      window['snippet_preview_js']();
    } catch (e) {
      /* istanbul ignore next */
      console.warn(
        'There is an issue with JavaScript execution on the snippet preview of this page.'
      );
    }
  }, []);

  return (
    <>
      <h5 className='snippet-preview-title txt-150'>{literals.preview}</h5>
      <div className='snippet-preview' data-scope={scopeId}>
        <style>{scopedCss}</style>
        <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
      </div>
    </>
  );
};

SnippetPreview.propTypes = propTypes;

export default SnippetPreview;
