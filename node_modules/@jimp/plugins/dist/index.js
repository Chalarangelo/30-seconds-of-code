"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

var _timm = require("timm");

var _pluginDither = _interopRequireDefault(require("@jimp/plugin-dither"));

var _pluginResize = _interopRequireDefault(require("@jimp/plugin-resize"));

var _pluginBlit = _interopRequireDefault(require("@jimp/plugin-blit"));

var _pluginRotate = _interopRequireDefault(require("@jimp/plugin-rotate"));

var _pluginColor = _interopRequireDefault(require("@jimp/plugin-color"));

var _pluginPrint = _interopRequireDefault(require("@jimp/plugin-print"));

var _pluginBlur = _interopRequireDefault(require("@jimp/plugin-blur"));

var _pluginCrop = _interopRequireDefault(require("@jimp/plugin-crop"));

var _pluginNormalize = _interopRequireDefault(require("@jimp/plugin-normalize"));

var _pluginInvert = _interopRequireDefault(require("@jimp/plugin-invert"));

var _pluginGaussian = _interopRequireDefault(require("@jimp/plugin-gaussian"));

var _pluginFlip = _interopRequireDefault(require("@jimp/plugin-flip"));

var _pluginMask = _interopRequireDefault(require("@jimp/plugin-mask"));

var _pluginScale = _interopRequireDefault(require("@jimp/plugin-scale"));

var _pluginDisplace = _interopRequireDefault(require("@jimp/plugin-displace"));

var _pluginContain = _interopRequireDefault(require("@jimp/plugin-contain"));

var _pluginCover = _interopRequireDefault(require("@jimp/plugin-cover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var plugins = [_pluginDither.default, _pluginResize.default, _pluginBlit.default, _pluginRotate.default, _pluginColor.default, _pluginPrint.default, _pluginBlur.default, _pluginCrop.default, _pluginNormalize.default, _pluginInvert.default, _pluginGaussian.default, _pluginFlip.default, _pluginMask.default, _pluginScale.default, _pluginDisplace.default, _pluginContain.default, _pluginCover.default];

var _default = function _default(jimpEvChange) {
  var initializedPlugins = plugins.map(function (pluginModule) {
    var plugin = pluginModule(jimpEvChange) || {};

    if (!plugin.class && !plugin.constants) {
      // Default to class function
      plugin = {
        class: plugin
      };
    }

    return plugin;
  });
  return _timm.mergeDeep.apply(void 0, _toConsumableArray(initializedPlugins));
};

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map