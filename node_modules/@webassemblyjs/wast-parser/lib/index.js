"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  parse: true
};
exports.parse = parse;

var parser = _interopRequireWildcard(require("./grammar"));

var _tokenizer = require("./tokenizer");

var _numberLiterals = require("./number-literals");

Object.keys(_numberLiterals).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _numberLiterals[key];
    }
  });
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function parse(source) {
  var tokens = (0, _tokenizer.tokenize)(source); // We pass the source here to show code frames

  var ast = parser.parse(tokens, source);
  return ast;
}