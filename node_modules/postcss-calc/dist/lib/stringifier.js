"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var order = {
  "*": 0,
  "/": 0,
  "+": 1,
  "-": 1
};

function round(value, prec) {
  if (prec !== false) {
    var precision = Math.pow(10, prec);
    return Math.round(value * precision) / precision;
  }

  return value;
}

function stringify(node, prec) {
  switch (node.type) {
    case "MathExpression":
      {
        var left = node.left,
            right = node.right,
            op = node.operator;
        var str = "";
        if (left.type === 'MathExpression' && order[op] < order[left.operator]) str += `(${stringify(left, prec)})`;else str += stringify(left, prec);
        str += order[op] ? ` ${node.operator} ` : node.operator;
        if (right.type === 'MathExpression' && order[op] < order[right.operator]) str += `(${stringify(right, prec)})`;else str += stringify(right, prec);
        return str;
      }

    case "Value":
      return round(node.value, prec);

    case 'Function':
      return node.value;

    default:
      return round(node.value, prec) + node.unit;
  }
}

function _default(calc, node, originalValue, options, result, item) {
  var str = stringify(node, options.precision);

  if (node.type === "MathExpression") {
    // if calc expression couldn't be resolved to a single value, re-wrap it as
    // a calc()
    str = `${calc}(${str})`; // if the warnWhenCannotResolve option is on, inform the user that the calc
    // expression could not be resolved to a single value

    if (options.warnWhenCannotResolve) {
      result.warn("Could not reduce expression: " + originalValue, {
        plugin: 'postcss-calc',
        node: item
      });
    }
  }

  return str;
}

module.exports = exports.default;