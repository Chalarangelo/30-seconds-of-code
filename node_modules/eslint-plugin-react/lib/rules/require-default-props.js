/**
 * @fileOverview Enforce a defaultProps definition for every prop that is not a required prop.
 * @author Vitor Balocco
 */

'use strict';

const Components = require('../util/Components');
const docsUrl = require('../util/docsUrl');


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce a defaultProps definition for every prop that is not a required prop.',
      category: 'Best Practices',
      url: docsUrl('require-default-props')
    },

    schema: [{
      type: 'object',
      properties: {
        forbidDefaultForRequired: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const configuration = context.options[0] || {};
    const forbidDefaultForRequired = configuration.forbidDefaultForRequired || false;


    /**
     * Reports all propTypes passed in that don't have a defaultProps counterpart.
     * @param  {Object[]} propTypes    List of propTypes to check.
     * @param  {Object}   defaultProps Object of defaultProps to check. Keys are the props names.
     * @return {void}
     */
    function reportPropTypesWithoutDefault(propTypes, defaultProps) {
      // If this defaultProps is "unresolved", then we should ignore this component and not report
      // any errors for it, to avoid false-positives with e.g. external defaultProps declarations or spread operators.
      if (defaultProps === 'unresolved') {
        return;
      }

      Object.keys(propTypes).forEach((propName) => {
        const prop = propTypes[propName];
        if (prop.isRequired) {
          if (forbidDefaultForRequired && defaultProps[propName]) {
            context.report({
              node: prop.node,
              message: 'propType "{{name}}" is required and should not have a defaultProps declaration.',
              data: {name: propName}
            });
          }
          return;
        }

        if (defaultProps[propName]) {
          return;
        }

        context.report({
          node: prop.node,
          message: 'propType "{{name}}" is not required, but has no corresponding defaultProps declaration.',
          data: {name: propName}
        });
      });
    }

    // --------------------------------------------------------------------------
    // Public API
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        const list = components.list();

        Object.keys(list).filter(component => list[component].declaredPropTypes).forEach((component) => {
          reportPropTypesWithoutDefault(
            list[component].declaredPropTypes,
            list[component].defaultProps || {}
          );
        });
      }
    };
  })
};
