'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _jestWatcher() {
  const data = require('jest-watcher');

  _jestWatcher = function _jestWatcher() {
    return data;
  };

  return data;
}

var _TestPathPatternPrompt = _interopRequireDefault(
  require('../TestPathPatternPrompt')
);

var _active_filters_message = _interopRequireDefault(
  require('../lib/active_filters_message')
);

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

class TestPathPatternPlugin extends _jestWatcher().BaseWatchPlugin {
  constructor(options) {
    super(options);

    _defineProperty(this, '_prompt', void 0);

    _defineProperty(this, 'isInternal', void 0);

    this._prompt = new (_jestWatcher()).Prompt();
    this.isInternal = true;
  }

  getUsageInfo() {
    return {
      key: 'p',
      prompt: 'filter by a filename regex pattern'
    };
  }

  onKey(key) {
    this._prompt.put(key);
  }

  run(globalConfig, updateConfigAndRun) {
    return new Promise((res, rej) => {
      const testPathPatternPrompt = new _TestPathPatternPrompt.default(
        this._stdout,
        this._prompt
      );
      testPathPatternPrompt.run(
        value => {
          updateConfigAndRun({
            mode: 'watch',
            testPathPattern: value
          });
          res();
        },
        rej,
        {
          header: (0, _active_filters_message.default)(globalConfig)
        }
      );
    });
  }
}

var _default = TestPathPatternPlugin;
exports.default = _default;
