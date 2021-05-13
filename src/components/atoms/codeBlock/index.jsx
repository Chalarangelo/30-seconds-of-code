import PropTypes from 'typedefs/proptypes';
import { combineClassNames } from 'utils';

const propTypes = {
  language: PropTypes.language,
  className: PropTypes.string,
  htmlContent: PropTypes.string.isRequired,
};

/**
 * Renders a code block with the appropriate language tag.
 * @param {string} htmlContent -Raw HTML string to be rendered inside the block.
 */
const CodeBlock = ({ language, className, htmlContent }) => (
  <pre
    data-code-language={language.long}
    className={combineClassNames`notranslate ${`language-${language.short}`} ${className}`}
    dangerouslySetInnerHTML={{ __html: htmlContent }}
  />
);

CodeBlock.propTypes = propTypes;

export default CodeBlock;
