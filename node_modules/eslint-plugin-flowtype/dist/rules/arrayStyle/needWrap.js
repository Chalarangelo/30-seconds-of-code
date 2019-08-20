'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isSimpleType = require('./isSimpleType');

var _isSimpleType2 = _interopRequireDefault(_isSimpleType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var complexTypesWithoutWrap = ['TupleTypeAnnotation', 'ObjectTypeAnnotation'];

exports.default = function (node) {
  return !(0, _isSimpleType2.default)(node) && complexTypesWithoutWrap.indexOf(node.type) === -1;
};

module.exports = exports['default'];