'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../../utilities');

var _evaluateTypical = require('./evaluateTypical');

var _evaluateTypical2 = _interopRequireDefault(_evaluateTypical);

var _evaluateReturnType = require('./evaluateReturnType');

var _evaluateReturnType2 = _interopRequireDefault(_evaluateReturnType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utilities.iterateFunctionNodes)(function (context, report) {
  var checkParam = (0, _evaluateTypical2.default)(context, report, 'parameter');
  var checkReturnType = (0, _evaluateReturnType2.default)(context, report);

  return function (functionNode) {
    _lodash2.default.forEach(functionNode.params, checkParam);
    checkReturnType(functionNode);
  };
});
module.exports = exports['default'];