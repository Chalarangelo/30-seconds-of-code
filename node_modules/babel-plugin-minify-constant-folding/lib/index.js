"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var evaluate = require("babel-helper-evaluate-path");

var _require = require("./replacements"),
    FALLBACK_HANDLER = _require.FALLBACK_HANDLER;

function getName(member) {
  if (member.computed) {
    switch (member.property.type) {
      case "StringLiteral":
      case "NumericLiteral":
        return member.property.value;
      case "TemplateLiteral":
        return;
    }
  } else {
    return member.property.name;
  }
}

function swap(path, member, handlers) {
  var key = getName(member.node);
  if (key === void 0) return false;

  var handler = void 0;
  if (hop(handlers, key) && typeof handlers[key] === "function") {
    handler = handlers[key];
  } else if (typeof handlers[FALLBACK_HANDLER] === "function") {
    handler = handlers[FALLBACK_HANDLER].bind(member.get("object"), key);
  } else {
    return false;
  }

  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var replacement = handler.apply(member.get("object"), args);
  if (replacement) {
    path.replaceWith(replacement);
    return true;
  }
  return false;
}

module.exports = function (babel) {
  var replacements = require("./replacements.js")(babel);
  var seen = Symbol("seen");
  var t = babel.types,
      traverse = babel.traverse;


  return {
    name: "minify-constant-folding",
    visitor: {
      // Evaluate string expressions that are next to each other
      // but are not actually a binary expression.
      // "a" + b + "c" + "d" -> "a" + b + "cd"
      BinaryExpression(path) {
        if (!path.isBinaryExpression({ operator: "+" })) {
          return;
        }
        var literal = void 0,
            bin = void 0;

        var left = path.get("left");
        var right = path.get("right");

        if (right.isStringLiteral()) {
          literal = right;
          if (left.isBinaryExpression({ operator: "+" })) {
            bin = left;
          } else {
            return;
          }
        } else if (left.isStringLiteral()) {
          literal = left;
          if (right.isBinaryExpression({ operator: "+" })) {
            bin = right;
          } else {
            return;
          }
        } else {
          return;
        }

        var relevant = getLeaf(bin, literal.key);

        if (!relevant) {
          return;
        }

        var value = literal.key === "right" ? relevant.node.value + literal.node.value : literal.node.value + relevant.node.value;

        relevant.replaceWith(t.stringLiteral(value));
        path.replaceWith(bin.node);

        function getLeaf(path, direction) {
          if (path.isStringLiteral()) {
            return path;
          } else if (path.isBinaryExpression({ operator: "+" })) {
            return getLeaf(path.get(direction), direction);
          }
        }
      },

      // TODO: look into evaluating binding too (could result in more code, but gzip?)
      Expression(path, _ref) {
        var _ref$opts = _ref.opts;
        _ref$opts = _ref$opts === undefined ? {} : _ref$opts;
        var _ref$opts$tdz = _ref$opts.tdz,
            tdz = _ref$opts$tdz === undefined ? false : _ref$opts$tdz;
        var node = path.node;


        if (node[seen]) {
          return;
        }

        if (path.isLiteral()) {
          return;
        }

        if (!path.isPure()) {
          return;
        }

        if (traverse.hasType(node, path.scope, "Identifier", t.FUNCTION_TYPES)) {
          return;
        }

        // -0 maybe compared via dividing and then checking against -Infinity
        // Also -X will always be -X.
        if (t.isUnaryExpression(node, { operator: "-" }) && t.isNumericLiteral(node.argument)) {
          return;
        }

        // We have a transform that converts true/false to !0/!1
        if (t.isUnaryExpression(node, { operator: "!" }) && t.isNumericLiteral(node.argument)) {
          if (node.argument.value === 0 || node.argument.value === 1) {
            return;
          }
        }

        // void 0 is used for undefined.
        if (t.isUnaryExpression(node, { operator: "void" }) && t.isNumericLiteral(node.argument, { value: 0 })) {
          return;
        }

        var res = evaluate(path, { tdz });
        if (res.confident) {
          // Avoid fractions because they can be longer than the original expression.
          // There is also issues with number percision?
          if (typeof res.value === "number" && !Number.isInteger(res.value)) {
            return;
          }

          // Preserve -0
          if (typeof res.value === "number" && res.value === 0) {
            if (1 / res.value === -Infinity) {
              var _node2 = t.unaryExpression("-", t.numericLiteral(0), true);
              _node2[seen] = true;
              path.replaceWith(_node2);
              return;
            }
          }

          // this will convert object to object but
          // t.valueToNode has other effects where property name
          // is not treated for the respective environment.
          // So we bail here for objects and let other plugins
          // take care of converting String literal to Identifier
          if (typeof res.value === "object") {
            return;
          }

          var _node = t.valueToNode(res.value);
          _node[seen] = true;
          path.replaceWith(_node);
        }
      },
      CallExpression(path) {
        var node = path.node;

        var member = path.get("callee");
        if (t.isMemberExpression(member)) {
          var helpers = replacements[member.node.object.type];
          if (!helpers || !helpers.calls) return;
          // find if the input can be constant folded
          if (typeof helpers.canReplace === "function" && !helpers.canReplace.call(member.get("object"))) {
            return;
          }
          swap.apply(undefined, [path, member, helpers.calls].concat(_toConsumableArray(node.arguments)));
        }
      },
      MemberExpression(path) {
        var node = path.node;

        var helpers = replacements[node.object.type];
        if (!helpers || !helpers.members) return;
        swap(path, path, helpers.members);
      }
    }
  };
};

function hop(o, key) {
  return Object.prototype.hasOwnProperty.call(o, key);
}