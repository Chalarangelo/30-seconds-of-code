"use strict";

const Prism = require(`prismjs`);

const _ = require(`lodash`);

const loadPrismLanguage = require(`./load-prism-language`);

const handleDirectives = require(`./directives`);

const unsupportedLanguages = new Set();

module.exports = (language, code, lineNumbersHighlight = [], noInlineHighlight = false) => {
  // (Try to) load languages on demand.
  if (!Prism.languages[language]) {
    try {
      loadPrismLanguage(language);
    } catch (e) {
      // Language wasn't loaded so let's bail.
      let message = null;

      switch (language) {
        case `none`:
          return code;
        // Don't escape if set to none.

        case `text`:
          message = noInlineHighlight ? `code block language not specified in markdown.` : `code block or inline code language not specified in markdown.`;
          break;

        default:
          message = `unable to find prism language '${language}' for highlighting.`;
      }

      const lang = language.toLowerCase();

      if (!unsupportedLanguages.has(lang)) {
        console.warn(message, `applying generic code block`);
        unsupportedLanguages.add(lang);
      }

      return _.escape(code);
    }
  }

  const grammar = Prism.languages[language];
  const highlighted = Prism.highlight(code, grammar, language);
  const codeSplits = handleDirectives(highlighted, lineNumbersHighlight);
  let finalCode = ``;
  const lastIdx = codeSplits.length - 1; // Don't add back the new line character after highlighted lines
  // as they need to be display: block and full-width.

  codeSplits.forEach((split, idx) => {
    finalCode += split.highlight ? split.code : `${split.code}${idx == lastIdx ? `` : `\n`}`;
  });
  return finalCode;
};