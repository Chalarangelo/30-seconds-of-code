"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pageRenderer = _interopRequireDefault(require("./page-renderer"));

const ProdPageRenderer = ({
  location,
  pageResources
}) => {
  if (!pageResources) {
    return null;
  }

  return _react.default.createElement(_pageRenderer.default, Object.assign({
    location,
    pageResources
  }, pageResources.json));
};

ProdPageRenderer.propTypes = {
  location: _propTypes.default.shape({
    pathname: _propTypes.default.string.isRequired
  }).isRequired
};
var _default = ProdPageRenderer;
exports.default = _default;