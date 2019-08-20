"use strict";

const rangeParser = require(`parse-numeric-range`);

module.exports = language => {
  if (!language) {
    return ``;
  }

  if (language.split(`{`).length > 1) {
    let [splitLanguage, ...options] = language.split(`{`);
    let highlightLines = [],
        outputLines = [],
        showLineNumbersLocal = false,
        numberLinesStartAt,
        promptUserLocal,
        promptHostLocal; // Options can be given in any order and are optional

    options.forEach(option => {
      option = option.slice(0, -1);
      let splitOption = option.replace(/ /g, ``).split(`:`); // Test if the option is for line hightlighting

      if (splitOption.length === 1 && rangeParser.parse(option).length > 0) {
        highlightLines = rangeParser.parse(option).filter(n => n > 0);
      } // Test if the option is for line numbering
      // Option must look like `numberLines: true` or `numberLines: <integer>`
      // Otherwise we disable line numbering


      if (splitOption.length === 2 && splitOption[0] === `numberLines` && (splitOption[1].trim() === `true` || Number.isInteger(parseInt(splitOption[1].trim(), 10)))) {
        showLineNumbersLocal = true;
        numberLinesStartAt = splitOption[1].trim() === `true` ? 1 : parseInt(splitOption[1].trim(), 10);
      }

      if (splitOption.length === 2 && splitOption[0] === `promptHost`) {
        promptHostLocal = splitOption[1];
      }

      if (splitOption.length === 2 && splitOption[0] === `promptUser`) {
        promptUserLocal = splitOption[1];
      }

      if (splitOption.length === 2 && splitOption[0] === `outputLines`) {
        outputLines = rangeParser.parse(splitOption[1].trim()).filter(n => n > 0);
      }
    });
    return {
      splitLanguage,
      highlightLines,
      showLineNumbersLocal,
      numberLinesStartAt,
      outputLines,
      promptUserLocal,
      promptHostLocal
    };
  }

  return {
    splitLanguage: language
  };
};