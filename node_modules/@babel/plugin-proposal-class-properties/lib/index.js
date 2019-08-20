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

function _helperCreateClassFeaturesPlugin() {
  const data = require("@babel/helper-create-class-features-plugin");

  _helperCreateClassFeaturesPlugin = function () {
    return data;
  };

  return data;
}

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  return (0, _helperCreateClassFeaturesPlugin().createClassFeaturePlugin)({
    name: "proposal-class-properties",
    feature: _helperCreateClassFeaturesPlugin().FEATURES.fields,
    loose: options.loose,

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("classProperties", "classPrivateProperties");
    }

  });
});

exports.default = _default;