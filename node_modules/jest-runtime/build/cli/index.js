'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.run = run;

function _os() {
  const data = _interopRequireDefault(require('os'));

  _os = function _os() {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
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

function _realpathNative() {
  const data = require('realpath-native');

  _realpathNative = function _realpathNative() {
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

function _console() {
  const data = require('@jest/console');

  _console = function _console() {
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

var _version = require('../version');

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

function run(cliArgv, cliInfo) {
  const realFs = require('fs');

  const fs = require('graceful-fs');

  fs.gracefulify(realFs);
  let argv;

  if (cliArgv) {
    argv = cliArgv;
  } else {
    argv = _yargs()
      .default.usage(args.usage)
      .help(false)
      .version(false)
      .options(args.options).argv; // @ts-ignore: fix this at some point

    (0, _jestValidate().validateCLIOptions)(
      argv,
      _objectSpread({}, args.options, {
        deprecationEntries: _jestConfig().deprecationEntries
      })
    );
  }

  if (argv.help) {
    _yargs().default.showHelp();

    process.on('exit', () => (process.exitCode = 1));
    return;
  }

  if (argv.version) {
    console.log(`v${_version.VERSION}\n`);
    return;
  }

  if (!argv._.length) {
    console.log('Please provide a path to a script. (See --help for details)');
    process.on('exit', () => (process.exitCode = 1));
    return;
  }

  const root = (0, _realpathNative().sync)(process.cwd());

  const filePath = _path().default.resolve(root, argv._[0]);

  if (argv.debug) {
    const info = cliInfo ? ', ' + cliInfo.join(', ') : '';
    console.log(`Using Jest Runtime v${_version.VERSION}${info}`);
  } // TODO: Figure this out
  // @ts-ignore: this might not have the correct arguments

  const options = (0, _jestConfig().readConfig)(argv, root);
  const globalConfig = options.globalConfig; // Always disable automocking in scripts.

  const config = _objectSpread({}, options.projectConfig, {
    automock: false,
    unmockedModulePathPatterns: null
  }); // Break circular dependency

  const Runtime = require('..');

  Runtime.createContext(config, {
    maxWorkers: Math.max(_os().default.cpus().length - 1, 1),
    watchman: globalConfig.watchman
  })
    .then(hasteMap => {
      const Environment = require(config.testEnvironment);

      const environment = new Environment(config);
      (0, _jestUtil().setGlobal)(
        environment.global,
        'console',
        new (_console()).CustomConsole(process.stdout, process.stderr)
      );
      (0, _jestUtil().setGlobal)(
        environment.global,
        'jestProjectConfig',
        config
      );
      (0, _jestUtil().setGlobal)(
        environment.global,
        'jestGlobalConfig',
        globalConfig
      );
      const runtime = new Runtime(config, environment, hasteMap.resolver);
      runtime.requireModule(filePath);
    })
    .catch(e => {
      console.error(_chalk().default.red(e.stack || e));
      process.on('exit', () => (process.exitCode = 1));
    });
}
