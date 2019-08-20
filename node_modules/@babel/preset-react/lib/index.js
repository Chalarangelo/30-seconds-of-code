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

function _pluginTransformReactJsx() {
  const data = _interopRequireDefault(require("@babel/plugin-transform-react-jsx"));

  _pluginTransformReactJsx = function () {
    return data;
  };

  return data;
}

function _pluginTransformReactDisplayName() {
  const data = _interopRequireDefault(require("@babel/plugin-transform-react-display-name"));

  _pluginTransformReactDisplayName = function () {
    return data;
  };

  return data;
}

function _pluginTransformReactJsxSource() {
  const data = _interopRequireDefault(require("@babel/plugin-transform-react-jsx-source"));

  _pluginTransformReactJsxSource = function () {
    return data;
  };

  return data;
}

function _pluginTransformReactJsxSelf() {
  const data = _interopRequireDefault(require("@babel/plugin-transform-react-jsx-self"));

  _pluginTransformReactJsxSelf = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)((api, opts) => {
  api.assertVersion(7);
  const pragma = opts.pragma || "React.createElement";
  const pragmaFrag = opts.pragmaFrag || "React.Fragment";
  const throwIfNamespace = opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace;
  const development = !!opts.development;
  const useBuiltIns = !!opts.useBuiltIns;

  if (typeof development !== "boolean") {
    throw new Error("@babel/preset-react 'development' option must be a boolean.");
  }

  return {
    plugins: [[_pluginTransformReactJsx().default, {
      pragma,
      pragmaFrag,
      throwIfNamespace,
      useBuiltIns
    }], _pluginTransformReactDisplayName().default, development && _pluginTransformReactJsxSource().default, development && _pluginTransformReactJsxSelf().default].filter(Boolean)
  };
});

exports.default = _default;