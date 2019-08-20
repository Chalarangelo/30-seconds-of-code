"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var importPattern = /^:import\(("[^"]*"|'[^']*'|[\w-\.]+)\)$/;

var getDeclsObject = function getDeclsObject(rule) {
  var object = {};
  rule.walkDecls(function (decl) {
    object[decl.raws.before.trim() + decl.prop] = decl.value;
  });
  return object;
};

var extractICSS = function extractICSS(css) {
  var removeRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var icssImports = {};
  var icssExports = {};
  css.each(function (node) {
    if (node.type === "rule") {
      if (node.selector.slice(0, 7) === ":import") {
        var matches = importPattern.exec(node.selector);
        if (matches) {
          var path = matches[1];
          var aliases = Object.assign(icssImports[path] || {}, getDeclsObject(node));
          icssImports[path] = aliases;
          if (removeRules) {
            node.remove();
          }
        }
      }
      if (node.selector === ":export") {
        Object.assign(icssExports, getDeclsObject(node));
        if (removeRules) {
          node.remove();
        }
      }
    }
  });
  return { icssImports, icssExports };
};

exports.default = extractICSS;