/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

/**
 * This transform inlines top-level require(...) aliases with to enable lazy
 * loading of dependencies. It is able to inline both single references and
 * child property references.
 *
 * For instance:
 *     var Foo = require('foo');
 *     f(Foo);
 *
 * Will be transformed into:
 *     f(require('foo'));
 *
 * When the assigment expression has a property access, it will be inlined too,
 * keeping the property. For instance:
 *     var Bar = require('foo').bar;
 *     g(Bar);
 *
 * Will be transformed into:
 *     g(require('foo').bar);
 *
 * Destructuring also works the same way. For instance:
 *     const {Baz} = require('foo');
 *     h(Baz);
 *
 * Is also successfully inlined into:
 *     g(require('foo').Baz);
 */
module.exports = babel => {
  return {
    name: 'inline-requires',
    visitor: {
      Program: {
        exit(path, state) {
          var ignoredRequires = {};
          var inlineableCalls = {require: true};

          if (state.opts) {
            if (state.opts.ignoredRequires) {
              state.opts.ignoredRequires.forEach(function(name) {
                ignoredRequires[name] = true;
              });
            }
            if (state.opts.inlineableCalls) {
              state.opts.inlineableCalls.forEach(function(name) {
                inlineableCalls[name] = true;
              });
            }
          }

          path.scope.crawl();
          path.traverse(
            {CallExpression: call.bind(null, babel)},
            {
              ignoredRequires: ignoredRequires,
              inlineableCalls: inlineableCalls,
            }
          );
        },
      },
    },
  };
};

function call(babel, path, state) {
  var declaratorPath =
    inlineableAlias(path, state) || inlineableMemberAlias(path, state);
  var declarator = declaratorPath && declaratorPath.node;

  if (declarator) {
    var init = declarator.init;
    var name = declarator.id && declarator.id.name;

    var binding = declaratorPath.scope.getBinding(name);
    var constantViolations = binding.constantViolations;
    var thrown = false;

    if (!constantViolations.length) {
      deleteLocation(init);

      babel.traverse(init, {
        noScope: true,
        enter: path => deleteLocation(path.node),
      });

      binding.referencePaths.forEach(ref => {
        try {
          ref.replaceWith(init);
        } catch (err) {
          thrown = true;
        }
      });

      // If an error was thrown, it's most likely due to an invalid replacement
      // happening (e.g. trying to replace a type annotation). It would usually
      // be OK to ignore it, but to be safe, we will avoid removing the initial
      // require.
      if (!thrown) {
        declaratorPath.remove();
      }
    }
  }
}

function deleteLocation(node) {
  delete node.start;
  delete node.end;
  delete node.loc;
}

function inlineableAlias(path, state) {
  const isValid =
    isInlineableCall(path.node, state) &&
    path.parent.type === 'VariableDeclarator' &&
    path.parent.id.type === 'Identifier' &&
    path.parentPath.parent.type === 'VariableDeclaration' &&
    path.parentPath.parentPath.parent.type === 'Program';

  return isValid ? path.parentPath : null;
}

function inlineableMemberAlias(path, state) {
  const isValid =
    isInlineableCall(path.node, state) &&
    path.parent.type === 'MemberExpression' &&
    path.parentPath.parent.type === 'VariableDeclarator' &&
    path.parentPath.parent.id.type === 'Identifier' &&
    path.parentPath.parentPath.parent.type === 'VariableDeclaration' &&
    path.parentPath.parentPath.parentPath.parent.type === 'Program';

  return isValid ? path.parentPath.parentPath : null;
}

function isInlineableCall(node, state) {
  const isInlineable =
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    state.inlineableCalls.hasOwnProperty(node.callee.name) &&
    node['arguments'].length >= 1;

  // require('foo');
  const isStandardCall =
    isInlineable &&
    node['arguments'][0].type === 'StringLiteral' &&
    !state.ignoredRequires.hasOwnProperty(node['arguments'][0].value);

  // require(require.resolve('foo'));
  const isRequireResolveCall =
    isInlineable &&
    node['arguments'][0].type === 'CallExpression' &&
    node['arguments'][0].callee.type === 'MemberExpression' &&
    node['arguments'][0].callee.object.type === 'Identifier' &&
    state.inlineableCalls.hasOwnProperty(node['arguments'][0].callee.object.name) &&
    node['arguments'][0].callee.property.type === 'Identifier' &&
    node['arguments'][0].callee.property.name === 'resolve' &&
    node['arguments'][0]['arguments'].length >= 1 &&
    node['arguments'][0]['arguments'][0].type === 'StringLiteral' &&
    !state.ignoredRequires.hasOwnProperty(node['arguments'][0]['arguments'][0].value);

  return isStandardCall || isRequireResolveCall;
}
