/**
 * @fileoverview Enforce boolean attributes notation in JSX
 * @author Yannick Croissant
 */

'use strict';

const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const exceptionsSchema = {
  type: 'array',
  items: {type: 'string', minLength: 1},
  uniqueItems: true
};

const ALWAYS = 'always';
const NEVER = 'never';

const errorData = new WeakMap();
function getErrorData(exceptions) {
  if (!errorData.has(exceptions)) {
    const exceptionProps = Array.from(exceptions, name => `\`${name}\``).join(', ');
    const exceptionsMessage = exceptions.size > 0 ? ` for the following props: ${exceptionProps}` : '';
    errorData.set(exceptions, {exceptionsMessage});
  }
  return errorData.get(exceptions);
}

function isAlways(configuration, exceptions, propName) {
  const isException = exceptions.has(propName);
  if (configuration === ALWAYS) {
    return !isException;
  }
  return isException;
}

function isNever(configuration, exceptions, propName) {
  const isException = exceptions.has(propName);
  if (configuration === NEVER) {
    return !isException;
  }
  return isException;
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce boolean attributes notation in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-boolean-value')
    },
    fixable: 'code',

    schema: {
      anyOf: [{
        type: 'array',
        items: [{enum: [ALWAYS, NEVER]}],
        additionalItems: false
      }, {
        type: 'array',
        items: [{
          enum: [ALWAYS]
        }, {
          type: 'object',
          additionalProperties: false,
          properties: {
            [NEVER]: exceptionsSchema
          }
        }],
        additionalItems: false
      }, {
        type: 'array',
        items: [{
          enum: [NEVER]
        }, {
          type: 'object',
          additionalProperties: false,
          properties: {
            [ALWAYS]: exceptionsSchema
          }
        }],
        additionalItems: false
      }]
    }
  },

  create(context) {
    const configuration = context.options[0] || NEVER;
    const configObject = context.options[1] || {};
    const exceptions = new Set((configuration === ALWAYS ? configObject[NEVER] : configObject[ALWAYS]) || []);

    const NEVER_MESSAGE = 'Value must be omitted for boolean attributes{{exceptionsMessage}}';
    const ALWAYS_MESSAGE = 'Value must be set for boolean attributes{{exceptionsMessage}}';

    return {
      JSXAttribute(node) {
        const propName = node.name && node.name.name;
        const value = node.value;

        if (isAlways(configuration, exceptions, propName) && value === null) {
          const data = getErrorData(exceptions);
          context.report({
            node,
            message: ALWAYS_MESSAGE,
            data,
            fix(fixer) {
              return fixer.insertTextAfter(node, '={true}');
            }
          });
        }
        if (isNever(configuration, exceptions, propName) && value && value.type === 'JSXExpressionContainer' && value.expression.value === true) {
          const data = getErrorData(exceptions);
          context.report({
            node,
            message: NEVER_MESSAGE,
            data,
            fix(fixer) {
              return fixer.removeRange([node.name.range[1], value.range[1]]);
            }
          });
        }
      }
    };
  }
};
