'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = treeProcessor;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Promise = global[Symbol.for('jest-native-promise')] || global.Promise;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function treeProcessor(options) {
  const nodeComplete = options.nodeComplete,
    nodeStart = options.nodeStart,
    queueRunnerFactory = options.queueRunnerFactory,
    runnableIds = options.runnableIds,
    tree = options.tree;

  function isEnabled(node, parentEnabled) {
    return parentEnabled || runnableIds.indexOf(node.id) !== -1;
  }

  function getNodeHandler(node, parentEnabled) {
    const enabled = isEnabled(node, parentEnabled);
    return node.children
      ? getNodeWithChildrenHandler(node, enabled)
      : getNodeWithoutChildrenHandler(node, enabled);
  }

  function getNodeWithoutChildrenHandler(node, enabled) {
    return function fn(done = () => {}) {
      node.execute(done, enabled);
    };
  }

  function getNodeWithChildrenHandler(node, enabled) {
    return (
      /*#__PURE__*/
      (function() {
        var _fn = _asyncToGenerator(function*(done = () => {}) {
          nodeStart(node);
          yield queueRunnerFactory({
            onException: error => node.onException(error),
            queueableFns: wrapChildren(node, enabled),
            userContext: node.sharedUserContext()
          });
          nodeComplete(node);
          done();
        });

        function fn() {
          return _fn.apply(this, arguments);
        }

        return fn;
      })()
    );
  }

  function hasEnabledTest(node) {
    if (node.children) {
      return node.children.some(hasEnabledTest);
    }

    return !node.disabled;
  }

  function wrapChildren(node, enabled) {
    if (!node.children) {
      throw new Error('`node.children` is not defined.');
    }

    const children = node.children.map(child => ({
      fn: getNodeHandler(child, enabled)
    }));

    if (!hasEnabledTest(node)) {
      return children;
    }

    return node.beforeAllFns.concat(children).concat(node.afterAllFns);
  }

  const treeHandler = getNodeHandler(tree, false);
  return treeHandler();
}
