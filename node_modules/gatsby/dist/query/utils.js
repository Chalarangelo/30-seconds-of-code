"use strict";

exports.__esModule = true;
exports.formatErrorDetails = exports.indentString = void 0;

const indentString = string => string.replace(/\n/g, `\n  `);

exports.indentString = indentString;

const formatErrorDetails = errorDetails => Array.from(errorDetails.entries()).map(([name, details]) => `${name}:
  ${indentString(details.toString())}`).join(`\n`);

exports.formatErrorDetails = formatErrorDetails;
//# sourceMappingURL=utils.js.map