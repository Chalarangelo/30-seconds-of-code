'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _fs() {
  const data = _interopRequireDefault(require('fs'));

  _fs = function _fs() {
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

function _prompts() {
  const data = _interopRequireDefault(require('prompts'));

  _prompts = function _prompts() {
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

var _questions = _interopRequireWildcard(require('./questions'));

var _errors = require('./errors');

var _constants = require('./constants');

var _generate_config_file = _interopRequireDefault(
  require('./generate_config_file')
);

var _modify_package_json = _interopRequireDefault(
  require('./modify_package_json')
);

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

var _default =
  /*#__PURE__*/
  (function() {
    var _ref = _asyncToGenerator(function*(
      rootDir = (0, _realpathNative().sync)(process.cwd())
    ) {
      // prerequisite checks
      const projectPackageJsonPath = _path().default.join(
        rootDir,
        _constants.PACKAGE_JSON
      );

      const jestConfigPath = _path().default.join(
        rootDir,
        _constants.JEST_CONFIG
      );

      if (!_fs().default.existsSync(projectPackageJsonPath)) {
        throw new _errors.NotFoundPackageJsonError(rootDir);
      }

      const questions = _questions.default.slice(0);

      let hasJestProperty = false;
      let hasJestConfig = false;
      let projectPackageJson;

      try {
        projectPackageJson = JSON.parse(
          _fs().default.readFileSync(projectPackageJsonPath, 'utf-8')
        );
      } catch (error) {
        throw new _errors.MalformedPackageJsonError(projectPackageJsonPath);
      }

      if (projectPackageJson.jest) {
        hasJestProperty = true;
      }

      if (_fs().default.existsSync(jestConfigPath)) {
        hasJestConfig = true;
      }

      if (hasJestProperty || hasJestConfig) {
        const result = yield (0, _prompts().default)({
          initial: true,
          message:
            'It seems that you already have a jest configuration, do you want to override it?',
          name: 'continue',
          type: 'confirm'
        });

        if (!result.continue) {
          console.log();
          console.log('Aborting...');
          return;
        }
      } // Add test script installation only if needed

      if (
        !projectPackageJson.scripts ||
        projectPackageJson.scripts.test !== 'jest'
      ) {
        questions.unshift(_questions.testScriptQuestion);
      } // Start the init process

      console.log();
      console.log(
        _chalk().default.underline(
          `The following questions will help Jest to create a suitable configuration for your project\n`
        )
      );
      let promptAborted = false; // @ts-ignore: Return type cannot be object - faulty typings

      const results = yield (0, _prompts().default)(questions, {
        onCancel: () => {
          promptAborted = true;
        }
      });

      if (promptAborted) {
        console.log();
        console.log('Aborting...');
        return;
      }

      const shouldModifyScripts = results.scripts;

      if (shouldModifyScripts || hasJestProperty) {
        const modifiedPackageJson = (0, _modify_package_json.default)({
          projectPackageJson,
          shouldModifyScripts
        });

        _fs().default.writeFileSync(
          projectPackageJsonPath,
          modifiedPackageJson
        );

        console.log('');
        console.log(
          `✏️  Modified ${_chalk().default.cyan(projectPackageJsonPath)}`
        );
      }

      const generatedConfig = (0, _generate_config_file.default)(results);

      _fs().default.writeFileSync(jestConfigPath, generatedConfig);

      console.log('');
      console.log(
        `📝  Configuration file created at ${_chalk().default.cyan(
          jestConfigPath
        )}`
      );
    });

    return function() {
      return _ref.apply(this, arguments);
    };
  })();

exports.default = _default;
