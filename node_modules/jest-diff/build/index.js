'use strict';

var _prettyFormat = _interopRequireDefault(require('pretty-format'));

var _chalk = _interopRequireDefault(require('chalk'));

var _jestGetType = _interopRequireDefault(require('jest-get-type'));

var _diffLines = _interopRequireDefault(require('./diffLines'));

var _printDiffs = require('./printDiffs');

var _constants = require('./constants');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

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

const _prettyFormat$plugins = _prettyFormat.default.plugins,
  AsymmetricMatcher = _prettyFormat$plugins.AsymmetricMatcher,
  DOMCollection = _prettyFormat$plugins.DOMCollection,
  DOMElement = _prettyFormat$plugins.DOMElement,
  Immutable = _prettyFormat$plugins.Immutable,
  ReactElement = _prettyFormat$plugins.ReactElement,
  ReactTestComponent = _prettyFormat$plugins.ReactTestComponent;
const PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher
];
const FORMAT_OPTIONS = {
  plugins: PLUGINS
};

const FORMAT_OPTIONS_0 = _objectSpread({}, FORMAT_OPTIONS, {
  indent: 0
});

const FALLBACK_FORMAT_OPTIONS = {
  callToJSON: false,
  maxDepth: 10,
  plugins: PLUGINS
};

const FALLBACK_FORMAT_OPTIONS_0 = _objectSpread({}, FALLBACK_FORMAT_OPTIONS, {
  indent: 0
}); // Generate a string that will highlight the difference between two values
// with green and red. (similar to how github does code diffing)

function diff(a, b, options) {
  if (Object.is(a, b)) {
    return _constants.NO_DIFF_MESSAGE;
  }

  const aType = (0, _jestGetType.default)(a);
  let expectedType = aType;
  let omitDifference = false;

  if (aType === 'object' && typeof a.asymmetricMatch === 'function') {
    if (a.$$typeof !== Symbol.for('jest.asymmetricMatcher')) {
      // Do not know expected type of user-defined asymmetric matcher.
      return null;
    }

    if (typeof a.getExpectedType !== 'function') {
      // For example, expect.anything() matches either null or undefined
      return null;
    }

    expectedType = a.getExpectedType(); // Primitive types boolean and number omit difference below.
    // For example, omit difference for expect.stringMatching(regexp)

    omitDifference = expectedType === 'string';
  }

  if (expectedType !== (0, _jestGetType.default)(b)) {
    return (
      '  Comparing two different types of values.' +
      ` Expected ${_chalk.default.green(expectedType)} but ` +
      `received ${_chalk.default.red((0, _jestGetType.default)(b))}.`
    );
  }

  if (omitDifference) {
    return null;
  }

  switch (aType) {
    case 'string':
      return (0, _diffLines.default)(a, b, options);

    case 'boolean':
    case 'number':
      return comparePrimitive(a, b, options);

    case 'map':
      return compareObjects(sortMap(a), sortMap(b), options);

    case 'set':
      return compareObjects(sortSet(a), sortSet(b), options);

    default:
      return compareObjects(a, b, options);
  }
}

function comparePrimitive(a, b, options) {
  return (0, _diffLines.default)(
    (0, _prettyFormat.default)(a, FORMAT_OPTIONS),
    (0, _prettyFormat.default)(b, FORMAT_OPTIONS),
    options
  );
}

function sortMap(map) {
  return new Map(Array.from(map.entries()).sort());
}

function sortSet(set) {
  return new Set(Array.from(set.values()).sort());
}

function compareObjects(a, b, options) {
  let diffMessage;
  let hasThrown = false;

  try {
    diffMessage = (0, _diffLines.default)(
      (0, _prettyFormat.default)(a, FORMAT_OPTIONS_0),
      (0, _prettyFormat.default)(b, FORMAT_OPTIONS_0),
      options,
      {
        a: (0, _prettyFormat.default)(a, FORMAT_OPTIONS),
        b: (0, _prettyFormat.default)(b, FORMAT_OPTIONS)
      }
    );
  } catch (e) {
    hasThrown = true;
  } // If the comparison yields no results, compare again but this time
  // without calling `toJSON`. It's also possible that toJSON might throw.

  if (!diffMessage || diffMessage === _constants.NO_DIFF_MESSAGE) {
    diffMessage = (0, _diffLines.default)(
      (0, _prettyFormat.default)(a, FALLBACK_FORMAT_OPTIONS_0),
      (0, _prettyFormat.default)(b, FALLBACK_FORMAT_OPTIONS_0),
      options,
      {
        a: (0, _prettyFormat.default)(a, FALLBACK_FORMAT_OPTIONS),
        b: (0, _prettyFormat.default)(b, FALLBACK_FORMAT_OPTIONS)
      }
    );

    if (diffMessage !== _constants.NO_DIFF_MESSAGE && !hasThrown) {
      diffMessage = _constants.SIMILAR_MESSAGE + '\n\n' + diffMessage;
    }
  }

  return diffMessage;
} // eslint-disable-next-line no-redeclare

diff.getStringDiff = _printDiffs.getStringDiff;
module.exports = diff;
