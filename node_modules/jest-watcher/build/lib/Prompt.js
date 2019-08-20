'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _constants = require('../constants');

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

class Prompt {
  constructor() {
    _defineProperty(this, '_entering', void 0);

    _defineProperty(this, '_value', void 0);

    _defineProperty(this, '_onChange', void 0);

    _defineProperty(this, '_onSuccess', void 0);

    _defineProperty(this, '_onCancel', void 0);

    _defineProperty(this, '_offset', void 0);

    _defineProperty(this, '_promptLength', void 0);

    _defineProperty(this, '_selection', void 0);

    _defineProperty(this, '_onResize', () => {
      this._onChange();
    });

    // Copied from `enter` to satisfy TS
    this._entering = true;
    this._value = '';
    this._selection = null;
    this._offset = -1;
    this._promptLength = 0;

    this._onChange = () => {};

    this._onSuccess = () => {};

    this._onCancel = () => {};
  }

  enter(onChange, onSuccess, onCancel) {
    this._entering = true;
    this._value = '';
    this._onSuccess = onSuccess;
    this._onCancel = onCancel;
    this._selection = null;
    this._offset = -1;
    this._promptLength = 0;

    this._onChange = () =>
      onChange(this._value, {
        max: 10,
        offset: this._offset
      });

    this._onChange();

    process.stdout.on('resize', this._onResize);
  }

  setPromptLength(length) {
    this._promptLength = length;
  }

  setPromptSelection(selected) {
    this._selection = selected;
  }

  put(key) {
    switch (key) {
      case _constants.KEYS.ENTER:
        this._entering = false;

        this._onSuccess(this._selection || this._value);

        this.abort();
        break;

      case _constants.KEYS.ESCAPE:
        this._entering = false;

        this._onCancel(this._value);

        this.abort();
        break;

      case _constants.KEYS.ARROW_DOWN:
        this._offset = Math.min(this._offset + 1, this._promptLength - 1);

        this._onChange();

        break;

      case _constants.KEYS.ARROW_UP:
        this._offset = Math.max(this._offset - 1, -1);

        this._onChange();

        break;

      case _constants.KEYS.ARROW_LEFT:
      case _constants.KEYS.ARROW_RIGHT:
        break;

      default:
        this._value =
          key === _constants.KEYS.BACKSPACE
            ? this._value.slice(0, -1)
            : this._value + key;
        this._offset = -1;
        this._selection = null;

        this._onChange();

        break;
    }
  }

  abort() {
    this._entering = false;
    this._value = '';
    process.stdout.removeListener('resize', this._onResize);
  }

  isEntering() {
    return this._entering;
  }
}

exports.default = Prompt;
