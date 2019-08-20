'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FLOW_MATCHER = /^@(?:no)?flow$/;

exports.default = function (comment) {
  // eslint-disable-next-line flowtype/require-valid-file-annotation
  // The flow parser splits comments with the following regex to look for the @flow flag.
  // See https://github.com/facebook/flow/blob/a96249b93541f2f7bfebd8d62085bf7a75de02f2/src/parsing/docblock.ml#L39
  return _lodash2.default.some(comment.split(/[ \t\r\n\\*/]+/), function (commentPart) {
    return FLOW_MATCHER.test(commentPart);
  });
};

module.exports = exports['default'];