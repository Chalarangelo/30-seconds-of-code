"use strict";

const toLowerCase = Function.call.bind("".toLowerCase);

module.exports = function formatBuilderName(type) {
  // FunctionExpression -> functionExpression
  // JSXIdentifier -> jsxIdentifier
  return type.replace(/^([A-Z](?=[a-z])|[A-Z]+(?=[A-Z]))/, toLowerCase);
};
