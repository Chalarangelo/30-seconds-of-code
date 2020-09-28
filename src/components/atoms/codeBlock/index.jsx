import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'utils';

const propTypes = {
  language: PropTypes.language,
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
    className={ combineClassNames`notranslate ${`language-${language.short}`} ${className}` }
    dangerouslySetInnerHTML={ { __html: htmlContent } }
    { ...rest }
  />
);

CodeBlock.propTypes = propTypes;

export default CodeBlock;
