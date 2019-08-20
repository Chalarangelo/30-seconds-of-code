"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = scrollTo;

var _offset = _interopRequireDefault(require("../query/offset"));

var _height = _interopRequireDefault(require("../query/height"));

var _scrollParent = _interopRequireDefault(require("../query/scrollParent"));

var _scrollTop = _interopRequireDefault(require("../query/scrollTop"));

var _requestAnimationFrame = _interopRequireDefault(require("./requestAnimationFrame"));

var _isWindow = _interopRequireDefault(require("../query/isWindow"));

function scrollTo(selected, scrollParent) {
  var offset = (0, _offset.default)(selected);
  var poff = {
    top: 0,
    left: 0
  };
  var list, listScrollTop, selectedTop, isWin;
  var selectedHeight, listHeight, bottom;
  if (!selected) return;
  list = scrollParent || (0, _scrollParent.default)(selected);
  isWin = (0, _isWindow.default)(list);
  listScrollTop = (0, _scrollTop.default)(list);
  listHeight = (0, _height.default)(list, true);
  isWin = (0, _isWindow.default)(list);
  if (!isWin) poff = (0, _offset.default)(list);
  offset = {
    top: offset.top - poff.top,
    left: offset.left - poff.left,
    height: offset.height,
    width: offset.width
  };
  selectedHeight = offset.height;
  selectedTop = offset.top + (isWin ? 0 : listScrollTop);
  bottom = selectedTop + selectedHeight;
  listScrollTop = listScrollTop > selectedTop ? selectedTop : bottom > listScrollTop + listHeight ? bottom - listHeight : listScrollTop;
  var id = (0, _requestAnimationFrame.default)(function () {
    return (0, _scrollTop.default)(list, listScrollTop);
  });
  return function () {
    return _requestAnimationFrame.default.cancel(id);
  };
}

module.exports = exports["default"];