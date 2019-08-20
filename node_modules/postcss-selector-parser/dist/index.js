'use strict';

exports.__esModule = true;

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = function parser(processor) {
  return new _processor2.default(processor);
};

Object.assign(parser, selectors);

delete parser.__esModule;

exports.default = parser;
module.exports = exports['default'];