'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reporter = require('./reporter');

var _reporter2 = _interopRequireDefault(_reporter);

var _evaluateObjectTypeIndexer = require('./evaluateObjectTypeIndexer');

var _evaluateObjectTypeIndexer2 = _interopRequireDefault(_evaluateObjectTypeIndexer);

var _evaluateObjectTypeProperty = require('./evaluateObjectTypeProperty');

var _evaluateObjectTypeProperty2 = _interopRequireDefault(_evaluateObjectTypeProperty);

var _evaluateTypeCastExpression = require('./evaluateTypeCastExpression');

var _evaluateTypeCastExpression2 = _interopRequireDefault(_evaluateTypeCastExpression);

var _evaluateTypical = require('./evaluateTypical');

var _evaluateTypical2 = _interopRequireDefault(_evaluateTypical);

var _evaluateFunctions = require('./evaluateFunctions');

var _evaluateFunctions2 = _interopRequireDefault(_evaluateFunctions);

var _evaluateVariables = require('./evaluateVariables');

var _evaluateVariables2 = _interopRequireDefault(_evaluateVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (direction, context, options) {
  var report = (0, _reporter2.default)(direction, context, options);

  return _extends({}, (0, _evaluateFunctions2.default)(context, report), {
    ClassProperty: (0, _evaluateTypical2.default)(context, report, 'class property'),
    ObjectTypeIndexer: (0, _evaluateObjectTypeIndexer2.default)(context, report),
    ObjectTypeProperty: (0, _evaluateObjectTypeProperty2.default)(context, report),
    TypeCastExpression: (0, _evaluateTypeCastExpression2.default)(context, report),
    VariableDeclaration: (0, _evaluateVariables2.default)(context, report)
  });
};

module.exports = exports['default'];