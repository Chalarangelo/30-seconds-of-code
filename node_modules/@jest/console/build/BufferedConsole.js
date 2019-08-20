'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _assert() {
  const data = _interopRequireDefault(require('assert'));

  _assert = function _assert() {
    return data;
  };

  return data;
}

function _console() {
  const data = require('console');

  _console = function _console() {
    return data;
  };

  return data;
}

function _util() {
  const data = require('util');

  _util = function _util() {
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

function _sourceMap() {
  const data = require('@jest/source-map');

  _sourceMap = function _sourceMap() {
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

class BufferedConsole extends _console().Console {
  constructor(getSourceMaps) {
    const buffer = [];
    super({
      write: message => {
        BufferedConsole.write(buffer, 'log', message, null, getSourceMaps());
        return true;
      }
    });

    _defineProperty(this, '_buffer', void 0);

    _defineProperty(this, '_counters', void 0);

    _defineProperty(this, '_timers', void 0);

    _defineProperty(this, '_groupDepth', void 0);

    _defineProperty(this, '_getSourceMaps', void 0);

    this._getSourceMaps = getSourceMaps;
    this._buffer = buffer;
    this._counters = {};
    this._timers = {};
    this._groupDepth = 0;
  }

  static write(buffer, type, message, level, sourceMaps) {
    const callsite = (0, _sourceMap().getCallsite)(
      level != null ? level : 2,
      sourceMaps
    );
    const origin = callsite.getFileName() + ':' + callsite.getLineNumber();
    buffer.push({
      message,
      origin,
      type
    });
    return buffer;
  }

  _log(type, message) {
    BufferedConsole.write(
      this._buffer,
      type,
      '  '.repeat(this._groupDepth) + message,
      3,
      this._getSourceMaps()
    );
  }

  assert(value, message) {
    try {
      (0, _assert().default)(value, message);
    } catch (error) {
      this._log('assert', error.toString());
    }
  }

  count(label = 'default') {
    if (!this._counters[label]) {
      this._counters[label] = 0;
    }

    this._log(
      'count',
      (0, _util().format)(`${label}: ${++this._counters[label]}`)
    );
  }

  countReset(label = 'default') {
    this._counters[label] = 0;
  }

  debug(firstArg, ...rest) {
    this._log('debug', (0, _util().format)(firstArg, ...rest));
  }

  dir(firstArg, ...rest) {
    this._log('dir', (0, _util().format)(firstArg, ...rest));
  }

  dirxml(firstArg, ...rest) {
    this._log('dirxml', (0, _util().format)(firstArg, ...rest));
  }

  error(firstArg, ...rest) {
    this._log('error', (0, _util().format)(firstArg, ...rest));
  }

  group(title, ...rest) {
    this._groupDepth++;

    if (title || rest.length > 0) {
      this._log(
        'group',
        _chalk().default.bold((0, _util().format)(title, ...rest))
      );
    }
  }

  groupCollapsed(title, ...rest) {
    this._groupDepth++;

    if (title || rest.length > 0) {
      this._log(
        'groupCollapsed',
        _chalk().default.bold((0, _util().format)(title, ...rest))
      );
    }
  }

  groupEnd() {
    if (this._groupDepth > 0) {
      this._groupDepth--;
    }
  }

  info(firstArg, ...rest) {
    this._log('info', (0, _util().format)(firstArg, ...rest));
  }

  log(firstArg, ...rest) {
    this._log('log', (0, _util().format)(firstArg, ...rest));
  }

  time(label = 'default') {
    if (this._timers[label]) {
      return;
    }

    this._timers[label] = new Date();
  }

  timeEnd(label = 'default') {
    const startTime = this._timers[label];

    if (startTime) {
      const endTime = new Date();
      const time = endTime.getTime() - startTime.getTime();

      this._log('time', (0, _util().format)(`${label}: ${time}ms`));

      delete this._timers[label];
    }
  }

  warn(firstArg, ...rest) {
    this._log('warn', (0, _util().format)(firstArg, ...rest));
  }

  getBuffer() {
    return this._buffer.length ? this._buffer : undefined;
  }
}

exports.default = BufferedConsole;
