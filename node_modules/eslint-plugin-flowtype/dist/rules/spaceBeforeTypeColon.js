'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeColonSpacing = require('./typeColonSpacing');

var _typeColonSpacing2 = _interopRequireDefault(_typeColonSpacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  return (0, _typeColonSpacing2.default)('before', context, {
    always: context.options[0] === 'always'
  });
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];