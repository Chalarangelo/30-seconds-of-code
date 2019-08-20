'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createDidYouMeanMessage = exports.logValidationWarning = exports.ValidationError = exports.formatPrettyObject = exports.format = exports.WARNING = exports.ERROR = exports.DEPRECATION = void 0;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _prettyFormat() {
  const data = _interopRequireDefault(require('pretty-format'));

  _prettyFormat = function _prettyFormat() {
    return data;
  };

  return data;
}

function _leven() {
  const data = _interopRequireDefault(require('leven'));

  _leven = function _leven() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
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

const BULLET = _chalk().default.bold('\u25cf');

const DEPRECATION = `${BULLET} Deprecation Warning`;
exports.DEPRECATION = DEPRECATION;
const ERROR = `${BULLET} Validation Error`;
exports.ERROR = ERROR;
const WARNING = `${BULLET} Validation Warning`;
exports.WARNING = WARNING;

const format = value =>
  typeof value === 'function'
    ? value.toString()
    : (0, _prettyFormat().default)(value, {
        min: true
      });

exports.format = format;

const formatPrettyObject = value =>
  typeof value === 'function'
    ? value.toString()
    : JSON.stringify(value, null, 2)
        .split('\n')
        .join('\n    ');

exports.formatPrettyObject = formatPrettyObject;

class ValidationError extends Error {
  constructor(name, message, comment) {
    super();

    _defineProperty(this, 'name', void 0);

    _defineProperty(this, 'message', void 0);

    comment = comment ? '\n\n' + comment : '\n';
    this.name = '';
    this.message = _chalk().default.red(
      _chalk().default.bold(name) + ':\n\n' + message + comment
    );
    Error.captureStackTrace(this, () => {});
  }
}

exports.ValidationError = ValidationError;

const logValidationWarning = (name, message, comment) => {
  comment = comment ? '\n\n' + comment : '\n';
  console.warn(
    _chalk().default.yellow(
      _chalk().default.bold(name) + ':\n\n' + message + comment
    )
  );
};

exports.logValidationWarning = logValidationWarning;

const createDidYouMeanMessage = (unrecognized, allowedOptions) => {
  const suggestion = allowedOptions.find(option => {
    const steps = (0, _leven().default)(option, unrecognized);
    return steps < 3;
  });
  return suggestion
    ? `Did you mean ${_chalk().default.bold(format(suggestion))}?`
    : '';
};

exports.createDidYouMeanMessage = createDidYouMeanMessage;
