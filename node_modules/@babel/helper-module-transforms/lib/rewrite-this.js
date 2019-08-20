"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rewriteThis;

function rewriteThis(programPath) {
  programPath.traverse(rewriteThisVisitor);
}

const rewriteThisVisitor = {
  ThisExpression(path) {
    path.replaceWith(path.scope.buildUndefinedNode());
  },

  Function(path) {
    if (!path.isArrowFunctionExpression()) path.skip();
  },

  ClassProperty(path) {
    path.skip();
  },

  ClassPrivateProperty(path) {
    path.skip();
  }

};