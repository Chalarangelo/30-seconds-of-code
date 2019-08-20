"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shrinkPaddedLEB128 = shrinkPaddedLEB128;

var _wasmParser = require("@webassemblyjs/wasm-parser");

var _leb = require("./leb128.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OptimizerError =
/*#__PURE__*/
function (_Error) {
  _inherits(OptimizerError, _Error);

  function OptimizerError(name, initalError) {
    var _this;

    _classCallCheck(this, OptimizerError);

    _this = _possibleConstructorReturn(this, (OptimizerError.__proto__ || Object.getPrototypeOf(OptimizerError)).call(this, "Error while optimizing: " + name + ": " + initalError.message));
    _this.stack = initalError.stack;
    return _this;
  }

  return OptimizerError;
}(Error);

var decoderOpts = {
  ignoreCodeSection: true,
  ignoreDataSection: true
};

function shrinkPaddedLEB128(uint8Buffer) {
  try {
    var ast = (0, _wasmParser.decode)(uint8Buffer.buffer, decoderOpts);
    return (0, _leb.shrinkPaddedLEB128)(ast, uint8Buffer);
  } catch (e) {
    throw new OptimizerError("shrinkPaddedLEB128", e);
  }
}