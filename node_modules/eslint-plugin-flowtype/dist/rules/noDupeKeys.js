'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash/');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [];

var create = function create(context) {
  var report = function report(node) {
    context.report({
      loc: node.loc,
      message: 'Duplicate property.',
      node
    });
  };

  var analizeElement = function analizeElement(element) {
    var type = element.type;

    var value = void 0;

    switch (type) {
      case 'GenericTypeAnnotation':
        value = element.id.name;
        break;
      case 'ObjectTypeAnnotation':
        // eslint-disable-next-line no-use-before-define
        value = builObjectStructure(element.properties);
        break;
      case 'TupleTypeAnnotation':
        // eslint-disable-next-line no-use-before-define
        value = buildArrayStructure(element.types);
        break;
      default:
        value = element.value;
        break;
    }

    return {
      type,
      value
    };
  };

  var buildArrayStructure = function buildArrayStructure(elements) {
    return _lodash2.default.map(elements, function (element) {
      return analizeElement(element);
    });
  };

  var builObjectStructure = function builObjectStructure(properties) {
    return _lodash2.default.map(properties, function (property) {
      var element = analizeElement(property.value);

      return Object.assign(element, {
        name: (0, _utilities.getParameterName)(property, context)
      });
    });
  };

  var checkForDuplicates = function checkForDuplicates(node) {
    var haystack = [];

    // filter out complex object types, like ObjectTypeSpreadProperty
    var identifierNodes = _lodash2.default.filter(node.properties, { type: 'ObjectTypeProperty' });

    _lodash2.default.forEach(identifierNodes, function (identifierNode) {
      var needle = { name: (0, _utilities.getParameterName)(identifierNode, context) };

      if (identifierNode.value.type === 'FunctionTypeAnnotation') {
        needle.args = _lodash2.default.map(identifierNode.value.params, function (param) {
          return analizeElement(param.typeAnnotation);
        });
      }

      var match = _lodash2.default.some(haystack, function (existingNeedle) {
        return _lodash2.default.isEqual(existingNeedle, needle);
      });

      if (match) {
        report(identifierNode);
      } else {
        haystack.push(needle);
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkForDuplicates
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];