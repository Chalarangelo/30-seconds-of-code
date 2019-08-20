/**
 * @fileoverview Prevent usage of unsafe lifecycle methods
 * @author Sergei Startsev
 */

'use strict';

const Components = require('../util/Components');
const astUtil = require('../util/ast');
const docsUrl = require('../util/docsUrl');
const versionUtil = require('../util/version');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of unsafe lifecycle methods',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unsafe')
    },
    schema: [
      {
        type: 'object',
        properties: {
          checkAliases: {
            default: false,
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: Components.detect((context, components, utils) => {
    const config = context.options[0] || {};
    const checkAliases = config.checkAliases || false;

    const isApplicable = versionUtil.testReactVersion(context, '16.3.0');
    if (!isApplicable) {
      return {};
    }

    const unsafe = {
      UNSAFE_componentWillMount: {
        newMethod: 'componentDidMount',
        details:
          'See https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html.'
      },
      UNSAFE_componentWillReceiveProps: {
        newMethod: 'getDerivedStateFromProps',
        details:
          'See https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html.'
      },
      UNSAFE_componentWillUpdate: {
        newMethod: 'componentDidUpdate',
        details:
          'See https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html.'
      }
    };
    if (checkAliases) {
      unsafe.componentWillMount = unsafe.UNSAFE_componentWillMount;
      unsafe.componentWillReceiveProps = unsafe.UNSAFE_componentWillReceiveProps;
      unsafe.componentWillUpdate = unsafe.UNSAFE_componentWillUpdate;
    }

    /**
     * Returns a list of unsafe methods
     * @returns {Array} A list of unsafe methods
     */
    function getUnsafeMethods() {
      return Object.keys(unsafe);
    }

    /**
     * Checks if a passed method is unsafe
     * @param {string} method Life cycle method
     * @returns {boolean} Returns true for unsafe methods, otherwise returns false
     */
    function isUnsafe(method) {
      const unsafeMethods = getUnsafeMethods();
      return unsafeMethods.indexOf(method) !== -1;
    }

    /**
     * Reports the error for an unsafe method
     * @param {ASTNode} node The AST node being checked
     * @param {string} method Life cycle method
     */
    function checkUnsafe(node, method) {
      if (!isUnsafe(method)) {
        return;
      }

      const meta = unsafe[method];
      const newMethod = meta.newMethod;
      const details = meta.details;

      context.report({
        node,
        message: `${method} is unsafe for use in async rendering. Update the component to use ${newMethod} instead. ${details}`
      });
    }

    /**
     * Returns life cycle methods if available
     * @param {ASTNode} node The AST node being checked.
     * @returns {Array} The array of methods.
     */
    function getLifeCycleMethods(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.map(property => astUtil.getPropertyName(property));
    }

    /**
     * Checks life cycle methods
     * @param {ASTNode} node The AST node being checked.
     */
    function checkLifeCycleMethods(node) {
      if (utils.isES5Component(node) || utils.isES6Component(node)) {
        const methods = getLifeCycleMethods(node);
        methods.forEach(method => checkUnsafe(node, method));
      }
    }

    return {
      ClassDeclaration: checkLifeCycleMethods,
      ClassExpression: checkLifeCycleMethods,
      ObjectExpression: checkLifeCycleMethods
    };
  })
};
