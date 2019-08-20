'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createReporterError = createReporterError;
exports.createArrayReporterError = createArrayReporterError;
exports.validateReporters = validateReporters;

function _jestValidate() {
  const data = require('jest-validate');

  _jestValidate = function _jestValidate() {
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

function _jestGetType() {
  const data = _interopRequireDefault(require('jest-get-type'));

  _jestGetType = function _jestGetType() {
    return data;
  };

  return data;
}

var _utils = require('./utils');

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

const validReporterTypes = ['array', 'string'];
const ERROR = `${_utils.BULLET}Reporter Validation Error`;
/**
 * Reporter Validation Error is thrown if the given arguments
 * within the reporter are not valid.
 *
 * This is a highly specific reporter error and in the future will be
 * merged with jest-validate. Till then, we can make use of it. It works
 * and that's what counts most at this time.
 */

function createReporterError(reporterIndex, reporterValue) {
  const errorMessage =
    `  Reporter at index ${reporterIndex} must be of type:\n` +
    `    ${_chalk().default.bold.green(validReporterTypes.join(' or '))}\n` +
    `  but instead received:\n` +
    `    ${_chalk().default.bold.red(
      (0, _jestGetType().default)(reporterValue)
    )}`;
  return new (_jestValidate()).ValidationError(
    ERROR,
    errorMessage,
    _utils.DOCUMENTATION_NOTE
  );
}

function createArrayReporterError(
  arrayReporter,
  reporterIndex,
  valueIndex,
  value,
  expectedType,
  valueName
) {
  const errorMessage =
    `  Unexpected value for ${valueName} ` +
    `at index ${valueIndex} of reporter at index ${reporterIndex}\n` +
    '  Expected:\n' +
    `    ${_chalk().default.bold.red(expectedType)}\n` +
    '  Got:\n' +
    `    ${_chalk().default.bold.green((0, _jestGetType().default)(value))}\n` +
    `  Reporter configuration:\n` +
    `    ${_chalk().default.bold.green(
      JSON.stringify(arrayReporter, null, 2)
        .split('\n')
        .join('\n    ')
    )}`;
  return new (_jestValidate()).ValidationError(
    ERROR,
    errorMessage,
    _utils.DOCUMENTATION_NOTE
  );
}

function validateReporters(reporterConfig) {
  return reporterConfig.every((reporter, index) => {
    if (Array.isArray(reporter)) {
      validateArrayReporter(reporter, index);
    } else if (typeof reporter !== 'string') {
      throw createReporterError(index, reporter);
    }

    return true;
  });
}

function validateArrayReporter(arrayReporter, reporterIndex) {
  const _arrayReporter = _slicedToArray(arrayReporter, 2),
    path = _arrayReporter[0],
    options = _arrayReporter[1];

  if (typeof path !== 'string') {
    throw createArrayReporterError(
      arrayReporter,
      reporterIndex,
      0,
      path,
      'string',
      'Path'
    );
  } else if (typeof options !== 'object') {
    throw createArrayReporterError(
      arrayReporter,
      reporterIndex,
      1,
      options,
      'object',
      'Reporter Configuration'
    );
  }
}
