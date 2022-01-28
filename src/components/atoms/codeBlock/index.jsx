/**
 * Renders a code block with the appropriate language tag.
 * @param {string} htmlContent -Raw HTML string to be rendered inside the block.
 */
const CodeBlock = ({ language, className = '', htmlContent }) => (
  <pre
    data-code-language={language.long}
    className={`notranslate ${`language-${language.short}`} ${className}`}
    dangerouslySetInnerHTML={{ __html: htmlContent }}
  />
);

export default CodeBlock;
