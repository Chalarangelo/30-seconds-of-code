'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.wrapAnsiString = exports.getSummary = exports.relativePath = exports.formatTestPath = exports.trimAndFormatPath = exports.printDisplayName = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _slash() {
  const data = _interopRequireDefault(require('slash'));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _jestUtil() {
  const data = require('jest-util');

  _jestUtil = function _jestUtil() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const PROGRESS_BAR_WIDTH = 40;

const printDisplayName = config => {
  const displayName = config.displayName;

  const white = _chalk().default.reset.inverse.white;

  if (!displayName) {
    return '';
  }

  if (typeof displayName === 'string') {
    return _chalk().default.supportsColor
      ? white(` ${displayName} `)
      : displayName;
  }

  const name = displayName.name,
    color = displayName.color;
  const chosenColor = _chalk().default.reset.inverse[color]
    ? _chalk().default.reset.inverse[color]
    : white;
  return _chalk().default.supportsColor ? chosenColor(` ${name} `) : name;
};

exports.printDisplayName = printDisplayName;

const trimAndFormatPath = (pad, config, testPath, columns) => {
  const maxLength = columns - pad;
  const relative = relativePath(config, testPath);
  const basename = relative.basename;
  let dirname = relative.dirname; // length is ok

  if ((dirname + _path().default.sep + basename).length <= maxLength) {
    return (0, _slash().default)(
      _chalk().default.dim(dirname + _path().default.sep) +
        _chalk().default.bold(basename)
    );
  } // we can fit trimmed dirname and full basename

  const basenameLength = basename.length;

  if (basenameLength + 4 < maxLength) {
    const dirnameLength = maxLength - 4 - basenameLength;
    dirname =
      '...' + dirname.slice(dirname.length - dirnameLength, dirname.length);
    return (0, _slash().default)(
      _chalk().default.dim(dirname + _path().default.sep) +
        _chalk().default.bold(basename)
    );
  }

  if (basenameLength + 4 === maxLength) {
    return (0, _slash().default)(
      _chalk().default.dim('...' + _path().default.sep) +
        _chalk().default.bold(basename)
    );
  } // can't fit dirname, but can fit trimmed basename

  return (0, _slash().default)(
    _chalk().default.bold(
      '...' + basename.slice(basename.length - maxLength - 4, basename.length)
    )
  );
};

exports.trimAndFormatPath = trimAndFormatPath;

const formatTestPath = (config, testPath) => {
  const _relativePath = relativePath(config, testPath),
    dirname = _relativePath.dirname,
    basename = _relativePath.basename;

  return (0, _slash().default)(
    _chalk().default.dim(dirname + _path().default.sep) +
      _chalk().default.bold(basename)
  );
};

exports.formatTestPath = formatTestPath;

const relativePath = (config, testPath) => {
  // this function can be called with ProjectConfigs or GlobalConfigs. GlobalConfigs
  // do not have config.cwd, only config.rootDir. Try using config.cwd, fallback
  // to config.rootDir. (Also, some unit just use config.rootDir, which is ok)
  testPath = _path().default.relative(config.cwd || config.rootDir, testPath);

  const dirname = _path().default.dirname(testPath);

  const basename = _path().default.basename(testPath);

  return {
    basename,
    dirname
  };
};

exports.relativePath = relativePath;

const getSummary = (aggregatedResults, options) => {
  let runTime = (Date.now() - aggregatedResults.startTime) / 1000;

  if (options && options.roundTime) {
    runTime = Math.floor(runTime);
  }

  const estimatedTime = (options && options.estimatedTime) || 0;
  const snapshotResults = aggregatedResults.snapshot;
  const snapshotsAdded = snapshotResults.added;
  const snapshotsFailed = snapshotResults.unmatched;
  const snapshotsOutdated = snapshotResults.unchecked;
  const snapshotsFilesRemoved = snapshotResults.filesRemoved;
  const snapshotsDidUpdate = snapshotResults.didUpdate;
  const snapshotsPassed = snapshotResults.matched;
  const snapshotsTotal = snapshotResults.total;
  const snapshotsUpdated = snapshotResults.updated;
  const suitesFailed = aggregatedResults.numFailedTestSuites;
  const suitesPassed = aggregatedResults.numPassedTestSuites;
  const suitesPending = aggregatedResults.numPendingTestSuites;
  const suitesRun = suitesFailed + suitesPassed;
  const suitesTotal = aggregatedResults.numTotalTestSuites;
  const testsFailed = aggregatedResults.numFailedTests;
  const testsPassed = aggregatedResults.numPassedTests;
  const testsPending = aggregatedResults.numPendingTests;
  const testsTodo = aggregatedResults.numTodoTests;
  const testsTotal = aggregatedResults.numTotalTests;
  const width = (options && options.width) || 0;
  const suites =
    _chalk().default.bold('Test Suites: ') +
    (suitesFailed
      ? _chalk().default.bold.red(`${suitesFailed} failed`) + ', '
      : '') +
    (suitesPending
      ? _chalk().default.bold.yellow(`${suitesPending} skipped`) + ', '
      : '') +
    (suitesPassed
      ? _chalk().default.bold.green(`${suitesPassed} passed`) + ', '
      : '') +
    (suitesRun !== suitesTotal
      ? suitesRun + ' of ' + suitesTotal
      : suitesTotal) +
    ` total`;
  const tests =
    _chalk().default.bold('Tests:       ') +
    (testsFailed
      ? _chalk().default.bold.red(`${testsFailed} failed`) + ', '
      : '') +
    (testsPending
      ? _chalk().default.bold.yellow(`${testsPending} skipped`) + ', '
      : '') +
    (testsTodo
      ? _chalk().default.bold.magenta(`${testsTodo} todo`) + ', '
      : '') +
    (testsPassed
      ? _chalk().default.bold.green(`${testsPassed} passed`) + ', '
      : '') +
    `${testsTotal} total`;
  const snapshots =
    _chalk().default.bold('Snapshots:   ') +
    (snapshotsFailed
      ? _chalk().default.bold.red(`${snapshotsFailed} failed`) + ', '
      : '') +
    (snapshotsOutdated && !snapshotsDidUpdate
      ? _chalk().default.bold.yellow(`${snapshotsOutdated} obsolete`) + ', '
      : '') +
    (snapshotsOutdated && snapshotsDidUpdate
      ? _chalk().default.bold.green(`${snapshotsOutdated} removed`) + ', '
      : '') +
    (snapshotsFilesRemoved && !snapshotsDidUpdate
      ? _chalk().default.bold.yellow(
          (0, _jestUtil().pluralize)('file', snapshotsFilesRemoved) +
            ' obsolete'
        ) + ', '
      : '') +
    (snapshotsFilesRemoved && snapshotsDidUpdate
      ? _chalk().default.bold.green(
          (0, _jestUtil().pluralize)('file', snapshotsFilesRemoved) + ' removed'
        ) + ', '
      : '') +
    (snapshotsUpdated
      ? _chalk().default.bold.green(`${snapshotsUpdated} updated`) + ', '
      : '') +
    (snapshotsAdded
      ? _chalk().default.bold.green(`${snapshotsAdded} written`) + ', '
      : '') +
    (snapshotsPassed
      ? _chalk().default.bold.green(`${snapshotsPassed} passed`) + ', '
      : '') +
    `${snapshotsTotal} total`;
  const time = renderTime(runTime, estimatedTime, width);
  return [suites, tests, snapshots, time].join('\n');
};

exports.getSummary = getSummary;

const renderTime = (runTime, estimatedTime, width) => {
  // If we are more than one second over the estimated time, highlight it.
  const renderedTime =
    estimatedTime && runTime >= estimatedTime + 1
      ? _chalk().default.bold.yellow(runTime + 's')
      : runTime + 's';
  let time = _chalk().default.bold(`Time:`) + `        ${renderedTime}`;

  if (runTime < estimatedTime) {
    time += `, estimated ${estimatedTime}s`;
  } // Only show a progress bar if the test run is actually going to take
  // some time.

  if (estimatedTime > 2 && runTime < estimatedTime && width) {
    const availableWidth = Math.min(PROGRESS_BAR_WIDTH, width);
    const length = Math.min(
      Math.floor((runTime / estimatedTime) * availableWidth),
      availableWidth
    );

    if (availableWidth >= 2) {
      time +=
        '\n' +
        _chalk()
          .default.green('█')
          .repeat(length) +
        _chalk()
          .default.white('█')
          .repeat(availableWidth - length);
    }
  }

  return time;
}; // word-wrap a string that contains ANSI escape sequences.
// ANSI escape sequences do not add to the string length.

const wrapAnsiString = (string, terminalWidth) => {
  if (terminalWidth === 0) {
    // if the terminal width is zero, don't bother word-wrapping
    return string;
  }

  const ANSI_REGEXP = /[\u001b\u009b]\[\d{1,2}m/g;
  const tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = ANSI_REGEXP.exec(string))) {
    const ansi = match[0];
    const index = match['index'];

    if (index != lastIndex) {
      tokens.push(['string', string.slice(lastIndex, index)]);
    }

    tokens.push(['ansi', ansi]);
    lastIndex = index + ansi.length;
  }

  if (lastIndex != string.length - 1) {
    tokens.push(['string', string.slice(lastIndex, string.length)]);
  }

  let lastLineLength = 0;
  return tokens
    .reduce(
      (lines, [kind, token]) => {
        if (kind === 'string') {
          if (lastLineLength + token.length > terminalWidth) {
            while (token.length) {
              const chunk = token.slice(0, terminalWidth - lastLineLength);
              const remaining = token.slice(
                terminalWidth - lastLineLength,
                token.length
              );
              lines[lines.length - 1] += chunk;
              lastLineLength += chunk.length;
              token = remaining;

              if (token.length) {
                lines.push('');
                lastLineLength = 0;
              }
            }
          } else {
            lines[lines.length - 1] += token;
            lastLineLength += token.length;
          }
        } else {
          lines[lines.length - 1] += token;
        }

        return lines;
      },
      ['']
    )
    .join('\n');
};

exports.wrapAnsiString = wrapAnsiString;
