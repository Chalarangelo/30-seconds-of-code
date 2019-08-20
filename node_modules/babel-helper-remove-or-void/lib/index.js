"use strict";

module.exports = function (t) {
  // If we can't remove the expression we'll just replace it with an empty statement.
  function removeOrVoid(path) {
    // If we are working with the expression of an expression statement we want to deal
    // with the expression statement instead.
    if (path.parentPath.isExpressionStatement({ expression: path.node })) {
      path = path.parentPath;
    }

    // If we are working with a variable declarator and there is only one then
    // we need to look at the parent.
    if (path.isVariableDeclarator() && path.parent.declarations[0] === path.node && path.parent.declarations.length === 1) {
      path = path.parentPath;
    }

    if (!path.inList && path.scope.path.type !== "ForStatement") {
      path.replaceWith(t.emptyStatement());
    } else {
      path.remove();
    }
  }

  return removeOrVoid;
};