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

function _util() {
  const data = require('util');

  _util = function _util() {
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

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
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

// TODO: Copied from `jest-util`. Import from it in Jest 25
function clearLine(stream) {
  if (stream.isTTY) {
    stream.write('\x1b[999D\x1b[K');
  }
}

class CustomConsole extends _console().Console {
  constructor(stdout, stderr, formatBuffer = (_type, message) => message) {
    super(stdout, stderr);

    _defineProperty(this, '_stdout', void 0);

    _defineProperty(this, '_stderr', void 0);

    _defineProperty(this, '_formatBuffer', void 0);

    _defineProperty(this, '_counters', void 0);

    _defineProperty(this, '_timers', void 0);

    _defineProperty(this, '_groupDepth', void 0);

    this._stdout = stdout;
    this._stderr = stderr;
    this._formatBuffer = formatBuffer;
    this._counters = {};
    this._timers = {};
    this._groupDepth = 0;
  }

  _log(type, message) {
    clearLine(this._stdout);
    super.log(
      this._formatBuffer(type, '  '.repeat(this._groupDepth) + message)
    );
  }

  _logError(type, message) {
    clearLine(this._stderr);
    super.error(
      this._formatBuffer(type, '  '.repeat(this._groupDepth) + message)
    );
  }

  assert(value, message) {
    try {
      (0, _assert().default)(value, message);
    } catch (error) {
      this._logError('assert', error.toString());
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

  debug(firstArg, ...args) {
    this._log('debug', (0, _util().format)(firstArg, ...args));
  }

  dir(firstArg, ...args) {
    this._log('dir', (0, _util().format)(firstArg, ...args));
  }

  dirxml(firstArg, ...args) {
    this._log('dirxml', (0, _util().format)(firstArg, ...args));
  }

  error(firstArg, ...args) {
    this._logError('error', (0, _util().format)(firstArg, ...args));
  }

  group(title, ...args) {
    this._groupDepth++;

    if (title || args.length > 0) {
      this._log(
        'group',
        _chalk().default.bold((0, _util().format)(title, ...args))
      );
    }
  }

  groupCollapsed(title, ...args) {
    this._groupDepth++;

    if (title || args.length > 0) {
      this._log(
        'groupCollapsed',
        _chalk().default.bold((0, _util().format)(title, ...args))
      );
    }
  }

  groupEnd() {
    if (this._groupDepth > 0) {
      this._groupDepth--;
    }
  }

  info(firstArg, ...args) {
    this._log('info', (0, _util().format)(firstArg, ...args));
  }

  log(firstArg, ...args) {
    this._log('log', (0, _util().format)(firstArg, ...args));
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
      const endTime = new Date().getTime();
      const time = endTime - startTime.getTime();

      this._log('time', (0, _util().format)(`${label}: ${time}ms`));

      delete this._timers[label];
    }
  }

  warn(firstArg, ...args) {
    this._logError('warn', (0, _util().format)(firstArg, ...args));
  }

  getBuffer() {
    return undefined;
  }
}

exports.default = CustomConsole;
