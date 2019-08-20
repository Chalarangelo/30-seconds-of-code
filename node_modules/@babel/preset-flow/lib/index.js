"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _pluginTransformFlowStripTypes() {
  const data = _interopRequireDefault(require("@babel/plugin-transform-flow-strip-types"));

  _pluginTransformFlowStripTypes = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)((api, {
  all
}) => {
  api.assertVersion(7);
  return {
    plugins: [[_pluginTransformFlowStripTypes().default, {
      all
    }]]
  };
});

exports.default = _default;