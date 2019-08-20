'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _util() {
  const data = _interopRequireDefault(require('util'));

  _util = function _util() {
    return data;
  };

  return data;
}

function _exit() {
  const data = _interopRequireDefault(require('exit'));

  _exit = function _exit() {
    return data;
  };

  return data;
}

function _nodeNotifier() {
  const data = _interopRequireDefault(require('node-notifier'));

  _nodeNotifier = function _nodeNotifier() {
    return data;
  };

  return data;
}

var _base_reporter = _interopRequireDefault(require('./base_reporter'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const isDarwin = process.platform === 'darwin';

const icon = _path().default.resolve(__dirname, '../assets/jest_logo.png');

class NotifyReporter extends _base_reporter.default {
  constructor(globalConfig, startRun, context) {
    super();

    _defineProperty(this, '_startRun', void 0);

    _defineProperty(this, '_globalConfig', void 0);

    _defineProperty(this, '_context', void 0);

    this._globalConfig = globalConfig;
    this._startRun = startRun;
    this._context = context;
  }

  onRunComplete(contexts, result) {
    const success =
      result.numFailedTests === 0 && result.numRuntimeErrorTestSuites === 0;
    const firstContext = contexts.values().next();
    const hasteFS =
      firstContext && firstContext.value && firstContext.value.hasteFS;
    let packageName;

    if (hasteFS != null) {
      // assuming root package.json is the first one
      const _hasteFS$matchFiles = hasteFS.matchFiles('package.json'),
        _hasteFS$matchFiles2 = _slicedToArray(_hasteFS$matchFiles, 1),
        filePath = _hasteFS$matchFiles2[0];

      packageName =
        filePath != null
          ? hasteFS.getModuleName(filePath)
          : this._globalConfig.rootDir;
    } else {
      packageName = this._globalConfig.rootDir;
    }

    packageName = packageName != null ? `${packageName} - ` : '';
    const notifyMode = this._globalConfig.notifyMode;
    const statusChanged =
      this._context.previousSuccess !== success || this._context.firstRun;
    const testsHaveRun = result.numTotalTests !== 0;

    if (
      testsHaveRun &&
      success &&
      (notifyMode === 'always' ||
        notifyMode === 'success' ||
        notifyMode === 'success-change' ||
        (notifyMode === 'change' && statusChanged) ||
        (notifyMode === 'failure-change' && statusChanged))
    ) {
      const title = _util().default.format('%s%d%% Passed', packageName, 100);

      const message = _util().default.format(
        (isDarwin ? '\u2705 ' : '') + '%d tests passed',
        result.numPassedTests
      );

      _nodeNotifier().default.notify({
        icon,
        message,
        title
      });
    } else if (
      testsHaveRun &&
      !success &&
      (notifyMode === 'always' ||
        notifyMode === 'failure' ||
        notifyMode === 'failure-change' ||
        (notifyMode === 'change' && statusChanged) ||
        (notifyMode === 'success-change' && statusChanged))
    ) {
      const failed = result.numFailedTests / result.numTotalTests;

      const title = _util().default.format(
        '%s%d%% Failed',
        packageName,
        Math.ceil(Number.isNaN(failed) ? 0 : failed * 100)
      );

      const message = _util().default.format(
        (isDarwin ? '\u26D4\uFE0F ' : '') + '%d of %d tests failed',
        result.numFailedTests,
        result.numTotalTests
      );

      const watchMode = this._globalConfig.watch || this._globalConfig.watchAll;
      const restartAnswer = 'Run again';
      const quitAnswer = 'Exit tests';

      if (!watchMode) {
        _nodeNotifier().default.notify({
          icon,
          message,
          title
        });
      } else {
        _nodeNotifier().default.notify(
          {
            actions: [restartAnswer, quitAnswer],
            closeLabel: 'Close',
            icon,
            message,
            timeout: 10,
            title
          },
          (err, _, metadata) => {
            if (err || !metadata) {
              return;
            }

            if (metadata.activationValue === quitAnswer) {
              (0, _exit().default)(0);
              return;
            }

            if (metadata.activationValue === restartAnswer) {
              this._startRun(this._globalConfig);
            }
          }
        );
      }
    }

    this._context.previousSuccess = success;
    this._context.firstRun = false;
  }
}

exports.default = NotifyReporter;
