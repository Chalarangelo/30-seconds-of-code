'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  caseSensitive: true,
  natural: false
};

var schema = [{
  enum: ['asc', 'desc'],
  type: 'string'
}, {
  additionalProperties: false,
  properties: {
    caseSensitive: {
      type: 'boolean'
    },
    natural: {
      type: 'boolean'
    }
  },
  type: 'object'
}];

/**
 * Functions to compare the order of two strings
 *
 * Based on a similar function from eslint's sort-keys rule.
 * https://github.com/eslint/eslint/blob/master/lib/rules/sort-keys.js
 *
 * @private
 */
var isValidOrders = {
  asc(str1, str2) {
    return str1 <= str2;
  },
  ascI(str1, str2) {
    return str1.toLowerCase() <= str2.toLowerCase();
  },
  ascIN(str1, str2) {
    return isValidOrders.naturalCompare(str1.toLowerCase(), str2.toLowerCase()) <= 0;
  },
  ascN(str1, str2) {
    return isValidOrders.naturalCompare(str1, str2) <= 0;
  },
  desc(str1, str2) {
    return isValidOrders.asc(str2, str1);
  },
  descI(str1, str2) {
    return isValidOrders.ascI(str2, str1);
  },
  descIN(str1, str2) {
    return isValidOrders.ascIN(str2, str1);
  },
  descN(str1, str2) {
    return isValidOrders.ascN(str2, str1);
  },
  naturalCompare(str1, str2) {
    return str1.localeCompare(str2, 'en-US', { numeric: true });
  }
};

var variances = {
  minus: '-',
  plus: '+'
};

var getVariance = function getVariance(node) {
  if (_lodash2.default.isString(node.variance)) {
    return variances[node.variance] || '';
  } else if (_lodash2.default.get(node, 'variance.type') === 'Variance') {
    return variances[node.variance.kind] || '';
  } else {
    return '';
  }
};

var generateOrderedList = function generateOrderedList(context, sort, properties) {
  return properties.map(function (property) {
    var name = (0, _utilities.getParameterName)(property, context);
    var value = void 0;

    if (property.type === 'ObjectTypeSpreadProperty') {
      return ['...' + property.argument.id.name];
    } else if (property.value.type === 'ObjectTypeAnnotation') {
      // eslint-disable-next-line no-use-before-define
      value = generateFix(property.value, context, sort);
    } else {
      value = context.getSourceCode().getText(property.value);
    }

    return [name, getVariance(property) + name + (property.optional ? '?' : ''), value];
  }).sort(function (first, second) {
    return sort(first[0], second[0]) ? -1 : 1;
  }).map(function (item) {
    if (item.length === 1) {
      return item[0];
    }

    return item[1] + ': ' + item[2];
  });
};

var generateFix = function generateFix(node, context, sort) {
  // this could be done much more cleanly in ESLint >=4
  // as we can apply multiple fixes. That also means we can
  // maintain code style in a much nicer way
  var nodeText = void 0;
  var newTypes = generateOrderedList(context, sort, node.properties);
  var source = context.getSourceCode(node);

  var originalSubstring = source.getText(node);

  nodeText = originalSubstring;

  node.properties.forEach(function (property, index) {
    var subString = source.getText(property);
    var addComma = subString[subString.length - 1] === ',';

    nodeText = nodeText.replace(subString, '$' + index + (addComma ? ',' : ''));
  });

  newTypes.forEach(function (item, index) {
    nodeText = nodeText.replace('$' + index, item);
  });

  return nodeText;
};

var create = function create(context) {
  var order = _lodash2.default.get(context, ['options', 0], 'asc');

  var _$get = _lodash2.default.get(context, ['options', 1], defaults),
      natural = _$get.natural,
      caseSensitive = _$get.caseSensitive;

  var insensitive = caseSensitive === false;

  var prev = void 0;
  var checkKeyOrder = function checkKeyOrder(node) {
    prev = null;

    _lodash2.default.forEach(node.properties, function (identifierNode) {
      var current = (0, _utilities.getParameterName)(identifierNode, context);
      var last = prev;

      // keep track of the last token
      prev = current || last;

      if (!last || !current) {
        return;
      }

      var isValidOrder = isValidOrders[order + (insensitive ? 'I' : '') + (natural ? 'N' : '')];

      if (isValidOrder(last, current) === false) {
        context.report({
          data: {
            current,
            insensitive: insensitive ? 'insensitive ' : '',
            last,
            natural: natural ? 'natural ' : '',
            order
          },
          fix(fixer) {
            var nodeText = generateFix(node, context, isValidOrder);

            return fixer.replaceText(node, nodeText);
          },
          loc: identifierNode.loc,
          message: 'Expected type annotations to be in {{natural}}{{insensitive}}{{order}}ending order. "{{current}}" should be before "{{last}}".',
          node: identifierNode
        });
      }
    });
  };

  return {
    ObjectTypeAnnotation: checkKeyOrder
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];