'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
Object.defineProperty(exports, 'BufferedConsole', {
  enumerable: true,
  get: function get() {
    return _BufferedConsole.default;
  }
});
Object.defineProperty(exports, 'CustomConsole', {
  enumerable: true,
  get: function get() {
    return _CustomConsole.default;
  }
});
Object.defineProperty(exports, 'NullConsole', {
  enumerable: true,
  get: function get() {
    return _NullConsole.default;
  }
});
Object.defineProperty(exports, 'getConsoleOutput', {
  enumerable: true,
  get: function get() {
    return _getConsoleOutput.default;
  }
});
Object.defineProperty(exports, 'ConsoleBuffer', {
  enumerable: true,
  get: function get() {
    return _types.ConsoleBuffer;
  }
});
Object.defineProperty(exports, 'LogMessage', {
  enumerable: true,
  get: function get() {
    return _types.LogMessage;
  }
});
Object.defineProperty(exports, 'LogType', {
  enumerable: true,
  get: function get() {
    return _types.LogType;
  }
});

var _BufferedConsole = _interopRequireDefault(require('./BufferedConsole'));

var _CustomConsole = _interopRequireDefault(require('./CustomConsole'));

var _NullConsole = _interopRequireDefault(require('./NullConsole'));

var _getConsoleOutput = _interopRequireDefault(require('./getConsoleOutput'));

var _types = require('./types');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
