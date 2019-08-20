'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFlowFileAnnotation = require('./isFlowFileAnnotation');

var _isFlowFileAnnotation2 = _interopRequireDefault(_isFlowFileAnnotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable flowtype/require-valid-file-annotation */
/**
 * Checks whether a file has an @flow or @noflow annotation.
 * @param context
 * @param [strict] - By default, the function returns true if the file starts with @flow but not if it
 * starts by @noflow. When the strict flag is set to false, the function returns true if the flag has @noflow also.
 */
/* eslint-enable flowtype/require-valid-file-annotation */
exports.default = function (context) {
  var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var comments = context.getAllComments();

  if (!comments.length) {
    return false;
  }

  return comments.some(function (comment) {
    return (0, _isFlowFileAnnotation2.default)(comment.value) && !(strict && /no/.test(comment.value));
  });
};

module.exports = exports['default'];