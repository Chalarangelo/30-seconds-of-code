'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.buildSnapshotResolver = exports.isSnapshotPath = exports.DOT_EXTENSION = exports.EXTENSION = void 0;

var _path = _interopRequireDefault(require('path'));

var _chalk = _interopRequireDefault(require('chalk'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const EXTENSION = 'snap';
exports.EXTENSION = EXTENSION;
const DOT_EXTENSION = '.' + EXTENSION;
exports.DOT_EXTENSION = DOT_EXTENSION;

const isSnapshotPath = path => path.endsWith(DOT_EXTENSION);

exports.isSnapshotPath = isSnapshotPath;
const cache = new Map();

const buildSnapshotResolver = config => {
  const key = config.rootDir;

  if (!cache.has(key)) {
    cache.set(key, createSnapshotResolver(config.snapshotResolver));
  }

  return cache.get(key);
};

exports.buildSnapshotResolver = buildSnapshotResolver;

function createSnapshotResolver(snapshotResolverPath) {
  return typeof snapshotResolverPath === 'string'
    ? createCustomSnapshotResolver(snapshotResolverPath)
    : createDefaultSnapshotResolver();
}

function createDefaultSnapshotResolver() {
  return {
    resolveSnapshotPath: testPath =>
      _path.default.join(
        _path.default.join(_path.default.dirname(testPath), '__snapshots__'),
        _path.default.basename(testPath) + DOT_EXTENSION
      ),
    resolveTestPath: snapshotPath =>
      _path.default.resolve(
        _path.default.dirname(snapshotPath),
        '..',
        _path.default.basename(snapshotPath, DOT_EXTENSION)
      ),
    testPathForConsistencyCheck: _path.default.posix.join(
      'consistency_check',
      '__tests__',
      'example.test.js'
    )
  };
}

function createCustomSnapshotResolver(snapshotResolverPath) {
  const custom = require(snapshotResolverPath);

  const keys = [
    ['resolveSnapshotPath', 'function'],
    ['resolveTestPath', 'function'],
    ['testPathForConsistencyCheck', 'string']
  ];
  keys.forEach(([propName, requiredType]) => {
    if (typeof custom[propName] !== requiredType) {
      throw new TypeError(mustImplement(propName, requiredType));
    }
  });
  const customResolver = {
    resolveSnapshotPath: testPath =>
      custom.resolveSnapshotPath(testPath, DOT_EXTENSION),
    resolveTestPath: snapshotPath =>
      custom.resolveTestPath(snapshotPath, DOT_EXTENSION),
    testPathForConsistencyCheck: custom.testPathForConsistencyCheck
  };
  verifyConsistentTransformations(customResolver);
  return customResolver;
}

function mustImplement(propName, requiredType) {
  return (
    _chalk.default.bold(
      `Custom snapshot resolver must implement a \`${propName}\` as a ${requiredType}.`
    ) +
    '\nDocumentation: https://facebook.github.io/jest/docs/en/configuration.html#snapshotResolver'
  );
}

function verifyConsistentTransformations(custom) {
  const resolvedSnapshotPath = custom.resolveSnapshotPath(
    custom.testPathForConsistencyCheck
  );
  const resolvedTestPath = custom.resolveTestPath(resolvedSnapshotPath);

  if (resolvedTestPath !== custom.testPathForConsistencyCheck) {
    throw new Error(
      _chalk.default.bold(
        `Custom snapshot resolver functions must transform paths consistently, i.e. expects resolveTestPath(resolveSnapshotPath('${custom.testPathForConsistencyCheck}')) === ${resolvedTestPath}`
      )
    );
  }
}
