"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postcssSelectorParser = _interopRequireDefault(require("postcss-selector-parser"));

var _postcssValueParser = _interopRequireDefault(require("postcss-value-parser"));

var _parser = require("../parser");

var _reducer = _interopRequireDefault(require("./reducer"));

var _stringifier = _interopRequireDefault(require("./stringifier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-unresolved
var MATCH_CALC = /((?:-(moz|webkit)-)?calc)/i;

function transformValue(value, options, result, item) {
  return (0, _postcssValueParser.default)(value).walk(function (node) {
    // skip anything which isn't a calc() function
    if (node.type !== 'function' || !MATCH_CALC.test(node.value)) return node; // stringify calc expression and produce an AST

    var contents = _postcssValueParser.default.stringify(node.nodes);

    var ast = _parser.parser.parse(contents); // reduce AST to its simplest form, that is, either to a single value
    // or a simplified calc expression


    var reducedAst = (0, _reducer.default)(ast, options.precision, item); // stringify AST and write it back

    node.type = 'word';
    node.value = (0, _stringifier.default)(node.value, reducedAst, value, options, result, item);
  }, true).toString();
}

function transformSelector(value, options, result, item) {
  return (0, _postcssSelectorParser.default)(function (selectors) {
    selectors.walk(function (node) {
      // attribute value
      // e.g. the "calc(3*3)" part of "div[data-size="calc(3*3)"]"
      if (node.type === 'attribute' && node.value) {
        node.setValue(transformValue(node.value, options, result, item));
      } // tag value
      // e.g. the "calc(3*3)" part of "div:nth-child(2n + calc(3*3))"


      if (node.type === 'tag') node.value = transformValue(node.value, options, result, item);
      return;
    });
  }).processSync(value);
}

var _default = function _default(node, property, options, result) {
  var value = property === "selector" ? transformSelector(node[property], options, result, node) : transformValue(node[property], options, result, node); // if the preserve option is enabled and the value has changed, write the
  // transformed value into a cloned node which is inserted before the current
  // node, preserving the original value. Otherwise, overwrite the original
  // value.

  if (options.preserve && node[property] !== value) {
    var clone = node.clone();
    clone[property] = value;
    node.parent.insertBefore(node, clone);
  } else node[property] = value;
};

exports.default = _default;
module.exports = exports.default;