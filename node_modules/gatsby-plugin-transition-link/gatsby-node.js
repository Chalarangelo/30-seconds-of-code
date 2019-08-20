"use strict";

var path = require("path");

var didRunAlready = false;
var absoluteComponentPath;

exports.onPreInit = function (_ref, _ref2) {
  var store = _ref.store;
  var component = _ref2.layout;

  if (!component) {
    component = false;
  }

  if (didRunAlready) {
    throw new Error("You can only have single instance of gatsby-plugin-transition-link in your gatsby-config.js");
  }

  didRunAlready = true;
  absoluteComponentPath = component;
};

exports.onCreateWebpackConfig = function (_ref3) {
  var actions = _ref3.actions,
      plugins = _ref3.plugins;
  actions.setWebpackConfig({
    plugins: [plugins.define({
      GATSBY_LAYOUT_COMPONENT_PATH: JSON.stringify(absoluteComponentPath)
    })]
  });
};