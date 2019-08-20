'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _expect = require('expect');

var _jestSnapshot = require('jest-snapshot');

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Get suppressed errors form  jest-matchers that weren't throw during
// test execution and add them to the test result, potentially failing
// a passing test.
const addSuppressedErrors = result => {
  const _getState = (0, _expect.getState)(),
    suppressedErrors = _getState.suppressedErrors;

  (0, _expect.setState)({
    suppressedErrors: []
  });

  if (suppressedErrors.length) {
    result.status = 'failed';
    result.failedExpectations = suppressedErrors.map(error => ({
      actual: '',
      // passing error for custom test reporters
      error,
      expected: '',
      matcherName: '',
      message: error.message,
      passed: false,
      stack: error.stack
    }));
  }
};

const addAssertionErrors = result => {
  const assertionErrors = (0, _expect.extractExpectedAssertionsErrors)();

  if (assertionErrors.length) {
    const jasmineErrors = assertionErrors.map(({actual, error, expected}) => ({
      actual,
      expected,
      message: error.stack,
      passed: false
    }));
    result.status = 'failed';
    result.failedExpectations = result.failedExpectations.concat(jasmineErrors);
  }
};

const patchJasmine = () => {
  global.jasmine.Spec = (realSpec => {
    class Spec extends realSpec {
      constructor(attr) {
        const resultCallback = attr.resultCallback;

        attr.resultCallback = function(result) {
          addSuppressedErrors(result);
          addAssertionErrors(result);
          resultCallback.call(attr, result);
        };

        const onStart = attr.onStart;

        attr.onStart = context => {
          (0, _expect.setState)({
            currentTestName: context.getFullName()
          });
          onStart && onStart.call(attr, context);
        };

        super(attr);
      }
    }

    return Spec;
  })(global.jasmine.Spec);
};

var _default = ({config, globalConfig, localRequire, testPath}) => {
  // Jest tests snapshotSerializers in order preceding built-in serializers.
  // Therefore, add in reverse because the last added is the first tested.
  config.snapshotSerializers
    .concat()
    .reverse()
    .forEach(path => {
      (0, _jestSnapshot.addSerializer)(localRequire(path));
    });
  patchJasmine();
  const expand = globalConfig.expand,
    updateSnapshot = globalConfig.updateSnapshot;
  const snapshotResolver = (0, _jestSnapshot.buildSnapshotResolver)(config);
  const snapshotPath = snapshotResolver.resolveSnapshotPath(testPath);
  const snapshotState = new _jestSnapshot.SnapshotState(snapshotPath, {
    expand,
    getBabelTraverse: () => require('@babel/traverse').default,
    getPrettier: () =>
      config.prettierPath ? require(config.prettierPath) : null,
    updateSnapshot
  });
  (0, _expect.setState)({
    snapshotState,
    testPath
  }); // Return it back to the outer scope (test runner outside the VM).

  return snapshotState;
};

exports.default = _default;
