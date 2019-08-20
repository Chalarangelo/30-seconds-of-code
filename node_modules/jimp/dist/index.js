"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _custom = _interopRequireDefault(require("@jimp/custom"));

var _types = _interopRequireDefault(require("@jimp/types"));

var _plugins = _interopRequireDefault(require("@jimp/plugins"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _custom.default)({
  types: [_types.default],
  plugins: [_plugins.default]
});

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map