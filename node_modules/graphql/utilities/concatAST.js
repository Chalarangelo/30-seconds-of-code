"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatAST = concatAST;

var _flatMap = _interopRequireDefault(require("../polyfills/flatMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provided a collection of ASTs, presumably each from different files,
 * concatenate the ASTs together into batched AST, useful for validating many
 * GraphQL source files which together represent one conceptual application.
 */
function concatAST(asts) {
  return {
    kind: 'Document',
    definitions: (0, _flatMap.default)(asts, function (ast) {
      return ast.definitions;
    })
  };
}
