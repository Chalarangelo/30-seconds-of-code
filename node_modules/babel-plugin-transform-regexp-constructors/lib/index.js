"use strict";

function createRegExpLiteral(args, prettify, t) {
  var evaluatedArgs = args.map(function (a) {
    return a.evaluate();
  });
  if (!evaluatedArgs.every(function (a) {
    return a.confident && typeof a.value === "string";
  })) {
    return;
  }
  var pattern = evaluatedArgs.length >= 1 && evaluatedArgs[0].value !== "" ? evaluatedArgs[0].value : "(?:)";
  var flags = evaluatedArgs.length >= 2 ? evaluatedArgs[1].value : "";

  pattern = new RegExp(pattern).source;
  if (prettify) {
    pattern = pattern.replace(/\n/g, "\\n").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/[\b]/g, "[\\b]").replace(/\v/g, "\\v").replace(/\f/g, "\\f").replace(/\r/g, "\\r");
  }

  pattern = pattern.replace(/\0/g, "\\0");

  return t.regExpLiteral(pattern, flags);
}

function maybeReplaceWithRegExpLiteral(path, t) {
  if (!t.isIdentifier(path.node.callee, { name: "RegExp" })) {
    return;
  }
  var regExpLiteral = createRegExpLiteral(path.get("arguments"), true, t);
  if (regExpLiteral) {
    path.replaceWith(regExpLiteral);
  }
}

module.exports = function (_ref) {
  var t = _ref.types;

  return {
    name: "transform-regexp-constructors",
    visitor: {
      NewExpression(path) {
        maybeReplaceWithRegExpLiteral(path, t);
      },
      CallExpression(path) {
        // equivalent to `new RegExp()` according to §21.2.3
        maybeReplaceWithRegExpLiteral(path, t);
      }
    }
  };
};