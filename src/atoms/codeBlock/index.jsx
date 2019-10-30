import React from 'react';
import PropTypes from 'prop-types';
import { Language as LanguagePropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';

const CodeBlock = ({
  language,
  className,
  htmlContent,
  ...rest
}) => (
  <pre
    data-code-language={ language.long }
    className={ trimWhiteSpace`${`language-${language.short}`} ${className}` }
    dangerouslySetInnerHTML={ { __html: htmlContent } }
    { ...rest }
  />
);

CodeBlock.propTypes = {
  /** The language name of the code block's class */
  language: LanguagePropType,
  /** Additional classes for the code block */
  className: PropTypes.string,
  /** The code block's inner HTML */
  htmlContent: PropTypes.string.isRequired,
  /** Any other arguments to be passed to the code block */
  rest: PropTypes.any,
};

export default CodeBlock;
