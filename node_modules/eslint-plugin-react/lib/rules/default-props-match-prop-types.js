/**
 * @fileOverview Enforce all defaultProps are defined in propTypes
 * @author Vitor Balocco
 * @author Roy Sutton
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
      description: 'Enforce all defaultProps are defined and not "required" in propTypes.',
      category: 'Best Practices',
      url: docsUrl('default-props-match-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        allowRequiredDefaults: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const configuration = context.options[0] || {};
    const allowRequiredDefaults = configuration.allowRequiredDefaults || false;

    /**
     * Reports all defaultProps passed in that don't have an appropriate propTypes counterpart.
     * @param  {Object[]} propTypes    Array of propTypes to check.
     * @param  {Object}   defaultProps Object of defaultProps to check. Keys are the props names.
     * @return {void}
     */
    function reportInvalidDefaultProps(propTypes, defaultProps) {
      // If this defaultProps is "unresolved" or the propTypes is undefined, then we should ignore
      // this component and not report any errors for it, to avoid false-positives with e.g.
      // external defaultProps/propTypes declarations or spread operators.
      if (defaultProps === 'unresolved' || !propTypes || Object.keys(propTypes).length === 0) {
        return;
      }

      Object.keys(defaultProps).forEach((defaultPropName) => {
        const defaultProp = defaultProps[defaultPropName];
        const prop = propTypes[defaultPropName];

        if (prop && (allowRequiredDefaults || !prop.isRequired)) {
          return;
        }

        if (prop) {
          context.report({
            node: defaultProp.node,
            message: 'defaultProp "{{name}}" defined for isRequired propType.',
            data: {name: defaultPropName}
          });
        } else {
          context.report({
            node: defaultProp.node,
            message: 'defaultProp "{{name}}" has no corresponding propTypes declaration.',
            data: {name: defaultPropName}
          });
        }
      });
    }

    // --------------------------------------------------------------------------
    // Public API
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        const list = components.list();

        // If no defaultProps could be found, we don't report anything.
        Object.keys(list).filter(component => list[component].defaultProps).forEach((component) => {
          reportInvalidDefaultProps(
            list[component].declaredPropTypes,
            list[component].defaultProps || {}
          );
        });
      }
    };
  })
};
