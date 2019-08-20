'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _pEachSeries() {
  const data = _interopRequireDefault(require('p-each-series'));

  _pEachSeries = function _pEachSeries() {
    return data;
  };

  return data;
}

function _transform() {
  const data = require('@jest/transform');

  _transform = function _transform() {
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
    var _ref = _asyncToGenerator(function*({
      allTests,
      globalConfig,
      moduleName
    }) {
      const globalModulePaths = new Set(
        allTests.map(test => test.context.config[moduleName])
      );

      if (globalConfig[moduleName]) {
        globalModulePaths.add(globalConfig[moduleName]);
      }

      if (globalModulePaths.size > 0) {
        yield (0, _pEachSeries().default)(
          Array.from(globalModulePaths),
          /*#__PURE__*/
          (function() {
            var _ref2 = _asyncToGenerator(function*(modulePath) {
              if (!modulePath) {
                return;
              }

              const correctConfig = allTests.find(
                t => t.context.config[moduleName] === modulePath
              );
              const projectConfig = correctConfig
                ? correctConfig.context.config // Fallback to first config
                : allTests[0].context.config;
              const transformer = new (_transform()).ScriptTransformer(
                projectConfig
              );
              yield transformer.requireAndTranspileModule(
                modulePath,
                /*#__PURE__*/
                (function() {
                  var _ref3 = _asyncToGenerator(function*(m) {
                    const globalModule = (0, _jestUtil().interopRequireDefault)(
                      m
                    ).default;

                    if (typeof globalModule !== 'function') {
                      throw new TypeError(
                        `${moduleName} file must export a function at ${modulePath}`
                      );
                    }

                    yield globalModule(globalConfig);
                  });

                  return function(_x3) {
                    return _ref3.apply(this, arguments);
                  };
                })()
              );
            });

            return function(_x2) {
              return _ref2.apply(this, arguments);
            };
          })()
        );
      }

      return Promise.resolve();
    });

    return function(_x) {
      return _ref.apply(this, arguments);
    };
  })();

exports.default = _default;
