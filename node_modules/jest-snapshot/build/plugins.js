'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getSerializers = exports.addSerializer = void 0;

var _prettyFormat = _interopRequireDefault(require('pretty-format'));

var _mock_serializer = _interopRequireDefault(require('./mock_serializer'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const _prettyFormat$plugins = _prettyFormat.default.plugins,
  DOMCollection = _prettyFormat$plugins.DOMCollection,
  DOMElement = _prettyFormat$plugins.DOMElement,
  Immutable = _prettyFormat$plugins.Immutable,
  ReactElement = _prettyFormat$plugins.ReactElement,
  ReactTestComponent = _prettyFormat$plugins.ReactTestComponent,
  AsymmetricMatcher = _prettyFormat$plugins.AsymmetricMatcher;
let PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  _mock_serializer.default,
  AsymmetricMatcher
]; // Prepend to list so the last added is the first tested.

const addSerializer = plugin => {
  PLUGINS = [plugin].concat(PLUGINS);
};

exports.addSerializer = addSerializer;

const getSerializers = () => PLUGINS;

exports.getSerializers = getSerializers;
