"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _timm = require("timm");

var _jpeg = _interopRequireDefault(require("@jimp/jpeg"));

var _png = _interopRequireDefault(require("@jimp/png"));

var _bmp = _interopRequireDefault(require("@jimp/bmp"));

var _tiff = _interopRequireDefault(require("@jimp/tiff"));

var _gif = _interopRequireDefault(require("@jimp/gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return (0, _timm.mergeDeep)((0, _jpeg.default)(), (0, _png.default)(), (0, _bmp.default)(), (0, _tiff.default)(), (0, _gif.default)());
};

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map