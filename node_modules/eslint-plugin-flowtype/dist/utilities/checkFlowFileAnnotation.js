'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _isFlowFile = require('./isFlowFile');

var _isFlowFile2 = _interopRequireDefault(_isFlowFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (cb, context) {
  var checkThisFile = !_lodash2.default.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || (0, _isFlowFile2.default)(context);

  if (!checkThisFile) {
    return function () {};
  }

  return cb(context);
};

module.exports = exports['default'];