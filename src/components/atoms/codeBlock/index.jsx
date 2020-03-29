import React from 'react';
import PropTypes from 'prop-types';
import { Language as LanguagePropType } from 'typedefs';
import { trimWhiteSpace } from 'functions/utils';

const propTypes = {
  language: LanguagePropType,
  className: PropTypes.string,
  htmlContent: PropTypes.string.isRequired,
  rest: PropTypes.any,
};

/**
 * Renders a code block with the appropriate language tag.
 * @param {string} htmlContent -Raw HTML string to be rendered inside the block.
 */
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

CodeBlock.propTypes = propTypes;

export default CodeBlock;
