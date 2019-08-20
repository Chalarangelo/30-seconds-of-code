/**
 * @fileoverview  Attempts to discover all state fields in a React component and
 * warn if any of them are never read.
 *
 * State field definitions are collected from `this.state = {}` assignments in
 * the constructor, objects passed to `this.setState()`, and `state = {}` class
 * property assignments.
 */

'use strict';

const Components = require('../util/Components');
const docsUrl = require('../util/docsUrl');

// Descend through all wrapping TypeCastExpressions and return the expression
// that was cast.
function uncast(node) {
  while (node.type === 'TypeCastExpression') {
    node = node.expression;
  }
  return node;
}

// Return the name of an identifier or the string value of a literal. Useful
// anywhere that a literal may be used as a key (e.g., member expressions,
// method definitions, ObjectExpression property keys).
function getName(node) {
  node = uncast(node);
  const type = node.type;

  if (type === 'Identifier') {
    return node.name;
  }
  if (type === 'Literal') {
    return String(node.value);
  }
  if (type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0].value.raw;
  }
  return null;
}

function isThisExpression(node) {
  return uncast(node).type === 'ThisExpression';
}

function getInitialClassInfo() {
  return {
    // Set of nodes where state fields were defined.
    stateFields: new Set(),

    // Set of names of state fields that we've seen used.
    usedStateFields: new Set(),

    // Names of local variables that may be pointing to this.state. To
    // track this properly, we would need to keep track of all locals,
    // shadowing, assignments, etc. To keep things simple, we only
    // maintain one set of aliases per method and accept that it will
    // produce some false negatives.
    aliases: null
  };
}

function isSetStateCall(node) {
  return (
    node.callee.type === 'MemberExpression' &&
    isThisExpression(node.callee.object) &&
    getName(node.callee.property) === 'setState'
  );
}

module.exports = {
  meta: {
    docs: {
      description: 'Prevent definition of unused state fields',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unused-state')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    // Non-null when we are inside a React component ClassDeclaration and we have
    // not yet encountered any use of this.state which we have chosen not to
    // analyze. If we encounter any such usage (like this.state being spread as
    // JSX attributes), then this is again set to null.
    let classInfo = null;

    function isStateParameterReference(node) {
      const classMethods = [
        'shouldComponentUpdate',
        'componentWillUpdate',
        'UNSAFE_componentWillUpdate',
        'getSnapshotBeforeUpdate',
        'componentDidUpdate'
      ];

      let scope = context.getScope();
      while (scope) {
        const parent = scope.block && scope.block.parent;
        if (
          parent &&
          parent.type === 'MethodDefinition' && (
            parent.static && parent.key.name === 'getDerivedStateFromProps' ||
            classMethods.indexOf(parent.key.name) !== -1
          ) &&
          parent.value.type === 'FunctionExpression' &&
          parent.value.params[1] &&
          parent.value.params[1].name === node.name
        ) {
          return true;
        }
        scope = scope.upper;
      }

      return false;
    }

    // Returns true if the given node is possibly a reference to `this.state` or the state parameter of
    // a lifecycle method.
    function isStateReference(node) {
      node = uncast(node);

      const isDirectStateReference = node.type === 'MemberExpression' &&
        isThisExpression(node.object) &&
        node.property.name === 'state';

      const isAliasedStateReference = node.type === 'Identifier' &&
        classInfo.aliases &&
        classInfo.aliases.has(node.name);

      return isDirectStateReference || isAliasedStateReference || isStateParameterReference(node);
    }

    // Takes an ObjectExpression node and adds all named Property nodes to the
    // current set of state fields.
    function addStateFields(node) {
      for (const prop of node.properties) {
        const key = prop.key;

        if (
          prop.type === 'Property' &&
          (key.type === 'Literal' ||
          (key.type === 'TemplateLiteral' && key.expressions.length === 0) ||
          (prop.computed === false && key.type === 'Identifier')) &&
          getName(prop.key) !== null
        ) {
          classInfo.stateFields.add(prop);
        }
      }
    }

    // Adds the name of the given node as a used state field if the node is an
    // Identifier or a Literal. Other node types are ignored.
    function addUsedStateField(node) {
      const name = getName(node);
      if (name) {
        classInfo.usedStateFields.add(name);
      }
    }

    // Records used state fields and new aliases for an ObjectPattern which
    // destructures `this.state`.
    function handleStateDestructuring(node) {
      for (const prop of node.properties) {
        if (prop.type === 'Property') {
          addUsedStateField(prop.key);
        } else if (
          (prop.type === 'ExperimentalRestProperty' || prop.type === 'RestElement') &&
          classInfo.aliases
        ) {
          classInfo.aliases.add(getName(prop.argument));
        }
      }
    }

    // Used to record used state fields and new aliases for both
    // AssignmentExpressions and VariableDeclarators.
    function handleAssignment(left, right) {
      switch (left.type) {
        case 'Identifier':
          if (isStateReference(right) && classInfo.aliases) {
            classInfo.aliases.add(left.name);
          }
          break;
        case 'ObjectPattern':
          if (isStateReference(right)) {
            handleStateDestructuring(left);
          } else if (isThisExpression(right) && classInfo.aliases) {
            for (const prop of left.properties) {
              if (prop.type === 'Property' && getName(prop.key) === 'state') {
                const name = getName(prop.value);
                if (name) {
                  classInfo.aliases.add(name);
                } else if (prop.value.type === 'ObjectPattern') {
                  handleStateDestructuring(prop.value);
                }
              }
            }
          }
          break;
        default:
        // pass
      }
    }

    function reportUnusedFields() {
      // Report all unused state fields.
      for (const node of classInfo.stateFields) {
        const name = getName(node.key);
        if (!classInfo.usedStateFields.has(name)) {
          context.report({
            node,
            message: `Unused state field: '${name}'`
          });
        }
      }
    }

    return {
      ClassDeclaration(node) {
        if (utils.isES6Component(node)) {
          classInfo = getInitialClassInfo();
        }
      },

      ObjectExpression(node) {
        if (utils.isES5Component(node)) {
          classInfo = getInitialClassInfo();
        }
      },

      'ObjectExpression:exit': function (node) {
        if (!classInfo) {
          return;
        }

        if (utils.isES5Component(node)) {
          reportUnusedFields();
          classInfo = null;
        }
      },

      'ClassDeclaration:exit': function () {
        if (!classInfo) {
          return;
        }
        reportUnusedFields();
        classInfo = null;
      },

      CallExpression(node) {
        if (!classInfo) {
          return;
        }
        // If we're looking at a `this.setState({})` invocation, record all the
        // properties as state fields.
        if (
          isSetStateCall(node) &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'ObjectExpression'
        ) {
          addStateFields(node.arguments[0]);
        } else if (
          isSetStateCall(node) &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'ArrowFunctionExpression'
        ) {
          if (node.arguments[0].body.type === 'ObjectExpression') {
            addStateFields(node.arguments[0].body);
          }
          if (node.arguments[0].params.length > 0 && classInfo.aliases) {
            const firstParam = node.arguments[0].params[0];
            if (firstParam.type === 'ObjectPattern') {
              handleStateDestructuring(firstParam);
            } else {
              classInfo.aliases.add(getName(firstParam));
            }
          }
        }
      },

      ClassProperty(node) {
        if (!classInfo) {
          return;
        }
        // If we see state being assigned as a class property using an object
        // expression, record all the fields of that object as state fields.
        if (
          getName(node.key) === 'state' &&
          !node.static &&
          node.value &&
          node.value.type === 'ObjectExpression'
        ) {
          addStateFields(node.value);
        }

        if (
          !node.static &&
          node.value &&
          node.value.type === 'ArrowFunctionExpression'
        ) {
          // Create a new set for this.state aliases local to this method.
          classInfo.aliases = new Set();
        }
      },

      'ClassProperty:exit': function (node) {
        if (
          classInfo &&
          !node.static &&
          node.value &&
          node.value.type === 'ArrowFunctionExpression'
        ) {
          // Forget our set of local aliases.
          classInfo.aliases = null;
        }
      },

      MethodDefinition() {
        if (!classInfo) {
          return;
        }
        // Create a new set for this.state aliases local to this method.
        classInfo.aliases = new Set();
      },

      'MethodDefinition:exit': function () {
        if (!classInfo) {
          return;
        }
        // Forget our set of local aliases.
        classInfo.aliases = null;
      },

      FunctionExpression(node) {
        if (!classInfo) {
          return;
        }

        const parent = node.parent;
        if (!utils.isES5Component(parent.parent)) {
          return;
        }

        if (parent.key.name === 'getInitialState') {
          const body = node.body.body;
          const lastBodyNode = body[body.length - 1];

          if (
            lastBodyNode.type === 'ReturnStatement' &&
            lastBodyNode.argument.type === 'ObjectExpression'
          ) {
            addStateFields(lastBodyNode.argument);
          }
        } else {
          // Create a new set for this.state aliases local to this method.
          classInfo.aliases = new Set();
        }
      },

      AssignmentExpression(node) {
        if (!classInfo) {
          return;
        }
        // Check for assignments like `this.state = {}`
        if (
          node.left.type === 'MemberExpression' &&
          isThisExpression(node.left.object) &&
          getName(node.left.property) === 'state' &&
          node.right.type === 'ObjectExpression'
        ) {
          // Find the nearest function expression containing this assignment.
          let fn = node;
          while (fn.type !== 'FunctionExpression' && fn.parent) {
            fn = fn.parent;
          }
          // If the nearest containing function is the constructor, then we want
          // to record all the assigned properties as state fields.
          if (
            fn.parent &&
            fn.parent.type === 'MethodDefinition' &&
            fn.parent.kind === 'constructor'
          ) {
            addStateFields(node.right);
          }
        } else {
          // Check for assignments like `alias = this.state` and record the alias.
          handleAssignment(node.left, node.right);
        }
      },

      VariableDeclarator(node) {
        if (!classInfo || !node.init) {
          return;
        }
        handleAssignment(node.id, node.init);
      },

      MemberExpression(node) {
        if (!classInfo) {
          return;
        }
        if (isStateReference(node.object)) {
          // If we see this.state[foo] access, give up.
          if (node.computed && node.property.type !== 'Literal') {
            classInfo = null;
            return;
          }
          // Otherwise, record that we saw this property being accessed.
          addUsedStateField(node.property);
        // If we see a `this.state` access in a CallExpression, give up.
        } else if (isStateReference(node) && node.parent.type === 'CallExpression') {
          classInfo = null;
        }
      },

      JSXSpreadAttribute(node) {
        if (classInfo && isStateReference(node.argument)) {
          classInfo = null;
        }
      },

      'ExperimentalSpreadProperty, SpreadElement': function (node) {
        if (classInfo && isStateReference(node.argument)) {
          classInfo = null;
        }
      }
    };
  })
};
