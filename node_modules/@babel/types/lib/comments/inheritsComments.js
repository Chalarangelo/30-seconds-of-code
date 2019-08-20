"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inheritsComments;

var _inheritTrailingComments = _interopRequireDefault(require("./inheritTrailingComments"));

var _inheritLeadingComments = _interopRequireDefault(require("./inheritLeadingComments"));

var _inheritInnerComments = _interopRequireDefault(require("./inheritInnerComments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inheritsComments(child, parent) {
  (0, _inheritTrailingComments.default)(child, parent);
  (0, _inheritLeadingComments.default)(child, parent);
  (0, _inheritInnerComments.default)(child, parent);
  return child;
}