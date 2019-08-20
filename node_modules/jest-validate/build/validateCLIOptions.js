'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = validateCLIOptions;
exports.DOCUMENTATION_NOTE = void 0;

function _chalk() {
  const data = _interopRequireDefault(require('chalk'));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _camelcase() {
  const data = _interopRequireDefault(require('camelcase'));

  _camelcase = function _camelcase() {
    return data;
  };

  return data;
}

var _utils = require('./utils');

var _deprecated = require('./deprecated');

var _defaultConfig = _interopRequireDefault(require('./defaultConfig'));

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

const BULLET = _chalk().default.bold('\u25cf');

const DOCUMENTATION_NOTE = `  ${_chalk().default.bold(
  'CLI Options Documentation:'
)}
  https://jestjs.io/docs/en/cli.html
`;
exports.DOCUMENTATION_NOTE = DOCUMENTATION_NOTE;

const createCLIValidationError = (unrecognizedOptions, allowedOptions) => {
  let title = `${BULLET} Unrecognized CLI Parameter`;
  let message;
  const comment =
    `  ${_chalk().default.bold('CLI Options Documentation')}:\n` +
    `  https://jestjs.io/docs/en/cli.html\n`;

  if (unrecognizedOptions.length === 1) {
    const unrecognized = unrecognizedOptions[0];
    const didYouMeanMessage = (0, _utils.createDidYouMeanMessage)(
      unrecognized,
      Array.from(allowedOptions)
    );
    message =
      `  Unrecognized option ${_chalk().default.bold(
        (0, _utils.format)(unrecognized)
      )}.` + (didYouMeanMessage ? ` ${didYouMeanMessage}` : '');
  } else {
    title += 's';
    message =
      `  Following options were not recognized:\n` +
      `  ${_chalk().default.bold((0, _utils.format)(unrecognizedOptions))}`;
  }

  return new _utils.ValidationError(title, message, comment);
};

const logDeprecatedOptions = (deprecatedOptions, deprecationEntries, argv) => {
  deprecatedOptions.forEach(opt => {
    (0, _deprecated.deprecationWarning)(
      argv,
      opt,
      deprecationEntries,
      _objectSpread({}, _defaultConfig.default, {
        comment: DOCUMENTATION_NOTE
      })
    );
  });
};

function validateCLIOptions(argv, options, rawArgv = []) {
  const yargsSpecialOptions = ['$0', '_', 'help', 'h'];
  const deprecationEntries = options.deprecationEntries || {};
  const allowedOptions = Object.keys(options).reduce(
    (acc, option) => acc.add(option).add(options[option].alias || option),
    new Set(yargsSpecialOptions)
  );
  const unrecognizedOptions = Object.keys(argv).filter(
    arg =>
      !allowedOptions.has((0, _camelcase().default)(arg)) &&
      (!rawArgv.length || rawArgv.includes(arg)),
    []
  );

  if (unrecognizedOptions.length) {
    throw createCLIValidationError(unrecognizedOptions, allowedOptions);
  }

  const CLIDeprecations = Object.keys(deprecationEntries).reduce(
    (acc, entry) => {
      if (options[entry]) {
        acc[entry] = deprecationEntries[entry];
        const alias = options[entry].alias;

        if (alias) {
          acc[alias] = deprecationEntries[entry];
        }
      }

      return acc;
    },
    {}
  );
  const deprecations = new Set(Object.keys(CLIDeprecations));
  const deprecatedOptions = Object.keys(argv).filter(
    arg => deprecations.has(arg) && argv[arg] != null
  );

  if (deprecatedOptions.length) {
    logDeprecatedOptions(deprecatedOptions, CLIDeprecations, argv);
  }

  return true;
}
