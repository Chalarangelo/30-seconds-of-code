'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _defaultConfig = _interopRequireDefault(require('./defaultConfig'));

var _utils = require('./utils');

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

let hasDeprecationWarnings = false;

const shouldSkipValidationForPath = (path, key, blacklist) =>
  blacklist ? blacklist.includes([...path, key].join('.')) : false;

const _validate = (config, exampleConfig, options, path = []) => {
  if (
    typeof config !== 'object' ||
    config == null ||
    typeof exampleConfig !== 'object' ||
    exampleConfig == null
  ) {
    return {
      hasDeprecationWarnings
    };
  }

  for (const key in config) {
    if (
      options.deprecatedConfig &&
      key in options.deprecatedConfig &&
      typeof options.deprecate === 'function'
    ) {
      const isDeprecatedKey = options.deprecate(
        config,
        key,
        options.deprecatedConfig,
        options
      );
      hasDeprecationWarnings = hasDeprecationWarnings || isDeprecatedKey;
    } else if (allowsMultipleTypes(key)) {
      const value = config[key];

      if (
        typeof options.condition === 'function' &&
        typeof options.error === 'function'
      ) {
        if (key === 'maxWorkers' && !isOfTypeStringOrNumber(value)) {
          throw new _utils.ValidationError(
            'Validation Error',
            `${key} has to be of type string or number`,
            `maxWorkers=50% or\nmaxWorkers=3`
          );
        }
      }
    } else if (Object.hasOwnProperty.call(exampleConfig, key)) {
      if (
        typeof options.condition === 'function' &&
        typeof options.error === 'function' &&
        !options.condition(config[key], exampleConfig[key])
      ) {
        options.error(key, config[key], exampleConfig[key], options, path);
      }
    } else if (
      shouldSkipValidationForPath(path, key, options.recursiveBlacklist)
    ) {
      // skip validating unknown options inside blacklisted paths
    } else {
      options.unknown &&
        options.unknown(config, exampleConfig, key, options, path);
    }

    if (
      options.recursive &&
      !Array.isArray(exampleConfig[key]) &&
      options.recursiveBlacklist &&
      !shouldSkipValidationForPath(path, key, options.recursiveBlacklist)
    ) {
      _validate(config[key], exampleConfig[key], options, [...path, key]);
    }
  }

  return {
    hasDeprecationWarnings
  };
};

const allowsMultipleTypes = key => key === 'maxWorkers';

const isOfTypeStringOrNumber = value =>
  typeof value === 'number' || typeof value === 'string';

const validate = (config, options) => {
  hasDeprecationWarnings = false; // Preserve default blacklist entries even with user-supplied blacklist

  const combinedBlacklist = [
    ...(_defaultConfig.default.recursiveBlacklist || []),
    ...(options.recursiveBlacklist || [])
  ];
  const defaultedOptions = Object.assign(
    _objectSpread({}, _defaultConfig.default, options, {
      recursiveBlacklist: combinedBlacklist,
      title: options.title || _defaultConfig.default.title
    })
  );

  const _validate2 = _validate(config, options.exampleConfig, defaultedOptions),
    hdw = _validate2.hasDeprecationWarnings;

  return {
    hasDeprecationWarnings: hdw,
    isValid: true
  };
};

var _default = validate;
exports.default = _default;
