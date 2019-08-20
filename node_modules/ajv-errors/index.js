'use strict';

module.exports = function (ajv, options) {
  if (!ajv._opts.allErrors) throw new Error('ajv-errors: Ajv option allErrors must be true');
  if (!ajv._opts.jsonPointers) {
    console.warn('ajv-errors: Ajv option jsonPointers changed to true');
    ajv._opts.jsonPointers = true;
  }

  ajv.addKeyword('errorMessage', {
    inline: require('./lib/dotjs/errorMessage'),
    statements: true,
    valid: true,
    errors: 'full',
    config: {
      KEYWORD_PROPERTY_PARAMS: {
        required: 'missingProperty',
        dependencies: 'property'
      },
      options: options || {}
    },
    metaSchema: {
      'type': ['string', 'object'],
      properties: {
        properties: {$ref: '#/definitions/stringMap'},
        items: {$ref: '#/definitions/stringList'},
        required: {$ref: '#/definitions/stringOrMap'},
        dependencies: {$ref: '#/definitions/stringOrMap'}
      },
      additionalProperties: {'type': 'string'},
      definitions: {
        stringMap: {
          'type': ['object'],
          additionalProperties: {'type': 'string'}
        },
        stringOrMap: {
          'type': ['string', 'object'],
          additionalProperties: {'type': 'string'}
        },
        stringList: {
          'type': ['array'],
          items: {'type': 'string'}
        }
      }
    }
  });
  return ajv;
};
