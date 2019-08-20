'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = _default;

function _istanbulLibInstrument() {
  const data = require('istanbul-lib-instrument');

  _istanbulLibInstrument = function _istanbulLibInstrument() {
    return data;
  };

  return data;
}

function _istanbulLibCoverage() {
  const data = require('istanbul-lib-coverage');

  _istanbulLibCoverage = function _istanbulLibCoverage() {
    return data;
  };

  return data;
}

function _transform() {
  const data = require('@jest/transform');

  _transform = function _transform() {
    return data;
  };

  return data;
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function _default(source, filename, globalConfig, config, changedFiles) {
  const coverageOptions = {
    changedFiles,
    collectCoverage: globalConfig.collectCoverage,
    collectCoverageFrom: globalConfig.collectCoverageFrom,
    collectCoverageOnlyFrom: globalConfig.collectCoverageOnlyFrom
  };
  let coverageWorkerResult = null;

  if ((0, _transform().shouldInstrument)(filename, coverageOptions, config)) {
    // Transform file with instrumentation to make sure initial coverage data is well mapped to original code.
    const _transformSource = new (_transform()).ScriptTransformer(
        config
      ).transformSource(filename, source, true),
      code = _transformSource.code,
      mapCoverage = _transformSource.mapCoverage,
      sourceMapPath = _transformSource.sourceMapPath;

    const extracted = (0, _istanbulLibInstrument().readInitialCoverage)(code); // Check extracted initial coverage is not null, this can happen when using /* istanbul ignore file */

    if (extracted) {
      coverageWorkerResult = {
        coverage: (0, _istanbulLibCoverage().createFileCoverage)(
          extracted.coverageData
        ),
        sourceMapPath: mapCoverage ? sourceMapPath : null
      };
    }
  }

  return coverageWorkerResult;
}
