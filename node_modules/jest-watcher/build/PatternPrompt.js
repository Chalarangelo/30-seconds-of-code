'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _ansiEscapes() {
  const data = _interopRequireDefault(require('ansi-escapes'));

  _ansiEscapes = function _ansiEscapes() {
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

const CLEAR = _jestUtil().specialChars.CLEAR;

const usage = entity =>
  `\n${_chalk().default.bold('Pattern Mode Usage')}\n` +
  ` ${_chalk().default.dim('\u203A Press')} Esc ${_chalk().default.dim(
    'to exit pattern mode.'
  )}\n` +
  ` ${_chalk().default.dim('\u203A Press')} Enter ` +
  `${_chalk().default.dim(`to filter by a ${entity} regex pattern.`)}\n` +
  `\n`;

const usageRows = usage('').split('\n').length;

class PatternPrompt {
  constructor(pipe, prompt) {
    _defineProperty(this, '_pipe', void 0);

    _defineProperty(this, '_prompt', void 0);

    _defineProperty(this, '_entityName', void 0);

    _defineProperty(this, '_currentUsageRows', void 0);

    // TODO: Should come in the constructor
    this._entityName = '';
    this._pipe = pipe;
    this._prompt = prompt;
    this._currentUsageRows = usageRows;
  }

  run(onSuccess, onCancel, options) {
    this._pipe.write(_ansiEscapes().default.cursorHide);

    this._pipe.write(CLEAR);

    if (options && options.header) {
      this._pipe.write(options.header + '\n');

      this._currentUsageRows = usageRows + options.header.split('\n').length;
    } else {
      this._currentUsageRows = usageRows;
    }

    this._pipe.write(usage(this._entityName));

    this._pipe.write(_ansiEscapes().default.cursorShow);

    this._prompt.enter(this._onChange.bind(this), onSuccess, onCancel);
  }

  _onChange(_pattern, _options) {
    this._pipe.write(_ansiEscapes().default.eraseLine);

    this._pipe.write(_ansiEscapes().default.cursorLeft);
  }
}

exports.default = PatternPrompt;
