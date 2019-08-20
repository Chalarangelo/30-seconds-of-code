/**
 * @fileoverview Forbid using another component's propTypes
 * @author Ian Christian Myers
 */

'use strict';

const docsUrl = require('../util/docsUrl');
const ast = require('../util/ast');

module.exports = {
  meta: {
    docs: {
      description: 'Forbid using another component\'s propTypes',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-foreign-prop-types')
    },

    schema: [
      {
        type: 'object',
        properties: {
          allowInPropTypes: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create(context) {
    const config = context.options[0] || {};
    const allowInPropTypes = config.allowInPropTypes || false;

    // --------------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------------

    function findParentAssignmentExpression(node) {
      let parent = node.parent;

      while (parent && parent.type !== 'Program') {
        if (parent.type === 'AssignmentExpression') {
          return parent;
        }
        parent = parent.parent;
      }
      return null;
    }

    function findParentClassProperty(node) {
      let parent = node.parent;

      while (parent && parent.type !== 'Program') {
        if (parent.type === 'ClassProperty') {
          return parent;
        }
        parent = parent.parent;
      }
      return null;
    }

    function isAllowedAssignment(node) {
      if (!allowInPropTypes) {
        return false;
      }

      const assignmentExpression = findParentAssignmentExpression(node);

      if (
        assignmentExpression &&
        assignmentExpression.left &&
        assignmentExpression.left.property &&
        assignmentExpression.left.property.name === 'propTypes'
      ) {
        return true;
      }

      const classProperty = findParentClassProperty(node);

      if (
        classProperty &&
        classProperty.key &&
        classProperty.key.name === 'propTypes'
      ) {
        return true;
      }
      return false;
    }

    return {
      MemberExpression(node) {
        if (
          node.property &&
          (
            !node.computed &&
            node.property.type === 'Identifier' &&
            node.property.name === 'propTypes' &&
            !ast.isAssignmentLHS(node) &&
            !isAllowedAssignment(node)
          ) || (
            (node.property.type === 'Literal' || node.property.type === 'JSXText') &&
            node.property.value === 'propTypes' &&
            !ast.isAssignmentLHS(node) &&
            !isAllowedAssignment(node)
          )
        ) {
          context.report({
            node: node.property,
            message: 'Using propTypes from another component is not safe because they may be removed in production builds'
          });
        }
      },

      ObjectPattern(node) {
        const propTypesNode = node.properties.find(property => property.type === 'Property' && property.key.name === 'propTypes');

        if (propTypesNode) {
          context.report({
            node: propTypesNode,
            message: 'Using propTypes from another component is not safe because they may be removed in production builds'
          });
        }
      }
    };
  }
};
