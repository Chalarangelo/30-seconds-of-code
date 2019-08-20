"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateObjSchema = exports.enumArraySchema = exports.arraySchema = void 0;

/**
 * JSON schema to accept an array of unique strings
 */
var arraySchema = {
  type: 'array',
  items: {
    type: 'string'
  },
  uniqueItems: true,
  additionalItems: false
};
/**
 * JSON schema to accept an array of unique strings from an enumerated list.
 */

exports.arraySchema = arraySchema;

var enumArraySchema = function enumArraySchema() {
  var enumeratedList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var minItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Object.assign({}, arraySchema, {
    items: {
      type: 'string',
      "enum": enumeratedList
    },
    minItems
  });
};
/**
 * Factory function to generate an object schema
 * with specified properties object
 */


exports.enumArraySchema = enumArraySchema;

var generateObjSchema = function generateObjSchema() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var required = arguments.length > 1 ? arguments[1] : undefined;
  return {
    type: 'object',
    properties,
    required
  };
};

exports.generateObjSchema = generateObjSchema;