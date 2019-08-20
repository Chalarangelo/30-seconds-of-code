'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setup = setup;
exports.worker = worker;

function _jestHasteMap() {
  const data = _interopRequireDefault(require('jest-haste-map'));

  _jestHasteMap = function _jestHasteMap() {
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

function _jestMessageUtil() {
  const data = require('jest-message-util');

  _jestMessageUtil = function _jestMessageUtil() {
    return data;
  };

  return data;
}

function _jestRuntime() {
  const data = _interopRequireDefault(require('jest-runtime'));

  _jestRuntime = function _jestRuntime() {
    return data;
  };

  return data;
}

var _runTest = _interopRequireDefault(require('./runTest'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

// Make sure uncaught errors are logged before we exit.
process.on('uncaughtException', err => {
  console.error(err.stack);
  (0, _exit().default)(1);
});

const formatError = error => {
  if (typeof error === 'string') {
    const _separateMessageFromS = (0,
      _jestMessageUtil().separateMessageFromStack)(error),
      message = _separateMessageFromS.message,
      stack = _separateMessageFromS.stack;

    return {
      message,
      stack,
      type: 'Error'
    };
  }

  return {
    code: error.code || undefined,
    message: error.message,
    stack: error.stack,
    type: 'Error'
  };
};

const resolvers = new Map();

const getResolver = config => {
  const resolver = resolvers.get(config.name);

  if (!resolver) {
    throw new Error('Cannot find resolver for: ' + config.name);
  }

  return resolver;
};

function setup(setupData) {
  // Module maps that will be needed for the test runs are passed.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = setupData.serializableResolvers[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      const _step$value = _step.value,
        config = _step$value.config,
        serializableModuleMap = _step$value.serializableModuleMap;

      const moduleMap = _jestHasteMap().default.ModuleMap.fromJSON(
        serializableModuleMap
      );

      resolvers.set(
        config.name,
        _jestRuntime().default.createResolver(config, moduleMap)
      );
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function worker(_x) {
  return _worker.apply(this, arguments);
}

function _worker() {
  _worker = _asyncToGenerator(function*({config, globalConfig, path, context}) {
    try {
      return yield (0, _runTest.default)(
        path,
        globalConfig,
        config,
        getResolver(config),
        context &&
          _objectSpread({}, context, {
            changedFiles: context.changedFiles && new Set(context.changedFiles)
          })
      );
    } catch (error) {
      throw formatError(error);
    }
  });
  return _worker.apply(this, arguments);
}
