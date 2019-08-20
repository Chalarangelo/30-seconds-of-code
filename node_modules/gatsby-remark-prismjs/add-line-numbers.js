"use strict";

module.exports = (code = []) => {
  // Generate as many `<span></span>` as there are code lines
  const generateSpans = numberOfLines => {
    let spans = ``;

    for (let i = 0; i < numberOfLines; i++) {
      spans += `<span></span>`;
    }

    return spans;
  };

  const numberOfLines = code.length === 0 ? 0 : code.split(`\n`).length; // Generate the container for the line numbers.
  // Relevant code in the Prism Line Numbers plugin can be found here:
  // https://github.com/PrismJS/prism/blob/f356dfe71bf126e6dc060c03f3e042de28a9bec4/plugins/line-numbers/prism-line-numbers.js#L99-L115

  const lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows" style="white-space: normal; width: auto; left: 0;">` + `${generateSpans(numberOfLines)}` + `</span>`;
  return lineNumbersWrapper;
};