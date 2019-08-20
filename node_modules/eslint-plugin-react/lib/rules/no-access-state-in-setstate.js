/**
 * @fileoverview Prevent usage of this.state within setState
 * @author Rolf Erik Lekang, Jørgen Aaberg
 */

'use strict';

const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Reports when this.state is accessed within setState',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-access-state-in-setstate')
    }
  },

  create(context) {
    function isSetStateCall(node) {
      return node.type === 'CallExpression' &&
        node.callee.property &&
        node.callee.property.name === 'setState' &&
        node.callee.object.type === 'ThisExpression';
    }

    function isFirstArgumentInSetStateCall(current, node) {
      if (!isSetStateCall(current)) {
        return false;
      }
      while (node && node.parent !== current) {
        node = node.parent;
      }
      return current.arguments[0] === node;
    }

    // The methods array contains all methods or functions that are using this.state
    // or that are calling another method or function using this.state
    const methods = [];
    // The vars array contains all variables that contains this.state
    const vars = [];
    return {
      CallExpression(node) {
        // Appends all the methods that are calling another
        // method containing this.state to the methods array
        methods.forEach((method) => {
          if (node.callee.name === method.methodName) {
            let current = node.parent;
            while (current.type !== 'Program') {
              if (current.type === 'MethodDefinition') {
                methods.push({
                  methodName: current.key.name,
                  node: method.node
                });
                break;
              }
              current = current.parent;
            }
          }
        });

        // Finding all CallExpressions that is inside a setState
        // to further check if they contains this.state
        let current = node.parent;
        while (current.type !== 'Program') {
          if (isFirstArgumentInSetStateCall(current, node)) {
            const methodName = node.callee.name;
            methods.forEach((method) => {
              if (method.methodName === methodName) {
                context.report({
                  node: method.node,
                  message: 'Use callback in setState when referencing the previous state.'
                });
              }
            });

            break;
          }
          current = current.parent;
        }
      },

      MemberExpression(node) {
        if (
          node.property.name === 'state' &&
          node.object.type === 'ThisExpression'
        ) {
          let current = node;
          while (current.type !== 'Program') {
            // Reporting if this.state is directly within this.setState
            if (isFirstArgumentInSetStateCall(current, node)) {
              context.report({
                node,
                message: 'Use callback in setState when referencing the previous state.'
              });
              break;
            }

            // Storing all functions and methods that contains this.state
            if (current.type === 'MethodDefinition') {
              methods.push({
                methodName: current.key.name,
                node
              });
              break;
            } else if (current.type === 'FunctionExpression' && current.parent.key) {
              methods.push({
                methodName: current.parent.key.name,
                node
              });
              break;
            }

            // Storing all variables containg this.state
            if (current.type === 'VariableDeclarator') {
              vars.push({
                node,
                scope: context.getScope(),
                variableName: current.id.name
              });
              break;
            }

            current = current.parent;
          }
        }
      },

      Identifier(node) {
        // Checks if the identifier is a variable within an object
        let current = node;
        while (current.parent.type === 'BinaryExpression') {
          current = current.parent;
        }
        if (
          current.parent.value === current ||
          current.parent.object === current
        ) {
          while (current.type !== 'Program') {
            if (isFirstArgumentInSetStateCall(current, node)) {
              vars
                .filter(v => v.scope === context.getScope() && v.variableName === node.name)
                .forEach((v) => {
                  context.report({
                    node: v.node,
                    message: 'Use callback in setState when referencing the previous state.'
                  });
                });
            }
            current = current.parent;
          }
        }
      },

      ObjectPattern(node) {
        const isDerivedFromThis = node.parent.init && node.parent.init.type === 'ThisExpression';
        node.properties.forEach((property) => {
          if (property && property.key && property.key.name === 'state' && isDerivedFromThis) {
            vars.push({
              node: property.key,
              scope: context.getScope(),
              variableName: property.key.name
            });
          }
        });
      }
    };
  }
};
