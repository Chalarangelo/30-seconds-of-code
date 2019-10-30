import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lang';
const _l = _('en');

const SnippetPreview = ({
  scopeId,
  scopedCss,
  htmlCode,
  jsCode,
}) => {
  React.useEffect(() => {
    if (!jsCode) return;
    let jsTitle = `${scopeId.toLowerCase().replace(/[\s-]/g, '')}_js`;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `function ${jsTitle}(){${jsCode}};`;
    document.body.appendChild(s);
    try {
      window[`${jsTitle}`]();
    } catch (e) {
      console.warn('There is an issue with JavaScript execution on the snippet preview of this page.');
    }
  }, []);

  return (
    <>
      <h5 className='snippet-preview-title'>{ _l('Preview') }</h5>
      <div
        className='snippet-preview'
        data-scope={ scopeId }
      >
        <style>
          { scopedCss }
        </style>
        <div dangerouslySetInnerHTML={ {__html: htmlCode} } />
        {
          jsCode &&
          <script>
            { `function jsTitle(){${jsCode}};` }
          </script>
        }
      </div>
    </>
  );
};

SnippetPreview.propTypes = {
  /** Scope id for the snippet preview */
  scopeId: PropTypes.string,
  /** Scoped CSS code for the snippet preview */
  scopedCss: PropTypes.string,
  /** HTML code for the snippet preview */
  htmlCode: PropTypes.string,
  /** JS code for the snippet preview */
  jsCode: PropTypes.string,
};

export default SnippetPreview;
