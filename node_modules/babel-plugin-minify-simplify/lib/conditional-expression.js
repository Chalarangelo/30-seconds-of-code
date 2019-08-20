"use strict";

var h = require("./helpers");
var PatternMatch = require("./pattern-match");

module.exports = function (t) {
  // small abstractions
  var not = function not(node) {
    return t.unaryExpression("!", node);
  };
  var notnot = function notnot(node) {
    return not(not(node));
  };
  var or = function or(a, b) {
    return t.logicalExpression("||", a, b);
  };
  var and = function and(a, b) {
    return t.logicalExpression("&&", a, b);
  };

  function simplifyPatterns(path) {
    var test = path.get("test");
    var consequent = path.get("consequent");
    var alternate = path.get("alternate");

    var _h$typeSymbols = h.typeSymbols(t),
        EX = _h$typeSymbols.Expression;

    // Convention:
    // ===============
    // for each pattern [test, consequent, alternate, handler(expr, cons, alt)]


    var matcher = new PatternMatch([[EX, true, false, function (e) {
      return notnot(e);
    }], [EX, false, true, function (e) {
      return not(e);
    }], [EX, true, EX, function (e, c, a) {
      return or(notnot(e), a);
    }], [EX, false, EX, function (e, c, a) {
      return and(not(e), a);
    }], [EX, EX, true, function (e, c) {
      return or(not(e), c);
    }], [EX, EX, false, function (e, c) {
      return and(notnot(e), c);
    }]]);

    var result = matcher.match([test, consequent, alternate], h.isPatternMatchesPath(t));

    if (result.match) {
      path.replaceWith(result.value(test.node, consequent.node, alternate.node));
    }
  }

  return {
    simplifyPatterns
  };
};