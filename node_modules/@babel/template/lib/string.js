"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stringTemplate;

var _options = require("./options");

var _parse = _interopRequireDefault(require("./parse"));

var _populate = _interopRequireDefault(require("./populate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringTemplate(formatter, code, opts) {
  code = formatter.code(code);
  let metadata;
  return arg => {
    const replacements = (0, _options.normalizeReplacements)(arg);
    if (!metadata) metadata = (0, _parse.default)(formatter, code, opts);
    return formatter.unwrap((0, _populate.default)(metadata, replacements));
  };
}