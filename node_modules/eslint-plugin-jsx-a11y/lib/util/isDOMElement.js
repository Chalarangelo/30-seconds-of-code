"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _arrayIncludes = _interopRequireDefault(require("array-includes"));

var domElements = (0, _toConsumableArray2["default"])(_ariaQuery.dom.keys());
/**
 * Returns boolean indicating whether the given element is a DOM element.
 */

var isDOMElement = function isDOMElement(tagName) {
  return (0, _arrayIncludes["default"])(domElements, tagName);
};

var _default = isDOMElement;
exports["default"] = _default;