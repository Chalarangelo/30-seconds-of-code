'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = require('../../utilities');

var getColon = function getColon(context, objectTypeProperty) {
  // eslint-disable-next-line init-declarations
  var tokenIndex = 1;

  if (objectTypeProperty.optional) {
    tokenIndex++;
  }

  if (objectTypeProperty.static) {
    tokenIndex++;
  }

  if (objectTypeProperty.variance) {
    tokenIndex++;
  }

  return context.getSourceCode().getFirstToken(objectTypeProperty, tokenIndex);
};

// 1) type X = { foo(): A; }
// 2) type X = { foo: () => A; }
// the above have identical ASTs (save for their ranges)
// case 1 doesn't have a type annotation colon and should be ignored
var isShortPropertyFunction = function isShortPropertyFunction(objectTypeProperty) {
  return objectTypeProperty.value.type === 'FunctionTypeAnnotation' && objectTypeProperty.start === objectTypeProperty.value.start;
};

exports.default = function (context, report) {
  return function (objectTypeProperty) {
    if (isShortPropertyFunction(objectTypeProperty)) {
      // potential difference: not checked in before
      return;
    }

    report({
      colon: getColon(context, objectTypeProperty),
      name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(objectTypeProperty, context)),
      node: objectTypeProperty
    });
  };
};

module.exports = exports['default'];