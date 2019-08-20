'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _borders = require('./borders');

var _borders2 = _interopRequireDefault(_borders);

var _columns = require('./columns');

var _columns2 = _interopRequireDefault(_columns);

var _margin = require('./margin');

var _margin2 = _interopRequireDefault(_margin);

var _padding = require('./padding');

var _padding2 = _interopRequireDefault(_padding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_borders2.default, _columns2.default, _margin2.default, _padding2.default];
module.exports = exports['default'];