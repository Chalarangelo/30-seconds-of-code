'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.run = run;
exports.buildArgv = void 0;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
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

function _jestValidate() {
  const data = require('jest-validate');

  _jestValidate = function _jestValidate() {
    return data;
  };

  return data;
}

function _jestConfig() {
  const data = require('jest-config');

  _jestConfig = function _jestConfig() {
    return data;
  };

  return data;
}

function _core() {
  const data = require('@jest/core');

  _core = function _core() {
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

function _exit() {
  const data = _interopRequireDefault(require('exit'));

  _exit = function _exit() {
    return data;
  };

  return data;
}

function _yargs() {
  const data = _interopRequireDefault(require('yargs'));

  _yargs = function _yargs() {
    return data;
  };

  return data;
}

function _realpathNative() {
  const data = require('realpath-native');

  _realpathNative = function _realpathNative() {
    return data;
  };

  return data;
}

var _init = _interopRequireDefault(require('../init'));

var args = _interopRequireWildcard(require('./args'));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

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

function run(_x, _x2) {
  return _run.apply(this, arguments);
}

function _run() {
  _run = _asyncToGenerator(function*(maybeArgv, project) {
    try {
      const argv = buildArgv(maybeArgv);

      if (argv.init) {
        yield (0, _init.default)();
        return;
      }

      const projects = getProjectListFromCLIArgs(argv, project);

      const _ref = yield (0, _core().runCLI)(argv, projects),
        results = _ref.results,
        globalConfig = _ref.globalConfig;

      readResultsAndExit(results, globalConfig);
    } catch (error) {
      (0, _jestUtil().clearLine)(process.stderr);
      (0, _jestUtil().clearLine)(process.stdout);

      if (error.stack) {
        console.error(_chalk().default.red(error.stack));
      } else {
        console.error(_chalk().default.red(error));
      }

      (0, _exit().default)(1);
      throw error;
    }
  });
  return _run.apply(this, arguments);
}

const buildArgv = maybeArgv => {
  const version =
    (0, _core().getVersion)() +
    (__dirname.includes(`packages${_path().default.sep}jest-cli`)
      ? '-dev'
      : '');
  const rawArgv = maybeArgv || process.argv.slice(2);
  const argv = (0, _yargs().default)(rawArgv)
    .usage(args.usage)
    .version(version)
    .alias('help', 'h')
    .options(args.options)
    .epilogue(args.docs)
    .check(args.check).argv;
  (0, _jestValidate().validateCLIOptions)(
    argv,
    _objectSpread({}, args.options, {
      deprecationEntries: _jestConfig().deprecationEntries
    }), // strip leading dashes
    Array.isArray(rawArgv)
      ? rawArgv.map(rawArgv => rawArgv.replace(/^--?/, ''))
      : Object.keys(rawArgv)
  ); // strip dashed args

  return Object.keys(argv).reduce((result, key) => {
    if (!key.includes('-')) {
      result[key] = argv[key];
    }

    return result;
  }, {});
};

exports.buildArgv = buildArgv;

const getProjectListFromCLIArgs = (argv, project) => {
  const projects = argv.projects ? argv.projects : [];

  if (project) {
    projects.push(project);
  }

  if (!projects.length && process.platform === 'win32') {
    try {
      projects.push((0, _realpathNative().sync)(process.cwd()));
    } catch (err) {
      // do nothing, just catch error
      // process.binding('fs').realpath can throw, e.g. on mapped drives
    }
  }

  if (!projects.length) {
    projects.push(process.cwd());
  }

  return projects;
};

const readResultsAndExit = (result, globalConfig) => {
  const code = !result || result.success ? 0 : globalConfig.testFailureExitCode; // Only exit if needed

  process.on('exit', () => {
    if (typeof code === 'number' && code !== 0) {
      process.exitCode = code;
    }
  });

  if (globalConfig.forceExit) {
    if (!globalConfig.detectOpenHandles) {
      console.warn(
        _chalk().default.bold('Force exiting Jest: ') +
          'Have you considered using `--detectOpenHandles` to detect ' +
          'async operations that kept running after all tests finished?'
      );
    }

    (0, _exit().default)(code);
  } else if (!globalConfig.detectOpenHandles) {
    setTimeout(() => {
      console.warn(
        _chalk().default.yellow.bold(
          'Jest did not exit one second after the test run has completed.\n\n'
        ) +
          _chalk().default.yellow(
            'This usually means that there are asynchronous operations that ' +
              "weren't stopped in your tests. Consider running Jest with " +
              '`--detectOpenHandles` to troubleshoot this issue.'
          )
      );
    }, 1000).unref();
  }
};
